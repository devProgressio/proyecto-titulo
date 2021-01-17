import { Router } from 'express';
import gamesControllers from '../controllers/gamesControllers';

class GamesRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', gamesControllers.list);
        this.router.get('/:id', gamesControllers.getOne);
        this.router.post('/', gamesControllers.create);
        this.router.delete('/:id', gamesControllers.delete );
        this.router.put('/:id', gamesControllers.update );
    }
}

const gamesRoutes = new GamesRoutes();
export default gamesRoutes.router;