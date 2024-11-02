import dataSource from '../src/config/data-source';
import { PlayHistory } from '../src/entity/play-history.entity';
import { PlayHistoryService, getPlayHistoryService } from '../src/service/play-history.service';

describe("Start a new game and exit", () => {

    let playHistoryService: PlayHistoryService | null = null;
    let playHistory: PlayHistory | null | undefined = null;
    let gameId: string | null | undefined = null;
    let error: any | null = null;

    beforeAll(async () => {
        await dataSource.initialize();
        playHistoryService = getPlayHistoryService();
    });

    beforeEach(() => {
        playHistory = null;
        error = null;
    })

    afterEach(() => {        
    });

    afterAll(async () => {
        playHistoryService = null;
        await dataSource.destroy();
    });

    test('Test starting a new and exit', async () => {
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

