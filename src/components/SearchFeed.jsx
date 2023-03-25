import React, {useState, useEffect} from 'react'
import { Videos } from './'
import { useParams } from 'react-router-dom'
import { Box, Typography } from "@mui/material"
import { fetchFromAPI } from '../uilities/fetchFromAPI.js'

const SearchFeed = () => {

  const [videos, setVideos] = useState([])
  const { searchTerm } = useParams()

  console.log(useParams)
  useEffect(() => {
    fetchFromAPI(`search?part=snippet,id&q=${searchTerm}`)
    .then((data) => setVideos(data.items))
  }, [searchTerm])

  return (
    <Box p={2} sx={{overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant='h4' fontWeight="bold" mb={2} sx={{ color: "white"}}>
        Search Results For <span style={{color: "#F31503"}}>{searchTerm}</span>
      </Typography>
      <Videos videos={videos}/>
    </Box>
  )
}

export default SearchFeed
