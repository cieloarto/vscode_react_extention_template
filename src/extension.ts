// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "visualdevelop" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand(
		"visualdevelop.helloWorld",
		() => {
			// The code you place here will be executed every time your command is executed
			// Display a message box to the user
			vscode.window.showInformationMessage("Hello World from visualdevelop!");
		},
	);

	context.subscriptions.push(disposable);

	context.subscriptions.push(
		vscode.commands.registerCommand("visualdevelop.reactStart", () => {
			// Create and show panel
			const panel = vscode.window.createWebviewPanel(
				"react",
				"React Sample",
				vscode.ViewColumn.One,
				{
					localResourceRoots: [
						vscode.Uri.joinPath(context.extensionUri, "dist"),
					],
					enableScripts: true,
				},
			);

			// And set its HTML content
			panel.webview.html = getWebviewContent(
				panel.webview,
				context.extensionUri,
			);
		}),
	);
}

// This method is called when your extension is deactivated
export function deactivate() {}

// Webview側で使用できるようにuriに変換する関数。
function getUri(
	webview: vscode.Webview,
	extensionUri: vscode.Uri,
	pathList: string[],
) {
	return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
}

function getNonce() {
	let text = "";
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

function getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
	const webviewUri = getUri(webview, extensionUri, ["dist", "webview.js"]);
	const nonce = getNonce();

	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
	<div id="app"></div>
	<script type="module" nonce="${nonce}" src="${webviewUri}"></script>
  </body>
  </html>`;
}
