// IndexComments component - class component
// When the component mounts, we'll make a GET request
// to "index" the comments, then display those comments

// 1. Imports
import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'
// import { Link } from 'react-router-dom'
// axios package (HTTP requests)
// const axios = require('axios')
import axios from 'axios'
// apiUrl from apiConfig.js
import apiUrl from './../../apiConfig'
import moment from 'moment'
import Linkify from 'react-linkify'

// 2. The class
class IndexComments extends Component {
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
      comments: null,
      value: 0
    }
  }

  // componentDidMount will be run when the component finished mounting
  // AFTER the FIRST render
  componentDidMount () {
    const user = this.props.user
    // axios request will go here
    // default to a GET request
    axios({
      url: `${apiUrl}/comments`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(response => {
        // Set the state to hold the array of comments
        // this will cause a re-render
        this.setState({ comments: response.data.comments })
      })
      .catch(console.error)
  }

  deleteComment = (event) => {
    const msgAlert = this.props.msgAlert
    // axios.delete(apiUrl + '/posts/' + this.props.match.params.id)
    axios({
      url: apiUrl + '/comments/' + event.target.id,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(response => {
      // Upon successful delete, we want to do something
      // a common pattern w/ React is when something happens
      // We modify the state
      // State change forces a re-render
        this.setState({ value: this.state.value + 1 })
      })
      .then(response => {
        this.props.rerenderParentCallback()
      })
      .then(() => msgAlert({
        heading: 'You just deleted your comment',
        message: 'Say "bye bye!"',
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'THIS IS NOT YOUR comment',
        message: 'What do you think your trying to pull!"',
        variant: 'danger'
      }))
      .catch(console.error)
  }

  // render is REQUIRED for any class component
  render () {
    // 1 thing the render method does is "render" JSX
    // That means `return`ing JSX
    // Every component in react is independent & so it MUST
    // have a top-level element to contain whatever else is in it

    // 3 scenarios: loading, post list, no comments (empty db)
    // if statements to control the value of a variable (JSX)
    // then display that variable in the return
    let commentsJsx = ''
    // let commentsJsx = (<p>{this.state.comments.filter(comments => comments.postOwner === this.params.match.id)}</p>)

    if (!this.state.comments) {
      // if the comments state is null
      commentsJsx = <p>Loading...</p>
    } else if (this.state.comments.length === 0) {
      // if comments array has length of 0 it's empty
      commentsJsx = <p>No comments! Go create some.</p>
    } else {
      // we have comments! display them
      commentsJsx = (
        <div className='ml-2'>
          {this.state.comments.filter(comments => comments.postOwner === this.props.match.params.id).map(filteredComments => (
            <div key={filteredComments._id}>
              <i className='owner'>{filteredComments.ownerName} <i className='comment-date d-inline'> ... {moment(filteredComments.createdAt).startOf('hour').fromNow()} </i> </i>
              <p className='show-comment-text ml-3 mt-1'><Linkify>{filteredComments.text}</Linkify></p>
              {filteredComments.owner === this.props.user._id && <a
                href='javascript:;' className='delete-comment-link d-inline d-flex justify-content-end mr-2' id={filteredComments._id} onClick={this.deleteComment}>Delete
              </a>
              }
            </div>
          ))}
        </div>
      )
    }

    // Variable is referenced as JS in the JSX block
    return (
      <Fragment>
        <div key={this.state.value}>
          {commentsJsx}
        </div>
      </Fragment>
    )
  }
}

// 3. The export
export default withRouter(IndexComments)
