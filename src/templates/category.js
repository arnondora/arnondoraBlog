import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'
import { Link } from 'gatsby'

import Layout from '../layouts/Layout'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import MobileFooter from '../components/MobileFooter'
import FeaturedCategory from '../components/FeaturedCategory'
import CardImage from '../components/CardImage'
import PrimaryButton from '../components/PrimaryButton'
import PageTitle from '../components/PageTitle'

const NavigationBar = styled(NavBar)`
  position: relative;
`

const Container = styled.div`
  width: 80%;
  margin: 0 auto;

  padding-top: 104px;
  padding-bottom: 50px;

  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding-bottom: 130px;
    width: 90%;
  }
`
const CategoryInfoWrapper = styled.div`
  padding-bottom: 20px;
  border-bottom-style: solid;
  border-bottom-color: #e0e0e0;
  border-bottom-width: 1px;
`

const CategoryName = styled.h1`
  margin: 0;
  font-weight: 700;
`

const CategoryDescription = styled.p`
  margin-bottom: 0;
  margin-top: 10px;
  color: ${props => props.theme.textDisable};
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
  margin-top: 10px;
`

const CardWrapper = styled.div`
  flex-grow: 1;
  margin-top: 15px;
  padding-left: 30px;
  width: 33.33%;
  :first-child {
    padding-left: 0;
  }

  @media (max-width: 1200px) {
    width: 100%;
    padding-left: 0;
  }
`

const SectionHeader = styled.h4`
  color: ${props => props.theme.textSecondary};
  margin-top: 30px;
  margin-bottom: 10px;
`

const MoreButtonWrapper = styled.div`
  margin-top: 20px;
`

export default class CategoryTemplate extends React.Component {
  render() {
    var stories = null
    if (get(this.props.pageContext, 'posts', null) !== null)
      stories = this.props.pageContext.posts

    var feature_story = null

    //Check for featured category story
    if (
      !isEmpty(this.props.pageContext.featurePost) ||
      (this.props.pageContext.featurePost.node.frontmatter.status !==
        'published' &&
        moment(
          this.props.pageContext.featurePost.node.frontmatter.date,
          'MMMM DD, YYYY'
        ).isValid() &&
        moment(
          this.props.pageContext.featurePost.node.frontmatter.date,
          'MMMM DD, YYYY'
        ).unix() >= moment().unix() &&
        stories !== null)
    ) {
      feature_story = stories[0]
    } else {
      feature_story = this.props.pageContext.featurePost
    }

    return (
      <Layout>
        <React.Fragment>
          <PageTitle title={this.props.pageContext.category.name} />
          <NavigationBar />
          <Container>
            <CategoryInfoWrapper>
              <CategoryName>
                {this.props.pageContext.category.name}
              </CategoryName>
              <CategoryDescription>
                {this.props.pageContext.category.description}
              </CategoryDescription>
            </CategoryInfoWrapper>

            {!isEmpty(feature_story) ? (
              <FeaturedCategory
                categoryName={this.props.pageContext.category.name}
                post={feature_story}
              />
            ) : null}

            {stories != null ? (
              <React.Fragment>
                <SectionHeader>Latest</SectionHeader>
                <hr />
              </React.Fragment>
            ) : null}

            <StoriesWrapper>
              {stories != null ? (
                stories.map((story, index) => {
                  return (
                    <CardWrapper key={story.node.fields.slug}>
                      <CardImage post={story} />
                    </CardWrapper>
                  )
                })
              ) : !isEmpty(this.props.pageContext.featurePost) ? (
                <ErrorMessage>
                  There's no more post in this category
                </ErrorMessage>
              ) : (
                <ErrorMessage>
                  There is no post in this category. Stay Tuned
                </ErrorMessage>
              )}
            </StoriesWrapper>

            <MoreButtonWrapper>
              {!this.props.pageContext.isLast ? (
                <Link
                  to={
                    '/category/' +
                    this.props.pageContext.category.link +
                    '/' +
                    (this.props.pageContext.page + 1)
                  }
                >
                  <PrimaryButton float="left" label="Older Posts" />
                </Link>
              ) : null}
              {!this.props.pageContext.isFirst &&
              this.props.pageContext.page !== 2 ? (
                <Link
                  to={
                    '/category/' +
                    this.props.pageContext.category.link +
                    '/' +
                    (this.props.pageContext.page - 1)
                  }
                >
                  <PrimaryButton float="right" label="Newer Posts" />
                </Link>
              ) : null}
              {!this.props.pageContext.isFirst &&
              this.props.pageContext.page === 2 ? (
                <Link to={'/category/' + this.props.pageContext.category.link}>
                  <PrimaryButton float="right" label="Newer Posts" />
                </Link>
              ) : null}
            </MoreButtonWrapper>
          </Container>
          <Footer mobilehide />
          <MobileFooter />
        </React.Fragment>
      </Layout>
    )
  }
}
