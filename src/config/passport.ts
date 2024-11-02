import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

passport.serializeUser((user: any, done) => {
    done(null, user);
})
passport.deserializeUser((obj: any, done) => {
    done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: "<>", // Your Credentials here.
    clientSecret: "<>", // Your Credentials here.
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
