"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesControllers {
    async list(req, res) {
        const games = await database_1.default.query('SELECT * FROM game');
        res.json(games);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const game = await database_1.default.query('SELECT * FROM game WHERE id = ?', [id]);
        if (game.length > 0) {
            return res.json(game[0]);
        }
        res.status(404).json({ text: "The game doesn't exists." });
        //res.json({text:'This is game: ' + req.params.id});
    }
    async create(req, res) {
        console.log(req.body);
        await database_1.default.query('INSERT INTO game set ?', [req.body]);
        res.json({ messsage: 'Games Saved' });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM game WHERE id = ?', [id]);
        res.json('The games was deleted.');
    }
    async update(req, res) {
        const { id } = req.params;
        await database_1.default.query('UPDATE game set ? WHERE id = ?', [req.body, id]);
        res.json({ message: 'The game was updated.' });
    }
}
const gamesControllers = new GamesControllers();
exports.default = gamesControllers;
