import express from "express";
import routes from "../routes";
import { postAddComment, postRegisterView, postDeleteComment, postRegisterUpVote, postEditComment } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.deleteComment, postDeleteComment);
apiRouter.post(routes.registerUpVote, postRegisterUpVote);
apiRouter.post(routes.editComment, postEditComment);

export default apiRouter;