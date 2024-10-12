# ULID Generator README

This extension generates Universally Unique Lexicographically Sortable Identifiers, known as ULID.

These have various advantages over other forms of unique identifiers, such as UUID, and are useful when it is desirable to have identifiers that can be meaningfully sorted.

A comparison of the benefits of ULID over UUID and others can be found in the [canonical ULID spec](https://github.com/ulid/spec).

## Features

From the command palette or editor context menu, one of more ULIDs can be placed into the current editor, or a single ULID placed onto the clipboard.

The commands appear in the command palette as:
* Insert new ULID
* Copy new ULID to the clipboard

The option to insert a new ULID into the current editor is also available from the editor context menu and its command could be bound to a hotkey if desired.

The insert function also works with the VS Code multi-cursor function to allow several ULIDs in one operation. 

> By default, the extension will insert the ULIDs in the order in which the cursors appear in the editor. This may be different to the order in which they were selected in the editor, but in most cases is going to be the desired approach. It is possible to [configure](#extension-settings) this behavior.

The extension supports ULID monotonic and time-seeded generation of ULIDs. The best explanation for this can be found in the ULID spec or the README files of the libraries listed in [Requirements](#requirements).

## Requirements

This extension uses the [ulidx](https://github.com/perry-mitchell/ulidx) fork of the original [ulid](https://github.com/ulid/javascript) package as it seems better maintained. 

## Extension Settings

This extension contributes the following settings:

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| vscode-ulid-generator.contextMenu.insertULID | boolean | true | Whether to show the Insert new ULID function in the editor context menu. |
| vscode-ulid-generator.multiCursorBehavior | boolean | true | When using multiple cursors, create the ULIDs in a top-down order. |
| vscode-ulid-generator.seedTime | integer | 0 | Enter non-zero seed time value to consistently give the same string for the time component.<br>Set to 0 for normal operation. |
| vscode-ulid-generator.monotonic | boolean | false | Enable to generate monotonically increasing ULIDs. |

## Known Issues

The extension is not yet configured for use of VS Code in a web browser. The plan is to address this in the next update.

## Release Notes

### 0.1.0

Initial release of the ULID Generator extension.

Support for:
* Inserting one or more ULIDs into the current editor
* Creating a new ULID and placing it onto the clipboard
