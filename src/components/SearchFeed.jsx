import React, {useState, useEffect, lazy, Suspense} from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from "@mui/material"
import { fetchFromAPI } from '../uilities/fetchFromAPI.js'
import VideosFallBack from './VideosFallBack.jsx'
import { useErrorBoundary } from 'react-error-boundary'
import Videos from './Videos'

const SearchFeed = () => {

  const [videos, setVideos] = useState([])
  const { searchTerm } = useParams()
  const { showBoundary } = useErrorBoundary()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFromAPI(`search?part=snippet,id&q=${searchTerm}`)
    .then((data) => {
      setLoading(false)
      setVideos(data.items)
    })
    .catch((err) => {
      showBoundary(err)
    })
  }, [searchTerm])

  return (
    <Box p={2} sx={{overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant='h5' fontWeight="bold" mb={2} sx={{ color: "white"}}>
        Results For <span style={{color: "#F31503"}}>{searchTerm}</span>
      </Typography>
      {loading && <VideosFallBack />}
      <Videos videos={videos}/>
    </Box>
  )
}

export default SearchFeed
