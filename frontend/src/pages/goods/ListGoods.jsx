import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InputGroup, FormControl, Card } from 'react-bootstrap';
import http from "../../http-common";
import {addToCart} from "../../actions/cart";
import {connect} from "react-redux";

function ListGoods({user,addToCart}) {
    const [goods, setGoods] = useState([]);
    const [filteredGoods, setFilteredGoods] = useState([]);
    const [filterBrandId, setFilterBrandId] = useState('');
    const [filterCategoryId, setFilterCategoryId] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchGoods();
        fetchBrands();
        fetchCategories();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filterBrandId, filterCategoryId, minPrice, maxPrice]);

    const fetchGoods = () => {
        http
            .get("/goods")
            .then(response => {
                setGoods(response.data);
                setFilteredGoods(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const handleAddToCart = (goodsData) => {
        addToCart(goodsData.id, user.user_id);
    };

    const fetchBrands = () => {
        http.get('/brands')
            .then(response => {
                setBrands(response.data);
            })
            .catch(error => {
                console.log(error)
            });
    };

    const fetchCategories = () => {
        http.get('/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.log(error)
            });
    };

    const applyFilters = () => {
        let filteredResults = goods;

        if (filterBrandId) {
            filteredResults = filteredResults.filter(good => good.brand_id === parseInt(filterBrandId));
        }

        if (filterCategoryId) {
            filteredResults = filteredResults.filter(good => good.category_id === parseInt(filterCategoryId));
        }

        if (minPrice) {
            filteredResults = filteredResults.filter(good => good.price >= parseFloat(minPrice));
        }

        if (maxPrice) {
            filteredResults = filteredResults.filter(good => good.price <= parseFloat(maxPrice));
        }

        setFilteredGoods(filteredResults);
    };
    const editDescription = (description) => {
        if (description.length > 50) {
            return description.substring(0, 50) + '...';
        }
        return description;
    };
    return (
        <div className="container-md mt-3">
            <div className="row">
                <div className="col">
                    <Link to="/addGoods" className="btn btn-success mb-3">Добавить товар</Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Параметры поиска</Card.Title>
                            <select
                                className="form-control"
                                value={filterBrandId}
                                onChange={(e) => setFilterBrandId(e.target.value)}
                            >
                                <option value="">Выберите бренд</option>
                                {brands.map(brand => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                            <select
                                className="form-control mt-3"
                                value={filterCategoryId}
                                onChange={(e) => setFilterCategoryId(e.target.value)}
                            >
                                <option value="">Выберите категорию</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            <InputGroup className="mt-3">
                                <FormControl
                                    type="number"
                                    placeholder="Минимальная цена"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                />
                                <InputGroup.Text>руб.</InputGroup.Text>
                            </InputGroup>
                            <InputGroup className="mt-3">
                                <FormControl
                                    type="number"
                                    placeholder="Максимальная цена"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                />
                                <InputGroup.Text>руб.</InputGroup.Text>
                            </InputGroup>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-9">
                    <div className="row">
                        {filteredGoods.length ? (
                            filteredGoods.map((goodsData) => (
                                <div className="col-md-5 mb-3" key={goodsData.id}>
                                    <div className="card text-center" style={{ height: '350px' }}>
                                        {goodsData.image && (
                                            <Link to={`/good/${goodsData.id}`} style={{ display: 'inline-block', height: '250px', overflow: 'hidden' }}>
                                                <img
                                                    src={goodsData.image}
                                                    alt="Good"
                                                    className="card-img-top"
                                                    style={{ width: 'auto', height: '100%' }}
                                                />
                                            </Link>
                                        )}
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <Link to={`/good/${goodsData.id}`}
                                                      style={{textDecoration: 'none'}}>{goodsData.name}</Link>
                                            </h5>
                                            <div className="card-text">Категория: {goodsData.category}</div>
                                            <div className="card-text mt-1">Бренд: {goodsData.brand}</div>
                                            <div className="card-text mt-1">Цена: {goodsData.price}</div>
                                            <div className="card-text mt-1">Описание: {editDescription(goodsData.description)}</div>
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
        </div>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (goods_id, user_id) => dispatch(addToCart(goods_id, user_id))
    };
};
const mapStateToProps = (state) => {
    const { user } = state.auth;
    return {
        user
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ListGoods);;