import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";

function Profile({ user }) {
    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container">
            <header>
                <h3>
                    Профиль <strong>{user.name}</strong>
                </h3>
            </header>
            <p>
                <strong>Токен JWT: </strong>
                {/* вообще токен нельзя выводить на веб-странице, но для ознакомления он будет отображён на странице профиля пользователя */}
                {user.token}
            </p>
            <p>
                <strong>Id: </strong>
                {user.user_id}
            </p>
            <p>
                <strong>Логин: </strong>
                {user.login}
            </p>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { user } = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(Profile);