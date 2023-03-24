import React from 'react';
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom"
import { demoProfilePicture } from '../uilities/constants';

const ChannelCard = ({channelDetail}) => {
  

  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        width: { xs: "100%", sm: "320px"},
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
      }}
    >
      <Link to={`/channel/${channelDetail?.id?.channelId}`}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
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
          {channelDetail?.statistics?.subscriberCount &&
            <Typography>
              {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString()} Subscribers
            </Typography>
          }

        </CardContent>
      </Link>
    </Box>
  )
}

export default ChannelCard
