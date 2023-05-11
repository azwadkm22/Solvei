import { useAuthContext } from "./useAuthContext"

export const useLogout = ()=>{
    const { dispatch } = useAuthContext()

    const logout = ()=>{
        // console.log("inside logout")
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
    };
    // console.log("type of logout: ", typeof(logout))

    return logout
}