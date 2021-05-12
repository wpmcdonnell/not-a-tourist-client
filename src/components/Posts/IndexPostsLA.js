// IndexPosts component - class component
// When the component mounts, we'll make a GET request
// to "index" the posts, then display those posts

// 1. Imports
import React, { Component, Fragment } from 'react'
import Button from 'react-bootstrap/Button'
import { Redirect, Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
// axios package (HTTP requests)
// const axios = require('axios')
import axios from 'axios'
// apiUrl from apiConfig.js
import apiUrl from './../../apiConfig'
import moment from 'moment'

// 2. The class
class IndexPostsLA extends Component {
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
      posts: null,
      create: false
    }
  }

  // componentDidMount will be run when the component finished mounting
  // AFTER the FIRST render
  componentDidMount () {
    const user = this.props.user
    // axios request will go here
    // default to a GET request
    axios({
      url: `${apiUrl}/la-posts`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(response => {
        // Set the state to hold the array of posts
        // this will cause a re-render
        this.setState({ posts: response.data.posts.reverse() })
      })
      .catch(console.error)
  }

  create = (event) => {
    return this.setState({ create: true })
  }

  // render is REQUIRED for any class component
  render () {
    const indexPostStyle = {
      display: 'flex',
      alignItems: 'center',
      paddingTop: '1rem',
      marginLeft: '1rem',
      marginRight: '1rem'
    }
    const { create } = this.state
    // 1 thing the render method does is "render" JSX
    // That means `return`ing JSX
    // Every component in react is independent & so it MUST
    // have a top-level element to contain whatever else is in it

    // 3 scenarios: loading, post list, no posts (empty db)
    // if statements to control the value of a variable (JSX)
    // then display that variable in the return
    let postsJsx = ''

    if (create) {
      return <Redirect to={'/create-post-la'}/>
    } else if (!this.state.posts) {
      // if the posts state is null
      postsJsx = <p>Loading...</p>
    } else if (this.state.posts.length === 0) {
      // if posts array has length of 0 it's empty
      postsJsx = <p>No posts! Go create some.</p>
    } else {
      // we have posts! display them
      postsJsx = (
        <div className='mb-1'>
          {this.state.posts.map(post => (
            <Card className='mb-2'style={{ }} key={post._id}>
              <Card.Body>
                <Card.Title>
                  <Link to={`/la-posts/${post._id}`}>{post.title}</Link>
                </Card.Title>
                <p className='post-index-date d-inline'>{moment(post.createdAt).startOf('hour').fromNow()} </p>
              </Card.Body>
            </Card>
          ))}
        </div>
      )
    }

    // Variable is referenced as JS in the JSX block
    return (
      <Fragment>
        <div className='index-posts'style={indexPostStyle}>
          <div className='mx-auto mb-5'>
            <Link className='text-black mb-3' to={'/cities/'}> <h5> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg> Cities </h5> </Link>
            <h1 className='mb-1'>Los Angeles, CA</h1>
            <Button className='mb-2' variant='primary' onClick={this.create}>Create a Post</Button>
            <h3 className='mb-3'>Check out all the sweet posts</h3>
            {postsJsx}
          </div>
        </div>

      </Fragment>
    )
  }
}

// 3. The export
export default IndexPostsLA
