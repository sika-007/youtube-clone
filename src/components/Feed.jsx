import {useState, useEffect, lazy, Suspense} from 'react'
import VideosFallBack from './VideosFallBack'
import { Sidebar } from './'
import { Box, Stack, Typography } from "@mui/material"
import { fetchFromAPI } from '../uilities/fetchFromAPI.js'
import { useErrorBoundary } from 'react-error-boundary'
import Videos from './Videos'

const Feed = () => {

  const { showBoundary } = useErrorBoundary()
  const [selectedCategory, setSelectedCategory] = useState("New")
  const [videos, setVideos] = useState([])
  const [shownVideo, setShownVideo] = useState(true)

  useEffect(() => {
    fetchFromAPI(`search?part=snippet,id&q=${selectedCategory}`)
    .then((data) => {
      setShownVideo(false)
      setVideos(data.items)
    })
    .catch((err) => {
      console.error(err)
      showBoundary(err)
    })
  }, [selectedCategory])

  return (
    <Stack direction={{ xs: "column", md: "row" }}>
      <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 }}}>
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography className="copyright" vatiant="body2" sx={{marginTop: 1.5, color: "#fff"}}>
          Copyright 2022 Nsikak Thomas
        </Typography>
      </Box>
      <Box p={2} sx={{overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant='h4' fontWeight="bold" mb={2} sx={{ color: "white"}}>
          {selectedCategory} <span style={{color: "#F31503"}}>Videos</span>
        </Typography>
        {shownVideo  && <VideosFallBack />}
        <Videos videos={videos}/>
      </Box>
    </Stack>
  )
}

export default Feed
