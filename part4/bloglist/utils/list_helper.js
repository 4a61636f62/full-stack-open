const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (totalLikes, blog) => {
    return totalLikes + blog.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favourite = (blogs) => {
  const reducer = (favourite, blog) => {
    return blog.likes > favourite.likes
      ? { title: blog.title, author: blog.author, likes: blog.likes }
      : favourite
  }

  return blogs.length === 0
    ? null
    : blogs.slice(1).reduce(reducer, {title: blogs[0].title, author: blogs[0].author, likes: blogs[0].likes})
}

const mostBlogs = (blogs) => {
  let blogCountMap = new Map()
  let authorMostBlogs
  blogs.forEach(blog => {
    if (!blogCountMap.has(blog.author)) {
      blogCountMap.set(blog.author, 1)
      if (!authorMostBlogs) {
        authorMostBlogs = blog.author
      }
      return
    }
    const blogCount = blogCountMap.get(blog.author) + 1
    blogCountMap.set(blog.author, blogCount)
    if (blogCount > blogCountMap.get(authorMostBlogs)) {
      authorMostBlogs = blog.author
    }
  })
  return blogs.length === 0
    ? null
    : {
        author: authorMostBlogs,
        blogs: blogCountMap.get(authorMostBlogs)
      }
}

const mostLikes = (blogs) => {
  let likeCountMap = new Map()
  let authorMostLikes
  blogs.forEach(blog => {
    if (!likeCountMap.has(blog.author)) {
      likeCountMap.set(blog.author, blog.likes)
      if (!authorMostLikes) {
        authorMostLikes = blog.author
      }
      return
    }
    const likeCount = likeCountMap.get(blog.author) + blog.likes
    likeCountMap.set(blog.author, likeCount)
    if (likeCount > likeCountMap.get(authorMostLikes)) {
      authorMostLikes = blog.author
    }
  })
  return blogs.length === 0
    ? null
  : {
      author: authorMostLikes,
      likes: likeCountMap.get(authorMostLikes)
    }
}

module.exports = {
  dummy,
  totalLikes,
  favourite,
  mostBlogs,
  mostLikes
}