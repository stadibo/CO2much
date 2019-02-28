import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Link } from 'react-router-dom'

const Nav = ({ state, setState }) => {
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
          <Tab label="Search" value="/search" component={Link} to="/search" />
          <Tab label="All countries" value="all" component={Link} to="/all" />
          <Tab label="Polluters" value="polluters" component={Link} to="/polluters" />
        </Tabs>
      </AppBar>
    </div>
  )
}

export default Nav