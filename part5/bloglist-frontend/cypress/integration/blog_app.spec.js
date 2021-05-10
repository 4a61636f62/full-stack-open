import login from '../../../../part2/part2-notes/src/services/login'
import blogs from '../../src/services/blogs'

describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'User mcUserFace',
      username: 'blogAppUser',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.contains('username')
    cy.contains('password')
    cy.get('#username')
    cy.get('#password')
    cy.contains('Login')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('blogAppUser')
      cy.get('#password').type('password')
      cy.contains('Login').click()
      cy.get('#notification')
        .should('contain', 'User mcUserFace logged in successfully')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('User mcUserFace logged in')
      cy.contains('logout')
    })

    it('fails with incorrect credentials', () => {
      cy.get('#username').type('blogAppUser')
      cy.get('#password').type('wrong')
      cy.contains('Login').click()
      cy.get('#notification')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'blogAppUser', password: 'password' })
    })

    it('a blog can be created', () => {
      cy.contains('create new').click()

      cy.get('#title').type('Title of a new blog')
      cy.get('#author').type('Author of a new blog')
      cy.get('#url').type('http://newblog.com')

      cy.get('#createBlog').click()
      cy.get('#notification')
        .should('contain', 'a new blog Title of a new blog by Author of a new blog added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')

      cy.contains('Title of a new blog Author of a new blog')
        .parent().as('newBlog')

      cy.get('@newBlog').contains('view').click()
      cy.get('@newBlog').contains('http://newblog.com')
    })

    describe('and a blog exists', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'Title of a new blog',
          author: 'Author of a new blog',
          url: 'http://newblog.com'
        })
        cy.visit('http://localhost:3000')
      })

      it('a blog can be liked', () => {
        cy.contains('Title of a new blog Author of a new blog')
          .parent().as('newBlog')
        cy.get('@newBlog').contains('view').click()

        cy.get('@newBlog').contains(0).as('likeCount')
        cy.get('@newBlog').contains('like').click()

        cy.get('@likeCount').contains(1)
      })

      it('a blog can be deleted by the user who created it', () => {
        cy.contains('Title of a new blog Author of a new blog')
          .parent().as('newBlog')
        cy.get('@newBlog').contains('view').click()

        cy.get('@newBlog').contains('delete').click()
        cy.get('#notification')
          .should('contain', 'deleted Title of a new blog by Author of a new blog')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
        cy.should('not.contain', 'Title of a new blog Author of a new blog')
      })

      it('a blog can\'t be deleted by a user who did not create it', () => {
        const user = {
          name: 'Another User',
          username: 'anotherBlogAppUser',
          password: 'password'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.login({ username: 'anotherBlogAppUser', password: 'password' })

        cy.contains('Title of a new blog Author of a new blog')
          .parent().as('newBlog')
        cy.get('@newBlog').contains('view').click()

        cy.get('@newBlog').should('not.contain', 'delete')
      })
    })

    describe('and multiple blogs exist', () => {
      beforeEach(() => {
        const blogLikes = [12, 64, 22, 2, 44]
        for (let i = 0; i < blogLikes.length; i++) {
          cy.createBlog({
            title: `blog${i}`,
            author: `blog${i}.author`,
            url: `http://blog${i}.com`,
            likes: blogLikes[i]
          })
        }
        cy.visit('http://localhost:3000')
      })

      it('blogs are ordered according to likes (descending)', () => {
        cy.get('[data-cy=blog]').should('have.length', 5)
          .then(blogs => {
            const likes = blogs.find('[data-cy=likes]')
            expect(likes).to.have.length(blogs.length)
            for (let i = 0; i < blogs.length - 1; i++) {
              expect(Number(likes[i].textContent)).to.be.gt(Number(likes[i + 1].textContent))
            }
          })
      })
    })
  })
})
