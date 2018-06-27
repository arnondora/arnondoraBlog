import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import Layout from '../layouts/Layout'
import NavBar from '../components/NavBar'
import MobileFooter from '../components/MobileFooter'
import FeatureStory from '../components/FeatureStory'
import IndexTab from '../components/IndexTab'

import siteLogo from '../assets/favicon.png'

const FeatureStoryContainer = styled.div`
  position: fixed;
  top: 74px;
  width: 35%;

  @media (max-width: 768px) {
    display: none;
  }
`

const ContentWrapper = styled.div`
  position: relative;
  width: 65%;
  margin-top: 74px;
  margin-left: auto;
  padding-bottom: 83px;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (min-width: 576px) {
    padding-bottom: 0;
  }
`

const ContentContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
`

export default class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <React.Fragment>
          <Helmet
            title="Hello World - Mad Programmer Diary"
            meta={[
              {
                name: 'description',
                content: 'The offical personal blog of @arnondora',
              },
              { name: 'author', content: 'Arnon Puitrakul @arnondora' },

              // G+
              {
                itemprop: 'name',
                content: 'Hello World - Mad Programmer Diary',
              },
              { itemprop: 'author', content: 'Arnon Puitrakul @arnondora' },
              {
                itemprop: 'description',
                content: 'The offical personal blog of @arnondora',
              },

              // Open Graph
              {
                property: 'og:title',
                content: 'Hello World - Mad Programmer Diary',
              },
              {
                property: 'og:description',
                content: 'The offical personal blog of @arnondora',
              },
              { property: 'og:locale', content: 'th_TH' },
              { property: 'og:type', content: 'blog' },
              { property: 'og:url', content: `${process.env.APP_URL}` },
              { property: 'og:image:secure_url', content: siteLogo },
              {
                property: 'og:site_name',
                content: 'Hello World - Mad Programmer Diary',
              },

              // Twitter
              { name: 'twitter:site', content: 'Arnon Puitrakul @arnondora' },
              {
                name: 'twitter:creator',
                content: 'Arnon Puitrakul @arnondora',
              },
              {
                name: 'twitter:title',
                content: 'Hello World - Mad Programmer Diary',
              },
              {
                name: 'twitter:description',
                content: 'The offical personal blog of @arnondora',
              },
            ]}
          />
          <NavBar
            siteTitle={this.props.pageContext.siteInfo.siteMetadata.title}
          />

          <React.Fragment>
            <FeatureStoryContainer>
              <FeatureStory
                featuredStory={this.props.pageContext.featurePosts}
              />
            </FeatureStoryContainer>

            <ContentWrapper>
              <ContentContainer>
                <IndexTab context={this.props.pageContext} />
              </ContentContainer>
            </ContentWrapper>
          </React.Fragment>

          <MobileFooter />
        </React.Fragment>
      </Layout>
    )
  }
}
