import React, { useReducer, useEffect, useContext } from 'react'
import { reducer } from './reducer';
import axios from 'axios'
const AppContext = React.createContext();
const defaultState = {
    userInfo: {
        name: '',
        id: ''
    },
    sideBar: false,
    userStatus: false,
    loading: false,
    alert: {
        condition: false,
        type: '',
        msg: ''
    }
}
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const showAlert = ({ msg, type }) => { dispatch({ type: 'showAlert', payload: { msg, type } }) }
    const startLoading = () => { dispatch({ type: 'startLoading' }) }
    const endLoading = () => { dispatch({ type: 'endLoading' }) }
    const hideAlert = () => { dispatch({ type: 'hideAlert' }) }
    const updateUser = () =>{dispatch({type: 'updateUser'})}
    const closeSideBar = () => {dispatch({type: 'hideSideBar'})}
    const showSideBar = () => {dispatch({type: 'showSideBar'})}
    const updateInfo = (newData) => dispatch({type: 'updateInfo', payload: newData})
    return (
        <AppContext.Provider
            value={{
                ...state,
                showAlert,
                hideAlert,
                startLoading,
                endLoading,
                updateUser,
                closeSideBar,
                showSideBar,
                updateInfo
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}
export { AppContext, AppProvider }