// 1. Imports
// Component & Fragment
import React, { Component, Fragment } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
// import Comments from './Comments'
import Comments from './Comments'
import IndexComments from './IndexComments'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import moment from 'moment'

// 2. Class
class ShowPostPAR extends Component {
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
    }.bind(this), 250)
  }

  componentDidMount () {
    // axios(apiUrl + '/posts/' + this.props.match.params.id)
    axios({
      url: `${apiUrl}/paris-posts/${this.props.match.params.id}`,
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
      .catch(console.error)
  }

  handleSubmit = (event) => {
    const user = this.props.user
    // Prevent the page from refreshing!
    event.preventDefault()
    // axios.post(`${apiUrl}/posts`, {
    //   post: this.state.post
    // })
    axios({
      url: `${apiUrl}/comments`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { comment: this.state.comment }
    })
      .then(response => {
        // Reset the form by resetting the state to empty values
        // this.setState({ post: { title: '', list: '' } })
        // Boolean did we do the thing
        // this.setState({ created: true })
        // Store the ID of the created post
        this.setState({ createdId: response.data.comment._id })
      })
      .catch(console.error)
  }

  handleChange = (event) => {
    event.persist()
    event.preventDefault()
    this.setState(oldState => {
      const value = event.target.value
      const name = event.target.name

      const updatedField = { [name]: value }

      // spread operator ends up merging these two objects
      return { comment: { ...oldState.comment, ...updatedField } }
    })
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
      url: apiUrl + '/paris-posts/' + this.props.match.params.id,
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
    const showPostStyle = {
      display: 'flex',
      alignItems: 'center',
      paddingTop: '1rem'
    }
    // create a local variable `post` and set it's value
    // to the value of the `post` key on `this.state`
    const { post, deleted, toUpdate } = this.state
    // 2 scenarios: loading, post to show

    let postJsx = ''

    if (deleted) {
      // if deleted is true, we can redirect
      return <Redirect to="/paris-posts"/>
    } else if (toUpdate) {
      return <Redirect to={'/paris-posts/' + this.props.match.params.id + '/update'}/>
    } else if (!post) {
      // loading, no post yet
      postJsx = <p>Loading...</p>
    } else {
      // we have a post! Display it
      postJsx = (
        <div className='mb-2 mx-auto'>
          <h4>- {post.title}</h4>
          <p className='post-date mb-3'>{moment(post.createdAt).startOf('hour').fromNow()} by <p className='text-primary d-inline'> {post.ownerName} </p></p>
          <p className='show-post-text'>{post.list}</p>
          {post.owner === this.props.user._id && <Button className='mr-2' variant='primary' onClick={this.deletePost}>Delete Me</Button>}
          {post.owner === this.props.user._id && <Button variant='primary' onClick={this.update}>Update Me</Button>}
        </div>
      )
    }

    return (
      <Fragment>
        <div style={showPostStyle}>
          <div className='col-10 mx-auto mb-5'>
            <Link className='text-black mb-3' to={'/paris-posts/'}> <h5> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg> Back </h5> </Link>
            <h1>More bread and cheese please</h1>
            {postJsx}
            <Comments key={this.state.commentValue} rerenderParentCallback={this.rerenderParentCallback} {...this.props} />
            <IndexComments key={this.state.indexValue} {...this.props} />
          </div>
        </div>
      </Fragment>

    )
  }
}

// 3. Exports
export default withRouter(ShowPostPAR)
