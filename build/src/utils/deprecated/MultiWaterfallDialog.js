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
const BaseDialog_1 = require("./BaseDialog");
// To extend this class - in the constructor of the new dialog the developer needs
// to set this.matchesList and then call DialogUtils.addMatches(this.matchesList, this);
class MultiWaterfallDialog extends BaseDialog_1.BaseDialog {
    constructor(dialogId, multiTriggerActionDialogEntryList) {
        super(dialogId, {});
        this.dialogId = dialogId;
        this.multiTriggerActionDialogEntryList = multiTriggerActionDialogEntryList;
        let resultList = [];
        if (multiTriggerActionDialogEntryList !== null) {
            for (let i = 0; i < multiTriggerActionDialogEntryList.length; i++) {
                let newActionList = [];
                newActionList.push((session, args, next) => { this.setDialogIdAsCurrent(session, args, next); });
                newActionList.push((session, args, next) => {
                    // tslint:disable-next-line:no-shadowed-variable
                    this.onDefault((session, args, next) => { this._onDefault(session, args, next); });
                    next(args);
                });
                if (Array.isArray(multiTriggerActionDialogEntryList[i].action)) {
                    newActionList = newActionList.concat(multiTriggerActionDialogEntryList[i].action);
                }
                else {
                    newActionList.push(multiTriggerActionDialogEntryList[i].action);
                }
                let temp = {
                    match: multiTriggerActionDialogEntryList[i].match,
                    action: newActionList,
                };
                resultList.push(temp);
            }
            this.multiTriggerActionDialogEntryList = resultList;
        }
    }
    getMatchActionPairList() {
        let nonNullList = this.multiTriggerActionDialogEntryList;
        if (nonNullList === null || nonNullList === undefined) {
            nonNullList = [];
        }
        return nonNullList;
    }
    addMatchesToDialog(parentDialog) {
        let matchActionPairList = this.getMatchActionPairList();
        if (matchActionPairList === null) {
            return;
        }
        for (let i = 0; i < matchActionPairList.length; i++) {
            if (Array.isArray(matchActionPairList[i].match)) {
                parentDialog.matchesAny(matchActionPairList[i].match, matchActionPairList[i].action);
            }
            else {
                parentDialog.matches(matchActionPairList[i].match, matchActionPairList[i].action);
            }
        }
    }
    _onBegin(session, args, next) {
        let matchActionPairList = this.getMatchActionPairList();
        let desiredIntent = args ? args.desiredIntent : null;
        let foundIntent = false;
        if (desiredIntent !== null && desiredIntent !== undefined) {
            for (let i = 0; i < matchActionPairList.length; i++) {
                let match = matchActionPairList[i].match;
                if (Array.isArray(match)) {
                    let currMatches = match;
                    for (let j = 0; j < currMatches.length; j++) {
                        if (currMatches[j] === desiredIntent) {
                            session.userData.args = args;
                            this.onDefault(matchActionPairList[i].action);
                            foundIntent = true;
                            break;
                        }
                    }
                }
                else {
                    let currMatch = match;
                    if (currMatch === desiredIntent) {
                        session.userData.args = args;
                        this.onDefault(matchActionPairList[i].action);
                        foundIntent = true;
                    }
                }
                if (foundIntent) {
                    break;
                }
            }
        }
        if (!foundIntent) {
            console.log("ERROR: desiredIntent, " + desiredIntent + ", for dialog, " + this.dialogId + ", could not be located in the matchActionPairList.");
            // tslint:disable-next-line:no-shadowed-variable
            this.onDefault((session, args, next) => { this._onDefault(session, args, next); });
        }
        next(args);
    }
    setDialogIdAsCurrent(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            session.conversationData.currentDialogName = this.dialogId;
            next(args);
        });
    }
}
exports.MultiWaterfallDialog = MultiWaterfallDialog;

//# sourceMappingURL=MultiWaterfallDialog.js.map
