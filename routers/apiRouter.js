import express from "express";
import routes from "../routes";
import { postAddComment, postRegisterView, postDeleteComment, postRegisterUpVote, postEditComment, postVideoFilter } from "../controllers/videoController";
import { postUploadAvatar, postUploadBanner } from "../controllers/userController";
import { uploadAvatar, uploadBanner } from "../middlewares";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.deleteComment, postDeleteComment);
apiRouter.post(routes.registerUpVote, postRegisterUpVote);
apiRouter.post(routes.editComment, postEditComment);
apiRouter.post(routes.videoFilter, postVideoFilter);
apiRouter.post(routes.uploadAvatar, uploadAvatar, postUploadAvatar);
apiRouter.post(routes.uploadBanner, uploadBanner, postUploadBanner);

export default apiRouter;