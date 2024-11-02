import express from 'express';
import { UpdateResult } from 'typeorm';

import { PlayHistory } from '../entity/play-history.entity';
import { PlayHistoryService, getPlayHistoryService } from '../service/play-history.service';
import { PlayHistoryValidator } from '../validators/play-history.validator';

const router = express.Router();

/* REST API */
router.param('gameId', (req, res, next, gameId) => {
    req.gameId = gameId;
    return next();
});

router.param('userId', (req, res, next, userId) => {
    req.userId = userId;
    return next();
});

// Get all play histories
router.get('/play-history', async function (req, res, next) {
    let playHistoryService: PlayHistoryService;
    let playHistories: PlayHistory[] | [] | null = null;
    let error: any | null = null;

    playHistoryService = getPlayHistoryService();

    try {
        playHistories = await playHistoryService.findAll();
    } catch (err) {
        error = err;
        console.error(err);
    }

    if(error) {
        return res.status(500).json({message: 'Error finding all play histories' });
    }
    if(playHistories) {
        return res.status(200).json(playHistories);
    }
    return res.status(404).json({message: `Not found any play history` });
});

// Get play history by gameId
router.get('/play-history/:gameId', async function (req, res, next) {
    let playHistoryService: PlayHistoryService;
    let playHistory: PlayHistory | null = null;
    let gameId: string = '';
    let error: any | null = null;

    playHistoryService = getPlayHistoryService();
    gameId = req.gameId;

    try {
        playHistory = await playHistoryService.findByGameId(gameId);
    } catch (err) {
        error = err;
        console.error(err);
    }

    if(error) {
        return res.status(500).json({message: 'Error finding by gameId' });
    }
    if(playHistory) {
        return res.status(200).json(playHistory);
    }
    return res.status(404).json({message: `Not found play history by gameId=${gameId}` });
});

// Get play histories by userId
router.get('/play-history-by-user-id/:userId', async function (req, res, next) {
    let playHistoryService: PlayHistoryService;
    let playHistories: PlayHistory[] | [] | null = null;
    let userId: string = '';
    let error: any | null = null;

    playHistoryService = getPlayHistoryService();
    userId = req.userId;

    try {
        playHistories = await playHistoryService.findByUserId(userId);
    } catch (err) {
        error = err;
        console.error(err);
    }

    if(error) {
        return res.status(500).json({message: 'Error finding play histories by userId' });
    }
    if(playHistories) {
        return res.status(200).json(playHistories);
    }
    return res.status(404).json({message: `Not found play history by userId=${userId}` });
});

// Create a play-history
router.post('/play-history', async function (req, res, next) {
    const toValidate = ['userId'];
    let playHistoryService: PlayHistoryService;
    let playHistory: PlayHistory | null = null;
    let body: any | null = null;
    let userId: string = '';
    let error: any | null = null;
    let errors: any[] | [] | null = null;

    body = req.body;
    userId = body.userId ?? '';
    playHistoryService = getPlayHistoryService();
    errors = PlayHistoryValidator.validate(body, toValidate);
    if (errors.length > 0) {
        return res.status(400).json({message: errors });
    }
    try {
        playHistory = new PlayHistory();
        playHistory.userId = userId;
        playHistory = await playHistoryService?.createOrFindExist(playHistory);
    } catch (err) {
        error = err;
        console.error(err);
    }
    
    if(error) {
        return res.status(500).json({message: `Error creating one play history by userId=${userId}` });
    }
    if(playHistory) {
        return res.status(200).json(playHistory);
    }
    return res.status(404).json({message: `Cannot create one play history by userId=${userId}` });
});

// Perform Player Win Bot
router.put('/player-win-bot/:gameId', async function (req, res, next) {
    let playHistoryService: PlayHistoryService;
    let updateResult: UpdateResult | null | undefined = null;
    let gameId: string = '';
    let error: any | null = null;

    gameId = req.gameId ?? '';
    playHistoryService = getPlayHistoryService();

    try {
        updateResult = await playHistoryService.playerWinBotInThisRound(gameId);
    } catch (err) {
        error = err;
        console.error(err);
    }

    if(error) {
        return res.status(500).json({message: `Error callinging player win bot by gameId=${gameId}` });
    }
    if(updateResult) {
        return res.status(200).json(updateResult);
    }
    return res.status(404).json({message: `Cannot call player win bot by gameId=${gameId}` });
});

// Perform Player Lost Bot
router.put('/player-lost-bot/:gameId', async function (req, res, next) {
    let playHistoryService: PlayHistoryService;
    let updateResult: UpdateResult | null | undefined = null;
    let gameId: string = '';
    let error: any | null = null;

    gameId = req.gameId ?? '';
    playHistoryService = getPlayHistoryService();

    try {
        updateResult = await playHistoryService.playerLostBotInThisRound(gameId);
    } catch (err) {
        error = err;
        console.error(err);
    }

    if(error) {
        return res.status(500).json({message: `Error callinging player lost bot by gameId=${gameId}` });
    }
    if(updateResult) {
        return res.status(200).json(updateResult);
    }
    return res.status(404).json({message: `Cannot call player lost bot by gameId=${gameId}` });
});

// Perform Player Draw Bot
router.put('/player-draw-bot/:gameId', async function (req, res, next) {
    let playHistoryService: PlayHistoryService;
    let updateResult: UpdateResult | null | undefined = null;
    let gameId: string = '';
    let error: any | null = null;

    gameId = req.gameId ?? '';
    playHistoryService = getPlayHistoryService();

    try {
        updateResult = await playHistoryService.playerDrawBotInThisRound(gameId);
    } catch (err) {
        error = err;
        console.error(err);
    }

    if(error) {
        return res.status(500).json({message: `Error callinging player draw bot by gameId=${gameId}` });
    }
    if(updateResult) {
        return res.status(200).json(updateResult);
    }
    return res.status(404).json({message: `Cannot call player draw bot by gameId=${gameId}` });
});


export default router;
