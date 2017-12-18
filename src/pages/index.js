import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import MobileFooter from '../components/MobileFooter'
import FeatureStory from '../components/FeatureStory'
import CategoryButton from '../components/CategoryButton'
import IndexTab from '../components/IndexTab'

import FeatureStoryThumbnail from '../assets/FeatureStoryThumbnail.jpg'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #FAFAFA;
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
    console.log(this.props.data)
    return (
      <Container>
        <NavBar siteTitle = {this.props.data.site.siteMetadata.title}/>

        <MainContentContainer>
          <FeatureStoryContainer>
            <FeatureStory
              headline = "อีก 1 ปีในมหิดลศาลายา จบปี 1 แล้วเฮ้! ลอกคราบความเป็น Sophomore สู่การเป็น Junior"
              excerpt = "ช่วงนี้เพื่อน ๆ ก็คงจะปิดเทอมกันหมดแล้วแหละ ส่วนใครที่ยังก็สู้ต่อไปนะทาเคชิ ส่วนเราสอบเสร็จ โปรเจ็คหมดแล้ว ปิดเทอมแบบเต็มตัวแล้วเฮ้ ! ตามธรรมเนียม (เหรอ?) ที่ผมจะเขียนว่าในหนึ่งปีที่เรียนมามีอะไรเกิดขึ้นบ้าง"
              featureThumbnail = {FeatureStoryThumbnail}
            />
          </FeatureStoryContainer>

          <ContentWrapper>
            <ContentContainer>
              <IndexTab categories={this.props.data.allCategoriesJson.edges} posts = {this.props.data.allMarkdownRemark.edges}/>
            </ContentContainer>
          </ContentWrapper>

        </MainContentContainer>

        <MobileFooter/>
      </Container>
    )
  }
}

export const query = graphql`
  query navQuery {
    site {
      siteMetadata {
        title
      }
    }

    # Get all Posts
    allMarkdownRemark (sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          html
          excerpt (pruneLength: 250)
          fields {
            slug
          }
          frontmatter {
            title
            landscapeThumbnail
            portraitThumbnail
            category
            date(formatString: "MMMM DD, YYYY")
            author
            type
            status
          }
        }
      }
    }

    allCategoriesJson {
      edges {
        node {
          id
          name
          link
          description
          thumbnail
        }
      }
    }
  }
`
