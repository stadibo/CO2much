import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Link } from 'react-router-dom'

const Footer = ({ state, setState }) => {
  const handleChange = (event, value) => {
    setState({ ...state, value: value })
  }

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={state.value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          variant="fullWidth"
        >
          <Tab label="Search" component={Link} to="/search" />
          <Tab label="All countries" component={Link} to="/all" />
          <Tab label="Comparison" component={Link} to="/comp" />
        </Tabs>
      </AppBar>
    </div>
  )
}

export default Footer