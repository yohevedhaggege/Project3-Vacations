import { useEffect, useState } from "react";
import VacationModel from "../../../../Models/VacationModel";
import { NavLink, useNavigate } from "react-router-dom";
import userAdminService from "../../../../Services/UserAdminService";
import notifyService from "../../../../Services/NotifyService";
import { vacationsStore } from "../../../../Redux/VacationState";
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Tooltip, Typography } from "@mui/material";
import appConfig from "../../../../Utils/AppConfig";
import { CalendarMonth } from "@mui/icons-material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { authStore } from "../../../../Redux/AuthState";
import UserModel from "../../../../Models/UserModel";

interface VacationCardProps {
    vacation: VacationModel;
}

function AdminDataCard(props: VacationCardProps): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();
    // Function redirect to another page:
    const navigate = useNavigate();


    function formatTime(time: string): string {
        const d = new Date(time);
        return d.toLocaleDateString(("he-IL"));
    }

    useEffect(() => {
        setUser(authStore.getState().user);
    }, [props.vacation.vacationId]);


    // Delete vacation:
    async function deleteVacation(vacationId: number) {
        try {
            const ok = window.confirm("Are you sure?");
            if (!ok) return;
            await userAdminService.deleteVacation(vacationId);
            notifyService.success("Vacation deleted successfully");
            navigate("/vacations");
            window.location.reload();

        }
        catch (err: any) {
            notifyService.error(err);
        }
    }



    function formatPrice(price: number): string {
        return `$${price.toFixed(2)}`;
    }

    // useEffect performing once 
    useEffect(() => {
        // Listen to any change in the vacations global state:
        const unsubscribe = vacationsStore.subscribe(() => {
            let duplicateVacations = [...vacations];
            setVacations(duplicateVacations);

            return () => unsubscribe();
        });

    }, []);


    return (

        <div className="Container">
            <Card className="card" sx={{ maxWidth: 300, backgroundColor: '#A0F0E8', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent style={{ height: '610px' }}>

                    <CardActions>
                        {<Tooltip title="Delete" style={{ backgroundColor: 'beige' }}>
                            <IconButton aria-label="Delete" onClick={() => deleteVacation(props.vacation.vacationId)}>

                                <DeleteForeverIcon />
                            </IconButton>
                        </Tooltip>}


                        {<Tooltip title="Update" style={{ backgroundColor: 'beige' }}>
                            <IconButton aria-label="Update vacation" component={NavLink}
                                to={"/vacations/update/" + props.vacation.vacationId}   >
                                <EditNoteIcon />
                            </IconButton>
                        </Tooltip>}
                    </CardActions>

                    <CardMedia
                        className="background"
                        sx={{ height: 150 }}
                        image={appConfig.vacationsImageUrl + props.vacation.imageName}
                        title={props.vacation.destination} />

                    <CardContent className="description">
                        <Typography gutterBottom variant="h5" component="div">
                            {props.vacation.destination}
                        </Typography>

                        <Typography variant="body2" color="text.primary">
                            {props.vacation.description}
                        </Typography>

                        <br></br>
                        <Typography variant="body2" color="text.secondary">
                            <CalendarMonth fontSize="small" color="primary" />
                            {formatTime(props.vacation.startDate)} <span> - </span> {formatTime(props.vacation.endDate)}
                        </Typography>
                    </CardContent>


                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                        <Button size="small" variant="contained" fullWidth>
                            {formatPrice(+props.vacation.price)}
                        </Button>
                    </div>
                </CardContent>

            </Card>
        </div>

    );
}

export default AdminDataCard;
