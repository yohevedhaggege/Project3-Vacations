class AppConfig {
    
    public readonly registerUrl = "http://localhost:4000/api/register/";
    public readonly loginUrl = "http://localhost:4000/api/login/"
    public readonly vacationUrl = "http://localhost:4000/api/vacations/";
    public readonly userFollowURL = "http://localhost:4000/api/followers/";
    public readonly userUnfollowURL = "http://localhost:4000/api/unfollow/"
    public readonly usersUrl = "http://localhost:4000/api/users/";
    public readonly updateVacationUrl = "http://localhost:4000/api/vacations/update/";
    public readonly vacationsImageUrl = "http://localhost:4000/api/vacations/images/";


}

const appConfig = new AppConfig();

export default appConfig;
