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
const TriggerActionDialog_1 = require("../../../utils/TriggerActionDialog");
const DialogIds_1 = require("../../../utils/DialogIds");
const DialogMatches_1 = require("../../../utils/DialogMatches");
const locale_1 = require("../../../locale/locale");
class HelloDialog extends TriggerActionDialog_1.TriggerActionDialog {
    static step1(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(session.message);
            session.send(locale_1.Strings.hello_msg);
            session.endDialog();
        });
    }
    constructor(bot) {
        super(bot, DialogIds_1.DialogIds.HelloDialogId, [
            DialogMatches_1.DialogMatches.HelloDialogMatch,
            DialogMatches_1.DialogMatches.HelloDialogMatch2,
        ], HelloDialog.step1);
    }
}
exports.HelloDialog = HelloDialog;

//# sourceMappingURL=HelloDialog.js.map
