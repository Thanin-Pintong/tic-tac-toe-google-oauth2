import { CHANGE_MODE, MOVE, RESTART_GAME } from "./types";
import { FINISH_GAME } from "./types";
import { CHANGE_PLAYER_STATE } from "./types";
import { CHANGE_DIFFICULTY } from "./types";
import { CHANGE_TURN } from "./types";

export const move = (row, column, label) => {
    return {
        type: MOVE,
        row: row,
        column: column,
        label: label,
    }
}

/*
export const finishGame = () => {
    return {
        type: FINISH_GAME,
    }
}
*/

export const finishGame = (whoWin) => {
    const appApiUrl = process.env.APP_API_URL || 'http://localhost:4000/api/v1';
    let gameIdMeta = document.getElementsByTagName("meta").gameId;
    //let gameIdMetaName = gameIdMeta.getAttribute('name');
    let gameIdMetaContent = gameIdMeta.getAttribute('content');
    let gameId = gameIdMetaContent;
    let appApiPath = '';

    if (whoWin === 'player1') { appApiPath = `${appApiUrl}/player-win-bot/${gameId}`; }
    else if (whoWin === 'player2') { appApiPath = `${appApiUrl}/player-lost-bot/${gameId}`; }
    else { appApiPath = `${appApiUrl}/player-draw-bot/${gameId}`; }

    return async (dispatch) => {
        try {
            await fetch(appApiPath, { 
                method: 'PUT', 
                credentials : 'include', // to send HTTP only cookies
                headers: {
                    'Contetnt-Type' : 'application/json'
                }
            });
            //const response = await fetch(appApiPath, { method: 'PUT' });
            //const data = await response.json();
            //console.dir(data);
        } catch (error) {
        } finally {
            dispatch({
                type: FINISH_GAME,
            });
        }
        /*
        return {
            type: FINISH_GAME,
        }
        */
    }
}

export const changePlayerState = (player, details) => {
    return {
        type: CHANGE_PLAYER_STATE,
        player: player,
        details: details
    }
}

export const changeDifficulty = (difficulty) => {
    return {
        type: CHANGE_DIFFICULTY,
        difficulty: difficulty,
    }
}

export const changeTurn = (turn) => {
    return {
        type: CHANGE_TURN,
        turn: turn
    }
}

export const changeMode = (mode) => {
    return {
        type: CHANGE_MODE,
        mode: mode,
    }
}

export const restartGame = () => {
    return {
        type: RESTART_GAME,
    }
}
