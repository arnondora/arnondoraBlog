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
  background-color: #FAFAFA;
  min-height: 100vh;
`

const NavigationBar = styled(NavBar)`
  position: fixed;
  top: 0;
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

const CategoryContainer = styled.div`
  width:80%;
  margin: 0 auto;
  margin-top:20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-bottom: 80px;
`

export default class IndexPage extends React.Component {
  render () {
    return (
      <Container>
        <NavigationBar/>

        <MainContentContainer>
          <FeatureStoryContainer>
            <FeatureStory/>
          </FeatureStoryContainer>

          <ContentWrapper>
            <ContentContainer>
              <IndexTab/>
            </ContentContainer>
          </ContentWrapper>

        </MainContentContainer>

        <MobileFooter/>
      </Container>
    )
  }
}
