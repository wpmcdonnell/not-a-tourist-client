import React, { Component, Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import CreatePost from './components/Posts/CreatePost'
import ShowPost from './components/Posts/ShowPost'
import ShowPostNY from './components/Posts/ShowPostNY'
import ShowPostSE from './components/Posts/ShowPostSE'
import ShowPostLA from './components/Posts/ShowPostLA'
import ShowPostDC from './components/Posts/ShowPostDC'
import IndexPosts from './components/Posts/IndexPosts'
import UpdatePost from './components/Posts/UpdatePosts'
import UpdatePostNY from './components/Posts/UpdatePostsNY'
import UpdatePostDC from './components/Posts/UpdatePostsDC'
import UpdatePostLA from './components/Posts/UpdatePostsLA'
import UpdatePostSE from './components/Posts/UpdatePostsSE'
import Cities from './components/Posts/Cities'
import IndexPostsNY from './components/Posts/IndexPostsNY'
import IndexPostsSE from './components/Posts/IndexPostsSE'
import IndexPostsLA from './components/Posts/IndexPostsLA'
import IndexPostsDC from './components/Posts/IndexPostsDC'
import CreatePostNY from './components/Posts/CreatePostNY'
import CreatePostSE from './components/Posts/CreatePostSE'
import CreatePostLA from './components/Posts/CreatePostLA'
import CreatePostDC from './components/Posts/CreatePostDC'
import Background from './components/Background/Background'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main>
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/' render={() => (
            <Background msgAlert={this.msgAlert} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-post' render={() => (
            <CreatePost msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-post-ny' render={() => (
            <CreatePostNY msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-post-se' render={() => (
            <CreatePostSE msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-post-la' render={() => (
            <CreatePostLA msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-post-dc' render={() => (
            <CreatePostDC msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/posts/:id' render={() => (
            <ShowPost msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/ny-posts/:id' render={() => (
            <ShowPostNY msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/dc-posts/:id' render={() => (
            <ShowPostDC msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/se-posts/:id' render={() => (
            <ShowPostSE msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/la-posts/:id' render={() => (
            <ShowPostLA msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/posts' render={() => (
            <IndexPosts msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/posts/:id/update' render={() => (
            <UpdatePost msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/ny-posts/:id/update' render={() => (
            <UpdatePostNY msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/dc-posts/:id/update' render={() => (
            <UpdatePostDC msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/la-posts/:id/update' render={() => (
            <UpdatePostLA msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/se-posts/:id/update' render={() => (
            <UpdatePostSE msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/cities/' render={() => (
            <Cities msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/ny-posts' render={() => (
            <IndexPostsNY msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/dc-posts' render={() => (
            <IndexPostsDC msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/la-posts' render={() => (
            <IndexPostsLA msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/se-posts' render={() => (
            <IndexPostsSE msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default withRouter(App)
