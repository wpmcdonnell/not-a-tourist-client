// imports
import React, { Component, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../apiConfig'
import { Card } from 'react-bootstrap'

// class
class TYOUpdatePicture extends Component {
  constructor () {
    super()

    this.state = {
      picture: {
        url: '',
        title: '',
        list: ''
      },
      updated: false,
      cancel: false
    }
  }

  componentDidMount () {
    // When the update page loads, we want to see the
    // data of the current post we're updating
    // so this is a SHOW request (GET) to /posts/:id
    // This is not the update
    axios({
      url: `${apiUrl}/tokyo-posts-pictures/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(response => {
        // { data: { post: { title: ... }}}
        this.setState({ picture: response.data.picture })
      })
      .catch(console.error)
  }

  handleChange = (event) => {
    // BAD: will override the author
    // this.setState({ post: { title: 'value'} })
    // Allows us to be able to access event.target
    // inside of the setState callback function
    event.persist()

    // Modify the state (merging it w/ the current state)
    // setState when provided a callback function will give us parameters
    // which are the "current"/"old" state & props
    this.setState(oldState => {
      // variable for the value & the name of the input
      const value = event.target.value
      const name = event.target.name

      // Create an object for the updated information
      // { title: 'Erons Boo' }
      // { 'name': 'value' }
      const updatedField = { [name]: value }
      // spread ... operator "spreads" out values in objects & arrays
      // ...[1, 2, 3, 4] => 1, 2, 3, 4
      // ...{ title: 'erons post', author: 'eron' } =>
      // title: 'erons post', author: 'eron'
      // { title: 'Current', author: 'Current', title: 'E' } =>
      // { author: 'Current', title: 'E' }
      return { picture: { ...oldState.picture, ...updatedField } }
    })
  }

  handleSubmit = (event) => {
    // Form submits by default in the browser throw the data from the form
    // into the URL and refresh the page to make a GET request
    event.preventDefault()
    // All we want to do is make a patch request w/ our data
    // which is in our state

    axios({
      method: 'PATCH',
      url: `${apiUrl}/tokyo-posts-pictures/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: {
        picture: {
          title: this.state.picture.title,
          list: this.state.picture.list
        }
      }
    })
      .then(() => {
        // Set the state!
        this.setState({ updated: true })
      })
      .catch(console.error)
  }

  cancel = (event) => {
    return this.setState({ cancel: true })
  }

  render () {
    const updatePostStyle = {
      display: 'flex',
      alignItems: 'center',
      paddingTop: '1rem',
      marginLeft: '1rem',
      marginRight: '1rem'
    }

    const { cancel } = this.state

    if (this.state.updated || cancel) {
      return <Redirect to={'/tokyo-posts/' + this.props.match.params.id}/>
    }
    return (
      <Fragment>
        <div style={updatePostStyle} className=' update-page mb-5'>
          <div className='mx-auto'>
            <h1 className='mb-3'>Ch-ch-changes... make dem changes</h1>
            <Card className='mt-2 mx-auto mb-3 shadow-lg bg-white rounded' style={{ width: '18rem' }}>
              <Card.Body className=''>
                <Card.Title>
                  <Card.Img variant="top" src={this.state.picture.url}/>
                </Card.Title>
              </Card.Body>
            </Card>
            <form onSubmit={this.handleSubmit}>
              <input
                className='form-control mb-2'
                type="text"
                name="title"
                placeholder="Post Title"
                value={this.state.picture.title}
                onChange={this.handleChange}
              />
              <textarea
                className="form-control mb-2"
                rows='7'
                type="text"
                name="list"
                placeholder="Post list"
                value={this.state.picture.list}
                onChange={this.handleChange}
              />
              <button className='btn btn-primary mb-4 shadow-sm' type="submit">Update</button>
            </form>
            <button className='btn btn-primary shadow-sm' onClick={this.cancel}>Cancel</button>
          </div>
        </div>
      </Fragment>
    )
  }
}

// exports
export default withRouter(TYOUpdatePicture)
