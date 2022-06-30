/** @jsxImportSource @emotion/react */

import * as React from 'react'
import '../bootstrap'
import {Tooltip} from '@reach/tooltip'
import {IoSearchOutline, IoClose} from 'react-icons/io5'
import {Input, CharacterListUL, Spinner} from 'components/lib'
import {CharacterCard} from 'components/character-card'
import {client} from 'utils/api-client'
import * as colors from 'styles/colors'
import {useAsync} from 'utils/hooks'

function DiscoverCharactersScreen() {
  const {data, error, run, isLoading, isError, isSuccess} = useAsync()
  const [query, setQuery] = React.useState()
  const [queried, setQueried] = React.useState(false)

  console.log(query)

  React.useEffect(() => {
    if (!queried) {
      return
    }
    run(
      client(
        `/v1/public/characters?nameStartsWith=${encodeURIComponent(
          query,
        )}&limit=99&`,
      ),
    )
  }, [query, queried, run])

  function handleSearchSubmit(event) {
    event.preventDefault()
    if (!event.target.elements.search.value) {
      return
    }
    setQueried(true)
    setQuery(event.target.elements.search.value)
  }

  return (
    <div
      css={{
        maxWidth: 800,
        margin: 'auto',
        width: '90vw',
        padding: '40px 0',
      }}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search a Character..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search a Character">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : isError ? (
                <IoClose aria-label="error" css={{color: colors.red}} />
              ) : (
                <IoSearchOutline aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>
      {isError ? (
        <div css={{color: colors.red}}>
          <p>There was an error </p>
          <pre>{error.message}</pre>
        </div>
      ) : null}
      {isSuccess ? (
        data?.data?.results?.length ? (
          <CharacterListUL css={{marginTop: 20}}>
            {data.data.results.map(character => (
              <li key={character.id} aria-label={character.name}>
                <CharacterCard key={character.id} character={character} />
              </li>
            ))}
          </CharacterListUL>
        ) : (
          <p>No character found.Try another search</p>
        )
      ) : null}
    </div>
  )
}
export {DiscoverCharactersScreen}
