import React from 'react'
import { Box } from '@mui/material'

const VideoFallback = () => {
  return (
    <div className=''>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: { xs: "100%", sm: "320px"}, boxShadow: "none", borderRadius: "0", height: 180 }}>
            <div style={{ width: "200px", height: "200px", borderRadius: "50%", color: "#1e1e1e" }}/>
        </Box>
    </div>
  )
}

export default VideoFallback
