import React from 'react'
import { Box, Stack } from "@mui/material";
import { VideoCard, ChannelCard } from "./"

const Videos = ({ videos }) => {

  const videoAndChannelElements = videos.map((item, index) => (
    <Box key={index}>
      {item.id.videoId && <VideoCard video={item} />}
      {item.id.channelId && <ChannelCard channelDetail={item} />}
    </Box>
  ))

  return (
      <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={2} width="100%">
        {videoAndChannelElements}
      </Stack>
  )
}

export default Videos
