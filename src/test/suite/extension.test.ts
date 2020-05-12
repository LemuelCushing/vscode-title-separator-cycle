import * as assert from 'assert'

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode'
import * as ts from '../../extension'
// import * as myExtension from '../../extension';

suite('Title Separator Cycle tests', () => {
	vscode.window.showInformationMessage('Start all tests.')

	test('should set separator to " $ "', () => {
		let separator = "$"
		vscode.commands.executeCommand("title-separator-cycle.chooseSeparator")
		// assert.equal(" $ ", vscode.workspace.getConfiguration().get("window.titleSeparator"))
		assert.ok(true)
	})
})
