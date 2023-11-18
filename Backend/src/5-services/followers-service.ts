import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import FollowersModel from "../3-models/followers-model";
import { ResourceNotFoundError, ValidationError } from "../3-models/error-models";

// Add new follower: 
async function addFollower(follower: FollowersModel): Promise<void> {

    //Validation:
    const error = follower.validate();
    if (error) throw new ValidationError(error);

    // Query:
    const sql = `INSERT INTO followers VALUES(?, ?)`;

    await dal.execute(sql, [follower.userId, follower.vacationId]);

}


// Delete exist follower:
async function removeFollower(vacationId: number): Promise<void> {

    // Query:
    const sql = `DELETE FROM followers WHERE vacationId = ?`;

    // Execute: 
    const info: OkPacket = await dal.execute(sql, [vacationId]);

    // If not exist:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacationId);

}


export default {
    addFollower,
    removeFollower
};