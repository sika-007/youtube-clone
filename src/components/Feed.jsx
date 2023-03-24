import React, {useState, useEffect} from 'react'
import { Sidebar, Videos } from './'
import { Box, Stack, Typography } from "@mui/material"
import { fetchFromAPI } from '../uilities/fetchFromAPI.js'

const Feed = () => {

  const [selectedCategory, setSelectedCategory] = useState("New")
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchFromAPI(`search?part=snippet,id&q=${selectedCategory}`)
    .then((data) => setVideos(data.items))
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
          {selectedCategory}<span style={{color: "#F31503"}}>Videos</span>
        </Typography>
        <Videos videos={videos}/>
      </Box>
    </Stack>
  )
}

export default Feed
