import React from 'react'
import { Box, Typography } from '@mui/material'
import { Earth } from '../../assets'
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary'

const ErrorPage = ({error, resetErrorBoundary}) => {


  return (
    <Box sx={{ minHeight: "89vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
        <img src={Earth} alt="error earth" width={200} />
        <Typography variant="h5" color="white" textAlign="center">
            Sorry, we cannot access the content you are looking for...
        </Typography>
        <Typography variant='body2' color="red">
          "{error.message}"
        </Typography>
        <button onClick={() => {
            resetErrorBoundary()
        }} className="category-btn">
            <Typography sx={{color: "white"}}>Reload Page</Typography>
        </button>
    </Box>
  )
}

export default ErrorPage
