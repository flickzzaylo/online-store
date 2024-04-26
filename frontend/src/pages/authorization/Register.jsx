import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import authActions from '../../actions/auth';
import http from "../../http-common";

function Register({ isRegistered, message }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [roleId, setRoleId] = useState('');
  const [successful, setSuccessful] = useState(undefined);
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // загрузка списка ролей
    http
        .get('/roles')
        .then(response => {
          console.log(response.data)
          setRoles(response.data);
        })
        .catch(error => {
          console.log(error)
        });
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);

    dispatch(authActions.register(login, password, name, roleId))
        .then(() => {
          setSuccessful(true);
          // Регистрация прошла успешно, переходим к странице входа в систему
          window.location.reload();
        })
        .catch(() => {
          setSuccessful(false);
        });
  };

  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  return (
      <div className="col-md-5">
        <form onSubmit={handleRegister}>
          <div className="form-group mt-2">
            <input
                type="text"
                className="form-control"
                name="login"
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
            <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
          </div>
          <div className="form-group mt-2">
            <select
                className="form-control"
                name="role"
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                required
            >
              <option value="">Выберите роль</option>
              {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group mt-2">
            <button className="btn btn-primary btn-block">Зарегистрировать</button>
          </div>
          {message && successful !== undefined && (
              <div className="form-group">
                <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                  {message}
                </div>
              </div>
          )}
        </form>
      </div>
  );
};

const mapStateToProps = (state) => {
  const { isRegistered } = state.auth;
  const { message } = state.message;
  return {
    isRegistered,
    message,
  };
};

export default connect(mapStateToProps)(Register);