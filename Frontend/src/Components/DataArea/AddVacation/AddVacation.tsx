import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import "./AddVacation.css";
import { useEffect, useState } from "react";
import notifyService from "../../../Services/NotifyService";
import userAdminService from "../../../Services/UserAdminService";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import useVerifyAdmin from "../../../Utils/useVerifyAdmin";

function AddVacation(): JSX.Element {

    useVerifyLoggedIn();
    useVerifyAdmin();
    const currentDate = new Date().toISOString().split("T")[0];
    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const [image, setImage] = useState<File>();
    const [preview, setPreview] = useState<string>("");
    // Function redirect to another page:
    const navigate = useNavigate();

    useEffect(() => {

        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }
    }, [image]);



    async function send(vacation: VacationModel) {
        // Check if dates is legal:
        if (new Date(vacation.startDate) > new Date(vacation.endDate)) {
            notifyService.error("Cannot save the date because the endDate is earlier than the startDate.");
            return;

        }
        // Add vacation:
        try {
            // Convert FileList (containing single file) into a File type:
            console.log(vacation);
            vacation.image = (vacation.image as unknown as FileList)[0];
            await userAdminService.addVacation(vacation);
            notifyService.success("Vacation has been successfully added");
            navigate("/vacations");
        }

        catch (err: any) {
            notifyService.error(err);
        }

    }

    return (
        <div className="AddVacation">

            <br></br>

            <form onSubmit={handleSubmit(send)}>

                <h2 className="Add">Add vacation</h2>

                <label>Destination: </label>
                <input type="text" autoComplete="destination"  {...register("destination", VacationModel.destinationValidation)} />
                <span className="Error">{formState.errors.destination?.message}</span>
                <br />

                <label>Description: </label>
                <textarea max="200" min="15" className="textarea" {...register("description", VacationModel.descriptionValidation)} />
                <span className="Error">{formState.errors.description?.message}</span>
                <br />

                <label>Start Date 🛫</label>
                <input type="date" autoComplete="date" min={currentDate} className="date"  {...register("startDate", VacationModel.startDateValidation)} />
                <span className="Error">{formState.errors.startDate?.message}</span>
                <br />

                <label>End Date 🛬 </label>
                <input type="date" autoComplete="date" min={currentDate} className="date"  {...register("endDate", VacationModel.endDateValidation)} />
                <span className="Error">{formState.errors.endDate?.message}</span>
                <br />

                <label>Price: </label>
                <input type="number" autoComplete="price"  {...register("price", VacationModel.priceValidation)} />
                <span className="Error">{formState.errors.price?.message}</span>
                <br />

                <input required type="file" accept="image/*" {...register("image")}
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
                    <img className="image-preview" alt="" src={preview} />
                </p>

                <button>Add vacation</button>

            </form>
        </div>
    );
}

export default AddVacation;
