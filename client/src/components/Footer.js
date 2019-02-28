import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const Footer = ({ state, setState }) => {
  const handleChange = (event, value) => {
    console.log(value)
    setState({ ...state, value: value });
  }

  return (
    <AppBar position="absolute" color="default" style={{ top: "auto", bottom: "0" }}>
      <Tabs
        value={state.value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        variant="fullWidth"
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
    </AppBar>
  )
}

export default Footer