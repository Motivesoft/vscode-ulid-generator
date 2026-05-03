import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // Rewrite this method as required
  console.log('vscode-ulid-generator activated');

  const disposable = vscode.commands.registerCommand('vscode-ulid-generator.helloWorld', () => {
    vscode.window.showInformationMessage('Hello from my VS Code extension!');
  });
  context.subscriptions.push(disposable);
}

export function deactivate() {}
