import {
    Entity, PrimaryGeneratedColumn, CreateDateColumn,
    UpdateDateColumn, Column
} from "typeorm";

@Entity('PLAY_HISTORY')
export class PlayHistory {

    @PrimaryGeneratedColumn("uuid", { name: 'game_id' })
    gameId: string;

    @CreateDateColumn({ name: 'start_datetime' })
    startDateTime: Date;

    @UpdateDateColumn({ name: 'end_datetime' })
    endDateTime: Date;

    @Column({ name: 'user_id', nullable: false })
    userId: string;

    @Column({ type: 'int', name: 'player_score', nullable: false, default: 0 })
    playerScore: number;

    @Column({ type: 'int', name: 'collected_beat', nullable: false, default: 0 })    
    collectedBeat: number;

    @Column({ type: 'int', name: 'round_number', nullable: false, default: 0 })
    roundNumber: number;

    /*
    getGameId(): string {
        return this.gameId;
    }

    setGameId(gameId: string) {
        this.gameId = gameId;
    }

    getStartDateTime(): Date {
        return this.startDateTime;
    }

    setStartDateTime(startDateTime: Date) {
        this.startDateTime = startDateTime;
    }

    getEndDateTime(): Date {
        return this.endDateTime;
    }

    setEndDateTime(endDateTime: Date) {
        this.endDateTime = endDateTime;
    }

    getUserId(): string {
        return this.userId;
    }

    setUserId(userId: string) {
        this.userId = userId;
    }

    getPlayerScore(): number {
        return this.playerScore;
    }

    setPlayerScore(playerScore: number) {
        this.playerScore = playerScore;
    }

    getCollectedBeat(): number {
        return this.collectedBeat;
    }

    setCollectedBeat(collectedBeat: number) {
        this.collectedBeat = collectedBeat;
    }

    getRoundNumber(): number {
        return this.roundNumber;
    }

    setRoundNumber(roundNumber: number) {
        this.roundNumber = roundNumber;
    }
    */
}
