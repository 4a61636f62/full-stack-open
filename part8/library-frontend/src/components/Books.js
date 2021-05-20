import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState([])
  const result = useQuery(ALL_GENRES)

  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (genre === 'ALL') {
      getBooks()
    } else if (genre) {
      getBooks({ variables: { genre }})
    }
  }, [genre])

  useEffect(() => {
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks)
    }
  }, [booksResult.data])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <p>loading</p>
  }
  const allGenres = result.data.allGenres
  if (allGenres.length > 0 && !genre) {
    setGenre(allGenres[0])
  }

  return (
    <div>
      <h2>books</h2>
      {genre === 'ALL'
        ? <p><b>All Genres</b></p>
        : <p>in genre <b>{genre}</b></p>
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {allGenres.map(genre =>
          <button
            key={genre}
            onClick={() => setGenre(genre)}
          >
            {genre}
          </button>
        )}
        <button
          onClick={() => setGenre('ALL')}
        >
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books