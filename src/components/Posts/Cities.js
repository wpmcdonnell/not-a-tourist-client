// IndexComments component - class component
// When the component mounts, we'll make a GET request
// to "index" the comments, then display those comments

// 1. Imports
import React, { Component, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
// import { Link } from 'react-router-dom'
// axios package (HTTP requests)
// const axios = require('axios')

// apiUrl from apiConfig.js

// 2. The class
class Cities extends Component {
  // 2 very important React class component methods
  // constructor & render
  constructor () {
    // Set up the constructor, allow us to override some of what
    // we inherit
    super()

    // useFUL constructor sets state
    this.state = {
      // We'll be modifying the state after we get our data
      // initially we have no data & our state should show that
      ny: false,
      seattle: false,
      districtOfColumbia: false,
      losAngeles: false
    }
  }

  newYork = (event) => {
    return this.setState({ newYork: true })
  }

  seattle = (event) => {
    return this.setState({ seattle: true })
  }

  districtOfColumbia = (event) => {
    return this.setState({ districtOfColumbia: true })
  }

  losAngeles = (event) => {
    return this.setState({ losAngeles: true })
  }

  // componentDidMount will be run when the component finished mounting
  // AFTER the FIRST render
  componentDidMount () {
  }

  // render is REQUIRED for any class component
  render () {
    const { newYork, seattle, districtOfColumbia, losAngeles } = this.state
    if (newYork) {
      // if deleted is true, we can redirect
      return <Redirect to="/ny-posts"/>
    } else if (seattle) {
      return <Redirect to="/posts/SE"/>
    } else if (districtOfColumbia) {
      return <Redirect to="/posts/DC"/>
    } else if (losAngeles) {
      return <Redirect to="/posts/LA"/>
    }

    return (
      <Fragment>
        <div id='city-buttons'>
          <Button variant='primary' onClick={this.newYork}>NY</Button>
          <Button variant='primary' onClick={this.seattle}>Seattle</Button>
          <Button variant='primary' onClick={this.districtOfColumbia}>DC</Button>
          <Button variant='primary' onClick={this.losAngeles}>LA</Button>
        </div>
      </Fragment>
    )
  }
}

// 3. The export
export default withRouter(Cities)
