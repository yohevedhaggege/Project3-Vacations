
import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// Global State for all vacations

// 1. Global State - the global data:
export class VacationsState {
    public vacations: VacationModel[] = [];
}

// 2. Action Type - a list of operations we can perform on the data:
export enum VacationsActionType {
    SetVacations = "SetVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
    ClearAll = "ClearAll"

}

// 3. Action - A single object which dispatch sends to Redux for some change:
export interface VacationsAction {
    type: VacationsActionType;
    payload: any;
}

// 4. Reducer - a function which will be invoked when calling dispatch to perform the operation
export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    const newState = { ...currentState };

    switch (action.type) {

        case VacationsActionType.SetVacations: // Here the payload is a list of vacations (VacationModel[])
            newState.vacations = action.payload;
            break;

        case VacationsActionType.AddVacation: // Here the payload is a vacation to add (VacationModel[])
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.UpdateVacation: // Here the payload is a vacation to update (VacationModel)
            const indexToUpdate = newState.vacations.findIndex(p => p.vacationId === action.payload.id);
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;
            }
            break;


        case VacationsActionType.DeleteVacation: // Here the payload is the id of the vacation to delete (number)
            const indexToDelete = newState.vacations.findIndex(p => p.vacationId === action.payload);
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1);
            }
            break;

        case VacationsActionType.ClearAll:
            newState.vacations = [];
            break;
    }

    return newState;
}

// 5. Store - manager object from Redux library which handles the entire operation:
export const vacationsStore = createStore(vacationsReducer); // Production
