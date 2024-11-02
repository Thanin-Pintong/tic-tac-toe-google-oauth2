import { UpdateResult } from 'typeorm';
import dataSource from '../src/config/data-source';
import { PlayHistory } from '../src/entity/play-history.entity';
import { PlayHistoryService } from '../src/service/play-history.service';

describe("Win 2 rounds, lost 1 round, win 2 rounds and exit", () => {

    let playHistoryService: PlayHistoryService | null = null;
    let playHistory: PlayHistory | null | undefined = null;
    let gameId: string | null | undefined = null;
    let updateResult: UpdateResult | null | undefined = null;
    let error: any | null = null;

    beforeAll(async () => {
        await dataSource.initialize();
        playHistoryService = new PlayHistoryService();
    });

    beforeEach(() => {
        playHistory = null;
        updateResult = null;
        error = null;
    })

    afterEach(() => {        
    });

    afterAll(async () => {
        playHistoryService = null;
        await dataSource.destroy();
    });

    test('Test start a new game', async () => {
        try {
            playHistory = new PlayHistory();
            playHistory.userId = 'thaninp@live.com';
            playHistory = await playHistoryService?.createOrFindExist(playHistory);
            gameId = playHistory?.gameId;
        } catch (err) {
            error = err;
        }
        expect(error).toBeNull();
        expect(playHistory).not.toBeNull();
        expect(gameId).not.toBeUndefined();
        expect(gameId).not.toBeNull();
        console.dir(gameId);
    });

    test('Test win the first round', async () => {
        try {
            updateResult = await playHistoryService?.playerWinBotInThisRound(gameId!);
        } catch (err) {
            error = err;
        }
        expect(error).toBeNull();
        expect(updateResult?.affected).toBe(1);
    });

    test('Test win the second round', async () => {
        try {
            updateResult = await playHistoryService?.playerWinBotInThisRound(gameId!);
        } catch (err) {
            error = err;
        }
        expect(error).toBeNull();
        expect(updateResult?.affected).toBe(1);
    });

    test('Test lost the third round', async () => {
        try {
            updateResult = await playHistoryService?.playerLostBotInThisRound(gameId!);
        } catch (err) {
            error = err;
        }
        expect(error).toBeNull();
        expect(updateResult?.affected).toBe(1);
    });

    test('Test win the fourth round', async () => {
        try {
            updateResult = await playHistoryService?.playerWinBotInThisRound(gameId!);
        } catch (err) {
            error = err;
        }
        expect(error).toBeNull();
        expect(updateResult?.affected).toBe(1);
    });

    test('Test win the fifth round', async () => {
        try {
            updateResult = await playHistoryService?.playerWinBotInThisRound(gameId!);
        } catch (err) {
            error = err;
        }
        expect(error).toBeNull();
        expect(updateResult?.affected).toBe(1);
    });

    test('Test win the sixth round', async () => {
        try {
            updateResult = await playHistoryService?.playerWinBotInThisRound(gameId!);
        } catch (err) {
            error = err;
        }
        expect(error).toBeNull();
        expect(updateResult?.affected).toBe(1);
    });    

    test('Find by gameId', async () => {
        try {
            playHistory = await playHistoryService?.findByGameId(gameId!);
        } catch (err) {
            error = err;
        }
        expect(error).toBeNull();
        expect(playHistory).not.toBeNull();
        console.dir(playHistory);
    });    

});

