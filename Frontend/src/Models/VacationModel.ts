class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName: string;
    public image: File;
    public isFollowing: number;
    public followersCount: number;

    public static destinationValidation = {
        required: { value: true, message: "Missing destination!" },
        minLength: { value: 3, message: "Destination too short" },
        maxLength: { value: 70, message: "Destination too long" }
    }

    public static descriptionValidation = {
        required: { value: true, message: "Missing description!" },
        minLength: { value: 10, message: "Description too short" },
        maxLength: { value: 1500, message: "Description too long" }
    }

    public static startDateValidation = {
        required: { value: true, message: "Missing start date!" },
    }

    public static endDateValidation = {
        required: { value: true, message: "Missing end date!" },
    }

    public static priceValidation = {
        required: { value: true, message: "Missing price!" },
        min: { value: 0, message: "Price can't be negative" },
        max: { value: 10000, message: "Price can't over 10000$" }

    }


}
export default VacationModel;


