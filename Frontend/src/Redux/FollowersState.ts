// Global State for all followers

import { createStore } from "redux";
import FollowModel from "../Models/FollowModel";

// 1. Global State - global data 
export class FollowersState {
    public followers: FollowModel[] = [];
}

// 2. Action Type - a list of operations we can perform on the data:
export enum FollowersActionType {
    AddFollower = "AddFollower",
    DeleteFollower = "DeleteFollower"
}

// 3. Action - A single object which dispatch sends to Redux for some change:
export interface FollowersAction {
    type: FollowersActionType;
    payload: any;
}

// 4. Reducer - a function which will be invoked when calling dispatch to perform the operation:
export function followersReducer(currentState = new FollowersState(), action: FollowersAction): FollowersState {

    const newState = { ...currentState };
    switch (action.type) {
        case FollowersActionType.AddFollower: // Here the payload is a follower to add (FollowModel)
            newState.followers.push(action.payload);
            break;
        case FollowersActionType.DeleteFollower: // Here the payload is a follower to delete (FollowModel)
            const indexToDelete = newState.followers.findIndex(f => f.vacationId === action.payload);
            if (indexToDelete >= 0) {
                newState.followers.splice(indexToDelete, 1);
            }
            break;
    }

    return newState;
}
// 5. Store - manager object from Redux library which handles the entire operations
export const followersStore = createStore(followersReducer);
