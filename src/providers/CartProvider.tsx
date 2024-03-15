import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from 'expo-crypto'

type CartType = {
    items: CartItem[];
    addItem: (product: Product, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { }
});

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product, size: CartItem['size']) => {
        const existingItem = items.find(item => item.product === product && item.size === size);

        if (existingItem) {
            return updateQuantity(existingItem.id, 1);
        }

        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1
        }

        setItems([newCartItem, ...items]);
    }

    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        setItems(items.map(item =>
            item.id !== itemId
                ? item
                : { ...item, quantity: item.quantity + amount }).filter((item) => item.quantity > 0)
        )
    }


    return (
        <CartContext.Provider value={{ items, addItem, updateQuantity }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

export const useCart = () => useContext(CartContext);