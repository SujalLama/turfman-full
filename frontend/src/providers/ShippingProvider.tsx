'use client';

import { addToStore, getFromStore } from "@/utils/localStorage";
import { Dispatch, ReactNode, createContext, useReducer } from "react";
import { ActionMap } from "./CartProvider";

export const localStoreShippingKey = 'tfpShipping';

  
export enum ShippingTypes {
    Remove = "REMOVE_FROM_SHIPPING",
    Add = "ADD_TO_SHIPPING",
    Update= "UPDATE_SHIPPING",
}

export type ShippingType = {
    id: number;
    type: string;
    onlyLocally: boolean
    localRate: number | null,
    outsideRate: number | null,
}

type InitialStateType = ShippingType[];

type ShippingPayload = {
    [ShippingTypes.Add]: ShippingType;
    [ShippingTypes.Remove]: {
      id: number;
    };
    [ShippingTypes.Update]: ShippingType;
  };

export type ShippingActions = ActionMap<ShippingPayload>[keyof ActionMap<ShippingPayload>];

const initialShipping : InitialStateType = getFromStore(localStoreShippingKey) ?? [];

export const ShippingContext = createContext<{
    state: InitialStateType;
    dispatch: Dispatch<ShippingActions>;
  }>({state: initialShipping, dispatch: () => null});


export const shippingReducer = (
    state: ShippingType[],
    action: ShippingActions
  ) => {
    switch (action.type) {
      case ShippingTypes.Add:
        const addedItem = [
          ...state,
          {
              id: action.payload.id,
              type: action.payload.type,
              onlyLocally: action.payload.onlyLocally,
              localRate: action.payload.localRate,
              outsideRate: action.payload.outsideRate,
          }
        ]

        addToStore(localStoreShippingKey, JSON.stringify(addedItem));

        return addedItem;
      case ShippingTypes.Remove:
        const updatedShipping = [...state.filter(shipping => shipping.id !== action.payload.id)];

        addToStore(localStoreShippingKey, JSON.stringify(updatedShipping));

        return updatedShipping;
      case ShippingTypes.Update:
        const newShipping = state.map(shippingItem => {
          if(shippingItem.id === action.payload.id) {
                  return {
                    id: action.payload.id,
                    type: action.payload.type ?? shippingItem.type,
                    onlyLocally: action.payload.onlyLocally ?? shippingItem.onlyLocally,
                    localRate: action.payload.localRate ?? shippingItem.localRate,
                    outsideRate: action.payload.outsideRate ?? shippingItem.outsideRate,
                  }
              }
                  return shippingItem;
              }
          );

        addToStore(localStoreShippingKey, JSON.stringify(newShipping));
        return newShipping;
      default:
        return state;
    }
  };

export default function ShippingProvider({children} : {children: ReactNode}) {
    const [state, dispatch] = useReducer(shippingReducer, initialShipping);
    
    const value = {
      state,
      dispatch
    }
    
    return <ShippingContext.Provider value={value}>{children}</ShippingContext.Provider>
}