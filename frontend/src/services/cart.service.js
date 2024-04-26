import http from "../http-common";

function getCart(userId) {
    console.log(userId)
    return http.get(`/cart/${userId}`);
}

function addToCart(goodsId, userId) {
    const data = {
        goods: goodsId,
        user: userId
    };
    console.log(data);
    return http.post(`/cart/create`, data);
}
function removeFromCart(cartId) {
    console.log(cartId)
    return http.delete(`/cart/delete/${cartId}`);
}

const exportedObject = {
    getCart: getCart,
    addToCart: addToCart,
    removeFromCart: removeFromCart
};

export default exportedObject;