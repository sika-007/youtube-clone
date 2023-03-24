import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../uilities/fetchFromAPI";

const ChannelDetail = () => {
  const { id } = useParams()
  const [channelDetails, setChannelDetail] = useState(null)
  const [channelVideos, setChannelVideos] = useState([])

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet,statistics&id=${id}`)
      .then(data => setChannelDetail(data?.items[0]))
    
    fetchFromAPI(`search?part=snippet,id&channelId=${id}&order=date`)
      .then(data => setChannelVideos(data?.items))
  }, [id])

  console.log(channelDetails)

  return (
    <Box minHeight="95vh">
      <Box>
        <div 
          style={{ 
            background: "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)",
            zIndex: 10,
            height: "300px", 
            padding: "40px"
          }}
        />
        <ChannelCard channelDetail={channelDetails} marginTop="-5rem"/>  
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" }}} />
        <Videos videos={channelVideos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail
