"use client";

import  secureLocalStorage  from  "react-secure-storage";

export function addToStore(key:string, value: string) {
    secureLocalStorage.setItem(key, value);
}

export function getFromStore(key:string) {
    const data = secureLocalStorage.getItem(key) ?? '[]';

    return JSON.parse(data as string);
}

export function removeFromStore(key: string) {
    secureLocalStorage.removeItem(key);
}