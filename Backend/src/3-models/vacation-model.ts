import Joi from "joi";
import { ValidationError } from "./error-models";
import { UploadedFile } from "express-fileupload";


class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName: string;
    public image: UploadedFile;
    public isFollowing: number;
    public followersCount: number;



    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.image = vacation.image;
        this.imageName = vacation.imageName
    }

    static addValidationSchema = Joi.object({
        vacationId: Joi.number().optional().integer().positive(),
        destination: Joi.string().required().min(2).max(30),
        description: Joi.string().required().min(3).max(1000),
        startDate: Joi.string().required().length(10).message("Date format must be YYYY-MM-DD"),
        endDate: Joi.string().required().length(10).message("Date format must be YYYY-MM-DD"),
        price: Joi.number().required().integer().min(0),
        imageName: Joi.string().optional(),
        image: Joi.object().optional()
    });

    static editValidationSchema = Joi.object({
        vacationId: Joi.number().required().integer().positive(),
        destination: Joi.string().required().min(2).max(30),
        description: Joi.string().required().min(3).max(1000),
        startDate: Joi.string().required().length(10).message("Date format must be YYYY-MM-DD"),
        endDate: Joi.string().required().length(10).message("Date format must be YYYY-MM-DD"),
        price: Joi.number().required().integer().min(0),
        imageName: Joi.string().optional(),
        image: Joi.object().optional()

    });

    public addValidate(): string {
        const result = VacationModel.addValidationSchema.validate(this);
        return result.error?.message;
    }
    public editValidate(): string {
        const result = VacationModel.editValidationSchema.validate(this);
        return result.error?.message;
    }

}

export default VacationModel;


