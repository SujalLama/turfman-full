import { CartType } from "@/providers/CartProvider";
import { Dispatch, SetStateAction } from "react";

export interface IDeliveryAddress {
    state: string; 
    postcode: string; 
    street: string; 
    city: string;
}

export interface IProduct {
    products: CartType[];
}

export interface IContact {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface IDelivery {
    deliveryDate: Date | null;
    pickupEnabled: boolean;
    pickupDate: Date | null;
    deliveryNotes: string;
}

export interface IPayment {
    paymentMethod: string;
}

export interface IOrderDetails {
    total: number;
    subTotal: number;
    shippingCost: number;
    tax: number;
    discount: number 
}

export interface IError {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    payment: string;
    deliveryAddress: IDeliveryAddress,
    total: number;
    subTotal: number;
    shippingCost: number;
    tax: number;
    discount: number 
    paymentMethod: string;
    deliveryDate: string;
    pickupDate: string;
    deliveryNotes: string;
}

export interface IOrder {
    products: CartType[];
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    deliveryAddress: IDeliveryAddress,
    total: number;
    subTotal: number;
    shippingCost: number;
    tax: number;
    discount: number 
    paymentMethod: string;
    deliveryDate: Date | null;
    pickupEnabled: boolean;
    pickupDate: Date | null;
    deliveryNotes: string;
}


export const initialError : IError = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    payment: '',
    deliveryAddress: {state: '', postcode: '', street: '', city: ''},
    paymentMethod: '',
    deliveryDate: '',
    pickupDate: '',
    deliveryNotes: '',
    total: 0,
    subTotal: 0,
    tax: 0,
    shippingCost: 0,
    discount: 0,
}

export interface ICheckoutButton {
    className?: string; 
    order: IOrder;
    formError: IError;
    setFormError: Dispatch<SetStateAction<IError>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}