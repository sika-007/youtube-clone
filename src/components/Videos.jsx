import { lazy, Suspense } from 'react'
import { Box, Stack } from "@mui/material";
import { ChannelCard } from "./"
import VideoFallback from './VideoFallback';

const VideoCard = lazy(() => import("./VideoCard"))

const Videos = ({ videos, direction }) => {

  const videoAndChannelElements = videos.map((item, index) => (
    <Box key={index}>
      {item?.id.videoId && <Suspense fallback={<VideoFallback />}><VideoCard video={item} /></Suspense>}
      {item?.id.channelId && <ChannelCard channelDetail={item} />}
    </Box>
  ))


  return (
      <Stack minHeight="70vh" direction={ direction || { xs: "column", sm: "row" }} flexWrap="wrap" justifyContent={{ xs: "center", md: "start" }} alignItems="stretch" gap={2} width="100%">
        {videoAndChannelElements}
      </Stack>
  )
}

export default Videos
