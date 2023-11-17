class AppConfig {

    // Server Port:
    public port = 4000;

    // Database Host (on which computer the database exists):
    public mySqlHost = "localhost";

    // Database User
    public mySqlUser = "root";

    // Database Password: 
    public mySqlPassword = "";

    // Database Name: 
    public mySqlDatabase = "project3-vacations";

    public readonly domainName = "http://localhost:" + this.port;

    public usersImagesAddress = `http://localhost:${this.port}/api/vacations/images/`;

}

const appConfig = new AppConfig();

export default appConfig;
