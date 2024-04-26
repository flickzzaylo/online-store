import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCart, removeFromCart } from '../actions/cart';
import './Cart.css';

function Cart({ user, cartItems, getCart, removeFromCart }) {
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = () => {
        console.log('Корзина');
        console.log(groupedCartItems);
        getCart(user.user_id);
    };

    const handleRemoveFromCart = (cartId) => {
        removeFromCart(cartId, user.user_id);
    }

    // Группировка товаров по goods.id
    const groupedCartItems = Object.values(cartItems.reduce((acc, cartItem) => {
        const { goods } = cartItem;
        if (!acc[goods.id]) {
            acc[goods.id] = [];
        }
        acc[goods.id].push(cartItem);
        return acc;
    }, {}));

    // Вычисление общей суммы товаров в корзине
    const totalAmount = cartItems.reduce((total, cartItem) => total + cartItem.goods.price, 0);
    console.log(cartItems)
    return (
        <div className="cart-container">
            <div className="cart-float">
                <h4>Корзина</h4>
                <ol>
                    {Object.keys(groupedCartItems).map((goodsId) => (
                        <li key={goodsId}>
                            <div className="cart-item">
                                <div>
                                    <strong>{groupedCartItems[goodsId][0].goods.name}</strong> &mdash; {groupedCartItems[goodsId][0].goods.price}
                                </div>
                                <ul>
                                    <div>
                                        {groupedCartItems[goodsId].length}
                                        <span className="close-icon ml-1" onClick={() => handleRemoveFromCart(groupedCartItems[goodsId][0].id)}>×</span>
                                    </div>
                                </ul>
                            </div>
                        </li>
                    ))}
                </ol>
                <div className="total-amount">
                    Общая сумма: {totalAmount}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { user } = state.auth;
    const { cartItems } = state.cart;
    return {
        user,
        cartItems
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCart: (cartItems) => dispatch(getCart(cartItems)),
        removeFromCart: (cartId, user_id) => dispatch(removeFromCart(cartId, user_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);