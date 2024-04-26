import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import http from "../../http-common";

function ListBrands() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        http
            .get("/brands")
            .then(response => {
                setBrands(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    return (
        <div className="container-md mt-3">
            <div className="row">
                <div className="col">
                    <Link to="/addBrand" className="btn btn-success mb-3">Добавить бренд</Link>
                </div>
            </div>
            <div className="row">
                {brands.length ? (
                    brands.map((brand) => (
                        <div className="col-md-2 mb-3" key={brand.id}>
                            <div className="card text-center" style={{ height: '150px' }}>
                                {brand.icon_data && (
                                    <Link to={`/brand/${brand.id}`} style={{ display: 'inline-block', height: '150px', overflow: 'hidden' }}>
                                        <img
                                            src={`data:${brand.icon_format};base64,${brand.icon_data}`}
                                            className="card-img-top"
                                            alt="Brand Icon"
                                            style={{ width: 'auto', height: '100%' }}
                                        />
                                    </Link>
                                )}
                                <div className="card-body" style={{ textAlign: 'center' }}>
                                    <h5 className="card-title">
                                        <Link to={`/brand/${brand.id}`} style={{ textDecoration: 'none' }}>{brand.name}</Link>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col">
                        <div className="alert alert-info mt-3">Подождите, идёт загрузка данных</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListBrands;