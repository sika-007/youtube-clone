import React from 'react'
import { Link } from "react-router-dom"
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material"
import { demoThumbnailUrl, demoVideoUrl, demoChannelUrl, demoVideoTitle, demoChannelTitle } from '../uilities/constants';

const VideoCard = ({ video: { id: { videoId }, snippet }, video }) => {

  const publishSecondsAgo =  Math.ceil(new Date(snippet.publishedAt).getTime() / 1000)
  const todayInSeconds = Math.ceil(new Date().getTime() / 1000)

  console.log(video)

  const getSeconds = Math.floor(todayInSeconds - publishSecondsAgo);
  const getMinutes = Math.floor((todayInSeconds - publishSecondsAgo) / (60));
  const getHours = Math.floor((todayInSeconds - publishSecondsAgo) / (60*60));
  const getDays = Math.floor((todayInSeconds - publishSecondsAgo) / (60*60*24));
  const getWeeks = Math.floor((todayInSeconds - publishSecondsAgo) / (60*60*24*7));
  const getMonths =  Math.floor((todayInSeconds - publishSecondsAgo) / (60*60*24*30));
  const getYears = Math.floor((todayInSeconds - publishSecondsAgo) / (60*60*24*365.25));
  let timeSincePublish

  if (todayInSeconds - publishSecondsAgo < 60) {
    timeSincePublish = `${getSeconds} second${getSeconds > 1 ? "s" : ""} ago`
  } else if (todayInSeconds - publishSecondsAgo < 60*60) {
    timeSincePublish = `${getMinutes} minute${getMinutes > 1 ? "s" : ""} ago`
  } else if (todayInSeconds - publishSecondsAgo < 60*60*24) {
    timeSincePublish = `${getHours} hour${getHours > 1 ? "s" : ""} ago`
  } else if (todayInSeconds - publishSecondsAgo < 60*60*24*7) {
    timeSincePublish = `${getDays} day${getDays > 1 ? "s" : ""} ago`
  } else if (todayInSeconds - publishSecondsAgo < 60*60*24*7*4) {
    timeSincePublish = `${getWeeks} week${getWeeks > 1 ? "s" : ""} ago`
  } else if (todayInSeconds - publishSecondsAgo < 60*60*24*365.25) {
    timeSincePublish = `${getMonths} month${getMonths > 1 ? "s" : ""} ago`
  } else {
    timeSincePublish = `${getYears} year${getYears > 1 ? "s" : ""} ago`
  }

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
        sx={{ backgroundColor: "#1e1e1e", height: "106px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
      >
        <div>
          <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>  
            <Typography variant="subtitle1" fontWeight="bold" color="#fff" textOverflow="wrap">
              {`${snippet?.title.slice(0,60).replaceAll("&#39;", "'").replaceAll("&quot;", "'").replaceAll("&amp;", "&") || demoVideoTitle.slice(0, 60).replaceAll("&#39;", "'")}${snippet?.title.length > 60 ? "..." : "" }`}
            </Typography>
          </Link> 
          <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
            <Typography variant="subtitle2" fontWeight="bold" color="grey">
              {snippet?.channelTitle || demoChannelTitle}
              <CheckCircle sx={{fontSize: 12, color: "grey", marginLeft: "5px"}} />
            </Typography>
          </Link> 
        </div>
        <Typography color="grey" fontSize={10}>
          {timeSincePublish}
        </Typography>
      </CardContent >
    </Card>
  )
}

export default VideoCard
