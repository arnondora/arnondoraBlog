import React from 'react'
import styled from 'styled-components'

export default class search extends React.Component {

  constructor (props) {
      super(props)
      this.state = {
        articles: this.props.data.allMarkdownRemark.edges,
        keyword: ""
      }

      this.handleSearch = this.handleSearch.bind(this)
      this.searchFor = this.searchFor.bind(this)
      this.focus = this.focus.bind(this)

  }

  componentDidMount () {
    this.textInput.focus()
  }

  render () {
    return (
      <div>
        <input
          type="text"
          onChange={this.handleSearch}
          value={this.state.keyword}
          ref= {input => {
              this.textInput = input
          }}
        />

        <ul>
            {
              this.state.articles
              .filter(this.searchFor(this.state.keyword))
              .map(page => (
                <li>{page.node.frontmatter.title}</li>
              ))
              .slice(0, 10)
            }
        </ul>
      </div>
    )
  }

  handleSearch (event) {
    this.setState({
      keyword: event.target.value
    })
  }

  searchFor (keyword) {
    return function (x) {
      return (
        x.node.frontmatter.title.toLowerCase().includes(keyword.toLowerCase()) ||
        x.node.excerpt.toLowerCase().includes(keyword.toLowerCase()) ||
        !keyword
      )
    }
  }

  focus() {
   this.textInput.focus()
 }
}

export const pageQuery = graphql`
  query SearchQuery {
    allMarkdownRemark (sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          html
          id
          fields {
            slug
          }
          frontmatter {
            title
            excerpt
            category
            template
            type
            author
            status
            date(formatString: "MMMM DD, YYYY")
            isFeatured
            image {
              name
              ext
              childImageSharp {
                original {
                  src
                  height
                  width
                }
              }
            }
          }
          timeToRead
          fields {
            slug
          }
        }
      }
    }
  }
`
