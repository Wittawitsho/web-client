import React from "react"
import { useEffect, useState } from "react"
import useWebStore from "../store/web-store"
import { currentUser } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'

const ProtectRouteUser = ({ element }) => {
    const [ ok, setOk ] = useState(false)
    const user = useWebStore((state) => state.user)
    const token = useWebStore((state) => state.token)

    useEffect(()=>{
        if(user && token){
            currentUser(token)
                .then((res)=>setOk(true))
                .catch((err)=>setOk(false))
        }
    },[])
    
    return ok ? element : <LoadingToRedirect />
}

export default ProtectRouteUser