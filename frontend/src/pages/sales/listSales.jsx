import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import http from "../../http-common";

function ListSales() {
    const [sales, setSale] = useState([]);

    useEffect(() => {
        http
            .get("/sales")
            .then(response => {
                setSale(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    const setActive = (isCheck) =>{
        if(isCheck) {
            http.get('sales/active')
                .then(response => {
                    setSale(response.data);
                })
                .catch(e => {
                    console.log(e);
                })
        }else{
            http
                .get("/sales")
                .then(response => {
                    setSale(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }
    return (
        <div className="container-md mt-3">
            <div className="col-sm-6">
                <Link to="/addSale" className="btn btn-success">Добавить скидку</Link>
                <div className="form-check form-switch">
                    <input id="flexSwitchCheckDefault" className="form-check-input" type="checkbox"
                           onChange={(e) => setActive(e.target.checked)}/>
                    <label className="form-check-label">Показать активные скидки</label>
                </div>
                {sales.length ? (
                    <ul className="list-group mt-3">
                        {sales.map((sale) => (
                            <Link to={`/sale/${sale.id}`} key={sale.id}
                                  className="list-group-item list-group-item-action">
                                {sale.code}, {sale.amount}%, Дата начала:{sale.begin_date}, Дата окончания:{sale.end_date}
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <div className="alert alert-info mt-3">Подождите, идёт загрузка данных</div>
                )}
            </div>
        </div>
    );
}

export default ListSales;