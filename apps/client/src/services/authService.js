import { getCurrentUser, userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";



export const handleLogin = (e, mobileNumber, password) => {
    e.preventDefault();
    try {
        if (!mobileNumber || !password) {
            return alert("Please Privde All Feilds");
        }
        store.dispatch(userLogin({ mobileNumber, password }))
    } catch (error) {
        console.log(error);
    }
};

export const handleRegister = (
    e,
    firstName,
    lastName,
    mobileNumber,
    password
) => {
    e.preventDefault();
    try {
        store.dispatch(
            userRegister({
                firstName,
                lastName,
                mobileNumber,
                password
            })
        );
    } catch (error) {
        console.log(error);
    }
};

export const handleCurrentUser = (
    mobileNumber
) => {
    try {
        store.dispatch(
            getCurrentUser(mobileNumber)
        );
    } catch (error) {
        console.log(error);
    }
};