import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    req.flash('error', "passwords don't match");
    res.status(400);
    res.redirect(routes.join);
    return
  }
  try {
    const user = await User({
      name,
      email
    });
    await User.register(user, password);
    next();
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash: "Welcome!",
  failureFlash: "Can't log in. Check email and/or password"
});

export const githubLogin = passport.authenticate("github", {
  successFlash: "Welcome",
  failure: "Can't log in at this time"
});

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, login: name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = (_, __, profile, cb) => {
  return cb();
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
}

export const kakaoLogin = passport.authenticate("kakao", {
  successFlash: "Welcome",
  failure: "Can't log in at this time"
});

export const kakaoLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: {
      id,
      properties: { profile_image: avatarUrl, nickname: name },
      kakao_account: { email }
    }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.kakaoId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = User.create({
      email,
      name,
      kakaoId: id,
      avatarUrl
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postKakaoLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.flash("info", "Logged out, see you later!");
  req.logout();
  res.redirect(routes.home);
};

export const getMe = async (req, res) => {
  const {
    query: { query }
  } = req;
  const user = await User.findById(req.user._id).populate("videos");
  res.render("userDetail", { pageTitle: "User Detail", user, query: query ? query : "home" });
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
    query: { query }
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user, query });
  } catch (error) {
    req.flash("error", "User not foud");
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "Edit Profile" });
};

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email }
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email
    });
    req.flash("success", "Proflie updated");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't update profile");
    res.redirect(`/users${routes.editProfile}`);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      req.flash("error", "Passwords don't match");
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return
    }
    await req.user.changePassword(oldPassword, newPassword);
    req.flash("success", "Updated password");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't change password");
    res.redirect(`/users${routes.changePassword}`);
  }
};

export const postUploadAvatar = async (req, res) => {
  const {
    file,
    user
  } = req;
  try {
    user.avatarUrl = file.path;
    user.save();
    res.json(file.path);
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postUploadBanner = async (req, res) => {
  const {
    file,
    user
  } = req;
  try {
    user.bannerUrl = file.path;
    user.save();
    res.json(file.path);
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
}