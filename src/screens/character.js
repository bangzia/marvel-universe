/** @jsxImportSource @emotion/react */

import * as React from 'react'
import {useParams} from 'react-router-dom'
import {client} from 'utils/api-client'
import * as mq from 'styles/media-queries'
import * as colors from 'styles/colors'
import {useAsync} from 'utils/hooks'
import characterPlaceholderSvg from 'assets/character-placeholder.svg'
import {Skeleton} from '@mui/material'

const loadingCharacter = {
  name: 'Loading....',
  description: 'loading...',
  thumbnail: {path: characterPlaceholderSvg},
  loadingCharacter: true,
}

function CharacterScreen() {
  const {characterId} = useParams()
  const {data, run, isSuccess, isLoading, isError, error} = useAsync()

  React.useEffect(() => {
    run(client(`/v1/public/characters/${characterId}?`))
  }, [characterId, run])

  return (
    <div>
      {isError ? (
        <div css={{color: colors.red}}>
          <p>There was an error </p>
          <pre>{error.message}</pre>
        </div>
      ) : null}
      {isLoading ? (
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0rem 0rem 0rem 0rem',
            border: '1px solid #e6e7eb',
            borderRadius: '4px',
            boxShadow: '0px 4px 10px rgba(0,0,0,.1)',
            [mq.medium]: {
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gridGap: '2em',
            },
          }}
          aria-label="skeleton text"
        >
          <Skeleton variant="rectangular" sx={{height: 300}} />

          <div>
            <p
              css={{
                fontFamily: 'Roboto condensed,sans-serif',
                textTransform: 'uppercase',
                fontSize: '1.5rem',
                fontWeight: '700',
                padding: '1rem',
                margin: '0',
              }}
            >
              <Skeleton variant="text" />
            </p>
            <p
              css={{
                fontFamily: 'Roboto,sans-serif',
                fontSize: '1rem',
                fontWeight: '400',
                padding: '1rem',
              }}
            >
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </p>
          </div>
        </div>
      ) : null}
      {isSuccess ? (
        data.data.results.length ? (
          data.data.results.map(character => (
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0rem 0rem 0rem 0rem',
                border: '1px solid #e6e7eb',
                borderRadius: '4px',
                boxShadow: '0px 4px 10px rgba(0,0,0,.1)',
                [mq.medium]: {
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  gridGap: '2em',
                },
              }}
              key={character.id}
              aria-label={character.name}
            >
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={`${character.name} character thumbnail`}
                css={{
                  width: '100%',
                  height: '30vh',
                  objectFit: 'cover',
                  borderRadius: '4px 4px 0 0',
                  [mq.medium]: {
                    height: 'unset',
                    borderRadius: '4px 0 0 4px',
                  },
                }}
              />
              <div>
                <p
                  css={{
                    fontFamily: 'Roboto condensed,sans-serif',
                    textTransform: 'uppercase',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    padding: '1rem',
                    margin: '0',
                  }}
                >
                  {character.name}
                </p>
                <p
                  css={{
                    fontFamily: 'Roboto,sans-serif',
                    fontSize: '1rem',
                    fontWeight: '400',
                    padding: '1rem',
                  }}
                >
                  {character.description || 'No description available'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No chrarcter</p>
        )
      ) : null}
    </div>
  )
}
export {CharacterScreen}
