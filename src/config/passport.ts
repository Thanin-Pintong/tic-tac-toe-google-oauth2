import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

passport.serializeUser((user: any, done) => {
    done(null, user);
})
passport.deserializeUser((obj: any, done) => {
    done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: "516561495037-5obnrk82v2jg5ke425o3giuv0ef3ma36.apps.googleusercontent.com", // Your Credentials here.
    clientSecret: "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", // Your Secret here.
    callbackURL: "http://localhost:4000/auth/callback",
    passReqToCallback: true
},
    function (request: any, accessToken: any, refreshToken: any, profile: any, done: any) {
        //console.dir(profile);
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));

export default passport;
