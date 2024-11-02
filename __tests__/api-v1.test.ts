import superagent from 'superagent';

import { boot, shutdown, port } from "../src/index";

describe("Test API V1", () => {

    let response: any;
    let gameId: any;
    let userId: any;
    let error: any;

    beforeAll(async () => {
        await boot();
    });

    beforeEach(() => {
        response = null;
        error = null;
    });

    afterEach(() => {
    });

    afterAll(async () => {
        await shutdown();
    });

    // Create one play history
    test.skip("POST /api/v1/play-history", async () => {
        try {
            response = await superagent
                .post(`http://localhost:${port}/api/v1/play-history`)
                .set('Content-Type', 'application/json')
                .send({ userId: 'thanin@google.com' });
        } catch (err) {
            error = err;
            response = err.response;
        }
        expect(error).toBeNull();
        expect(response.status).toBe(200);
        expect(response.text).not.toBeNull();
        expect(response.text).not.toBeUndefined();
        expect(typeof JSON.parse(response.text)).toBe("object");
        let playHistory = JSON.parse(response.text);
        gameId = playHistory.gameId;
        userId = playHistory.userId;
        //console.dir(JSON.parse(response.text));
    });

    // Get one play history by gameId
    test.skip("GET /api/v1/play-history/:gameId", async () => {
        try {
            response = await superagent
                .get(`http://localhost:${port}/api/v1/play-history/${gameId}`);
        } catch (err) {
            error = err;
            response = err.response;
        }
        expect(error).toBeNull();
        expect(response.status).toBe(200);
        console.dir(response.text);
    });

    // Get play histories by userId
    test.skip("GET /api/v1/play-history-by-user-id/:userId", async () => {
        try {
            response = await superagent
                .get(`http://localhost:${port}/api/v1/play-history-by-user-id/${userId}`);
        } catch (err) {
            error = err;
            response = err.response;
        }
        expect(error).toBeNull();
        expect(response.status).toBe(200);
        console.dir(response.text);
    });    
    
    // Try creating one play history without userId
    test.skip("POST /api/v1/play-history, without userId", async () => {
        try {
            response = await superagent
                .post(`http://localhost:${port}/api/v1/play-history`)
                .set('Content-Type', 'application/json')
                .send();
        } catch (err) {
            error = err;
            response = err.response;
        }
        expect(error).not.toBeNull();
        expect(response.status).toBe(400);
        expect(response.text).not.toBeNull();
        expect(response.text).not.toBeUndefined();
        console.dir(response.status);
        console.dir(response.text);
    });

    // Perform 'Player Win Bot' 6 times, 'Player Draw Bot' 3 times, 'Player Lost Bot' 2 times and 'Player Win Bot' 2 times
    test.skip("PUT /api/v1/player-win-bot/:gameId (6 times), PUT /api/v1/player-draw-bot/:gameId (3 times), PUT /api/v1/player-lost-bot/:gameId (2 times), PUT /api/v1/player-win-bot/:gameId (2 times)", async () => {
        try {
            for(let i=0; i < 6; ++i) {
                response = await superagent
                .put(`http://localhost:${port}/api/v1/player-win-bot/${gameId}`)
                .set('Content-Type', 'application/json')
                .send();
            }

            for(let i=0; i < 3; ++i) {
                response = await superagent
                .put(`http://localhost:${port}/api/v1/player-draw-bot/${gameId}`)
                .set('Content-Type', 'application/json')
                .send();
            }

            for(let i=0; i < 2; ++i) {
                response = await superagent
                .put(`http://localhost:${port}/api/v1/player-lost-bot/${gameId}`)
                .set('Content-Type', 'application/json')
                .send();                
            }
            for(let i=0; i < 2; ++i) {
                response = await superagent
                .put(`http://localhost:${port}/api/v1/player-win-bot/${gameId}`)
                .set('Content-Type', 'application/json')
                .send();
            }            
        } catch (err) {
            error = err;
            response = err.response;
        }
        expect(error).toBeNull();
    });    

    // Get all play histories
    test.skip("GET /api/v1/play-history", async () => {
        try {
            response = await superagent
                .get(`http://localhost:${port}/api/v1/play-history`);
        } catch (err) {
            error = err;
            response = err.response;
        }
        expect(error).toBeNull();
        expect(response.status).toBe(200);
        //expect(response.text).not.toBe([]);
        console.dir(response.text);
    });

});