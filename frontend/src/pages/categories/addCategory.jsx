import React, { useState } from 'react';
import http from "../../http-common";
import { Navigate } from 'react-router-dom';

function AddCategory() {
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const handleFileChange = (event) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            setIcon(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: name,
            icon: icon
        };

        http
            .post("/category/create", data)
            .then(() => {
                setSubmitted(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className="container-md mt-3">
            <div className="row">
                <div className="col-sm-4">
                    {!submitted ? (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="Наименование категории"
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group mt-3">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="form-control"
                                    accept="image/*"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success mt-2">Добавить</button>
                        </form>
                    ) : (
                        <Navigate to="/listCategories" />
                    )}
                </div>
                <div className="col-sm-4">
                    <div>
                        {icon && <img src={icon} alt="Category Icon"  style={{ width: '150px', height: 'auto' }} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCategory;