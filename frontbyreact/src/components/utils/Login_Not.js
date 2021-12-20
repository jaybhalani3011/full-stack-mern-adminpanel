const USER_ID_KEY = 'user'

export const LoginAddId = (id) => {
    // console.log(hey);
    localStorage.setItem(USER_ID_KEY, JSON.stringify(id));
    const {userid} = JSON.parse(localStorage.getItem(USER_ID_KEY));
    const ID_FOUND = userid;
    return ID_FOUND;
}

export const LogoutRemoveId = () => {
    localStorage.removeItem(USER_ID_KEY);
}

export const isLogin = () => {
    if (localStorage.getItem(USER_ID_KEY)) {
        return true;
    }

    return false;
}
