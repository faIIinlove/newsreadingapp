import React, { useState, createContext } from 'react'
import { login, register } from '../services/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const { children } = props;
    const [user, setUser] = useState(null);

    const onRegister = async (email, password) => {
        try {
            await register(email, password);
            return true;
        } catch (error) {
            console.log(error);
        }
        return false;
    }

    const onLogin = async (email, password) => {
        try {
            const res = await login(email, password);
            if (res.statusCode === 200) {
                await AsyncStorage.setItem('token', res?.data?.token);
                setUser(res?.data?.user)
                console.log(res?.data?.user);
                return true;
            }
        } catch (error) {
            console.log(error);
        }
        return false;
    }

    return (
        <UserContext.Provider
            value={{
                user, setUser, onRegister, onLogin
            }}>
            {children}
        </UserContext.Provider>
    )
}
