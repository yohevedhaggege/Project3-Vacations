import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";
import CredentialsModel from "../../../Models/CredentialsModel";

function Login(): JSX.Element {
    
    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials:CredentialsModel){
        try {
            await authService.login(credentials);
            notifyService.success("Welcome!");
            navigate("/vacations");
        } catch (error:any) {
            notifyService.error("Incorrect email or password");
        }
    }
  
    function registerNow(){
        navigate("/register");

    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(send)}>

            <h2 className="LoginMember">Login</h2>

                <label>Email: </label>
                <input type="email" autoComplete="email" {...register("email",UserModel.emailValidation)} />
                <span className="Error">{formState.errors.email?.message}</span>


                <label>Password: </label>
                <input type="password" autoComplete="password"  {...register("password",UserModel.passwordValidation)} />
                <span className="Error">{formState.errors.password?.message}</span>

                <button className="btn btn-primary">Login</button>

                <p className="member">Don't have account?</p>
                
                <p className="registerNow" onClick={registerNow}>Register now</p>

            </form>

        </div>
    );
}

export default Login;
