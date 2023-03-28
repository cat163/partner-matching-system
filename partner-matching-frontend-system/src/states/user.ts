import {UserType} from "../models/user";

// 频率太高缓存一下

let currentUser : UserType;

const setCurrentUserState = (user : UserType) => {
    currentUser = user;
}

const getCurrentUserState = () : UserType => {
    return currentUser;
}

export {
    setCurrentUserState,
    getCurrentUserState,
}