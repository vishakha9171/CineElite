import  {getNowPlayingMovies} from '../controllers/showController.js'
import express from 'express'

const showRouter=express.Router()

showRouter.get("/now-playing",getNowPlayingMovies);

export default showRouter

 