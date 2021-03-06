// 1. Imports
// Component & Fragment
import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from './../../apiConfig'

// 2. Class
class Comments extends Component {
  constructor (props) {
    super(props)
    this.onBtnClick = this.onBtnClick.bind(this)
    this.state = {
      // initially we have no data, no post (null)

      comment: {
        text: '',
        postOwner: this.props.match.params.id
      },
      // Delete boolean to manage if we've deleted this post
      deleted: false,
      createdId: null,
      value: 0
    }

    // If we don't use arrow functions, then we need to bind the `this` scope
    // this.deletePost = this.deletePost.bind(this)
  }

  // When this component mounts, make a GET
  // request using the ID param in the front-end route URL
  // and set the state to trigger a re-render
  componentDidMount () {}

  handleSubmit = (event) => {
    const user = this.props.user
    const msgAlert = this.props.msgAlert
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
        this.setState({ createdId: response.data.comment._id, text: '' })
      })
      .then(() => msgAlert({
        heading: 'Well done',
        message: 'You just made a comment!',
        variant: 'success'
      }))
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

  onBtnClick () {
    this.setState({ value: this.state.value + 1 })
    this.props.rerenderParentCallback()
  }

  render () {
    return (
      <Fragment>
        <div className='mb-2'>
          <h2>COMMENTS</h2>
          <form onSubmit={this.handleSubmit}>
            <textarea className='form-control mb-3' name='text' placeholder='Leave a comment here' id='floatingTextarea2' value={this.state.comment.text} onChange={this.handleChange}>
            </textarea>
            <Button className='mb-2 shadow' type='submit' onClick={() => { this.onBtnClick() }}>Post</Button>
          </form>
        </div>
      </Fragment>
    )
  }
}

// 3. Exports
export default withRouter(Comments)
