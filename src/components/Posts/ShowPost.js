// 1. Imports
// Component & Fragment
import React, { Component, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
// import Comments from './Comments'
import Button from 'react-bootstrap/Button'
import Comments from './Comments'
import IndexComments from './IndexComments'
import axios from 'axios'
import apiUrl from './../../apiConfig'

// 2. Class
class ShowPost extends Component {
  constructor () {
    super()
    this.rerenderParentCallback = this.rerenderParentCallback.bind(this)
    this.state = {
      // initially we have no data, no post (null)
      post: null,

      toUpdate: false,
      // Delete boolean to manage if we've deleted this post
      deleted: false,
      commentValue: 0,
      indexValue: 1
    }

    // If we don't use arrow functions, then we need to bind the `this` scope
    // this.deletePost = this.deletePost.bind(this)
  }

  rerenderParentCallback () {
    setTimeout(function () {
      this.setState({ commentValue: this.state.commentValue + 1, indexValue: this.state.indexValue + 1 })
    }.bind(this), 1000)
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

  update = (event) => {
    // Upon successful delete, we want to do something
    // a common pattern w/ React is when something happens
    // We modify the state
    // State change forces a re-render
    return this.setState({ toUpdate: true })
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
    const { post, deleted, toUpdate } = this.state
    // 2 scenarios: loading, post to show

    let postJsx = ''

    if (deleted) {
      // if deleted is true, we can redirect
      return <Redirect to="/posts"/>
    } else if (toUpdate) {
      return <Redirect to={'/posts/' + this.props.match.params.id + '/update'}/>
    } else if (!post) {
      // loading, no post yet
      postJsx = <p>Loading...</p>
    } else {
      // we have a post! Display it
      postJsx = (
        <div>
          <h4>- {post.title}</h4>
          <p className='show-post-text'>{post.list}</p>
          {post.owner === this.props.user._id && <Button variant='primary' onClick={this.deletePost}>Delete Me</Button>}
          {post.owner === this.props.user._id && <Button variant='primary' onClick={this.update}>Update Me</Button>}
        </div>
      )
    }

    return (
      <Fragment>
        <h1>Just One Post:</h1>
        {postJsx}
        <Comments key={this.state.commentValue} rerenderParentCallback={this.rerenderParentCallback} {...this.props} />
        <IndexComments key={this.state.indexValue} {...this.props} />
      </Fragment>

    )
  }
}

// 3. Exports
export default withRouter(ShowPost)
