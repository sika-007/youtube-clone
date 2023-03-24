import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../uilities/fetchFromAPI";

const ChannelDetail = () => {
  const { id } = useParams()
  const [channelDetail, setChannelDetail] = useState(null)
  const [channelVideos, setChannelVideos] = useState([])

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet,statistics&id=${id}`)
      .then(data => setChannelDetail(data?.items[0]))
    
    fetchFromAPI(`search?part=snippet,id&channelId=${id}&order=date`)
      .then(data => setChannelVideos(data?.items))
  }, [id])

  console.log(channelVideos)

  return (
    <div>
      {id}
    </div>
  )
}

export default ChannelDetail
