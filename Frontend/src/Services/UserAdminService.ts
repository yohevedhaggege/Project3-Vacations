import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationsAction, VacationsActionType, vacationsStore } from "../Redux/VacationState";
import appConfig from "../Utils/AppConfig";
import { authStore } from "../Redux/AuthState";

class UserAdminService {

    // Get all vacations for admin:
    public async getAllVacations(userId: number): Promise<VacationModel[]> {

        const options = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + authStore.getState().token
            }
        };
        // Take vacations from global store:
        let vacations = vacationsStore.getState().vacations;

        if (vacations.length === 0) {

            // AJAX Request:
            const response = await axios.get<VacationModel[]>(appConfig.vacationUrl + userId, options);

            // Extract vacations: 
            vacations = response.data;

            // Save vacations to global state:
            vacationsStore.dispatch({ type: VacationsActionType.SetVacations, payload: vacations });
        }
        // Return vacations: 
        return vacations;
    }

    public async getOneVacation(vacationId: number): Promise<VacationModel> {

        let vacations = vacationsStore.getState().vacations;
        // Find desired product: 
        let vacation = vacations.find(v => v.vacationId === vacationId);
        if (!vacation) {
            // Get one product into response object:
            const response = await axios.get<VacationModel>(appConfig.vacationUrl + vacationId);
            vacation = response.data;
        }

        return vacation;
    }


    public async addVacation(vacation: VacationModel): Promise<void> {


        const options = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + authStore.getState().token
            }
        };
        // Send vacation to backend: 
        const response = await axios.post(appConfig.vacationUrl, vacation, options);

        // Extract the added vacation sent back from the backend: 
        const addedVacation = response.data;

        // Add added vacation to global state: 
        const action: VacationsAction = { type: VacationsActionType.AddVacation, payload: addedVacation };
        vacationsStore.dispatch(action);
    }

    public async updateVacation(vacation: VacationModel): Promise<void> {

        const options = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + authStore.getState().token
            }
        };

        // Send product to backend: 
        const response = await axios.put<VacationModel>(appConfig.updateVacationUrl + vacation.vacationId, vacation, options);


        // Extract the updated vacation sent back from the backend: 
        const updatedVacation = response.data;

        // Update product in global state: 
        const action: VacationsAction = { type: VacationsActionType.UpdateVacation, payload: updatedVacation };
        vacationsStore.dispatch(action);
    }


    // Delete vacation
    public async deleteVacation(vacationId: number): Promise<void> {

        const options = {
            headers: {
                "Authorization": "Bearer " + authStore.getState().token
            }
        };

        await axios.delete(appConfig.vacationUrl + vacationId, options);
        const action: VacationsAction = { type: VacationsActionType.DeleteVacation, payload: this.deleteVacation };
        vacationsStore.dispatch(action);

    }

}

const userAdminService = new UserAdminService();

export default userAdminService;
