import express, { Request, Response, NextFunction } from "express";
import vacationsService from "../5-services/vacations-service";
import path from "path";
import VacationModel from "../3-models/vacation-model";
import verifyAdmin from "../4-middleware/verify-admin";
import verifyToken from "../4-middleware/verify-token";

const router = express.Router();

// Get all vacations user+admin:
// // GET http://localhost:4000/api/vacations/userId
router.get("/vacations/:userId([0-9]+)",verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId; 
         request.body.userId = userId;
        const vacations = await vacationsService.getAllVacations(userId);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4000/api/vacations/images/imageName
router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {

        // Get image name: 
        const imageName = request.params.imageName;

        // Get image absolute path:
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);

        // Response back the image file:
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4000/api/vacations/edit/vacationId
router.get("/vacations/edit/:vacationId([0-9]+)",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId; // Same name as router parameter
        const product = await vacationsService.getOneVacation(vacationId);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
});


// POST http://localhost:4000/api/vacations
router.post("/vacations",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Take uploaded file, set it to the body:
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await vacationsService.addVacation(vacation)
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT http://localhost:4000/api/vacations/update/vacationId
router.put("/vacations/update/:vacationId([0-9]+)",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacationId = +request.params.vacationId;
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationsService.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});


// DELETE http://localhost:4000/api/vacations/vacationId
router.delete("/vacations/:vacationId([0-9]+)",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId; 
        await vacationsService.deleteVacation(vacationId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
