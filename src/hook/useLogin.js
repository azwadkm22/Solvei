import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { API_BASE_URL, AUTH, LOGIN } from "../utils/constants";

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(API_BASE_URL + AUTH + LOGIN, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    console.log("in uselogin: ", json, "response: ", response, "response.ok", response.ok)
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
        console.log("in uselog, ok was true")
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
    return response.ok
  }

  return { login, isLoading, error }
}