"use client";

import { useState } from "react";

export default function Counter({value, onChange, max} : {value: number, onChange : (activeValue: number) => void, max: number}) {
    const [counter, setCounter] = useState(value ?? 0);

    function onIncrement () {
        if(counter == max) {
            return;    
        }

        setCounter(counter + 1);
        onChange(counter + 1);
    }

    function onDecrement () {
        if(counter == 1) {
            return;    
        }

        setCounter(counter - 1);
        onChange(counter - 1);
    }

    return (
        <div className="flex bg-gray-100">
            <button onClick={onDecrement} className="px-3 py-2 hover:bg-gray-200 border-r border-gray-300">-</button>
            <div className="px-3 py-2 ">{counter}</div>
            <button className="px-3 py-2 hover:bg-gray-200 border-l border-gray-300" onClick={onIncrement}>+</button>
        </div>
    )
}