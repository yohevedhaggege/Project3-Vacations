import UserModel from "../3-models/user-model";
import jwt from "jsonwebtoken";
import { ForbiddenError, UnauthorizedError } from "../3-models/error-models";
import RoleModel from "../3-models/role-model";

const tokenSecretKey = "The-Amazing-Vacations";

// generate the user a unique token
function createNewToken(user: UserModel): string {

    // Remove password: 
    delete user.password;

    // Create container for the user object: 
    const container = { user };

    // Create options:
    const options = { expiresIn: "3h" };

    // Generate token.
    const token = jwt.sign(container, tokenSecretKey, options);

    return token;
}

// Check if the token exist didn't expired:
function verifyToken(token: string): void {

    //if function dont exist 
    if (!token) throw new UnauthorizedError("Missing JWT token.");

    try {
        jwt.verify(token, tokenSecretKey);
    }
    catch (err: any) {
        throw new UnauthorizedError(err.message)
    }
}

// Verify admin role:
function verifyAdmin(token: string): void {

    // Verify legal token:
    verifyToken(token);

    // Get container: 
    const container = jwt.verify(token, tokenSecretKey) as { user: UserModel };

    // Extract user: 
    const user = container.user;

    // If not admin:
    if (user.roleId !== RoleModel.Admin) throw new ForbiddenError("You are not admin.");
}

export default {
    createNewToken,
    verifyToken,
    verifyAdmin
};
