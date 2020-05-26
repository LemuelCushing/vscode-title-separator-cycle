import * as vscode from 'vscode'
import { characters } from "./characters.json"
import * as fs from 'fs'

let info = (msg: string): Thenable<String | undefined> => vscode.window.showInformationMessage(msg)

//Configurations getters & setters
const titleSeparatorSetting: string = "window.titleSeparator"
const extPrefers = vscode.workspace.getConfiguration("title-separator-cycle")

const workspaceConfig = vscode.workspace.getConfiguration()
const cycleMode: string = extPrefers.get("cycleMode") || "random"
let runOnStartup: boolean | undefined = extPrefers.get("runOnStartup")
const overrideSeparatorList: boolean = extPrefers.get("overrideSeparatorList") || false
const manualList = extPrefers.get("manualSeparatorList") as string[]
const changeThemePerf: boolean = extPrefers.get("changeThemes")! as boolean

const getSeparator = (): string | undefined => workspaceConfig.get(titleSeparatorSetting)
const setSeparator = (val: string): Thenable<void> => {
	separator = ` ${val} `
	info(`Changed separator to ${separator}`)
	let options = getTarget()
	return workspaceConfig.update(titleSeparatorSetting, separator, options)
}
let separator: string | undefined = getSeparator()

let characterSource = characters
//FIXME: This does not actually refresh when already open 🤔
let refreshManualList = (): void => {
	if (overrideSeparatorList && manualList.length > 0) { characterSource = manualList! as string[] } else {
		characterSource = characters
	}
}

export function activate(context: vscode.ExtensionContext) {

	// 👇 shorthand function for command registration boilerplate </>
	let registerCommand = (command: string, call: (...args: any[]) => any) => context.subscriptions.push(
		vscode.commands.registerCommand(`title-separator-cycle.${command}`, call)
	)

	if (runOnStartup === true) {
		switch (cycleMode) {
			case "cycle":
				setSeparator(getNextCharacter())
				break
			default: // Case "random"
				setSeparator(getRandomCharacter())
				break
		}
	}

	if (changeThemePerf === true) {
		changeTheme()
	}

	registerCommand("changeSeparatorRandom", () => {
		setSeparator(getRandomCharacter())
	})
	registerCommand("changeSeparatorCycle", () => {
		setSeparator(getNextCharacter())
	})

	registerCommand("chooseSeparator", () => {
		vscode.window.showQuickPick(characterSource).then((char: string | undefined) => {
			setSeparator(`${char}`)
		})
	})

	registerCommand("toggleChange", () => {
		info(`${runOnStartup ? "Disabling startup" : "Enabling startup"}`)
		runOnStartup = !runOnStartup
		extPrefers.update("runOnStartup", runOnStartup, getTarget())
	})

	registerCommand("changeTheme", () => {
		changeTheme()
	})
}

export function deactivate() { }

function getRandomCharacter(): string {
	refreshManualList()
	return characterSource[Math.floor(Math.random() * characterSource.length)]
}

//FIXME: fix this for manual list - always reverts to start for some reason
function getNextCharacter(): string {
	refreshManualList()
	let currentIndex = characterSource.indexOf(`${separator}`) + 1
	return characterSource[currentIndex] ? characterSource[currentIndex] : characterSource[0]
}

function getTarget(): vscode.ConfigurationTarget {
	let target = extPrefers.get("configTarget") as string
	switch (target) {
		case "user":
			return vscode.ConfigurationTarget.Global
			break
		case "workspaceIfExists":
			if (fs.existsSync(".vscode/settings.json")) {
				return vscode.ConfigurationTarget.Workspace
			} else {
				return vscode.ConfigurationTarget.Global
			}
			break
		default:
			return vscode.ConfigurationTarget.Workspace
	}
}

function changeTheme(): void {
	let themesArr = extPrefers.get("themeList") as string[]
	let nextTheme = themesArr[Math.floor(Math.random() * themesArr.length)]
	workspaceConfig.update("workbench.colorTheme", nextTheme, vscode.ConfigurationTarget.Workspace)
	info(`Theme changed to ${nextTheme}`)
}