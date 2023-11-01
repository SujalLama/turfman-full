'use client';

import { addToStore, getFromStore, removeFromStore } from "@/utils/localStorage";
import { Dispatch, ReactNode, createContext, useReducer } from "react";
import { ActionMap } from "./CartProvider";

export const localStoreUserKey = 'tfpUser';
  
export enum UserTypes {
    RemoveUser = "REMOVE_USER",
    AddUser = "ADD_USER",
    UpdateUser = "UPDATE_USER",
}

export type UserType = {
    id: number;
    username?: string;
    email?: string;
    token: string;
}

type InitialStateType = UserType | null;

type UserPayload = {
    [UserTypes.AddUser]: UserType;
    [UserTypes.RemoveUser]: undefined;
    [UserTypes.UpdateUser]: UserType;
  };

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

const initialUser : InitialStateType = getFromStore(localStoreUserKey);

export const UserContext = createContext<{
    state: InitialStateType;
    dispatch: Dispatch<UserActions>;
  }>({state: initialUser, dispatch: () => null});


export const userReducer = (
    state: UserType | null,
    action: UserActions
  ) => {
    switch (action.type) {
      case UserTypes.AddUser:
        
        addToStore(localStoreUserKey, JSON.stringify(action.payload));

        return action.payload;
      case UserTypes.RemoveUser:
        removeFromStore(localStoreUserKey);
        return null;
      case UserTypes.UpdateUser:

        if(!state) {
            return null;
        }

        const updatedUser =  {
                      id: action.payload.id,
                      name: action.payload.username ?? state.username,
                      email: action.payload.email ?? state.email,
                      token: action.payload.token ?? state.token,
                  }

        addToStore(localStoreUserKey, JSON.stringify(updatedUser));
        return updatedUser;
      default:
        return state;
    }
  };

export default function AuthProvider({children} : {children: ReactNode}) {
    const [state, dispatch] = useReducer(userReducer, initialUser);
    
    return <UserContext.Provider value={{state, dispatch}}>{children}</UserContext.Provider>
}