import { SET_CART } from "./type";
import CartService from '../services/cart.service';

export const addToCart = (goodsId, userId) => {
    return (dispatch) => {
        CartService.addToCart(goodsId, userId)
            .then((data) => {
                // Обновляем корзину
                dispatch(getCart(userId));
            })
            .catch(error => {
                console.error('Ошибка при добавлении товара в корзину:', error);
            });
    };
};

export const removeFromCart = (cartId, userId) => {
    return (dispatch) => {
        console.log(cartId, userId)

        CartService.removeFromCart(cartId)
            .then(response => {
                // Обновляем корзину
                dispatch(getCart(userId));
            })
            .catch(error => {
                console.error('Ошибка при удалении товара из корзины:', error);
            });
    };
};


export const getCart = (userId) => {
    return (dispatch) => {
        CartService.getCart(userId)
            .then(response => {
                dispatch({
                    type: SET_CART,
                    payload: response.data
                });
            console.log(response.data)
            })
            .catch(error => {
                console.error('Ошибка при получении корзины:', error);
            });
    };
};