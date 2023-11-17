import express from "express";
import cors from "cors";
import routeNotFound from "./4-middleware/route-not-found";
import catchAll from "./4-middleware/catch-all";
import appConfig from "./2-utils/app-config";
import authController from "./6-controllers/auth-controller";
import userController from "./6-controllers/user-controller";
import followersController from "./6-controllers/followers-controller";
import expressFileUpload from "express-fileupload";



const server = express();

// Enable cors:
server.use(cors()); // Enable cors for any frontend.

// Support request.body as JSON:
server.use(express.json());

// Support file upload - set files into request.files:
server.use(expressFileUpload());

server.use("/api", authController);
server.use("/api", followersController);
server.use("/api", userController);


server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
