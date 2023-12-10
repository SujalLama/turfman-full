'use client';

import { IShippingCost } from "@/utils/dataFormatter";
import { addToStore, getFromStore } from "@/utils/localStorage";
import { Dispatch, ReactNode, createContext, useReducer } from "react";

export const localStoreCartKey = 'tfpCart';

export type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
      ? {
          type: Key;
        }
      : {
          type: Key;
          payload: M[Key];
        }
  };
  
export enum Types {
    Remove = "REMOVE_FROM_CART",
    Add = "ADD_TO_CART",
    Update= "UPDATE_CART",
}

export type CartType = {
    id: number;
    name?: string;
    img?: {alt: string; src: string;};
    price?: number;
    quantity?: number;
    link?: string;
    shippingCost?: IShippingCost,
}

type InitialStateType = CartType[];

type CartPayload = {
    [Types.Add]: CartType;
    [Types.Remove]: {
      id: number;
    };
    [Types.Update]: CartType;
  };

export type CartActions = ActionMap<CartPayload>[keyof ActionMap<CartPayload>];

const initialCart : InitialStateType = getFromStore(localStoreCartKey) ?? [];

export const CartContext = createContext<{
    state: InitialStateType;
    dispatch: Dispatch<CartActions>;
  }>({state: initialCart, dispatch: () => null});


export const cartReducer = (
    state: CartType[],
    action: CartActions
  ) => {
    switch (action.type) {
      case Types.Add:
        const addedItem = [
          ...state,
          {
              id: action.payload.id,
              name: action.payload.name,
              price: action.payload.price,
              img: action.payload.img,
              quantity: action.payload.quantity,
              link: action.payload.link,
              shippingCost: action.payload.shippingCost
          }
        ]

        addToStore(localStoreCartKey, JSON.stringify(addedItem));

        return addedItem;
      case Types.Remove:
        const updatedCart = [...state.filter(cart => cart.id !== action.payload.id)];

        addToStore(localStoreCartKey, JSON.stringify(updatedCart));

        return updatedCart;
      case Types.Update:
        const newCart = state.map(cart => {
          if(cart.id === action.payload.id) {
                  return {
                      id: action.payload.id,
                      name: action.payload.name ?? cart.name,
                      price: action.payload.price ?? cart.price,
                      img: action.payload.img ?? cart.img,
                      quantity: action.payload.quantity ?? cart.quantity,
                      link: action.payload.link ?? cart.link,
                      shippingCost: action.payload.shippingCost ?? cart.shippingCost,
                  }
              }
                  return cart;
              }
          );

        addToStore(localStoreCartKey, JSON.stringify(newCart));
        return newCart;
      default:
        return state;
    }
  };

export default function CartProvider({children} : {children: ReactNode}) {
    const [state, dispatch] = useReducer(cartReducer, initialCart);
    
    return <CartContext.Provider value={{state, dispatch}}>{children}</CartContext.Provider>
}