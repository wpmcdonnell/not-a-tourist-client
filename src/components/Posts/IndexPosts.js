// IndexPosts component - class component
// When the component mounts, we'll make a GET request
// to "index" the posts, then display those posts

// 1. Imports
import React, { Component, Fragment } from 'react'

import { Redirect, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { Card } from 'react-bootstrap'
// axios package (HTTP requests)
// const axios = require('axios')
import axios from 'axios'
// apiUrl from apiConfig.js
import apiUrl from './../../apiConfig'
import moment from 'moment'

// 2. The class
class IndexPosts extends Component {
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
      url: `${apiUrl}/posts`,
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
      paddingTop: '2rem',
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
      return <Redirect to={'/create-post'}/>
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
                  <Link to={`/posts/${post._id}`}>{post.title}</Link>
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
        <div style={indexPostStyle}>
          <div className='mx-auto mb-5'>
            <h1 className='mb-1'>GENERAL TOPICS</h1>
            <Button className='mb-1' variant='primary' onClick={this.create}>Create a Post</Button>
            <h3 className='mb-3'>Check out all the sweet posts</h3>
            {postsJsx}
          </div>
        </div>
      </Fragment>
    )
  }
}

// 3. The export
export default IndexPosts
