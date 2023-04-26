import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Videos } from './';
import { fetchFromAPI } from '../uilities/fetchFromAPI';
import { useErrorBoundary } from 'react-error-boundary';
import VideosFallBack from './VideosFallBack';
import { height } from '@mui/system';

const VideoDetail = () => {

  const [videoDetail, setVideoDetail] = useState(null)
  const [videos, setVideos] = useState(null)
  const [seeMoreDescription, setSeeMoreDescription] = useState(false)
  const { showBoundary } = useErrorBoundary()
  const { id } = useParams();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then(data => {
        setVideoDetail(data.items[0])
        setLoading(false)
    })
      .catch((err) => showBoundary(err))

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then(data => {
        setVideos(data.items)
        setLoading(false)
      })
      .catch((err) => {
        showBoundary(err)
      })
  }, [id])

  console.log(videoDetail)
  if (!videoDetail?.snippet) {
    return <div style={{ minHeight: "89vh", background: "#000", display: "flex", flexDirection: 'column', justifyContent: "center"}}><VideosFallBack /></div>
  }

  const { snippet: { title, channelId, channelTitle, tags, publishedAt, description }, statistics: { viewCount, likeCount } } = videoDetail

  // This is logic to show the time elapsed since the video was published
  const publishSecondsAgo =  Math.ceil(new Date(publishedAt).getTime() / 1000)
  const todayInSeconds = Math.ceil(new Date().getTime() / 1000)
  let timeSincePublish

  const getSeconds = Math.floor(todayInSeconds - publishSecondsAgo);
  const getMinutes = Math.floor((todayInSeconds - publishSecondsAgo) / (60));
  const getHours = Math.floor((todayInSeconds - publishSecondsAgo) / (60*60));
  const getDays = Math.floor((todayInSeconds - publishSecondsAgo) / (60*60*24));
  const getWeeks = Math.floor((todayInSeconds - publishSecondsAgo) / (60*60*24*7));
  const getMonths =  Math.floor((todayInSeconds - publishSecondsAgo) / (60*60*24*30));
  const getYears = Math.floor((todayInSeconds - publishSecondsAgo) / (60*60*24*365.25));

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

  //Tag element mapping
  const tagElements = tags?.map((tag, index) => {
    return (
      <Link key={index} to={`/search/${tag}`}>
        <Box sx={{ background: "#1e1e1e", width: "fit-content", padding: "3px", cursor: "pointer" }}>
          <Typography color="blue" lineHeight={1.2} fontSize={12}>
            #{tag}
          </Typography>
        </Box>
      </Link>
    )
  })

  //This is the function for a more user-friendly render of the like count and the view count

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
    <Box minHeight="90vh">
      <Stack direction={{ xs: "column", md: "row" }} height="100%">
        {loading && <VideosFallBack />}
        <Box flex={1} height={{ sm: "100%", md: "90vh"}} overflow="scroll" sx={{ overscrollBehavior: "contain" }}>
          <Box sx={{ width: "100%", minHeight: "100%", py: "1rem" }}>
            <ReactPlayer controls className="react-player" url={`https://www.youtube.com/watch?v=${id}`} />
            <Typography textAlign="left" color="grey" fontSize={11} px={2} pt={1}>
              {timeSincePublish}
            </Typography>
            <Typography color="#fff" variant='h5' fontWeight="bold" px={2}>
              {title}
            </Typography>
            <Typography textAlign="left" color="grey" fontSize={11} px={2} sx={{ whiteSpace: "pre-line" }} pt={1}>
              {seeMoreDescription ? description : `${description.slice(0, 100)}...`} <span style={{ fontWeight: "bold", cursor: "pointer", color:"#fff" }} onClick={() => setSeeMoreDescription(prev => !prev)}>See <b>{seeMoreDescription ? "less" : "more"}</b></span>
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant="subtitle1" color="#fff">
                  {channelTitle}
                  <CheckCircle sx={{ fontSize: "12px", color: "grey", marginLeft: "5px" }}/>  
                </Typography>
              </Link>
              <Stack direction={{ xs: "column", sm:  'row' }} gap="0.5rem" alignItems="center" >
                <Typography variant="body1" fontSize={12} sx={{ opacity: 0.7 }}>
                  {viewCount && `${formatCount(viewCount)} views`}
                </Typography>
                <Typography variant="body1" fontSize={12} sx={{ opacity: 0.7 }}>
                  {likeCount && `${formatCount(likeCount)} likes`}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" gap="10px" ml="1rem" flexWrap="wrap">
              {tagElements}
            </Stack>
          </Box>
        </Box>
        <Box height={{ sm: "100%", md: "90vh" }} overflow={{ sm: "unset", md: "scroll" }}>
          <Box px={2} py={{ xs: 5, md: 1 }} justifyContent="center" alignItems="center">
            {videos && <Videos videos={videos} direction="column" />}
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail
