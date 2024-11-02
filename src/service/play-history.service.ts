import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import dataSource from '../config/data-source';
import { PlayHistory } from '../entity/play-history.entity';

export class PlayHistoryService {

    private playHistoryRepository: Repository<PlayHistory>;

    public constructor() {
        this.playHistoryRepository = dataSource.getRepository(PlayHistory);
    }

    findAll(): Promise<PlayHistory[]> {
        return this.playHistoryRepository.find({
            order: {
                playerScore: 'DESC',
                userId: 'ASC',
                startDateTime: 'ASC'
            }
        });
    }

    findByGameId(gameId: string): Promise<PlayHistory | null> {
        return this.playHistoryRepository.findOneBy({ gameId: gameId });
    }

    findByUserId(userId: string): Promise<PlayHistory[]> {
        return this.playHistoryRepository.find({
            where: {
                userId: userId
            },
            order: {
                startDateTime: 'ASC'
            }
        });
    }

    async createOrFindExist(playHistory: PlayHistory) : Promise<PlayHistory>  {
        let existingPlayHistory = await this.playHistoryRepository.findOneBy({ userId: playHistory.userId });
        if(existingPlayHistory) {
            return existingPlayHistory;
        }
        return this.playHistoryRepository.save(playHistory);
    }

    /*    
    createOrUpdate(playHistory: PlayHistory): Promise<PlayHistory> {
        return this.playHistoryRepository.save(playHistory);
    }

    updatePlayerScore(gameId: string, playerScore: number): Promise<UpdateResult> {
        return this.playHistoryRepository.update(gameId, { playerScore: playerScore });
    }

    updateCollectedBeat(gameId: string, collectedBeat: number): Promise<UpdateResult> {
        return this.playHistoryRepository.update(gameId, { collectedBeat: collectedBeat });
    }

    updateRoundNumber(gameId: string, roundNumber: number): Promise<UpdateResult> {
        return this.playHistoryRepository.update(gameId, { roundNumber: roundNumber });
    }
    */

    async playerWinBotInThisRound(gameId: string): Promise<UpdateResult | null> {
        let score = 1;
        let exclusiveScore = 0;
        let playHistory = await this.playHistoryRepository.findOneBy({ gameId: gameId });

        if (playHistory && playHistory.collectedBeat < 2) {
            return dataSource
                .createQueryBuilder()
                .update(PlayHistory)
                .set({
                    playerScore: () => `player_score + ${score}`,
                    collectedBeat: () => 'collected_beat + 1',
                    roundNumber: () => 'round_number + 1'
                })
                .where('gameId = :gameId', { gameId: gameId })
                .execute();
        }
        else if (playHistory && playHistory.collectedBeat >= 2) {
            exclusiveScore = 1;
            return dataSource
                .createQueryBuilder()
                .update(PlayHistory)
                .set({
                    playerScore: () => `player_score + ${score} + ${exclusiveScore}`,
                    collectedBeat: 0,
                    roundNumber: () => 'round_number + 1'
                })
                .where('gameId = :gameId', { gameId: gameId })
                .execute();
        }
        return null;
    }

    playerLostBotInThisRound(gameId: string): Promise<UpdateResult> {
        return dataSource
            .createQueryBuilder()
            .update(PlayHistory)
            .set({
                playerScore: () => 'player_score - 1',
                collectedBeat: 0,
                roundNumber: () => 'round_number + 1'
            })
            .where('gameId = :gameId', { gameId: gameId })
            .execute();
    }

    playerDrawBotInThisRound(gameId: string): Promise<UpdateResult> {
        return dataSource
            .createQueryBuilder()
            .update(PlayHistory)
            .set({
                collectedBeat: 0,
                roundNumber: () => 'round_number + 1'
            })
            .where('gameId = :gameId', { gameId: gameId })
            .execute();
    }    

    remove(gameId: string): Promise<DeleteResult> {
        return this.playHistoryRepository.delete(gameId);
    }

}

let playHistoryService: PlayHistoryService | null = null;

export const getPlayHistoryService = () => {
    if (playHistoryService) {
        return playHistoryService;
    }
    playHistoryService = new PlayHistoryService();
    return playHistoryService;
}