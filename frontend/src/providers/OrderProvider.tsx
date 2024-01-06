'use client';

import { Dispatch, ReactNode, createContext, useReducer } from "react";
import { ActionMap, CartType } from "./CartProvider";

export const localStoreOrderKey = 'tfpOrder';

export enum OrderTypes {
    Add = "ADD_TO_ORDER",
    Update= "UPDATE_ORDER",
}

export type OrderType = {
    products?: CartType[];
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    state?: string; 
    postcode?: string; 
    street?: string; 
    city?: string;
    billState?: string; 
    billPostcode?: string; 
    billStreet?: string; 
    billCity?: string;
    deliveryDate?: string | null,
    deliveryNotes?: string,
    paymentMethod?: string;
    total?: number;
    subTotal?: number;
    tax?: number;
    shippingCost?: number;
    discount?: number;
    pickupEnabled ?: boolean,
    pickupDate?: string | null,
    shippingType?: string;
}

type InitialStateType = OrderType;

type OrderPayload = {
    [OrderTypes.Add]: OrderType;
    [OrderTypes.Update]: OrderType;
  };

export type OrderActions = ActionMap<OrderPayload>[keyof ActionMap<OrderPayload>];

const initialOrder : InitialStateType = {
    products: [],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    state: '', 
    postcode: '', 
    street: '', 
    city: '', 
    billState: '', 
    billPostcode: '', 
    billStreet: '', 
    billCity: '', 
    deliveryDate: null,
    deliveryNotes: '',
    paymentMethod: 'bankTransfer',
    total: 0,
    subTotal: 0,
    tax: 0,
    shippingCost: 0,
    discount: 0,
    pickupEnabled : false,
    pickupDate: null,
    shippingType: '',
};

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
        // addToStore(localStoreOrderKey, JSON.stringify(action.payload));
        return action.payload;
        
      case OrderTypes.Update:
        const newOrder = {
          products: action.payload.products ?? state.products,
          firstName: action.payload.firstName ?? state.firstName,
          lastName: action.payload.lastName ?? state.lastName,
          email: action.payload.email ?? state.email,
          phone: action.payload.phone ?? state.phone,
          postcode: action.payload.postcode ?? state.postcode, 
          state: action.payload.state ?? state.state, 
          street: action.payload.street ?? state.street, 
          city: action.payload.city ?? state.city, 
          billPostcode: action.payload.billPostcode ?? state.billPostcode, 
          billState: action.payload.billState ?? state.billState, 
          billStreet: action.payload.billStreet ?? state.billStreet, 
          billCity: action.payload.billCity ?? state.billCity, 
          deliveryDate: action.payload.deliveryDate ?? state.deliveryDate,
          deliveryNotes: action.payload.deliveryNotes ?? state.deliveryNotes,
          paymentMethod: action.payload.paymentMethod ?? state.paymentMethod,
          total: action.payload.total ?? state.total,
          subTotal: action.payload.subTotal ?? state.subTotal,
          tax: action.payload.tax ?? state.tax,
          shippingCost: action.payload.shippingCost ?? state.shippingCost,
          discount: action.payload.discount ?? state.discount,
          pickupEnabled : action.payload.pickupEnabled ?? state.pickupEnabled,
          pickupDate: action.payload.pickupDate ?? state.pickupDate,
          shippingType: action.payload.shippingType ?? state.shippingType,
        };

        // addToStore(localStoreOrderKey, JSON.stringify(newOrder));
        return newOrder;
      default:
        return state;
    }
  };

export default function OrderProvider({children} : {children: ReactNode}) {
    const [state, dispatch] = useReducer(orderReducer, initialOrder);
    
    return <OrderContext.Provider value={{state, dispatch}}>{children}</OrderContext.Provider>
}