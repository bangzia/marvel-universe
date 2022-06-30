/** @jsxImportSource @emotion/react */

import 'bootstrap/dist/css/bootstrap-reboot.css'
import React from 'react'
import {auth} from './firebase'
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthenticatedApp} from 'authenticated-app'
import {UnauthenticatedApp} from 'unauthenticated-app'
import {FullPageSpinner} from 'components/lib'
import * as colors from 'styles/colors'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {useAsync} from 'utils/hooks'

function getUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      user => {
        unsubscribe()
        resolve(user)
      },
      reject,
    )
  })
}

function App() {
  // const [user, setUser] = React.useState(null)
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    run(getUser())
  }, [run])

  const login = ({username, password}) =>
    signInWithEmailAndPassword(auth, username, password)
      .then(userCredential => {
        setData(userCredential.user)
        console.log(userCredential.user.email)
      })
      .catch(error => {
        console.log(error)
      })

  const register = ({username, password}) =>
    createUserWithEmailAndPassword(auth, username, password).then(
      userCredential => {
        setData(userCredential.user)
      },
    )

  const logout = () => {
    signOut(auth).then(setData(null))
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return (
      <div
        css={{
          color: colors.red,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Uh oh...There's a problem.Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    )
  }
  if (isSuccess) {
    return user ? (
      <Router>
        <AuthenticatedApp user={user} logout={logout} />
      </Router>
    ) : (
      <UnauthenticatedApp login={login} register={register} />
    )
  }
}

export {App}
