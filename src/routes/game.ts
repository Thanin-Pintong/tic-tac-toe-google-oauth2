import express from 'express';

import { PlayHistory } from '../entity/play-history.entity';
import { PlayHistoryService, getPlayHistoryService } from '../service/play-history.service';

const router = express.Router();

/* GET game page. */
router.get('/', async function (req, res, next) {
    const viewData: any = [];
    let playHistoryService: PlayHistoryService;
    let playHistory: PlayHistory | null = null;
    let gameId: string = '';
    let userId: string = '';
    let error: any;

    if (req.session.user) {
        if (!req.session.playHistory) {
            playHistoryService = getPlayHistoryService();
            try {
                playHistory = new PlayHistory();
                playHistory.userId = req.session.user.email ?? 'anonymous';
                playHistory = await playHistoryService.createOrFindExist(playHistory);
                req.session.playHistory = playHistory;
                gameId = playHistory.gameId;
                userId = playHistory.userId;
            } catch (err) {
                error = err;
                console.error(err);
            }
            if(error) {
                req.session.flashErrors = ['Error while initializing game'];
                return res.redirect('/');        
            }
        }
        if (req.session.playHistory) {
            playHistory = req.session.playHistory;
            gameId = playHistory?.gameId ?? '';
            userId = playHistory?.userId ?? '';
            viewData['playHistory'] = playHistory;
            viewData['gameId'] = gameId;
            viewData['userId'] = userId;
        } else {
            return res.redirect('/');
        }
        viewData['title'] = 'Online Tic-Tac-Toe Game';
        return res.render('game', { viewData: viewData });
    } else {
        return res.redirect('/');
    }
});

export default router;
