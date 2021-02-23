import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import { facebookLoginCallback, githubLoginCallback, kakaoLoginCallback } from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `https://quiet-waters-36996.herokuapp.com${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://quiet-waters-36996.herokuapp.com${routes.facebookCallback}`
    },
    facebookLoginCallback
  )
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      clientSecret: process.env.KAKAO_SECRET,
      callbackURL: `https://quiet-waters-36996.herokuapp.com${routes.kakaoCallback}`
    },
    kakaoLoginCallback
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});