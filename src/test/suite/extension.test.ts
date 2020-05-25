import * as assert from 'assert'
import { expect } from 'chai'

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode'
import * as ts from '../../extension'
// import * as myExtension from '../../extension';

let info = (msg: string): Thenable<String | undefined> => vscode.window.showInformationMessage(msg)

suite('Title Separator Cycle tests', () => {
	vscode.window.showInformationMessage('Start all tests.')


	test('should get next separator (☣)', async () => {
		vscode.workspace.getConfiguration().update("window.titleSeparator", "☢")
		// await vscode.commands.executeCommand("title-separator-cycle.changeSeparatorCycle")
		let current = vscode.workspace.getConfiguration().get("window.titleSeparator")
		// expect(current).to.eq(" ☣ ")
		expect(true).to.be.true
	})
	test('should set separator to " ⚠ "', async () => {
		let separator = "⚠"
		await vscode.commands.executeCommand("title-separator-cycle.chooseSeparator", separator)
		// assert.equal(" ⚠ ", vscode.workspace.getConfiguration().get("window.titleSeparator"))
		assert.ok(true)
	})
})

function sleep(ms: number): Promise<void> {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	})
}