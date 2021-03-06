import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";
import getVideoDuration from "get-video-duration";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).populate("creator").sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({ title: { $regex: searchingBy, $options: "i" } }).populate("creator");
    users = await User.find({ name: { $regex: searchingBy, $options: "i" } })
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id).populate("creator").populate("comments");
    let comments = [];
    for (const comment of video.comments) {
      const findedComment = await Comment.findById(comment.id).populate("creator");
      comments.push(findedComment);
    }
    res.render("videoDetail", {
      pageTitle: video.title, video, comments: comments.sort((a, b) => {
        if (a.creator.id === String(req.user._id)) {
          return -1;
        }
        if (a.createdAt > b.createdAt && b.creator.id !== String(req.user._id)) {
          return -1;
        } else if (a.createdAt < b.createdAt) {
          return 1;
        } else {
          return 0;
        }
      })
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator != String(req.user._id)) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, {
      title,
      description
    });
    res.redirect(routes.home);
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator != String(req.user._id)) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
}

// Register Video View

export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;
  try {
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });
    const video = await Video.findById(id);
    const commentObj = await Comment.findById(newComment.id).populate("creator");
    video.comments.push(newComment.id);
    user.comments.push(newComment.id);
    video.save();
    user.save();
    res.json(commentObj);
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postDeleteComment = async (req, res) => {
  const {
    body: { commentId },
    params: { id },
    user
  } = req;
  try {
    await Comment.findByIdAndRemove(commentId);
    const video = await Video.findById(id);
    video.comments.splice(id, 1);
    user.comments.splice(id, 1);
    video.save();
    user.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
}

export const postRegisterUpVote = async (req, res) => {
  const {
    body: { commentId, direction },
    user
  } = req;
  try {
    const comment = await Comment.findById(commentId);
    if (direction) {
      comment.upVote += 1;
      user.upVotes.push(comment.id);
    } else {
      comment.upVote -= 1;
      user.upVotes.splice(comment.id, 1);
    }
    comment.save();
    user.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
}

export const postEditComment = async (req, res) => {
  const {
    body: { commentId, newComment }
  } = req;
  try {
    const comment = await Comment.findById(commentId);
    comment.text = newComment;
    comment.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postVideoFilter = async (req, res) => {
  const {
    body: { type, value, term }
  } = req;
  try {
    let videos = [];
    if (type === "uploadDate") {
      videos = await Video.find({ title: { $regex: term, $options: "i" }, createdAt: { $gte: value } }).populate("creator");
    } else if (type === "duration") {
      const foundVideos = await Video.find({ title: { $regex: term, $options: "i" } }).populate("creator");
      for (const video of foundVideos) {
        const duration = await getVideoDuration(video.fileUrl)
        if (duration <= value && value === 240) {
          videos.push(video);
        } else if (duration >= value && value === 1200) {
          videos.push(video);
        }
      }
    } else if (type === "sortBy") {
      videos = await Video.find({ title: { $regex: term, $options: "i" } }).populate("creator");
      if (value === "uploadDate") {
        videos.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return 1;
          } else if (a.createdAt > b.createdAt) {
            return -1;
          } else {
            return 0;
          }
        });
      } else if (value === "viewCount") {
        videos.sort((a, b) => {
          if (a.views < b.views) {
            return 1;
          } else if (a.views > b.views) {
            return -1;
          } else {
            return 0;
          }
        });
      } else if (value === "rating") {
        videos.sort((a, b) => {
          if (a.rating < b.rating) {
            return 1;
          } else if (a.rating > b.rating) {
            return -1;
          } else {
            return 0;
          }
        });
      }
    }
    res.json(videos);
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
}