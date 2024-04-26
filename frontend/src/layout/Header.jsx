import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import authActions from "../actions/auth";
import { connect, useDispatch } from "react-redux";

function Header({ user }) {
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (user) {
            setCurrentUser(user);
        }
    }, [user]);

    const logOut = () => {
        dispatch(authActions.logout());
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-project navbar-expand-lg navbar-light" style={{ background: '#aaafea' }}>
            {currentUser ? (
                <div className="ms-3">
                    <Link className="navbar-brand" to="/listBrands">Бренды</Link>
                </div>
            ) : (
                <div className="ms-3">
                    Требуется авторизация
                </div>
            )}
            {currentUser ? (
                <div className="ms-3">
                    <Link className="navbar-brand" to='/listCategories'>Категории</Link>
                </div>
            ) : (
                <div className="ms-3">
                    Требуется авторизация
                </div>
            )}
            {currentUser ? (
                <div className="ms-3">
                    <Link className="navbar-brand" to="/listSales">Скидки</Link>
                </div>
            ) : (
                <div className="ms-3">
                    Требуется авторизация
                </div>
            )}
            {currentUser ? (
                <div className="ms-3">
                    <Link className="navbar-brand btn" to="/listGoods">Товары</Link>
                </div>
            ) : (
                <div className="ms-3">
                    Требуется авторизация
                </div>
            )}
                        {currentUser ? (
                <div className="ms-3">
                    <Link className="navbar-brand btn" to="/selectGoods">Выбрать товары</Link>
                </div>
            ) : (
                <div className="ms-3">
                    Требуется авторизация
                </div>
            )}

            {currentUser ? (
                <div className="ml-auto">
                    <Link className="navbar-brand btn" to="/profile">{currentUser.name}</Link>
                    <button className="navbar-brand btn" onClick={logOut}>Выйти</button>
                </div>
            ) : (
                <div className="ml-auto">
                    <Link to="/register" className="nav-link navbar-brand btn navbar-brand-button">Регистрация</Link>
                    <Link to="/login" className="nav-link navbar-brand btn navbar-brand-button">Вход в систему</Link>
                </div>
            )}
        </nav>
    );
};

const mapStateToProps = (state) => {
    const { user } = state.auth;
    return {
        user
    };
};

export default connect(mapStateToProps)(Header);
