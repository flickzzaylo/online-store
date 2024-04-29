import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import http from "../../http-common";
import {connect} from "react-redux";

function ListPurchases({user}) {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        http
            .get("/purchases/" + user.user_id)
            .then(response => {
                setPurchases(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    return (
        <div className="container-md mt-3">
            <div className="col-sm-6">
                {purchases.length ? (
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Название</th>
                            <th scope="col">Цена</th>
                        </tr>
                        </thead>
                        <tbody>
                        {purchases.map((purchase) => (
                            <tr>
                                <td>{purchase.id}</td>
                                <td>{purchase.goods.name}</td>
                                <td>{purchase.goods.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="alert alert-info mt-3">Подождите, идёт загрузка данных</div>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    const {user} = state.auth;
    return {
        user
    };
};
export default connect(mapStateToProps)(ListPurchases);