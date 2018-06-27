import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import {get} from 'lodash'

import Layout from '../layouts/Layout'
import NavBar from '../components/NavBar'
import CardLiveImage from '../components/CardLiveImage'
import MobileFooter from '../components/MobileFooter'


const NavigationBar = styled(NavBar)`
  position: relative;
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

const PageCaption = styled.h1 `
  color: ${props => props.theme.textHeading};
  margin: 0;
  font-weight: 700;
  padding-bottom: 20px;
  border-bottom-style: solid;
  border-bottom-color: #E0E0E0;
  border-bottom-width: 1px;
`

const PostWrapper = styled.div`
  margin-top: 20px;
`


export default class LiveListTemplate extends React.Component
{
  render () {
    var posts = get(this.props.pageContext, 'posts', null)

    if (posts === null) {
      posts = <span>There's no Live Blog available yet.</span>
    }
    else {
      posts = this.props.pageContext.posts.map((item) => {
          return (
            <CardLiveImage key={item.slug} post={item}/>
          )
      })
    }

    const siteTitle = get(this.props.pageContext, 'siteInfo.siteMetadata.title', '"Hello World"')

    return (
      <Layout>
        <React.Fragment>
          <Helmet title={"Live Blog - " + siteTitle}/>
          <NavigationBar siteTitle = {siteTitle}/>
          <Container>
               <PageCaption>Live Blog</PageCaption>
            <PostWrapper>
              {posts}
            </PostWrapper>
          </Container>
          <MobileFooter/>
        </React.Fragment>
      </Layout>
    )
  }
}
