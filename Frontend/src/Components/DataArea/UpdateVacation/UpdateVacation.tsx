import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import "./UpdateVacation.css";
import notifyService from "../../../Services/NotifyService";
import userAdminService from "../../../Services/UserAdminService";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import appConfig from "../../../Utils/AppConfig";
import useVerifyAdmin from "../../../Utils/useVerifyAdmin";


function UpdateVacation(): JSX.Element {

    useVerifyLoggedIn();
    useVerifyAdmin();
    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const [image, setImage] = useState<File>();
    const [preview, setPreview] = useState<string>("");
    const navigate = useNavigate();
    const params = useParams();
    const vacationId = +params.vacationId;

    function cancel() {
        navigate("/vacations");
    }

    useEffect(() => {

        const vacationId = +params.vacationId;
        userAdminService.getOneVacation(vacationId)

            .then(vacation => {
                setValue("vacationId", vacation.vacationId);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                const startDate = new Date(vacation.startDate);
                const adjustedStartDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000);
                setValue("startDate", adjustedStartDate.toISOString().split('T')[0]);
                const endDate = new Date(vacation.endDate);
                const adjustedEndDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000);
                setValue("endDate", adjustedEndDate.toISOString().split('T')[0]);
                setValue("price", vacation.price);
                setValue("imageName", vacation.imageName);

                if (image) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setPreview(reader.result as string);
                    };
                    reader.readAsDataURL(image);
                } else {
                    setPreview(appConfig.vacationsImageUrl + vacation.imageName);
                }
            })
            .catch(err => notifyService.error(err));

    }, [image]);


    async function send(vacation: VacationModel) {

        const startDateTest = new Date(vacation.startDate);
        const endDateTest = new Date(vacation.endDate);


        if (startDateTest.getTime() > endDateTest.getTime()) {
            notifyService.error("Cannot save the date because the endDate is earlier than the startDate.");
            return;

        }

        try {
            vacation.vacationId = vacationId;
            vacation.image = (vacation.image as unknown as FileList)[0];
            await userAdminService.updateVacation(vacation);
            notifyService.success("Vacation has been successfully updated");

            // Function redirect to another page:
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }

    }

    return (
        <div className="UpdateVacation">

            <br></br>

            <form onSubmit={handleSubmit(send)}>

                <h2>Update vacation</h2>

                <label>Destination: </label>
                <input type="text" autoComplete="destination"  {...register("destination", VacationModel.destinationValidation)} />
                <span className="Error">{formState.errors.destination?.message}</span>
                <br />


                <label>Description: </label>
                <textarea max="200" min="15" className="textarea" {...register("description", VacationModel.descriptionValidation)} />
                <span className="Error">{formState.errors.description?.message}</span>
                <br />

                <label>Start Date 🛫 </label>
                <input type="date" autoComplete="date" className="date"  {...register("startDate", VacationModel.startDateValidation)} />
                <span className="Error">{formState.errors.startDate?.message}</span>
                <br />

                <label>End Date 🛬 </label>
                <input type="date" autoComplete="date" className="date"  {...register("endDate", VacationModel.endDateValidation)} />
                <span className="Error">{formState.errors.endDate?.message}</span>
                <br />

                <label>Price: </label>
                <input type="number" autoComplete="price" step="0.01"   {...register("price", VacationModel.priceValidation)} />
                <span className="Error">{formState.errors.price?.message}</span>
                <br />

                <input
                    type="file" accept="image/*" {...register("image")}
                    onChange={(event) => {
                        const file = event.target.files[0];

                        if (file && file.type.substring(0, 5) === "image") {
                            setImage(file);
                        } else {
                            setImage(null);
                        }
                    }}
                />
                <p>
                    <img className="image-preview" alt="update" src={preview} />
                </p>

                <button>Update</button>
                <button onClick={cancel}>Cancel</button>



            </form>
        </div>
    );
}

export default UpdateVacation;

