import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import MobileFooter from '../components/MobileFooter'
import FeatureStory from '../components/FeatureStory'
import CategoryButton from '../components/CategoryButton'
import IndexTab from '../components/IndexTab'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #F5F5F5;
  min-height: 100vh;
`

const MainContentContainer = styled.div`
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
`

export default class IndexPage extends React.Component {
  render () {
    return (
      <Container>
        <NavBar siteTitle = {this.props.pathContext.siteInfo.siteMetadata.title}/>

        <MainContentContainer>
          <FeatureStoryContainer>
            <FeatureStory
              posts = {this.props.pathContext.featurePosts}
            />
          </FeatureStoryContainer>

          <ContentWrapper>
            <ContentContainer>
              <IndexTab context = {this.props.pathContext}/>
            </ContentContainer>
          </ContentWrapper>

        </MainContentContainer>

        <MobileFooter/>
      </Container>
    )
  }
}
