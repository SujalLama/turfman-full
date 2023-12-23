'use client';

import { addToStore, getFromStore, removeFromStore } from "@/utils/localStorage";
import { Dispatch, ReactNode, createContext, useReducer } from "react";
import { ActionMap } from "./CartProvider";

export const localStoreOrderKey = 'tfpOrder';

export enum OrderTypes {
    Remove = "REMOVE_FROM_ORDER",
    Add = "ADD_TO_ORDER",
    Update= "UPDATE_ORDER",
}

export type OrderType = {
    id: number;
    paymentMethod: string;
    token: string;
}

type InitialStateType = OrderType;

type OrderPayload = {
    [OrderTypes.Add]: OrderType;
    [OrderTypes.Remove]: {
      id: number;
    };
    [OrderTypes.Update]: OrderType;
  };

export type OrderActions = ActionMap<OrderPayload>[keyof ActionMap<OrderPayload>];

const initialOrder : InitialStateType = getFromStore(localStoreOrderKey) ?? {id: 0, paymentMethod: '', token: ''};

export const OrderContext = createContext<{
    state: InitialStateType;
    dispatch: Dispatch<OrderActions>;
  }>({state: initialOrder, dispatch: () => null});


export const orderReducer = (
    state: OrderType,
    action: OrderActions
  ) => {
    switch (action.type) {
      case OrderTypes.Add:
        addToStore(localStoreOrderKey, JSON.stringify(action.payload));
        return action.payload;

      case OrderTypes.Remove:
        addToStore(localStoreOrderKey, JSON.stringify(null));
        return initialOrder;
        
      case OrderTypes.Update:
        const newOrder = {
                      id: action.payload.id,
                      paymentMethod: action.payload.paymentMethod ?? state.paymentMethod,
                      token: action.payload.token ?? state.token
                  };

        addToStore(localStoreOrderKey, JSON.stringify(newOrder));
        return newOrder;
      default:
        return state;
    }
  };

export default function OrderProvider({children} : {children: ReactNode}) {
    const [state, dispatch] = useReducer(orderReducer, initialOrder);
    
    return <OrderContext.Provider value={{state, dispatch}}>{children}</OrderContext.Provider>
}