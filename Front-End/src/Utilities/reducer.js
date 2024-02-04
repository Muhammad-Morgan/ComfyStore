export const reducer = (state, action) => {
    if (action.type === 'showAlert') {
        return {
            ...state,
            alert: {
                condition: true,
                type: action.payload.type,
                msg: action.payload.msg,
            }
        }
    }
    if (action.type === 'hideAlert') {
        return {
            ...state,
            alert: {
                condition: false,
                type: '',
                msg: '',
            }
        }
    }
    if (action.type === 'startLoading') {
        return {
            ...state,
            loading: true
        }
    }
    if (action.type === 'endLoading') {
        return {
            ...state,
            loading: false
        }
    }
    if (action.type === 'updateUser') {
        return {
            ...state,
            userStatus: !state.userStatus
        }
    }
    if (action.type === 'updateInfo') {
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                name: action.payload.name,
                id: action.payload.id
            }
        }
    }
    if (action.type === 'showSideBar') {
        return {
            ...state,
            sideBar: true
        }
    }
    if (action.type === 'hideSideBar') {
        return {
            ...state,
            sideBar: false
        }
    }
    return state
}