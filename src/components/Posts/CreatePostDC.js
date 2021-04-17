import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'

class CreatePostNY extends Component {
  constructor () {
    super()
    this.state = {
      // State for the form inputs
      post: {
        title: '',
        list: ''
      },
      // Boolean to handle before/after of submitting
      // created: false
      // Store the post's ID in the state, initially null
      createdId: null
    }
  }

  handleChange = (event) => {
    event.persist()
    this.setState(oldState => {
      const value = event.target.value
      const name = event.target.name

      const updatedField = { [name]: value }

      // spread operator ends up merging these two objects
      return { post: { ...oldState.post, ...updatedField } }
    })
  }

  handleSubmit = (event) => {
    const user = this.props.user
    console.log(user)
    // Prevent the page from refreshing!
    event.preventDefault()
    // axios.post(`${apiUrl}/posts`, {
    //   post: this.state.post
    // })
    axios({
      url: `${apiUrl}/dc-posts`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { post: this.state.post }
    })
      .then(response => {
        // Reset the form by resetting the state to empty values
        // this.setState({ post: { title: '', list: '' } })
        // Boolean did we do the thing
        // this.setState({ created: true })
        // Store the ID of the created post
        this.setState({ createdId: response.data.post._id })
      })
      .catch(console.error)
  }
  // handle = async (event) => {
  //   event.preventDefault()
  //
  //   try {
  //     const response = await axios.post(`${apiUrl}/posts`, { post: this.state.post })
  //     this.setState({ ceatedId: response.data.post._id })
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  render () {
    // createdId is initially null, we don't redirect
    if (this.state.createdId) {
      return <Redirect to={`/dc-posts/${this.state.createdId}`}/>
    }

    return (
      <Fragment>
        <h1>Create A New Post for the Greatest City on Earth</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            value={this.state.post.title}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="list"
            placeholder="Post List"
            value={this.state.post.list}
            onChange={this.handleChange}
          />
          <button type="submit">Create New Post</button>
        </form>
      </Fragment>
    )
  }
}

export default CreatePostNY
