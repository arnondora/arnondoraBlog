import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { get, isEmpty } from 'lodash'
import colours from '../utils/colours'
import Link from 'gatsby-link'

import NavBar from '../components/NavBar'
import MobileFooter from '../components/MobileFooter'
import FeaturedCategory from '../components/FeaturedCategory'
import Card from '../components/Card'
import PrimaryButton from '../components/PrimaryButton'

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
const CategoryInfoWrapper = styled.div`
  color: ${colours.textHeading};
  padding-bottom: 20px;
  border-bottom-style: solid;
  border-bottom-color: #E0E0E0;
  border-bottom-width: 1px;
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
        <NavigationBar siteTitle = {this.props.pathContext.siteInfo.siteMetadata.title}/>
        <Container>
          <CategoryInfoWrapper>
            <CategoryName>{this.props.pathContext.category.name}</CategoryName>
            <CategoryDescription>{this.props.pathContext.category.description}</CategoryDescription>
          </CategoryInfoWrapper>

          {!isEmpty(this.props.pathContext.featurePost) ? <FeaturedCategory categoryName = {this.props.pathContext.category.name} post={this.props.pathContext.featurePost}/> : null}

          <StoriesWrapper>
            {
              stories != null ? stories.map((story,index) => {
                return <CardWrapper key={story.node.fields.slug}><Card slug={story.node.fields.slug} heading={story.node.frontmatter.title} excerpt={story.node.frontmatter.excerpt} category={story.node.frontmatter.category} publishedDate={story.node.frontmatter.date} author={story.node.frontmatter.author}/></CardWrapper>
              })
              : this.props.pathContext.featurePost.length !== 0 ? <h3>There's no more post in this category</h3> :
                <h1>There is no post in this category. Stay Tuned</h1>
            }
          </StoriesWrapper>

          <MoreButtonWrapper>
            {!this.props.pathContext.isLast ? <Link to = {"/category/" + this.props.pathContext.category.link + "/" + (this.props.pathContext.page+1)}><PrimaryButton float="left" label="Older Posts"/></Link>  : null}
            {!this.props.pathContext.isFirst && this.props.pathContext.page !== 2 ? <Link to = {"/category/" + this.props.pathContext.category.link + "/" + (this.props.pathContext.page-1)}><PrimaryButton float="right" label="Newer Posts"/></Link>  : null}
            {!this.props.pathContext.isFirst && this.props.pathContext.page === 2 ? <Link to = {"/category/" + this.props.pathContext.category.link}><PrimaryButton float="right" label="Newer Posts"/></Link>  : null}
          </MoreButtonWrapper>
        </Container>
        <MobileFooter/>
      </SuperWrapper>
    )
  }
}
