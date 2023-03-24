import React from 'react'
import { Stack } from '@mui/material'
import { categories } from '../uilities/constants'

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {

  const categoryElements = categories.map((category, index) => (
      <button key={category.name} className="category-btn" style={{ background: category.name === selectedCategory && "#FC1503", color: "white"}} onClick={() => setSelectedCategory(category.name)}>
        <span style={{ color: category.name === selectedCategory ? "white" : "red", marginRight: "15px"}}><category.icon /></span>
        <span style={{opacity: selectedCategory === category.name ? "1" : "0.5"}}>{category.name}</span>
      </button>
  ))

  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
        flexDirection: { md: "column" }
      }}
    >
      {categoryElements}
    </Stack>
  )
}

export default Sidebar