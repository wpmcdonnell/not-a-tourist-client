import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

// import messages from '../AutoDismissAlert/messages'
import { pictureCreateNy } from './../api/Pictures'

import Form from 'react-bootstrap/Form'
import FormFile from 'react-bootstrap/FormFile'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import { Col } from 'react-bootstrap'

const Upload = ({ user, msgAlert }) => {
  const [title, setTitle] = useState('')
  const [list, setList] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imageURL, setImageURL] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

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
    pictureCreateNy(user, data)
      .then(response => {
        setImageURL(response.data.picture.url)
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
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
            <Form.Group controlId="list">
              <Form.Label>List</Form.Label>
              <Form.Control
                type="text"
                name="list"
                value={list}
                placeholder="Enter text"
                onChange={handleTagChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
            Submit
            </Button>
          </Form>
        </div>
      </div>
      {loading && <div className="spinner">
        <Spinner animation="border" variant="info">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>}
      {imageURL &&
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <Image src={imageURL} thumbnail/>
          </div>
        </div>
      }
      {imagePreview && <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Col xs={6} md={4}>
            <Image src={imagePreview} thumbnail/>
          </Col>
        </div>
      </div>}
    </div>
  )
}

export default withRouter(Upload)
