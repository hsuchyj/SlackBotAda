"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
let fs = require("fs");
let path = require("path");
const config = require("config");
class DefaultTab {
    static getRequestHandler() {
        return function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let htmlPage = `<!DOCTYPE html>
                    <html>
                    <head>
                        <title>Bot Info</title>
                        <meta charset="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <script src='https://statics.teams.microsoft.com/sdk/v1.0/js/MicrosoftTeams.min.js'></script>
                        <script src='https://code.jquery.com/jquery-1.11.3.min.js'></script>
                    </head>

                    <body>
                        <p>
                            These are links to the source code for all of the example dialogs given in the template.
                        </p>`;
                    let files = fs.readdirSync("./public/exampleDialogs");
                    for (let i = 0; i < files.length; i++) {
                        let currFile = files[i];
                        let fileName = path.parse(currFile).name;
                        let fileExtension = path.parse(currFile).ext;
                        if (fileExtension === ".txt") {
                            htmlPage += `<br>
                        <a href="/exampleDialogs/` + fileName + `.txt">` + fileName + `.ts</a>`;
                        }
                    }
                    htmlPage += `
                    <br>
                    <br>
                    <br>
                    <br>
                    <p id="currentTheme">Current theme will show here when you change it in Teams settings - it can be found on the initial load by fetching the context</p>
                    <br>
                    <button onclick="showAllCommands()">Click to See All Commands</button>
                    <br>
                    <p>NOTE: Trying to get the deeplink when this is a static tab does not work. This feature only works when this is a configurable tab.</p>
                    <button onclick="getDeeplink()">Click to get a deeplink to this tab</button>
                    <br>
                    <br>
                    <button onclick="showContext()">Click to Show Tab's Context</button>
                    <p id="contextOutput"></p>
                    <script>
                        var microsoftTeams;

                        $(document).ready(function () {
                            microsoftTeams.initialize();
                            microsoftTeams.registerOnThemeChangeHandler(function(theme) {
                                document.getElementById('currentTheme').innerHTML = theme;
                            });
                        });

                        function showAllCommands() {
                            window.location = "${config.get("app.baseUri") + "/allCommands"}";
                        }

                        function getDeeplink() {
                            microsoftTeams.shareDeepLink({subEntityId: 'stuff', subEntityLabel: 'stuff2'});
                        }

                        function showContext() {
                            microsoftTeams.getContext((context) => {
                                document.getElementById('contextOutput').innerHTML = JSON.stringify(context);
                            });
                        }
                    </script>
                    </body>
                    </html>`;
                    res.send(htmlPage);
                }
                catch (e) {
                    // Don't log expected errors - error is probably from there not being example dialogs
                    res.send(`<html>
                    <body>
                    <p>
                        Sorry. There are no example dialogs to display.
                    </p>
                    <br>
                    <img src="/tab/error_generic.png" alt="default image" />
                    </body>
                    </html>`);
                }
            });
        };
    }
}
exports.DefaultTab = DefaultTab;

//# sourceMappingURL=DefaultTab.js.map
