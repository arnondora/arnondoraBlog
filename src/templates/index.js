import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import MobileFooter from '../components/MobileFooter'
import FeatureStory from '../components/FeatureStory'
import CategoryButton from '../components/CategoryButton'
import IndexTab from '../components/IndexTab'

import siteLogo from '../assets/favicon.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 83px;

  @media (min-width: 576px) {
      padding-bottom: 0;
  }
`

const FeatureStoryContainer = styled.div`
  position: fixed;
  top: 74px;
  width:35%;

  @media (max-width: 768px) {
      display: none;
  }
`

const ContentWrapper = styled.div`
  position: relative;
  width:65%;
  margin-top: 74px;
  margin-left: auto;

  @media (max-width: 768px) {
      width:100%;
  }
`

const ContentContainer = styled.div`
  width:95%;
  margin: 0 auto;
  padding-top:20px;
  display: flex;
  flex-direction:column;
`

export default class IndexPage extends React.Component {
  render () {
    return (
      <Container>
        <Helmet
          title="Hello World - Mad Programmer Diary"
          meta={[
            { name: 'description', content: 'The offical personal blog of @arnondora' },
            {property: "og:title", "content" : 'Hello World - Mad Programmer Diary'},
            {property: "og:description", "content" : 'The offical personal blog of @arnondora'},
            {property: "og:locale", "content" : "th_TH"},
            {property: "og:type", "content": "blog"},
            {property: "og:url", "content": `${process.env.APP_URL}`},
            {property: "og:image:secure_url", "content": siteLogo},
            {property: "og:site_name", "content": 'Hello World - Mad Programmer Diary'},
          ]}
        />
        <NavBar siteTitle = {this.props.pathContext.siteInfo.siteMetadata.title}/>

        <React.Fragment>
          <FeatureStoryContainer>
            <FeatureStory
              featuredStory = {this.props.pathContext.featurePosts}
            />
          </FeatureStoryContainer>

          <ContentWrapper>
            <ContentContainer>
              <IndexTab context = {this.props.pathContext}/>
            </ContentContainer>
          </ContentWrapper>
        </React.Fragment>

        <MobileFooter/>
      </Container>
    )
  }
}
