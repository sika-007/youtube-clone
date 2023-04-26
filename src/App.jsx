"use client";

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box } from "@mui/material"
import { ErrorBoundary } from 'react-error-boundary'
import { Navbar, Feed, ChannelDetail, SearchFeed, VideoDetail, ErrorPage } from "./components"


const App = () => {
  return (
    <Router>
      <Box sx={{ background: "#000" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<ErrorBoundary FallbackComponent={ErrorPage}><Feed /></ErrorBoundary>} />
          <Route path="/video/:id" element={<ErrorBoundary FallbackComponent={ErrorPage}><VideoDetail /></ErrorBoundary>} />
          <Route path="/channel/:id" element={<ErrorBoundary FallbackComponent={ErrorPage}><ChannelDetail /></ErrorBoundary>} />
          <Route path="/search/:searchTerm" element={<ErrorBoundary FallbackComponent={ErrorPage}><SearchFeed /></ErrorBoundary>} />
        </Routes>
      </Box>
    </Router>
  )
}

export default App
