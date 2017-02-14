"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fsp = require("fs-promise");
const path_1 = require("path");
const common_1 = require("./lib/common");
const settings_1 = require("./lib/settings");
const util_1 = require("./util/util");
if (!module.parent) {
    util_1.done(main(common_1.Options.defaults));
}
function main(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const dtPath = options.definitelyTypedPath;
        if (yield fsp.exists(options.definitelyTypedPath)) {
            console.log(`Fetching changes from ${settings_1.sourceBranch}`);
            const actualBranch = yield util_1.execAndThrowErrors(`git rev-parse --abbrev-ref HEAD`, dtPath);
            if (actualBranch !== settings_1.sourceBranch) {
                throw new Error(`Please checkout branch '${settings_1.sourceBranch}`);
            }
            const diff = yield util_1.execAndThrowErrors(`git diff --name-only`, dtPath);
            if (diff) {
                throw new Error(`'git diff' should be empty. Following files changed:\n${diff}`);
            }
            yield util_1.execAndThrowErrors(`git pull`, dtPath);
        }
        else {
            console.log(`Cloning ${settings_1.sourceRepository} to ${dtPath}`);
            yield util_1.execAndThrowErrors(`git clone ${settings_1.sourceRepository}`, path_1.dirname(dtPath));
            yield util_1.execAndThrowErrors(`git checkout ${settings_1.sourceBranch}`, dtPath);
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = main;
//# sourceMappingURL=get-definitely-typed.js.map