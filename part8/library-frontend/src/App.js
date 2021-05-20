
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(b => b.title).includes(object.title)

    try {
      const dataInStore = client.readQuery({ query: ALL_BOOKS })
      if (!includedIn(dataInStore.allBooks, addedBook)) {
        client.writeQuery({
          query: ALL_BOOKS,
          data: {
            ...dataInStore,
            allBooks: [...dataInStore.allBooks, addedBook]
          }
        })
      }
    } catch (error) {
      console.log(error.message)
    }

    const genres = addedBook.genres
    genres.forEach(genre => {
      try {
        const dataInStore = client.readQuery({ query: ALL_BOOKS, variables: { genre } })
        if (!includedIn(dataInStore.allBooks, addedBook)) {
          client.writeQuery({
            query: ALL_BOOKS,
            variables: { genre },
            data: {
              ...dataInStore,
              allBooks: [...dataInStore.allBooks, addedBook]
            }
          })
        }
      } catch(error) {
        console.log(error.message)
      }

      try {
        const dataInStore = client.readQuery({query: ALL_GENRES})
        if (!includedIn(dataInStore.allGenres, genre)) {
          client.writeQuery({
            query: ALL_GENRES,
            data: {
              ...dataInStore,
              allGenres: [...new Set([...dataInStore.allGenres, ...addedBook.genres])]
            }
          })
        }
      } catch (error) {
        console.log(error.message)
      }
    })
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`A new book '${addedBook.title}' by '${addedBook.author.name}' has been added`)
      updateCacheWith(addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    if (page === 'recommend' || page === 'add') {
      setPage('authors')
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token
          ? <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommend</button>
              <button onClick={logout}>logout</button>
            </>
          : <button onClick={() => setPage('login')}>login</button>
        }

      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

      {(token && page === 'recommend') && (
        <Recommend />
      )}


    </div>
  )
}

export default App