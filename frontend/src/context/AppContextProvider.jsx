import { useContext, useEffect, useState } from "react"
import AppContext from './AppContext'
import axios from 'axios'
import {useAuth, useUser} from "@clerk/react"
import { useLocation,useNavigate } from "react-router-dom"
import {toast} from 'react-hot-toast'

// it creates base url for every endpoint : means every url starts with this base url
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL
const image_base_url=import.meta.env.VITE_TMDB_IMAGE_BASE_URL

export const AppContextProvider=({children})=>{

    const [isAdmin,setIsAdmin]=useState(false)
    const [shows,setShows]=useState([])
    const [favoriteMovies,setFavoriteMovies]=useState([])

    const {user}=useUser()
    const {getToken}=useAuth()
    const location=useLocation()
    const navigate=useNavigate()



    const fetchShows=async()=>{
        try{
            const {data}=await axios.get("/api/shows/all")
            if(data.success){
                setShows(data.shows)
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            console.error(error)
        }
    }
    

    const fetchFavoriteMovies=async()=>{
        try{
            const token = await getToken();
            const {data}=await axios.get("/api/user/favorites",{
                headers:{Authorization:`Bearer ${token}`}})
            if(data.success){
                setFavoriteMovies(data.movies.map(movie => movie._id));
                // console.log(favoriteMovies);
            }
            else{
                setFavoriteMovies([]);
                toast.error(data.message)
            }
        }
        catch(error){
            console.error(error)
            setFavoriteMovies([]);
        }
    }



    const fetchIsAdmin=async()=>{
        try{
            const token = await getToken();
            // console.log(token);
            const {data}=await axios.get("/api/admin/is-admin",{
                headers:{Authorization:`Bearer ${token}`}
            })
            // console.log("API response:", data.success);

            await setIsAdmin(data.success);
            if(!data.success && location.pathname.startsWith("/admin"))
            {
                navigate("/")
                toast.error("you are not authorized to access admin Dashboard")
            }            
        }
        catch(error){
            console.error(error)
        }
    }


    useEffect(()=>{
        if(user) {
            fetchIsAdmin()
            fetchShows()
            fetchFavoriteMovies()
        }
    },[user])

    

    const value={
        axios,
        isAdmin,
        fetchIsAdmin,
        navigate,
        getToken,
        user,
        shows,
        fetchShows,
        favoriteMovies,
        fetchFavoriteMovies,
        image_base_url
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext=()=>useContext(AppContext)
