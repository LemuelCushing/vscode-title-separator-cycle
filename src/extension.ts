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

const getSeparator = (): string | undefined => workspaceConfig.get(titleSeparatorSetting)
const setSeparator = (val: string): Thenable<void> => {
	separator = ` ${val} `
	info(`Changed to ${separator}`)
	let target = extPrefers.get("configTarget") as string
	let options = vscode.ConfigurationTarget.Workspace
	switch (target) {
		case "user":
			options = vscode.ConfigurationTarget.Global
			break
		case "workspaceIfExists":
			if (fs.existsSync(".vscode/settings.json")) {
				options = vscode.ConfigurationTarget.Workspace
			} else {
				options = vscode.ConfigurationTarget.Global
			}
	}
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

	// shorthand function for command registration boilerplate 
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
		extPrefers.update("runOnStartup", runOnStartup)
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