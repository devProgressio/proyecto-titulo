import {Request, Response} from 'express';
import pool from '../database'

class GamesControllers {
    
    public async list(req: Request, res: Response): Promise<void> {
        const games: any = await pool.query('SELECT * FROM game');
        res.json(games);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const game = await pool.query('SELECT * FROM game WHERE id = ?', [id]);
        if (game.length > 0) {
            return res.json(game[0]);
        }
        res.status(404).json({text: "The game doesn't exists."});
        //res.json({text:'This is game: ' + req.params.id});
    }

    public async create(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        await pool.query('INSERT INTO game set ?', [req.body]);
        res.json({messsage: 'Games Saved'});
    }

    public async delete(req: Request, res: Response): Promise <void>{
        const { id } = req.params;
        await pool.query('DELETE FROM game WHERE id = ?', [id]);
        res.json('The games was deleted.');
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE game set ? WHERE id = ?', [req.body, id]);
        res.json({message:'The game was updated.'});
    }
}

const gamesControllers = new GamesControllers();
export default gamesControllers;