import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import http from "../../http-common";

function ListCategories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        http
            .get("/categories")
            .then(response => {
                setCategories(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    return (
        <div className="container-md mt-3">
            <div className="row">
            <div className="col">
                <Link to="/addCategory" className="btn btn-success mb-3">Добавить категорию</Link>
            </div>
            </div>
            <div className="row">
                {categories.length ? (
                        categories.map((category) => (
                            <div className="col-md-2 mb-3" key={category.id}>
                                <div className="card text-center" style={{height: '150px'}}>
                                    {category.icon_data && (
                                        <Link to={`/category/${category.id}`}
                                              style={{display: 'inline-block', height: '150px', overflow: 'hidden'}}>
                                            <img
                                                src={`data:${category.icon_format};base64,${category.icon_data}`}
                                                className="card-img-top"
                                                alt="category Icon"
                                                style={{width: 'auto', height: '100%'}}
                                            />
                                        </Link>
                                    )}
                                    <div className="card-body" style={{textAlign: 'center'}}>
                                        <h5 className="card-title">
                                            <Link to={`/category/${category.id}`}
                                                  style={{textDecoration: 'none'}}>{category.name}</Link>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        ))
                ) : (
                    <div className="alert alert-info mt-3">Подождите, идёт загрузка данных</div>
                )}
            </div>
        </div>
    );
}

export default ListCategories;