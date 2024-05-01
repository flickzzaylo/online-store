import React, { useState, useEffect }  from 'react';

import http from "../../http-common";

import { Navigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from "moment/moment";
require('react-datepicker/dist/react-datepicker.css');

function SaleData() {

    const { id } = useParams();
    const [sale, setSale] = useState({
        id: id,
        code: "",
        amount: "",
        begin_date: new Date(),
        end_date: new Date()
    });

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }

        function getSale() {
            http.get("/sale/" + id)
                .then(response => {
                    setSale(prevSale => ({
                        ...prevSale,
                        code: response.data.code,
                        amount: response.data.amount,
                        begin_date: response.data.begin_date,
                        end_date: response.data.end_date
                    }));
                })
                .catch(e => {
                    console.log(e);
                });
        }

        getSale();
    }, [id]);


    function handleChange(event) {
                setSale({
                    ...sale,
                    code: sale.code,
                    amount: event.target.value,
                    begin_date: sale.begin_date,
                    end_date: sale.end_date
                });
    }

    function handleCodeChange(event) {
                setSale({
                    ...sale,
                    code: event.target.value,
                    amount: sale.amount,
                    begin_date: sale.begin_date,
                    end_date: sale.end_date
                });
    }

    function handleBeginDateChange(date) {
        setSale({
            ...sale,
            code: sale.code,
            amount: sale.amount,
            begin_date: date,
            end_date: sale.end_date
        });
    }

    function handleEndDateChange(date) {
        setSale({
            ...sale,
            code: sale.code,
            amount: sale.amount,
            begin_date: sale.begin_date,
            end_date: date
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const data = {
            code: sale.code,
            amount: sale.amount,
            begin_date: moment(sale.begin_date).format('YYYY-MM-DD'),
            end_date: moment(sale.end_date).format('YYYY-MM-DD')
        };
        http
            .put("/sale/update/" + sale.id, data)
            .then(() => {
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
    }

    function deleteSale() {
        http
            .delete("/sale/delete/" + sale.id)
            .then(() => {
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        !submitted
            ?
            <div className="container-md mt-3">
                <div className="col-sm-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="code"
                                value={sale.code}
                                placeholder="Промокод"
                                onChange={handleCodeChange}
                                className="form-control"
                            />
                            <input
                                type="text"
                                name="amount"
                                value={sale.amount}
                                placeholder="Скидка"
                                onChange={handleChange}
                                className="form-control"
                            />
                            <DatePicker
                                selected={sale.begin_date}
                                onChange={date => handleBeginDateChange(date)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="От"
                                className="form-control"
                                showYearDropdown
                            />
                            <DatePicker
                                selected={sale.end_date}
                                onChange={date => handleEndDateChange(date)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="До"
                                className="form-control"
                                showYearDropdown
                            />
                        </div>
                        <div className="btn-group mt-2">
                            <button type="submit" className="btn btn-success rounded">Обновить</button>
                            <button className="btn btn-danger  mx-1 rounded" onClick={deleteSale}>Удалить</button>
                        </div>
                    </form>

                </div>
            </div>
            : <Navigate to="/listSales"/>
    )
}

export default SaleData;