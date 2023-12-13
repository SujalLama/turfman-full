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
    phone?: string;
    address?: string;
    postalCode?: string;
    state?: string;
    city?: string;
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
                      username: action.payload.username ?? state.username,
                      email: action.payload.email ?? state.email,
                      token: action.payload.token ?? state.token,
                      phone: action.payload.phone ?? state.phone,
                      address: action.payload.address ?? state.address,
                      postalCode: action.payload.postalCode ?? state.postalCode,
                      state: action.payload.state ?? state.state,
                      city: action.payload.city ?? state.city,
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