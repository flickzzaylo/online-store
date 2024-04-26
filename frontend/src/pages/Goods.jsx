import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cart';
import http from "../http-common";
import {Link} from "react-router-dom";

function Goods({ user, addToCart }) {
    const [goods, setGoods] = useState([]);
    useEffect(() => {
        fetchGoods();
    }, []);

    const fetchGoods = () => {
        http
            .get("/goods")
            .then(response => {
                console.log(response.data)
                setGoods(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleAddToCart = (goodsData) => {
        addToCart(goodsData.id, user.user_id);
    };

    return (
        <div>
            <div className="col-md-9 mt-2">
                <div className="row">
                    {goods.length ? (
                        goods.map((goodsData) => (
                            <div className="col-md-4 mb-3" key={goodsData.id}>
                                <div className="card text-center" style={{height: '280px'}}>
                                    <div to={`/goodsData/${goodsData.id}`} style={{ display: 'inline-block', height: '250px', overflow: 'hidden' }}>
                                        <img
                                            src={goodsData.image}
                                            alt="Good"
                                            className="card-img-top"
                                            style={{ width: 'auto', height: '100%' }}
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{goodsData.name}</h5>
                                        <div className="card-text">Категория: {goodsData.category}</div>
                                        <div className="card-text mt-1">Бренд: {goodsData.brand}</div>
                                        <div className="card-text mt-1">Цена: {goodsData.price}</div>
                                        <div className="card-text mt-1">Описание: {goodsData.description}</div>
                                        <button className="btn btn-sm btn-success mt-1"
                                                onClick={() => handleAddToCart(goodsData)}>Добавить в корзину
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col">
                            <div className="alert alert-info">Товары не найдены</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { user } = state.auth;
    return {
        user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (goods_id, user_id) => dispatch(addToCart(goods_id, user_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Goods);