import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'

class CreatePostTYO extends Component {
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
      createdId: null,
      image: false
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

  imageChange = () => {
    this.setState({ image: true })
  }

  handleSubmit = (event) => {
    const user = this.props.user
    // Prevent the page from refreshing!
    event.preventDefault()
    // axios.post(`${apiUrl}/posts`, {
    //   post: this.state.post
    // })
    axios({
      url: `${apiUrl}/tokyo-posts`,
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
    const createPostStyle = {
      display: 'flex',
      alignItems: 'center',
      paddingTop: '1rem',
      marginLeft: '1rem',
      marginRight: '1rem'

    }
    // createdId is initially null, we don't redirect
    if (this.state.createdId) {
      return <Redirect to={`/tokyo-posts/${this.state.createdId}`}/>
    } else if (this.state.image) {
      return <Redirect to='/tokyo-picture-upload/'/>
    }

    return (
      <Fragment>
        <div style={createPostStyle} className=''>
          <div className='mx-auto'>
            <Link className='text-black mb-3' to={'/tokyo-posts/'}> <h5> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg> Back </h5> </Link>
            <h1>Konnichiwa</h1>
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
                placeholder="Post List"
                value={this.state.post.list}
                onChange={this.handleChange}
              />
              <div className='create-post-buttons row align-items-center'>
                <button className='btn btn-primary mb-5 mr-4 shadow' type="submit">Post</button>
                <div className=' mr-4 mb-5 d-inline'>or</div>
                <button className='btn btn-primary mb-5 shadow d-inline' onClick={this.imageChange}>Upload Image</button>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default CreatePostTYO
