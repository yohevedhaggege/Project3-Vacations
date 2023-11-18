import dal from "../2-utils/dal";
import { OkPacket } from "mysql";
import VacationModel from "../3-models/vacation-model";
import appConfig from "../2-utils/app-config";
import { ResourceNotFoundError, ValidationError } from "../3-models/error-models";
import imageHelper from "../2-utils/image-helper";

// Get all vacations 
async function getAllVacations(userId: number): Promise<VacationModel[]> {

    //create sql
    const sql = `
            SELECT DISTINCT
            V.*,
            EXISTS(SELECT * FROM followers  WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
            COUNT(F.userId) AS followersCount,
            CONCAT('${appConfig.usersImagesAddress}', imageName) AS imageUrl 
            FROM vacations as V LEFT JOIN followers as F
            ON V.vacationId = F.vacationId
            GROUP BY vacationId
            ORDER BY startDate`;

    const vacations = await dal.execute(sql, [userId]);

    // Return all vacations:
    return vacations;
}

async function getOneVacation(vacationId: number): Promise<VacationModel> {

    //create sql
    const sql = `SELECT * from vacations WHERE vacationId = ?`;

    // Get vacations from database containing one vacation: 
    const vacations = await dal.execute(sql, [vacationId]);

    // Extract the single product: 
    const vacation = vacations[0];
    if (!vacation) throw new ResourceNotFoundError(vacationId);
    return vacation;
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    //Validation:
    const error = vacation.addValidate();
    if (error) throw new ValidationError(error);
    const imageName = await imageHelper.saveImage(vacation.image);

    const sql = `INSERT INTO vacations (destination, description, startDate,endDate,price,imageName)
    VALUES('${vacation.destination}','${vacation.description}','${vacation.startDate}','${vacation.endDate}','${vacation.price}','${imageName}')`;
    const info: OkPacket = await dal.execute(sql);

    vacation.vacationId = info.insertId;

    //Get image url:
    vacation.imageName = `${appConfig.domainName}/api/vacations/images/${imageName}`;

    //Remove image from product object because we don't response it back:
    delete vacation.image;

    //Return added product:
    return vacation;
}

// Get image name: 
async function getOldImage(vacationId: number): Promise<string> {

    // Create sql: 
    const sql = `SELECT imageName FROM vacations WHERE vacationId = ${vacationId}`;

    // Get vacations from database containing imageName: 
    const vacations = await dal.execute(sql);
    const vacation = vacations[0];
    if (!vacation) return null;
    const imageName = vacation.imageName;
    return imageName;
}


async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    // Validate:
    vacation.editValidate();
    let sql = "", imageName = "";
    const oldImage = await getOldImage(vacation.vacationId);

    // Update existing image:
    if (vacation.image) {
        imageName = await imageHelper.updateImage(vacation.image, oldImage)

        // SQL QUERY:
        sql = `UPDATE vacations SET
        destination = '${vacation.destination}',
        description = '${vacation.description}',
        startDate = '${vacation.startDate}',
        endDate = '${vacation.endDate}',
        price = '${vacation.price}',
        imageName = '${imageName}'
        WHERE vacationId = '${vacation.vacationId}'`;
    }

    else {
        imageName = vacation.imageName;
        sql = `UPDATE vacations SET
        destination = '${vacation.destination}',
        description = '${vacation.description}',
        startDate = '${vacation.startDate}',
        endDate = '${vacation.endDate}',
        price = '${vacation.price}',
        imageName = '${imageName}'
        WHERE vacationId = '${vacation.vacationId}'`;
    }

    // Execute query: 
    const result: OkPacket = await dal.execute(sql);

    // If vacation not exist:
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    vacation.imageName = `${appConfig.domainName}/api/vacations/images/${imageName}`;

    // Delete image property (which is the sent file object) from vacation object:
    delete vacation.image;

    // Return updated vacation:
    return vacation;
}

// Delete exist vacation:
async function deleteVacation(vacationId: number): Promise<void> {

    // Query:
    const sql = `DELETE FROM vacations WHERE vacationId = ?`;

    // Execute: 
    const info: OkPacket = await dal.execute(sql, [vacationId]);

    // If not exist:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacationId);

}

export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation,
};


