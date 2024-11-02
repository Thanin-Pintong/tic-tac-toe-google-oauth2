import { SessionData } from "express-session";
import { Request } from "express"

declare module "express" {
    export interface Request {
        user: any;
        gameId: any;
        userId: any;
    }
}

declare module 'express-serve-static-core' {
    export interface Request {
        user: any;
        gameId: any;
        userId: any;
    }
}

declare module "express-session" {
    export interface SessionData {
        regenerate: any;
        save: any;
        user: any;
        playHistory: any;
        flashErrors: any;
    }
}
