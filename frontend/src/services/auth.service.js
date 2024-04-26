import http from "../http-common";

function login(login, password) {
    var data = {
        login: login,
        password: password
    };
    console.log(data)
    return http
        .post("/authenticate", data)
        .then(response => {
            console.log(response.data)
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data)); // записываем данные пользователя в локальное хранилище, которое хранится в браузере
        }
        return response.data;
    });
}

function logout() {
    localStorage.removeItem('user'); // при нажатии кнопки "Выйти" удаляем данные пользователя из локального хранилища
}
function register(login, password, name, roleId) {
    var data = {
        login: login,
        password: password,
        name: name,
        role_id: roleId
    };
    return http.post("/register", data);
}

const exportedObject = {
    login: login,
    logout: logout,
    register: register
};

export default exportedObject;
