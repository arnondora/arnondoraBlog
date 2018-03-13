import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { get, isEmpty } from 'lodash'
import colours from '../utils/colours'
import Link from 'gatsby-link'

import NavBar from '../components/NavBar'
import MobileFooter from '../components/MobileFooter'
import FeaturedCategory from '../components/FeaturedCategory'
import CardImage from '../components/CardImage'
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
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-top: -10px;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`

const ErrorMessage = styled.h3`
  margin-top:10px;
`

const CardWrapper = styled.div`
  flex-grow: 1;
  margin-top: 15px;
  padding-left: 30px;
  width:33.33%;
  :first-child{
    padding-left: 0;
  }

  @media (max-width: 1200px) {
    width:100%;
    padding-left: 0;
  }
`

const SectionHeader = styled.h4`
  color: ${colours.textSecondary};
  margin-top:30px;
  margin-bottom: 10px;
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
        <Helmet title={this.props.pathContext.category.name + " - " + this.props.pathContext.siteInfo.siteMetadata.title}/>
        <NavigationBar siteTitle = {this.props.pathContext.siteInfo.siteMetadata.title}/>
        <Container>
          <CategoryInfoWrapper>
            <CategoryName>{this.props.pathContext.category.name}</CategoryName>
            <CategoryDescription>{this.props.pathContext.category.description}</CategoryDescription>
          </CategoryInfoWrapper>

          {!isEmpty(this.props.pathContext.featurePost) ? <FeaturedCategory categoryName = {this.props.pathContext.category.name} post={this.props.pathContext.featurePost}/> : null}

          {stories != null ? <div><SectionHeader>Latest</SectionHeader><hr/></div> : null}

          <StoriesWrapper>
            {
              stories != null ? stories.map((story,index) => {
                return <CardWrapper key={story.node.fields.slug}><CardImage post={story}/></CardWrapper>
              })
              : !isEmpty(this.props.pathContext.featurePost)? <ErrorMessage>There's no more post in this category</ErrorMessage> :
                <ErrorMessage>There is no post in this category. Stay Tuned</ErrorMessage>
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
