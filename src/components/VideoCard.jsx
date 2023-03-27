import React from 'react'
import { Link } from "react-router-dom"
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material"
import { demoThumbnailUrl, demoVideoUrl, demoChannelUrl, demoVideoTitle, demoChannelTitle } from '../uilities/constants';

const VideoCard = ({ video: { id: { videoId }, snippet } }) => {

  // Come back and implement the time functionality later!!!
  const publishDate =  new Date(snippet.publishedAt)
  const todaysDate = new Date()

  return (
    <Card sx={{ width: { xs: "100%", sm: "320px"}, boxShadow: "none", borderRadius: "0" }}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia 
          alt={snippet?.title}
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          sx={{ width: "100%", height: 180 }}
        />
      </Link>
      <CardContent
        sx={{ backgroundColor: "#1e1e1e", height: "106px" }}
      >
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>  
          <Typography variant="subtitle1" fontWeight="bold" color="#fff" textOverflow="wrap">
            {snippet?.title.slice(0,60).replaceAll("&#39;", "'").replaceAll("&quot;", "'").replaceAll("&amp;", "&") || demoVideoTitle.slice(0, 60).replaceAll("&#39;", "'")}
          </Typography>
        </Link> 
        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
          <Typography variant="subtitle2" fontWeight="bold" color="grey">
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircle sx={{fontSize: 12, color: "grey", marginLeft: "5px"}} />
          </Typography>
        </Link> 
      </CardContent >
    </Card>
  )
}

export default VideoCard
