import React, { useState, useEffect } from 'react';
import http from "../../http-common";
import {Navigate, useParams} from "react-router-dom";

function GoodsData() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        brand_id: '',
        category_id: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const [icon, setIcon] = useState("");

    useEffect(() => {
        console.log(id)
        http
            .get(`/good/${id}`)
            .then(response => {
                const { name, price, description, brand, category, image } = response.data;
                const { id: brand_id } = brand;
                const { id: category_id } = category;
                setFormData({ name, price, description, brand_id, category_id });

                if (image) {
                    setIcon(image);
                }
            })
            .catch(error => {
                console.log(error);
            });        fetchBrands();
        fetchCategories();
    }, []);

    function fetchGood() {
        console.log(id)
        http.get(`/good/${id}`)
            .then(response => {
                console.log(response.data)
                const { name, price, description, brand_id, category_id, image } = response.data;
                setFormData({ name, price, description, brand_id, category_id });
                if (image) {
                    setIcon(image);
                }
            })
            .catch(error => {
                console.log(error);
            });
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

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);

        const reader = new FileReader();
        reader.onload = function (event) {
            setIcon(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataWithImage = new FormData();
        formDataWithImage.append('name', formData.name);
        formDataWithImage.append('price', formData.price);
        formDataWithImage.append('description', formData.description);
        formDataWithImage.append('brand_id', formData.brand_id);
        formDataWithImage.append('category_id', formData.category_id);
        if (selectedFile) {
            formDataWithImage.append('image', selectedFile);
        }

        http
            .put(`/good/update/${id}`, formDataWithImage, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
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
                                    value={formData.name}
                                    placeholder="Наименование товара"
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group mt-2">
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    placeholder="Цена товара"
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group mt-2">
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    placeholder="Описание товара"
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group mt-2">
                                <select
                                    className="form-control"
                                    name="brand_id"
                                    value={formData.brand_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Выберите бренд</option>
                                    {brands.map(brand => (
                                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group mt-2">
                                <select
                                    className="form-control"
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Выберите категорию</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group mt-2">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn btn-success mt-2">Обновить</button>
                        </form>
                    ) : (
                        <Navigate to="/listGoods" />
                    )}
                </div>
                <div className="col-sm-4">
                    <div>
                        {icon && <img src={icon} alt="Brand Icon" style={{ width: '150px', height: 'auto' }} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GoodsData;