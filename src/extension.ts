// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { ulid } from 'ulidx';
import { monotonicFactory } from 'ulidx';

const monotonicFunction = monotonicFactory();
const ulidFunction = ulid;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('"vscode-ulid-generator" is now active');

	context.subscriptions.push(vscode.commands.registerCommand('vscode-ulid-generator.insert', () => {
		const seedTime = vscode.workspace.getConfiguration().get("vscode-ulid-generator.seedTime") as number;
		const useMonotonic = vscode.workspace.getConfiguration().get("vscode-ulid-generator.monotonic") as boolean;
		const sortMultiCursorSelections = vscode.workspace.getConfiguration().get("vscode-ulid-generator.multiCursorBehavior") as boolean;
	
		// Generate the ULID and insert it at the current edit point(s)
		let editor = vscode.window.activeTextEditor;
        if (editor) {
			editor.edit( edit => {
				var editorSelections;
				if(sortMultiCursorSelections) {
					// Take the editor selections and sort them based on location in the editor.
					// If we didn't, the natural order of the list would be the order in which the
					// items were selected, which could be wrong for our use case given the ULIDs
					// are ordered.
					editorSelections = [...editor.selections].sort((a, b) => a.start.compareTo( b.start ));
				} else {
					editorSelections = editor.selections;
				}

				editorSelections.forEach( v => edit.replace( v, makeUlid(seedTime, useMonotonic) ) );
			} );
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vscode-ulid-generator.copy', () => {
		const seedTime = vscode.workspace.getConfiguration().get("vscode-ulid-generator.seedTime") as number;
		const useMonotonic = vscode.workspace.getConfiguration().get("vscode-ulid-generator.monotonic") as boolean;

		// Generate UUID and add it to the clipboard
		vscode.env.clipboard.writeText( makeUlid(seedTime, useMonotonic) );
		
		// Display a message box to the user
		vscode.window.showInformationMessage('ULID copied to clipboard');
	}));

}

function makeUlid(seedTime: number, useMonotonic: boolean) : string {
	const ulid = useMonotonic ? monotonicFunction : ulidFunction;

	var ulidValue;
	if( seedTime > 0 )
	{
		ulidValue = ulid(seedTime);
	} else {
		ulidValue = ulid();
	}
	
	return ulidValue;
}

// This method is called when your extension is deactivated
export function deactivate() {}
