// imports
import React, { Component, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'

// class
class UpdatePostLA extends Component {
  constructor () {
    super()

    this.state = {
      post: {
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
      url: `${apiUrl}/la-posts/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(response => {
        // { data: { post: { title: ... }}}
        this.setState({ post: response.data.post })
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
      return { post: { ...oldState.post, ...updatedField } }
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
      url: `${apiUrl}/la-posts/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: {
        post: {
          title: this.state.post.title,
          list: this.state.post.list
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
      paddingTop: '1rem'
    }

    const { cancel } = this.state

    if (this.state.updated || cancel) {
      return <Redirect to={'/la-posts/' + this.props.match.params.id}/>
    }
    return (
      <Fragment>
        <div style={updatePostStyle} className=''>
          <div className='col-10 mx-auto mb-5'>
            <h1>Update a post</h1>
            <form onSubmit={this.handleSubmit}>
              <input
                className='form-control mb-2'
                type="text"
                name="title"
                placeholder="Post Title"
                value={this.state.post.title}
                onChange={this.handleChange}
              />
              <textarea
                className="form-control mb-2"
                rows='10'
                type="text"
                name="list"
                placeholder="Post list"
                value={this.state.post.list}
                onChange={this.handleChange}
              />
              <button className='btn btn-primary mb-4' type="submit">Update</button>
            </form>
            <button className='btn btn-primary' onClick={this.cancel}>Cancel</button>
          </div>
        </div>
      </Fragment>
    )
  }
}

// exports
export default withRouter(UpdatePostLA)
