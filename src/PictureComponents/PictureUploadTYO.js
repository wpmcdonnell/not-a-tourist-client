import React, { useState } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'

// import messages from '../AutoDismissAlert/messages'
import { pictureCreateTokyo } from './../api/Pictures'

import Form from 'react-bootstrap/Form'
import FormFile from 'react-bootstrap/FormFile'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import { Col } from 'react-bootstrap'

const UploadTYO = ({ user, msgAlert }) => {
  const [title, setTitle] = useState('')
  const [list, setList] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imageURL, setImageURL] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [createdId, setCreatedId] = useState(null)

  const handleCaptionChange = event => {
    setTitle(event.target.value)
  }

  const handleTagChange = event => {
    const str = event.target.value
    setList(str)
  }

  const handleImageSubmit = event => {
    event.preventDefault()
    console.log(user)
    const data = new FormData()
    data.append('picture', image)
    data.append('title', title)
    data.append('list', list)
    setLoading(true)
    setImagePreview(null)
    pictureCreateTokyo(user, data)
      .then(response => {
        setImageURL(response.data.picture.url)
        setCreatedId(response.data.picture._id)
      })
      .then(() => setLoading(false))
      .then(() => msgAlert({
        heading: 'Picture Successfully Uploaded',
        message: 'Click to add more pictures to your account!',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Upload Picture ',
          message: 'Could not upload pictures with error' + error.message,
          variant: 'danger'
        })
      })
  }

  const handleImageAdd = event => {
    setImageURL(null)
    setImage(event.target.files[0])
    setImagePreview(URL.createObjectURL(event.target.files[0]))
  }

  const uploadImageStyle = {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '1rem',
    marginLeft: '1rem',
    marginRight: '1rem'
  }

  if (createdId) {
    return <Redirect to={`/tokyo-posts/${createdId}`}/>
  }

  console.log(createdId)

  return (
    <div className="upload-page mb-5" style={uploadImageStyle}>
      <div className="mx-auto">
        <Link className='text-black mb-3' to={'/create-post-tokyo/'}> <h5> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
        </svg> Back </h5> </Link>
        <h3>Upload Image</h3>
        <Form onSubmit={handleImageSubmit}>
          <Form.Group controlId="image">
            <FormFile
              required
              id="upload-file-input"
              label="Upload File Here"
              onChange={handleImageAdd}
            />
          </Form.Group>
          {imagePreview && <div className='mb-4'>
            <div className="mt-3">
              <Col xs={12} md={8}>
                <Image src={imagePreview} thumbnail/>
              </Col>
            </div>
          </div>}
          {loading && <div className="spinner">
            <Spinner animation="border" variant="info">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>}
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              placeholder="Enter Title"
              onChange={handleCaptionChange}
            />
          </Form.Group>

          <textarea
            className="form-control mb-4"
            rows='10'
            type="text"
            name="list"
            value={list}
            placeholder="description"
            onChange={handleTagChange}
          />
          <Button
            className='shadow'
            variant="primary"
            type="submit"
          >
          Submit
          </Button>
        </Form>
      </div>
      {imageURL &&
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <Image src={imageURL} thumbnail/>
          </div>
        </div>
      }
    </div>
  )
}

export default withRouter(UploadTYO)
