import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_GENRES } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(ADD_BOOK, {
    onError: (error => {
      console.log(error)
    }),
    update: (store, response) => {
      try {
        const dataInStore = store.readQuery({ query: ALL_BOOKS })
        store.writeQuery({
          query: ALL_BOOKS,
          data: {
            ...dataInStore,
            allBooks: [...dataInStore.allBooks, response.data.addBook]
          }
        })
      } catch (error) {}

      const genres = response.data.addBook.genres
      genres.forEach(genre => {
        try {
          const dataInStore = store.readQuery({ query: ALL_BOOKS, variables: { genre } })
          store.writeQuery({
            query: ALL_BOOKS,
            variables: { genre },
            data: {
              ...dataInStore,
              allBooks: [...dataInStore.allBooks, response.data.addBook]
            }
          })
        } catch(error) {}

        try {
          const dataInStore = store.readQuery({query: ALL_GENRES})
          store.writeQuery({
            query: ALL_GENRES,
            data: {
              ...dataInStore,
              allGenres: [...new Set([...dataInStore.allGenres, ...response.data.addBook.genres])]
            }
          })
        } catch (error) {}
      })

    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    addBook({ variables: { title, author, published: Number(published), genres }})

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook