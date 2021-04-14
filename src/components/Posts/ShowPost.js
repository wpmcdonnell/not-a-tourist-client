// 1. Imports
// Component & Fragment
import React, { Component, Fragment } from 'react'
import { Redirect, Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'

// 2. Class
class ShowPost extends Component {
  constructor () {
    super()
    this.state = {
      // initially we have no data, no post (null)
      post: null,
      // Delete boolean to manage if we've deleted this post
      deleted: false
    }

    // If we don't use arrow functions, then we need to bind the `this` scope
    // this.deletePost = this.deletePost.bind(this)
  }

  // When this component mounts, make a GET
  // request using the ID param in the front-end route URL
  // and set the state to trigger a re-render
  componentDidMount () {
    const msgAlert = this.props.msgAlert
    // axios(apiUrl + '/posts/' + this.props.match.params.id)
    axios({
      url: `${apiUrl}/posts/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(response => {
        // axios response object contains a `data` key
        // { data: { post: { title... }}}
        // setting the state will force a re-render
        this.setState({ post: response.data.post })
      })
      .then(() => msgAlert({
        heading: 'Post Selected',
        message: 'Probably some good info in this one!',
        variant: 'success'
      }))
      .catch(console.error)
  }

  deletePost = () => {
    const msgAlert = this.props.msgAlert
    // axios.delete(apiUrl + '/posts/' + this.props.match.params.id)
    axios({
      url: apiUrl + '/posts/' + this.props.match.params.id,
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
        this.setState({ deleted: true })
      })
      .then(() => msgAlert({
        heading: 'You just deleted your post',
        message: 'Say "bye bye!"',
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'THIS IS NOT YOUR POST',
        message: 'What do you think your trying to pull!"',
        variant: 'danger'
      }))
      .catch(console.error)
  }

  render () {
    // create a local variable `post` and set it's value
    // to the value of the `post` key on `this.state`
    const { post, deleted } = this.state
    // 2 scenarios: loading, post to show

    let postJsx = ''

    if (deleted) {
      // if deleted is true, we can redirect
      return <Redirect to="/posts"/>
    } else if (!post) {
      // loading, no post yet
      postJsx = <p>Loading...</p>
    } else {
      // we have a post! Display it
      postJsx = (
        <div>
          <h4>{post.title}</h4>
          <p>{post.list}</p>
          <button onClick={this.deletePost}>Delete Me</button>
          <button>
            <Link to={'/update-post/' + this.props.match.params.id}>Update Me</Link>
          </button>
        </div>
      )
    }

    return (
      <Fragment>
        <h1>Just One Post:</h1>
        {postJsx}
      </Fragment>
    )
  }
}

// 3. Exports
export default withRouter(ShowPost)
