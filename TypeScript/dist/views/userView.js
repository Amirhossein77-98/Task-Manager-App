"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserView = void 0;
class UserView {
    static displayMessage(res, message) {
        res.json({ message });
    }
}
exports.UserView = UserView;
