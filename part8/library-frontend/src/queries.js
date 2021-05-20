import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors{
            name
            born
            bookCount
        }
    } 
`

export const ALL_BOOKS = gql`
    query(
        $genre: String
    ) {
        allBooks(
            genre: $genre
        ){
            title,
            published,
            author {
                name
            },
        },
    }
`

export const ALL_GENRES = gql`
    query {
        allGenres
    }
`

export const FAVORITE_GENRE = gql`
    query {
        me {
            favoriteGenre
        }
    }
`

export const ADD_BOOK = gql`
    mutation(
        $title: String!,
        $author: String!,
        $published: Int,
        $genres: [String]
    ) {
        addBook(
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ){
            title
            author {
                name
            }
            published
            genres
        }
    }    
`

export const EDIT_AUTHOR = gql`
    mutation (
        $name: String!
        $born: Int!
    ) {
        editAuthor(
            name: $name,
            setBornTo: $born
        ){
            name
            born
        }
    }
`

export const LOGIN = gql`
    mutation (
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
        ){
            value
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            title
            author {
                name
            }
            published
            genres
        }
    }   
`