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
    name?: string;
    email?: string;
}

type InitialStateType = UserType | null;

type UserPayload = {
    [UserTypes.AddUser]: UserType;
    [UserTypes.RemoveUser]: undefined;
    [UserTypes.UpdateUser]: UserType;
  };

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

const initialUser : InitialStateType = getFromStore(localStoreUserKey) ?? null;

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

        addToStore(localStoreUserKey, JSON.stringify(state));

        return state;
      case UserTypes.RemoveUser:
        removeFromStore(localStoreUserKey);
        return null;
      case UserTypes.UpdateUser:

        if(!state) {
            return null;
        }

        const updatedUser =  {
                      id: action.payload.id,
                      name: action.payload.name ?? state.name,
                      email: action.payload.email ?? state.email,
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