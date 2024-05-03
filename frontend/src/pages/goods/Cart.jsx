import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { getCart, removeFromCart } from '../../actions/cart';
import './Cart.css';
import http from "../../http-common";

function Cart({ user, cartItems, getCart, removeFromCart }) {
    const [wallet, setWallet] = useState([]);
    const [checkPayment,setPayment] = useState([]);
    const [checkSale,setCheckSale] = useState(undefined);
    const [sales, setSales] = useState([]);
    const [inputedSale, setInputedSale] = useState("");
    const [saleAmount,setSaleAmount] = useState(0);

    // const[groupedCartItems, setTotalItems] = useState([]);
    const [totalAmount,setTotalAmount] = useState(0);
    useEffect(() => {
        // fetchCart();
        // http
        //     .get("/wallet/userId="+user.user_id)
        //     .then(response => {
        //         setWallet(response.data);
        //     })
        //     .catch(e => {
        //         console.log(e);
        //     });
        // http
        //     .get('sales/active')
        //     .then(response=>{
        //         setSales(response.data);
        //     })
        //     .catch(e=>{
        //         console.log(e);
        //     });
        if(!checkSale) {
            setTotalAmount(cartItems.reduce((total, cartItem) => total + cartItem.goods.price, 0));
        }
    }, [cartItems]);

    useEffect(()=>{
      fetchCart();
      http
            .get("/wallet/userId="+user.user_id)
            .then(response => {
                setWallet(response.data);
            })
            .catch(e => {
                console.log(e);
            });
      http
            .get('sales/active')
            .then(response=>{
                setSales(response.data);
            })
            .catch(e=>{
                console.log(e);
            });
    },[])

    const fetchCart = () => {
        console.log('Корзина');
        getCart(user.user_id);
        // setTotalAmount(cartItems.reduce((total, cartItem) => total + cartItem.goods.price, 0));
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


    const handleRemoveFromCart = async (cartId) => {
        await removeFromCart(cartId, user.user_id);
        setPayment(true);
        await setTotalAmount(cartItems.reduce((total, cartItem) => total + cartItem.goods.price, 0));
    }

    // Группировка товаров по goods.id
    let groupedCartItems = Object.values(cartItems.reduce((acc, cartItem) => {
        const { goods } = cartItem;
        if (!acc[goods.id]) {
            acc[goods.id] = [];
        }
        acc[goods.id].push(cartItem);
        return acc;
    }, {}));

    // Вычисление общей суммы товаров в корзине
    // let totalAmount = cartItems.reduce((total, cartItem) => total + cartItem.goods.price, 0);
    const amountToPay = {
        amount_to_remove: parseInt(totalAmount),
    };
    const handleSale = (event) =>{
        setInputedSale(event.target.value);
        setCheckSale(undefined);
        setTotalAmount(cartItems.reduce((total, cartItem) => total + cartItem.goods.price, 0));
    }
    const applySale = async () =>{
        let activeSale = null;
            for (let i = 0; i < sales.length; i++) {
                if (sales[i].code.toLowerCase() === inputedSale.toLowerCase()) {
                    await setCheckSale(true)
                    setSaleAmount(sales[i].amount);
                    activeSale = sales[i];
                    break;
                }
            }
            if (!activeSale) {
                await setCheckSale(false)
                setTotalAmount(cartItems.reduce((total, cartItem) => total + cartItem.goods.price, 0));
            }
        if(activeSale){
            getCart(user.user_id);
            let amount = (100-activeSale.amount)/100;
            setTotalAmount(totalAmount*amount);
            console.log(totalAmount)
            // groupedCartItems[0][0].goods.price*=amount;
            // console.log(groupedCartItems)
        }
    }

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
                                        <span className="close-icon ml-1"
                                              onClick={() => handleRemoveFromCart(groupedCartItems[goodsId][0].id)}>×</span>
                                    </div>
                                </ul>
                            </div>
                        </li>
                    ))}
                </ol>
                <div className="total-amount">
                    Общая сумма: {totalAmount}
                </div>

                <form className="form-inline d-flex align-items-center" style={{display: 'flex'}}>
                    <input type="text"
                           value={inputedSale}
                           className="form-control mb-1 mr-sm-1 flex-grow-1"
                           placeholder="Промокод"
                           style={{marginRight: '5px'}}
                           onChange={handleSale}
                    />
                    <button type="button" className="btn btn-success"
                            style={{marginBottom: '3px'}}
                            onClick={applySale}>✅
                    </button>
                </form>
                {checkSale===false && <div className="text-danger">Промокод не найден</div> }
                {checkSale===true && <div className="text-success">Скидка в {saleAmount}% применена</div> }

                <button className="btn btn-primary" type="submit" onClick={payGoods}>
                    Оплатить
                </button>
                {!checkPayment && <div className="text-danger">Недостаточно средств</div>}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    const {user} = state.auth;
    const {cartItems} = state.cart;
    return {
        user,
        cartItems
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCart: (cartItems) => dispatch(getCart(cartItems)),
        removeFromCart: (cartId, user_id) => dispatch(removeFromCart(cartId, user_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);