import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import colours from '../utils/colours'

import NavBar from '../components/NavBar'
import CardLiveImage from '../components/CardLiveImage'
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
const PageCaptionWrapper = styled.div`
  padding-bottom: 20px;
  border-bottom-style: solid;
  border-bottom-color: #E0E0E0;
  border-bottom-width: 1px;
`

const PageCaption = styled.h1 `
  color: ${colours.textHeading};
  margin: 0;
  font-weight: 700;
`

const PostWrapper = styled.div`
  margin-top: 20px;
`


export default class CategoryTemplate extends React.Component
{
  render () {
    console.log(this.props.pathContext)

    var posts = this.props.pathContext.posts.map((item) => {
        return (
          <CardLiveImage key={item.slug} post={item}/>
        )
    })

    return (
      <SuperWrapper>
        <Helmet title={"Live Blog - " + this.props.pathContext.siteInfo.siteMetadata.title}/>
        <NavigationBar siteTitle = {this.props.pathContext.siteInfo.siteMetadata.title}/>
        <Container>
          <PageCaptionWrapper>
             <PageCaption>Live Blog</PageCaption>
          </PageCaptionWrapper>
          <PostWrapper>
            {posts}
          </PostWrapper>
        </Container>
        <MobileFooter/>
      </SuperWrapper>
    )
  }
}
