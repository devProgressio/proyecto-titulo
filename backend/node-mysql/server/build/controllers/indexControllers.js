"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexControllers {
    index(req, res) {
        res.json({ text: 'API Is /api/games' });
    }
}
const indexControllers = new IndexControllers();
exports.default = indexControllers;
