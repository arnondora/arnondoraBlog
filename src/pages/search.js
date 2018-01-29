import React from 'react'
import styled from 'styled-components'

import colours from '../utils/colours'

import NavBar from '../components/NavBar'
import Card from '../components/Card'
import MobileFooter from '../components/MobileFooter'

const NavigationBar = styled(NavBar)`
  position: relative;
`
const SuperWrapper = styled.div`
  background-color: #F5F5F5;
  min-height: 100vh;
`

const Container = styled.div`
  width: 80%;
  margin: 0 auto;

  padding-top: 104px;
  padding-bottom: 50px;

  @media (max-width: 768px) {
    width: 90%;
  }
`

const PageHeader = styled.h1`

`

const FormWrapper = styled.div`
  display: flex;
  width:100%;
  margin-bottom: 10px;

  & > input {
    width:100%;
    padding: 15px 15px 15px 15px;
    background-color: #FFFFFF;
    outline: none;
    border: none;
  }

  & >input:focus {
    border: none;
    outline: none;
    padding: 15px 15px 15px 15px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.05);
  }
`

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;

`
const CardWrapper = styled.div`
  margin-top: 40px;
  :first-child{
    margin-top: 0;
    margin-bottom: 0;
}
`

const NotFoundText = styled.h3`
  margin-top: 15px;
  color: ${colours.textSecondary};
`

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
    var searchResult = this.state.articles
    .filter(this.searchFor(this.state.keyword))
    .map(page => (
      <CardWrapper key={page.node.fields.slug}><Card slug={page.node.fields.slug} heading={page.node.frontmatter.title} excerpt={page.node.frontmatter.excerpt} category={page.node.frontmatter.category} publishedDate={page.node.frontmatter.date} author={page.node.frontmatter.author}/></CardWrapper>
    ))
    .slice(0, 10)

    return (
      <SuperWrapper>
        <NavigationBar siteTitle = {this.props.data.site.siteMetadata.title}/>
        <Container>
          <PageHeader>Search for articles</PageHeader>

            <FormWrapper>
              <input
                type="text"
                placeholder = "Let's search something new"
                onChange={this.handleSearch}
                value={this.state.keyword}
                ref= {input => {
                    this.textInput = input
                }}
              />
            </FormWrapper>

          <ResultWrapper>
            {
              searchResult.length > 0 ? searchResult : <NotFoundText>Not found article from the keyword.</NotFoundText>
            }
          </ResultWrapper>
        </Container>
        <MobileFooter/>
      </SuperWrapper>
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
    site {
      siteMetadata {
        title
      }
    }

    allMarkdownRemark (sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          fields {
            slug
          }
          frontmatter {
            title
            excerpt
            category
            author
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
