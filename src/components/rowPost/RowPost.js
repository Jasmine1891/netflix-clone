import React, { useEffect, useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import {imageUrl,API_KEY} from '../../constants/constants'
import YouTube from 'react-youtube'

function RowPost(props) {
  const [movies, setmovies] = useState([])
  const [urlId, seturlId] = useState('')
  useEffect(() => {
    axios.get(props.url)
    .then((response)=>{
      console.log(response.data)
      setmovies(response.data.results)
    })
    .catch((err)=>{
      alert('Network Error')
    })
   
  })

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMovie=(id)=>{
    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
    .then((response)=>{
      //console.log(response.data)
      if(response.data.results.length !== 0){
        seturlId(response.data.results[0])
      }
      else{
        console.log("Array empty")
      }
    })
  }
  
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className="posters">
          {
            movies.map((movie)=>(
              <img onClick={()=>handleMovie(movie.id)} alt='poster' className={props.isSmall ? 'smallPoster':'poster' }src={`${imageUrl+movie.backdrop_path}`}/>
            ))

          }
           
        </div>

        { urlId && <YouTube videoId={urlId.key} opts={opts} />}

    </div>
  )
}

export default RowPost