import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, FAVORITE_GENRE } from '../queries'

const Recommend = () => {
  const [getGenre, genreResult] = useLazyQuery(FAVORITE_GENRE)
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)

  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState([])

  useEffect(() => {
    getGenre()
  }, [])

  useEffect(() => {
    if (genreResult.data) {
      const genre = genreResult.data.me.favoriteGenre
      setGenre(genre)
      getBooks({variables: { genre }})
    }
  }, [genreResult.data])

  useEffect(() => {
    if (booksResult.data) {
      const books = booksResult.data.allBooks
      setBooks(books)
    }
  }, [booksResult.data])

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{genre}</b></p>
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
    </div>
  )

}

export default Recommend