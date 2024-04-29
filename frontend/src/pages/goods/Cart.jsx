import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCart, removeFromCart } from '../../actions/cart';
import './Cart.css';
import http from "../../http-common";

function Cart({ user, cartItems, getCart, removeFromCart }) {
    const [wallet, setWallet] = useState([]);
    const [checkPayment,setPayment] = useState([]);
    useEffect(() => {
        fetchCart();
        http
            .get("/wallet/userId="+user.user_id)
            .then(response => {
                setWallet(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    const fetchCart = () => {
        console.log('Корзина');
        getCart(user.user_id);
    };

    const payGoods = () =>{
        if(totalAmount<=wallet) {
            let data = []
            for (let i = 0; i < cartItems.length; i++) {
                data = {
                    goods: cartItems[i].goods.id,
                    user: cartItems[i].user_id
                }
                http.post('purchase/create', data).catch(e => {
                    console.log(e)
                });
            }
            http.post('cart/clear/' + user.user_id).catch(e => {
                console.log(e)
            });
            http.put('wallet/removeamount/' + user.wallet_id, amountToPay).catch(e => {
                console.log(e)
            });
            setPayment(true);
            window.location.reload();
        }else{
            setPayment(false);
        }
    }

    const handleRemoveFromCart = (cartId) => {
        removeFromCart(cartId, user.user_id);
        setPayment(true);
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
    const amountToPay = {
        amount_to_remove: parseInt(totalAmount),
    };
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
                <button className="btn btn-primary" type="submit" onClick={payGoods}>
                    Оплатить
                </button>
                {!checkPayment && <div className="text-danger">Недостаточно средств </div> }
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