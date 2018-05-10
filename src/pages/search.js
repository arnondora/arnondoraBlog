import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import colours from '../utils/colours'

import NavBar from '../components/NavBar'
import CardImage from '../components/CardImage'
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

const GreySearchText = styled.span`
  color: ${colours.textLowProfile};
  font-size: 18px;
`

const KeywordText = styled.h4`
  color: ${colours.textHeading};
  font-size: 25px;
  margin-top:10px;
  margin-bottom: 0;
`

const PageHeader = styled.h1`

`

const TextInput = styled.input`
  display: flex;
  width:100%;
  margin-bottom: 10px;
  padding: 15px 15px 15px 15px;
  background-color: #FFFFFF;
  outline: none;
  border: none;
  border-radius: 8px;

  & :focus {
    border: none;
    outline: none;
    padding: 15px 15px 15px 15px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.05);
  }
`

const ResultShowPlane = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 30px;
`

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-right: ${props => props.isLeft? 20: 0}px;
  width: ${props => props.isLeft? 30:70}%;

  @media (max-width: 768px) {
    display:${props => props.isLeft? 'none' : 'flex'};
    width: ${props => !props.isLeft? 100:0}%;
  }

`

const CategoryChipWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top:5px;
`

const CategoryChip = styled(Link)`
  padding: 5px 18px;
  color: ${colours.textHeading};
  font-size: 18px;
  background-color: ${colours.secondaryBackground};
  border-color: ${colours.secondaryBorder};
  border-radius: 0.5px;
  border-style: solid;
  margin: 5px 5px 5px 5px;

  :first {
    margin-left: 0;
  }

  :hover {
    color: white !important;
    background-color: ${colours.primaryColour};
    border-color: ${colours.primaryColour};
  }

  :visited {
    color: ${colours.textHeading};
  }

`

const NotFoundText = styled.h3`
  margin-top: 15px;
  color: ${colours.textSecondary};
  text-align: center;
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

  }

  render () {
    var searchResult = this.state.articles.filter(this.searchFor(this.state.keyword)).slice(0, 10)
    var relatedCategories = this.getRelatedCategory(searchResult)

    if (relatedCategories.length === 0 || this.state.keyword === "") relatedCategories = this.props.data.allCategoriesJson.edges

    return (
      <SuperWrapper>
        <NavigationBar siteTitle = {this.props.data.site.siteMetadata.title}/>
        <Container>
          <PageHeader>Search for articles</PageHeader>

            <TextInput
              type="text"
              placeholder = "Let's search something new"
              onChange={this.handleSearch}
              value={this.state.keyword}
              autoFocus
            />

          <ResultShowPlane>
            <ResultWrapper isLeft={true}>
              <GreySearchText>SEARCH FOR</GreySearchText>
              <KeywordText>{this.state.keyword === "" ? "All Stories": this.state.keyword}</KeywordText>
              <hr/>
              <GreySearchText>{this.state.keyword === "" || searchResult.length === 0 ? "RECOMMEND CATEGORIES" : "RELATED CATEGORIES"}</GreySearchText>
              <CategoryChipWrapper>
                {
                  relatedCategories.map(category => {
                    return <CategoryChip to={this.makeCategoryLink(category.node.link)} key={category.node.link}>{category.node.name}</CategoryChip>
                  })
                }
              </CategoryChipWrapper>
            </ResultWrapper>

            <ResultWrapper isLeft={false}>
              {
                searchResult.length > 0 ? searchResult.map(page => (
                  page.node.frontmatter.status === "published" ?
                  <CardImage post={page}/>: null
                )) : <NotFoundText>Not found article from the keyword.</NotFoundText>
              }
            </ResultWrapper>
          </ResultShowPlane>

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

  getRelatedCategory (posts) {
    var categories = []
    for (var i=0; i<posts.length; i++) {
      for (var j=0; j< this.props.data.allCategoriesJson.edges.length; j++) {
        if (posts[i].node.frontmatter.category == this.props.data.allCategoriesJson.edges[j].node.name && categories.indexOf(this.props.data.allCategoriesJson.edges[j]) == -1)
          categories.push(this.props.data.allCategoriesJson.edges[j])
      }
    }

    return categories
  }

  makeCategoryLink (categoryName) {
    return "/category/" + categoryName
  }
}

export const pageQuery = graphql`
  query SearchQuery {
    site {
      siteMetadata {
        title
      }
    }

    allMarkdownRemark (
      sort: { order: DESC, fields: [frontmatter___date] }
      filter : { frontmatter: { type : { eq: "post" } } }
    ) {
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
            isFeatured
            image {
              name
              ext
              childImageSharp {
                sizes (maxWidth: 1200, quality: 80) {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcWebp
                  sizes
                }
              }
            }
            author
            status
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }

    allCategoriesJson {
      edges {
        node {
          name
          link
        }
      }
    }
  }
`
