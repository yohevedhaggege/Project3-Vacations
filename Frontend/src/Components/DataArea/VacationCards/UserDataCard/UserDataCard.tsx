import { useEffect, useState } from "react";
import VacationModel from "../../../../Models/VacationModel";
import {
    Button, Card, CardActions, CardContent, CardMedia, IconButton, Tooltip, Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CalendarMonth } from "@mui/icons-material";
import followersService from "../../../../Services/FollowersService";
import notifyService from "../../../../Services/NotifyService";
import appConfig from "../../../../Utils/AppConfig";
import { authStore } from "../../../../Redux/AuthState";
import UserModel from "../../../../Models/UserModel";

interface VacationCardProps {
    vacation: VacationModel;
    updateVacations: () => void;
}

function UserDataCard(props: VacationCardProps): JSX.Element {

    function formatPrice(price: number): string {
        return `$${price.toFixed(2)}`;
    }

    const [followers, setFollowers] = useState(props.vacation.followersCount);
    const [isFollowing, setIsFollowing] = useState(props.vacation.isFollowing);
    const { updateVacations } = props;
    const [vacationId, setVacationId] = useState(props.vacation.vacationId);
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setVacationId(props.vacation.vacationId);
        setUser(authStore.getState().user);
    }, [props.vacation.vacationId]);

    // Function that add or delete follower:
    async function isFollow() {
        try {
            const vacationId = props.vacation.vacationId;

            if (isFollowing) {
                setIsFollowing(0);
                setFollowers(followers - 1);
                await followersService.deleteFollower(vacationId);
                notifyService.success("Vacation unfollowed");

                updateVacations();

            } else {
                setIsFollowing(1);
                setFollowers(followers + 1);
                await followersService.addFollower(vacationId);
                notifyService.success("Vacation follow!");

            }

        } catch (err: any) {
            notifyService.error(err);
        }

    }

    return (


        <div className="VacationCard">
            <Card className="card" sx={{ maxWidth: 300, backgroundColor: "#A0F0E8" }}>
                <CardContent style={{ height: "610px" }}>

                    <CardMedia
                        className="background"
                        sx={{ height: 150 }}
                        image={appConfig.vacationsImageUrl + props.vacation.imageName} />

                    <CardActions>
                        {<Tooltip title="Like" style={{ backgroundColor: "beige" }}>
                            <IconButton aria-label="add to favorites" onClick={() => { isFollow() }}>
                                <FavoriteIcon style={{ color: isFollowing ? "red" : "grey" }} />
                                {followers}
                            </IconButton>
                        </Tooltip>}
                    </CardActions>

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.vacation.destination}
                        </Typography>

                        <Typography variant="body2" color="text.primary">
                            {props.vacation.description}
                        </Typography>

                        <br></br>
                        <Typography variant="body2" color="text.secondary">
                            <CalendarMonth fontSize="small" color="primary" />
                            {new Date(props.vacation.startDate).toLocaleDateString("he-IL")} - {new Date(props.vacation.endDate).toLocaleDateString("he-IL")}

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


export default UserDataCard;
