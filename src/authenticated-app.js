/** @jsxImportSource @emotion/react */

import * as React from 'react'
import {Routes, Route} from 'react-router-dom'
import {NavBar} from 'components/navBar'
import {DiscoverCharactersScreen} from './screens/discover'
import {CharacterScreen} from 'screens/character'
import {NotFoundScreen} from 'screens/not-found'

function AuthenticatedApp({user, logout}) {
  return (
    <React.Fragment>
      <NavBar user={user} logout={logout} />
      <div
        css={{
          margin: '0 auto',
          padding: '4em 0em',
          maxWidth: '900px',
          width: '90%',
        }}
      >
        <main css={{width: '100%'}}>
          <AppRoutes />
        </main>
      </div>
    </React.Fragment>
  )
}
function AppRoutes() {
  return (
    <Routes>
      <Route path="/discover" element={<DiscoverCharactersScreen />} />
      <Route path="/character/:characterId" element={<CharacterScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export {AuthenticatedApp}
