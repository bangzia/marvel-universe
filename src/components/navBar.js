/** @jsxImportSource @emotion/react */

import * as React from 'react'
import {Link} from 'react-router-dom'
import {Logo} from './logo'
import {AiOutlineMenu} from 'react-icons/ai'
import {IoSearchOutline} from 'react-icons/io5'
import {Button} from './lib'
import {CloseButton} from './closeButton'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'

function NavLink(props) {
  return (
    <Link
      css={{
        textTransform: 'uppercase',
        fontSize: '1.25rem',
        fontWeight: '700',
        color: colors.black,
        textDecoration: 'none',
        ':hover': {
          color: colors.red,
        },
      }}
      {...props}
    />
  )
}

function NavBar({user, logout}) {
  const [isOpen, setIsOpen] = React.useState(false)
  function handleClick() {
    setIsOpen(!isOpen)
  }
  return (
    <nav
      css={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1em 1em',
      }}
    >
      <AiOutlineMenu
        size={32}
        aria-label="hamburger menu"
        css={{
          cursor: 'pointer',
          [mq.medium]: {
            display: 'none',
          },
        }}
        onClick={handleClick}
      />
      <Logo aria-label="logo" width="250" />
      <Link
        to="/discover"
        css={{
          color: colors.black,
          ':hover': {
            color: colors.red,
          },
        }}
      >
        <IoSearchOutline
          size={32}
          aria-label="search"
          css={{
            cursor: 'pointer',
            [mq.medium]: {
              display: 'none',
            },
          }}
        />
      </Link>

      <ul
        css={{
          position: 'fixed',
          top: '0',
          right: '0',
          width: '100%',
          height: '100vh',
          background: colors.grey,
          zIndex: 2,
          transform: `${isOpen ? 'translateX(0%)' : 'translateX(-100%)'}`,
          transition: 'transform 0.3s',
          listStyle: 'none',
          padding: '1.5em 1.5em',
          margin: '0',
          fontFamily: 'Roboto condensed,sans-serif',
          color: colors.black,
          '&>li': {
            padding: '.5em 0',
          },
          [mq.medium]: {
            position: 'unset',
            transform: 'translateX(0%)',
            display: 'flex',
            alignItems: 'center',
            background: 'none',
            width: 'unset',
            height: 'auto',
            padding: '0',
            gap: '2em',
          },
        }}
      >
        <li
          css={{
            cursor: 'pointer',
            [mq.medium]: {
              display: 'none',
            },
          }}
          onClick={handleClick}
        >
          <CloseButton width="32" height="32" css={{cursor: 'pointer'}} />
        </li>
        <li>
          <NavLink to="/discover" onClick={handleClick}>
            my favorites
          </NavLink>
        </li>
        <li>
          <NavLink to="/discover" onClick={handleClick}>
            Discover
          </NavLink>
        </li>

        <li>{user.email}</li>
        <li>
          <Button
            css={{padding: '0.5rem 1.5rem', width: '100px'}}
            onClick={logout}
          >
            Logout
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export {NavBar}
