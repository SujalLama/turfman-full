import { CartType } from "@/providers/CartProvider";
import { Dispatch, SetStateAction } from "react";

export interface IDeliveryAddress {
    state: string; 
    postcode: string; 
    street: string; 
    city: string;
    deliveryNotes: string;
    deliveryDate: string | null;
}

export interface IBillingAddress {
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

export interface IShipping {
    pickupEnabled: boolean;
    pickupDate: string | null;
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
    billingAddress: IBillingAddress,
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
    billingAddress: IBillingAddress,
    total: number;
    subTotal: number;
    shippingCost: number;
    tax: number;
    discount: number 
    paymentMethod: string;
    deliveryDate: string | null;
    pickupEnabled: boolean;
    pickupDate: string | null;
    deliveryNotes: string;
}


export const initialError : IError = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    payment: '',
    deliveryAddress: {state: '', postcode: '', street: '', city: '', deliveryDate: null, deliveryNotes: ''},
    billingAddress: {state: '', postcode: '', street: '', city: ''},
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
    formError: IError;
    setFormError: Dispatch<SetStateAction<IError>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}