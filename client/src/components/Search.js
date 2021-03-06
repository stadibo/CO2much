import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core';

const Search = ({ state, setState, sendRequest }) => {
  const handleChange = (e) => {
    const input = e.target.value
    const inputLength = input.length
    const newSuggestions = state.keys.filter(val => {
      return val.countryOrArea.toLowerCase().slice(0, inputLength).includes((input.toLowerCase()))
    })
    const suggestionString = newSuggestions.reduce((str, val, index) => {
      if (index < 7) {
        str = str.concat((str === "" ? val.countryOrArea : `, ${val.countryOrArea}`))
      }
      return str
    }, "")

    setState({
      ...state,
      input: input,
      suggestions: newSuggestions,
      suggestionString: suggestionString
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const searched = state.suggestions[0]
    if (searched) {
      sendRequest(searched.key)
    }
  }

  return (
    <div style={{ paddingBottom: "5px", textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              name='input'
              label='Enter country name (submit to get 1st suggestion)'
              type='text'
              fullWidth
              value={state.input}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <div style={{ float: "left" }} >
              <Typography variant="caption" >{state.suggestionString}</Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{ float: "left", padding: "0em 0em 0em 0em" }} >
              <Button variant="outlined" type="submit" color='primary'>
                Submit
             </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div >
  )
}

export default Search