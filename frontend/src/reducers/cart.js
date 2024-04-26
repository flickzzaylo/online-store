import { SET_CART, ADD_TO_CART, REMOVE_FROM_CART } from '../actions/type';

const initialState = {
    // определение корзины
    cartItems: []
};

const cart = (state = initialState, action) => {
    switch (action.type) {
        case SET_CART:
            // Обработка получения данных корзины
            return {
                ...state,
                cartItems: action.payload
            };
        case ADD_TO_CART:
            // Обработка добавления товара в корзину
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            };
        case REMOVE_FROM_CART:
            // Обработка удаления товара из корзины
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload)
            };
        default:
            return state;
    }
};

export default cart;