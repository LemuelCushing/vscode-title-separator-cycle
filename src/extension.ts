import * as vscode from 'vscode'
import * as chars from "./characters.json"

let info = (msg: string): Thenable<String | undefined> => vscode.window.showInformationMessage(msg)


export function activate(context: vscode.ExtensionContext) {

	let registerCommand = (command: string, call: (...args: any[]) => any) => context.subscriptions.push(
		vscode.commands.registerCommand(`title-separator-cycle.${command}`, call)
	)

	registerCommand("changeSeparatorRandom", () => {
		info("changeSeparatorRandom")
	})
	registerCommand("changeSeparatorCycle", () => {
		info("changeSeparatorCycle")
	})
	registerCommand("chooseSeparator", () => {
		info("chooseSeparator")
	})
	registerCommand("toggleChange", () => {
		info("toggleChange")
	})
}

export function deactivate() { }
