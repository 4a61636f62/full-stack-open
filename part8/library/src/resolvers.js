const { UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const Book = require('./datasources/models/book')
const Author = require('./datasources/models/author')
const User = require('./datasources/models/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = require('./config').JWT_SECRET

const pubsub = new PubSub()

const resolvers = {
  Author: {
    bookCount: (parent) => parent.books.length
  },

  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (_, args) => {
      return args.genre
        ? Book.find({ genres: { $in: [args.genre]}}).populate('author')
        : Book.find({}).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (_, __, context) => {
      return context.currentUser
    },
    allGenres: async () => {
      const books = await Book.find({})
      const genres = books.map(book => book.genres).flat(1)
      return [...new Set(genres)]
    }
  }
  ,

  Mutation: {
    addBook: async (_, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({name: args.author})
      if (!author) {
        author = new Author({ name: args.author })
      }

      const book = new Book({ ...args, author })
      author.books = author.books.concat(book)

      try {
        await book.save()
        await author.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      } catch (error) {
        throw new UserInputError(error.message)
      }
    },

    editAuthor: async (_, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        throw new UserInputError('author not found')
      }
      author.born = args.setBornTo
      try {
        await author.save()
        return author
      } catch (error) {
        throw new UserInputError(error.message)
      }
    },

    createUser: async (_, args) => {
      const user = new User({...args})
      try {
        await user.save()
        return user
      } catch (error) {
        throw new UserInputError(error.message)
      }
    },

    login: async (_, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET)}
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers