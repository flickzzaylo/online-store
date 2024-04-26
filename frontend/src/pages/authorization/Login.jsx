import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import authActions from "../../actions/auth";

function Login({ isLoggedIn, message }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(undefined);
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    dispatch(authActions.login(login, password))
        .then(() => {
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
  }

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
      <div className="col-md-5">
        <form onSubmit={handleLogin}>
          <div className="form-group mt-2">
            <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
            />
          </div>
          <div className="form-group mt-2">
            <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>

          <div className="form-group mt-2">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Войти</span>
            </button>
          </div>
          <div className="form-group mt-2">
            <Link to={`/register`}>
              Зарегистрироваться
            </Link>
          </div>
          {message && loading !== undefined && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
          )}
        </form>
      </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Login);