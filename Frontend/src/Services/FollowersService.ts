import axios from "axios";
import FollowerModel from "../Models/FollowModel";
import { FollowersActionType, followersStore } from "../Redux/FollowersState";
import appConfig from "../Utils/AppConfig";
import FollowModel from "../Models/FollowModel";
import { authStore } from "../Redux/AuthState";
import { vacationsStore } from "../Redux/VacationState";
import VacationModel from "../Models/VacationModel";

class FollowersService {

    public async addFollower(vacationId: number): Promise<void> {

        const follow = new FollowModel();
        follow.userId = authStore.getState().user.userId;
        follow.vacationId = vacationId;

        const followedVacation = await this.getOneVacation(vacationId);
        followedVacation.isFollowing = 1;
        followedVacation.followersCount += 1;
        followersStore.dispatch({ type: FollowersActionType.AddFollower, payload: followedVacation });
        await axios.post<void>(appConfig.userFollowURL, follow);
    }


    public async deleteFollower(vacationId: number): Promise<void> {
        let unfollowedVacation = await this.getOneVacation(vacationId);
        unfollowedVacation.isFollowing = 0;
        unfollowedVacation.followersCount += -1;

        followersStore.dispatch({ type: FollowersActionType.DeleteFollower, payload: unfollowedVacation });
        await axios.delete<void>(appConfig.userFollowURL + vacationId);
    }

    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        let vacations = vacationsStore.getState().vacations;
        let vacation = vacations.find(v => v.vacationId === vacationId);
        if (!vacation) {
            const response = await axios.get<VacationModel>(appConfig.vacationUrl + vacationId);
            vacation = response.data;
        }

        return vacation;
    }

}

const followersService = new FollowersService();

export default followersService;