import React, { useState } from 'react';
import http from "../../http-common";
import { Navigate } from 'react-router-dom';
import moment from "moment";
import DatePicker from 'react-datepicker';
require('react-datepicker/dist/react-datepicker.css');

function AddSale() {
    const [code,setCode] = useState("");
    const [amount,setAmount] = useState("");
    const [begin_date,setBeginDate] = useState("");
    const [end_date,setEndDate] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name){
            case('code'):
                setCode(value)
                break;
            case('amount'):
                setAmount(value)
                break;
            case('beginDate'):
                setBeginDate(value)
                break;
            case('endDate'):
                setEndDate(value)
                break;
            default:
                break;
        }
    };
    // const amountChange = (e) =>{
    //     setAmount(e.target.value)
    // }
    // const beginDateChange = (e) => {
    //     setBeginDate(e.target.value);
    // }
    // const endDateChange = (e) =>{
    //     setEndDate(e.target.value);
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            code: code,
            amount: amount,
            begin_date: moment(begin_date).format('YYYY-MM-DD'),
            end_date: moment(end_date).format('YYYY-MM-DD')
        };
        http
            .post("/sale/create", data)
            .then(() => {
                setSubmitted(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className="container-md mt-3">
            <div className="col-sm-6">
                {!submitted ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="code"
                                value={code}
                                placeholder="Промокод"
                                onChange={handleChange}
                                className="form-control"
                            />
                            <input
                                type="text"
                                name="amount"
                                value={amount}
                                placeholder="Скидка"
                                onChange={handleChange}
                                className="form-control"
                            />
                            <DatePicker
                                selected={begin_date}
                                onChange={date => setBeginDate(date)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="От"
                                className="form-control"
                                showYearDropdown
                            />
                            <DatePicker
                                selected={end_date}
                                onChange={date => setEndDate(date)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="До"
                                className="form-control"
                                showYearDropdown
                            />
                        </div>
                        <button type="submit" className="btn btn-success mt-2">Добавить</button>
                    </form>
                ) : (
                    <Navigate to="/listSales"/>
                )}
            </div>
        </div>
    );
}

export default AddSale;