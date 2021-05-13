// IndexComments component - class component
// When the component mounts, we'll make a GET request
// to "index" the comments, then display those comments

// 1. Imports
import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
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
      losAngeles: false,
      tokyo: false,
      paris: false
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

  paris = (event) => {
    return this.setState({ paris: true })
  }

  tokyo = (event) => {
    return this.setState({ tokyo: true })
  }

  // componentDidMount will be run when the component finished mounting
  // AFTER the FIRST render
  componentDidMount () {
  }

  // render is REQUIRED for any class component
  render () {
    const cardContainerLayout = {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-around',
      alignContent: 'center'
    }

    const { newYork, seattle, districtOfColumbia, losAngeles, tokyo, paris } = this.state
    if (newYork) {
      // if deleted is true, we can redirect
      return <Redirect to="/ny-posts"/>
    } else if (seattle) {
      return <Redirect to="/se-posts"/>
    } else if (districtOfColumbia) {
      return <Redirect to="/dc-posts"/>
    } else if (losAngeles) {
      return <Redirect to="/la-posts"/>
    } else if (tokyo) {
      return <Redirect to="/tokyo-posts"/>
    } else if (paris) {
      return <Redirect to="/paris-posts"/>
    }

    return (
      <div className='pt-5'>
        <div className='row col-lg-9 mx-auto'style={cardContainerLayout}>
          <Card className="mb-5 shadow" style={{ width: '18rem' }}>
            <Card.Img variant="top" src="ny.png"/>
            <Card.Body>
              <Card.Title>New York, New York</Card.Title>
              <Button className='m' variant='primary' onClick={this.newYork}>NY</Button>
            </Card.Body>
          </Card>
          <Card className="mb-5 shadow" style={{ width: '18rem' }}>
            <Card.Img variant="top" src="se.png"/>
            <Card.Body>
              <Card.Title>Seattle, WA</Card.Title>
              <Button variant='primary' onClick={this.seattle}>SE</Button>
              <Link to='/se-fashion/' className='align-self-end'> Fashion </Link>
            </Card.Body>
          </Card>
          <Card className="mb-5 shadow" style={{ width: '18rem' }}>
            <Card.Img variant="top" src="la.jpeg"/>
            <Card.Body>
              <Card.Title>Los Angeles, CA</Card.Title>
              <Button variant='primary' onClick={this.losAngeles}>LA</Button>
              <Link to='/la-fashion/' className='align-self-end'> Fashion </Link>
            </Card.Body>
          </Card>
          <Card className="mb-5 shadow" style={{ width: '18rem' }}>
            <Card.Img variant="top" src="dc.jpeg"/>
            <Card.Body>
              <Card.Title>Washington, DC</Card.Title>
              <Button variant='primary' onClick={this.districtOfColumbia}>DC</Button>
            </Card.Body>
          </Card>
          <Card className="mb-5 shadow" style={{ width: '18rem' }}>
            <Card.Img variant="top" src="tokyo.jpeg"/>
            <Card.Body>
              <Card.Title>Tokyo, JP </Card.Title>
              <Button variant='primary' onClick={this.tokyo}>TYO</Button>
            </Card.Body>
          </Card>
          <Card className="mb-5 shadow" style={{ width: '18rem' }}>
            <Card.Img variant="top" src="paris.jpeg"/>
            <Card.Body>
              <Card.Title>Paris, FR</Card.Title>
              <Button variant='primary' onClick={this.paris}>PAR</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    )
  }
}

// 3. The export
export default withRouter(Cities)
