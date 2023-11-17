import express, { Request, Response, NextFunction } from "express";
import FollowersModel from "../3-models/followers-model";
import followersService from "../5-services/followers-service";
import verifyToken from "../4-middleware/verify-token";

// Create the router part of express:
const router = express.Router();

router.post("/followers",verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {

        const follower = new FollowersModel(request.body);
        console.log("userId", follower.userId);
        console.log("vacationId", follower.vacationId);

        const addedFollower = await followersService.addFollower(follower);
        response.status(201).json(addedFollower);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/followers/:vacationId([0-9]+)",verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        await followersService.removeFollower(vacationId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;