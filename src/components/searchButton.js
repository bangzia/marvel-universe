import * as React from 'react'

const SearchButton = ({width = '24', height = '24'}) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m20.49 19-5.73-5.73C15.53 12.2 16 10.91 16 9.5A6.5 6.5 0 1 0 9.5 16c1.41 0 2.7-.47 3.77-1.24L19 20.49 20.49 19zM5 9.5C5 7.01 7.01 5 9.5 5S14 7.01 14 9.5 11.99 14 9.5 14 5 11.99 5 9.5z" />
    <path d="M0 0h24v24H0V0z" fill="none" />
  </svg>
)

export {SearchButton}
