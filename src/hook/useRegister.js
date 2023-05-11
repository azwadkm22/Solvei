import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { API_BASE_URL, AUTH, REG } from "../utils/constants";

export const useRegister = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
  
    const register = async (email, password, name, batch, registrationNumber) => {
      setIsLoading(true)
      setError(null)
  
      const response = await fetch(API_BASE_URL + AUTH + REG, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password, name, batch, registrationNumber })
      })
      const json = await response.json()
      // console.log("json of response: ", json)
      if (!response.ok) {
        setIsLoading(false)
        setError(json.error)
      }
      if (response.ok) {
        // save the user to local storage
        localStorage.setItem('user', JSON.stringify(json))
  
        // update the auth context
        dispatch({type: 'LOGIN', payload: json})
  
        // update loading state
        setIsLoading(false)
      }
      return response.ok
    }
  
    return { register, isLoading, error }
  }
  
  




