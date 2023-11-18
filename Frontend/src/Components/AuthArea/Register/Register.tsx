import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notifyService.success("You have been successfully registered.");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    function login() {
        navigate("/login");
    }

    return (
        <div className="Register">

            <br></br>

            <form onSubmit={handleSubmit(send)}>

                <h2 className="RegisterMember">Register</h2>

                <label>First name: </label>
                <input type="text" autoComplete=" first name" pattern="^[a-zA-Z]{2,20}$"
                    {...register("firstName", UserModel.firstNameValidation)} />
                <span className="Error">{formState.errors.firstName?.message}</span>


                <label>Last name: </label>
                <input type="text" autoComplete=" last email" pattern="^[a-zA-Z]{2,20}$"
                    {...register("lastName", UserModel.lastNameValidation)} />
                <span className="Error">{formState.errors.lastName?.message}</span>


                <label>Email: </label>
                <input type="email" autoComplete="email"
                    {...register("email", UserModel.emailValidation)} />
                <span className="Error">{formState.errors.email?.message}</span>


                <label>Password: </label>
                <input type="password" pattern="^.{4,}$" autoComplete="password"
                    {...register("password", UserModel.passwordValidation)} />
                <span className="Error">{formState.errors.password?.message}</span>

                <button className="btn btn-primary">Register</button>

                <p className="Member">Already a member?</p>

                <p className="Login" onClick={login}>Login</p>
            </form>

        </div>
    );
}

export default Register;
