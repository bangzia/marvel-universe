/** @jsxImportSource @emotion/react */

// import * as mq from 'styles/media-queries'
import {Link} from 'react-router-dom'
import * as colors from 'styles/colors'

function CharacterCard({character}) {
  const {name, thumbnail} = character

  const id = `character-card-character-${character.id}`

  return (
    <Link
      aria-labelledby={id}
      to={`/character/${character.id}`}
      css={{
        display: 'block',
        backgroundColor: colors.base,
        textDecoration: 'none',
        color: colors.black,
        border: '1px solid #e6e7eb',
        borderRadius: '4px',
        boxShadow: '0px 4px 10px rgba(0,0,0,.1)',
        ':hover,:focus': {
          boxShadow: '0 10px 15px  rgba(0,0,0,.4)',
          color: colors.black,
        },
      }}
    >
      <img
        src={`${thumbnail.path}.${thumbnail.extension}`}
        alt={`${name} character thumbnail`}
        css={{
          width: '100%',
          height: '14.5625em',
          objectFit: 'cover',
          borderRadius: '4px 4px 0 0',
        }}
      />
      <div>
        <p
          css={{
            fontFamily: 'Roboto condensed,sans-serif',
            textTransform: 'uppercase',
            fontSize: '1rem',
            fontWeight: '700',
            padding: '1rem',
          }}
        >
          {name}
        </p>
      </div>
    </Link>
  )
}

export {CharacterCard}
