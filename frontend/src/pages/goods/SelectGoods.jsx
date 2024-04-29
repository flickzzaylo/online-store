import React from 'react';
import Cart from './Cart';
import ListGoods from "./ListGoods";

function SelectGoods() {
    return (
        <div>
            <ListGoods />
            <Cart />
        </div>
    );
}

export default SelectGoods;