import React, { useState, useEffect } from 'react';
import http from "../../http-common";
import { Navigate, useParams } from 'react-router-dom';

function CategoryData() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");
    const [iconFormat, setIconFormat] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        http.get(`/category/${id}`)
            .then(response => {
                setName(response.data.name);
                if (response.data.icon_data) {
                    setIconFormat(response.data.icon_format);
                    setIcon(`data:${response.data.icon_format};base64,${response.data.icon_data}`);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }, [id]);

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

        http.post(`/category/update/${id}`, data)
            .then(() => {
                setSubmitted(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteBrand = () => {
        http
            .delete(`/category/delete/${id}`)
            .then(() => {
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
    }


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
                                />
                            </div>
                            <div className="btn-group mt-2">
                                <button type="submit" className="btn btn-success rounded">Обновить</button>
                                <button className="btn btn-danger mx-1 rounded" onClick={deleteBrand}>Удалить</button>
                            </div>
                        </form>
                    ) : (
                        <Navigate to="/listCategories" />
                    )}
                </div>
                <div className="col-sm-4">
                    <div>
                        {icon && iconFormat ? (
                            <img src={icon} className="card-img-top" alt="Category Icon" style={{ width: '150px', height: 'auto' }} />
                        ) : (
                            icon && <img src={icon} alt="Brand Icon" style={{ width: '150px', height: 'auto' }} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryData;