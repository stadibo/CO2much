import React from 'react'
import Switch from '@material-ui/core/Switch'

const SwitchInput = ({ state, setState }) => {
  const handleChange = event => {
    console.log(event.target.checked)
    let checked = event.target.checked
    setState({
      checked: checked
    })
  }

  return (
    <div>
      <Switch
        checked={state.perCapita}
        onChange={handleChange}
        value="perCapita"
        color="primary"
      />
    </div>
  )
}

export default SwitchInput