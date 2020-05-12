import * as vscode from 'vscode'
import { characters } from "./characters.json"

let info = (msg: string): Thenable<String | undefined> => vscode.window.showInformationMessage(msg)

//Configurations getters & setters
const titleSeparatorSetting: string = "window.titleSeparator"
const extPrefers = vscode.workspace.getConfiguration("title-separator-cycle")
const workspaceConfig = vscode.workspace.getConfiguration()
const mode: string | undefined = extPrefers.get("mode")
let runOnStartup: boolean | undefined = extPrefers.get("runOnStartup")
const getSeparator = (): string | undefined => workspaceConfig.get(titleSeparatorSetting)
const setSeparator = (val: string): Thenable<void> => {
	separator = ` ${val} `
	return workspaceConfig.update(titleSeparatorSetting, separator)
}
let separator: string | undefined = getSeparator()

export function activate(context: vscode.ExtensionContext) {

	// shorthand function for command registration boilerplate 
	let registerCommand = (command: string, call: (...args: any[]) => any) => context.subscriptions.push(
		vscode.commands.registerCommand(`title-separator-cycle.${command}`, call)
	)

	if (runOnStartup === true) {
		switch (mode) {
			case "cycle":
				setSeparator(getNextCharacter())
				break
			default: // Case "random"
				setSeparator(getRandomCharacter())
				break
		}
	}

	function getRandomCharacter(): string {
		return characters[Math.floor(Math.random() * characters.length)]
	}
	function getNextCharacter(): string {
		let currentIndex = characters.indexOf(`${separator}`) + 1
		return characters[currentIndex] ? characters[currentIndex] : characters[0]
	}

	registerCommand("changeSeparatorRandom", () => {
		setSeparator(getRandomCharacter())
	})
	registerCommand("changeSeparatorCycle", () => {
		setSeparator(getNextCharacter())
	})

	registerCommand("chooseSeparator", () => {
		vscode.window.showQuickPick(characters).then((char: string | undefined) => {
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
