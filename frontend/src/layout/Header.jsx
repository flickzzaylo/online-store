import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import authActions from "../actions/auth";
import { connect, useDispatch } from "react-redux";
import "./closeModal.css"
import http from "../http-common";

 Modal.setAppElement('#root');
function Header({ user }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [amount_to_add, setAmount] = useState("");
    const [wallet, setWallet] = useState([]);

    const openModal = () => {
      setModalIsOpen(true);
    };

    const closeModal = () => {
      setModalIsOpen(false);
    };
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (user) {
            setCurrentUser(user);
        }
        http
            .get("/wallet/userId="+user.user_id)
            .then(response => {
                setWallet(response.data);
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }, [user]);
    const handleChange = (event) => {
        setAmount(event.target.value);
    };
    const handleSubmit = (event) => {
        closeModal();
        event.preventDefault();

        const data = {
            amount_to_add: amount_to_add,
        };

        http
            .put("/wallet/addamount/"+user.wallet_id, data)
            .then(() => {
                closeModal();
            })
            .catch((e) => {
                console.log(e);
            });
        window.location.reload();
    };
    const modalStyle = {
      content: {
        top: '8%',
        left: '65%',
        right: 'auto',
        bottom: 'auto',
        width: '25%',
        height: '10%',
        transform: 'translate(-40%, -10%)',
      },
    };
    const logOut = () => {
        dispatch(authActions.logout());
        window.location.reload();
    };
    const modalContent = (
            <form className="form-inline" onSubmit={handleSubmit}>
                <table>
                    <thead>
                    <tr>
                        <th scope="col"><input type="text"
                                               onChange={handleChange}
                                               className="form-control mb-1 mr-sm-1"
                                               placeholder="Сумма"
                                                value={amount_to_add}/></th>
                        <th scope="col">
                            <button type="submit" className="navbar-brand btn">Пополнить</button>
                        </th>
                    </tr>
                    </thead>
                </table>
                <div className="close-button" onClick={closeModal}>
                    x
                </div>
            </form>
        )
    ;
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
                    <button className="navbar-brand btn" onClick={openModal}>Баланс: {wallet}</button>
                    <Modal style={modalStyle} isOpen={modalIsOpen} onRequestClose={closeModal}>
                        {modalContent}
                    </Modal>
                </div>
            ) : (
                <div className="ml-auto">
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

