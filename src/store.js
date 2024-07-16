import React, { createContext, useReducer } from "react";
import { getFromLocal } from "./store_comm_fnc";

const InitialState = {
    id: getFromLocal("id", 0),
    name: getFromLocal("name", ""),
    email: getFromLocal("email", ""),
    tokendata: getFromLocal("tokendata", ""),
};

function reducer(state, action) {
    let local_value;
    switch (action.type) {
        case "id":
            local_value = JSON.stringify(action.value);
            localStorage.setItem("id", local_value);
            return {
                ...state,
                id: action.value,
            };
        case "tokendata":
            local_value = JSON.stringify(action.value);
            localStorage.setItem("tokendata", local_value);
            return {
                ...state,
                tokendata: action.value,
            };
        case "name":
            local_value = JSON.stringify(action.value);
            localStorage.setItem("name", local_value);
            return {
                ...state,
                name: action.value,
            };
        case "email":
            local_value = JSON.stringify(action.value);
            localStorage.setItem("email", local_value);
            return {
                ...state,
                email: action.value,
            };
        case "reset":
            localStorage.clear();
            return {
                ...state,
                id: getFromLocal("id", 0),
                name: getFromLocal("name", ""),
                email: getFromLocal("email", ""),
                tokendata: getFromLocal("tokendata", ""),
            };
        case "firstLoad":
            return {
                ...state,
                id: getFromLocal("id", 0),
                name: getFromLocal("name", ""),
                email: getFromLocal("email", ""),
                tokendata: getFromLocal("tokendata", ""),
            };
        default:
            return { ...state };
    }
}

export const userContext = createContext();

function Store({ children }) {
    const [user, dispatch] = useReducer(reducer, InitialState);

    return (
        <userContext.Provider value={{ user, dispatch }}>
            {children}
        </userContext.Provider>
    );
}

export default Store;
