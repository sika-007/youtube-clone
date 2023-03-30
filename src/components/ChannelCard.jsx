import React from 'react';
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom"
import { demoProfilePicture } from '../uilities/constants';

const ChannelCard = ({ channelDetail, marginTop }) => {

  function formatCount(num) {
    if (num < 1000) {
      return `${num}`
    } else if (num < 1000000) {
      const formNum = num/1000
      if (formNum < 10) {
        return `${formNum.toFixed(2)}k`
      } else if (formNum < 100) {
        return `${formNum.toFixed(1)}k`
      } else {
        return `${formNum.toFixed(0)}k`
      }
    } else if (num < 1000000000) {
      const formNum = num/1000000
      if (formNum < 10) {
        return `${formNum.toFixed(2)}M`
      } else if (formNum < 100) {
        return `${formNum.toFixed(1)}M`
      } else {
        return `${formNum.toFixed(0)}M`
      }
    } else {
      const formNum = num/1000000000
      if (formNum < 10) {
        return `${formNum.toFixed(2)}B`
      } else if (formNum < 100) {
        return `${formNum.toFixed(1)}B`
      } else {
        return `${formNum.toFixed(0)}B`
      }
    }
  }

  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        width: { xs: "100%", sm: "320px"},
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        zIndex: 20,
        marginTop,
      }}
    >
      <Link to={`/channel/${channelDetail?.id?.channelId || channelDetail?.id}`}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <CardMedia 
            alt={channelDetail?.snippet?.title} 
            image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture} 
            sx={{ width: "180px", height: "180px", borderRadius:"50%", border: "1px solid #e3e3e3" }}
          />
          <Typography variant='h6' sx={{display: "inline-flex", alignItems: "center", justifyContent: "center"}}>
            {channelDetail?.snippet?.title}
            <CheckCircle sx={{fontSize: 20, color: "grey", marginLeft: "5px"}} />
          </Typography>
          {channelDetail?.statistics?.subscriberCount && !channelDetail?.statistics?.hiddenSubscriberCount &&
            <Typography>
              {formatCount(channelDetail?.statistics?.subscriberCount)} Subscribers
            </Typography>
          }
          {channelDetail?.statistics?.videoCount && !channelDetail?.statistics?.hiddenSubscriberCount &&
            <Typography>
              {formatCount(channelDetail?.statistics?.videoCount)} Videos
            </Typography>
          }
        </CardContent>
      </Link>
    </Box>
  )
}

export default ChannelCard
