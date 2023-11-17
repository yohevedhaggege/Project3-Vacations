import RoleModel from "./RoleModel";

class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RoleModel;

    public static firstNameValidation = {
        required: { value: true, message: "Missing first name!" },
        minLength: { value: 3, message: "First Name too short" },
        maxLength: { value: 20, message: "First Name too long" }
    }

    public static lastNameValidation = {
        required: { value: true, message: "Missing last name!" },
        minLength: { value: 3, message: "Last Name too short" },
        maxLength: { value: 20, message: "Last Name too long" }
    }

    public static emailValidation = {
        required: { value: true, message: "Missing email!" },
        minLength: { value: 10, message: "Email too short" },
        maxLength: { value: 40, message: "Email too long" }
    }

    public static passwordValidation = {
        required: { value: true, message: "Missing password!" },
        minLength: { value: 4, message: "Password too short" },
        maxLength: { value: 30, message: "Password too long" }
    }
}
export default UserModel;



