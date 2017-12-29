import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { get } from 'lodash'
import colours from '../utils/colours'
import Link from 'gatsby-link'

import NavBar from '../components/NavBar'
import MobileFooter from '../components/MobileFooter'
import Card from '../components/Card'
import PrimaryButton from '../components/PrimaryButton'

const NavigationBar = styled(NavBar)`
  position: relative;
`
const SuperWrapper = styled.div`

`

const Container = styled.div`
  width: 80%;
  margin: 0 auto;

  margin-top: 104px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    width: 90%;
  }
`
const CategoryInfoWrapper = styled.div`
  color: ${colours.textHeading};
`
const CategoryName = styled.h1 `
  margin: 0;
  font-weight: 700;
`

const CategoryDescription = styled.p`
  margin-bottom: 0;
  margin-top: 10px;
  color: ${colours.textDisable};
  font-weight: 300;
`

const StoriesWrapper = styled.div`
  margin-top: 20px;
`

const CardWrapper = styled.div`
  margin-top: 40px;
  :first-child{
    margin-top: 0;
    margin-bottom: 0;
}
`

const MoreButtonWrapper = styled.div`
  margin-top:20px;
`

export default class CategoryTemplate extends React.Component
{
  render () {
    var stories = null
    if (get(this.props.pathContext,'posts', null) !== null)
      stories = this.props.pathContext.posts

    return (
      <SuperWrapper>
        <NavigationBar siteTitle = {this.props.data.site.siteMetadata.title}/>
        <Container>
          <CategoryInfoWrapper>
            <CategoryName>{this.props.data.allCategoriesJson.edges[0].node.name}</CategoryName>
            <CategoryDescription>{this.props.data.allCategoriesJson.edges[0].node.description}</CategoryDescription>
          </CategoryInfoWrapper>

          <StoriesWrapper>
            {
              stories != null ? stories.map((story,index) => {
                return <CardWrapper key={story.node.fields.slug}><Card slug={story.node.fields.slug} heading={story.node.frontmatter.title} excerpt={story.node.frontmatter.excerpt} category={story.node.frontmatter.category} publishedDate={story.node.frontmatter.date} author={story.node.frontmatter.author}/></CardWrapper>
              }) : <h1>There is no post in this category. Stay Tuned</h1>
            }
          </StoriesWrapper>

          <MoreButtonWrapper>
            {!this.props.pathContext.isLast ? <Link to = {"/category/" + this.props.data.allCategoriesJson.edges[0].node.link + "/" + (this.props.pathContext.page+1)}><PrimaryButton float="left" label="Older Posts"/></Link>  : null}
            {!this.props.pathContext.isFirst && this.props.pathContext.page !== 2 ? <Link to = {"/category/" + this.props.data.allCategoriesJson.edges[0].node.link + "/" + (this.props.pathContext.page-1)}><PrimaryButton float="right" label="Newer Posts"/></Link>  : null}
            {!this.props.pathContext.isFirst && this.props.pathContext.page === 2 ? <Link to = {"/category/" + this.props.data.allCategoriesJson.edges[0].node.link}><PrimaryButton float="right" label="Newer Posts"/></Link>  : null}
          </MoreButtonWrapper>
        </Container>
        <MobileFooter/>
      </SuperWrapper>
    )
  }
}

export const pageQuery = graphql`
  query SiteInfoQuery($name : String) {
    site {
      siteMetadata {
        title
      }
    }

    allCategoriesJson (
      filter: { name: { eq: $name } }
    ){
      edges {
        node {
          name
          link
          description
          thumbnail
        }
      }
    }


    allMarkdownRemark (
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { category: { eq: $name } } }
      limit: 30
    ){
        edges {
          node {
            excerpt(pruneLength: 250)
            id
            fields{
              slug
            }
            frontmatter {
              title
              category
              excerpt
              date(formatString: "MMMM DD, YYYY")
              author
              type
              status
            }
          }
        }
      }
  }
`
