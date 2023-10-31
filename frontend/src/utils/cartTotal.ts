import { CartType } from "@/providers/CartProvider";


export function getCartTotal(carts: CartType[]) {
    if(carts.length === 0) return 0;

    const total = carts.map((cartItem) => {
        if(cartItem.price && cartItem.quantity) {
            return cartItem?.price * cartItem?.quantity
        }

        return 0;
    }).reduce((acc, cur) => acc + cur, 0);

    return total;
}