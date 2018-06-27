import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import moment from 'moment'
import { graphql } from 'gatsby'
import { isEmpty, orderBy, map, get } from 'lodash'

import firebase from '../utils/firebase'

import Layout from '../layouts/Layout'
import NavBar from '../components/NavBar'
import HeaderWithLine from '../components/HeaderWithLine'
import LivePostCard from '../components/LivePostCard'
import MobileFooter from '../components/MobileFooter'

const NavigationBar = styled(NavBar)`
  position: relative;
`

const ThumbnailWrapper = styled.div`
  padding-top: 44px;
  padding-bottom: 133px;

  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${props => props.thumbnail}), ${props => props.theme.primaryColour};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    padding-bottom: 49px;
  }
`

const ThumbnailContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  padding-top: 43px;
  margin-top: 43px;
`

const Heading = styled.h1`
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 3em;
  margin-top: 0;
  margin-bottom: 0;
  font-weight: 800;
`

const SubHeading = styled.h2`
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
  margin-bottom: 0;
`

const LiveStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 0;
`

const LiveStatusLabel = styled.span`
  margin-left: 5px;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-weight: 300;
  font-size: 18px;
`

const LiveSymbol = styled.div`
  background-color: ${props =>
    props.isLive ? 'red' : props.theme.textLowProfile};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: inline-block;
`

const Container = styled.div`
  width: 80%;
  margin: 0 auto;

  padding-top: 30px;
  padding-bottom: 77px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 90%;
    flex-direction: column;

    padding-bottom: 85px;
  }
`

const LatestPostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 82px;
  order: 1;

  @media (max-width: 768px) {
    padding-right: 0;
    order: 2;
  }
`

const PostWrapper = styled.div`
  margin-top: 10px;
`

const RightSide = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 82px;
  order: 2;

  @media (max-width: 768px) {
    padding-left: 0;
    order: 1;
  }
`

const LiveFeedContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const LiveFeed = styled.div`
  margin-top: 25px;
`

const EventDetailContainer = LiveFeedContainer.extend`
  margin-top: 30px;
`

const EventDescription = styled.span`
  margin-top: 20px;
  font-size: 18px;
  color: ${props => props.theme.textHeading};
`

const NoPostLabel = styled.h3`
  margin-top: 10px;
  margin-bottom: 0;
`

export default class LiveTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: null,
      firebaseRef:
        get(this.props.pageContext, 'post.slug', null) === null
          ? null
          : firebase.database().ref('live/' + this.props.pageContext.post.slug),
    }
  }

  componentDidMount() {
    if (this.state.firebaseRef !== null) {
      this.state.firebaseRef.on('value', snapshot => {
        this.setState({
          post: snapshot.val(),
        })
      })
    }
  }

  componentWillUnmount() {
    this.state.firebaseRef.off()
  }

  render() {
    const post = get(this.props.pageContext, 'post', null)

    var comments = null
    if (!isEmpty(this.state.post) && !isEmpty(this.state.post.comments)) {
      comments = orderBy(this.state.post.comments, ['timestamp'], ['desc'])
    }

    var liveStatus = null
    const status = get(this.state.post, 'status', 0)
    if (status === 1) {
      liveStatus = (
        <LiveStatus>
          <LiveSymbol isLive={true} />
          <LiveStatusLabel>Live</LiveStatusLabel>
        </LiveStatus>
      )
    } else if (status === 2) {
      liveStatus = (
        <LiveStatus>
          <LiveSymbol isLive={false} />
          <LiveStatusLabel>Ended</LiveStatusLabel>
        </LiveStatus>
      )
    } else {
      liveStatus = (
        <LiveStatus>
          <LiveSymbol isLive={false} />
          <LiveStatusLabel>Not started yet</LiveStatusLabel>
        </LiveStatus>
      )
    }

    const title = get(post, 'title', 'Untitled')
    const subtitle = get(post, 'subtitle', 'Untitled')
    const detail = get(post, 'detail', 'Untitled')
    const thumbnail = get(post, 'thumbnail', 'Untitled')
    const slug = get(post, 'slug', 'Untitled')

    const siteTitle = get(this.props, 'siteInfo.siteMetadata.title', 'Untitled')
    const siteUrl = get(this.props, 'siteInfo.siteMetadata.siteUrl', 'Untitled')

    return (
      <Layout>
        <React.Fragment>
          <Helmet
            title={title + ' - ' + siteTitle}
            meta={[
              { name: 'description', content: subtitle },

              // G+
              { itemprop: 'name', content: title + ' - ' + siteTitle },
              { itemprop: 'description', content: detail },
              { itemprop: 'image', content: thumbnail },

              // Open Graph
              { property: 'og:title', content: title + ' - ' + siteTitle },
              { property: 'og:description', content: detail },
              { property: 'og:locale', content: 'th_TH' },
              { property: 'og:type', content: 'article' },
              { property: 'og:url', content: siteUrl + slug },
              { property: 'og:image', content: thumbnail },
              { property: 'og:image:secure_url', content: thumbnail },
              { property: 'og:site_name', content: title + ' - ' + siteTitle },

              // Twitter
              { name: 'twitter:card', content: thumbnail },
              { name: 'twitter:image:src', content: thumbnail },
              { name: 'twitter:title', content: title + ' - ' + siteTitle },
              { name: 'twitter:description', content: detail },
            ]}
          />
          <NavigationBar siteTitle={siteTitle} />
          <ThumbnailWrapper thumbnail={thumbnail}>
            <ThumbnailContent>
              <Heading>{title}</Heading>
              <SubHeading>{subtitle}</SubHeading>
              {liveStatus}
            </ThumbnailContent>
          </ThumbnailWrapper>

          <Container>
            <LatestPostContainer>
              <HeaderWithLine label="Latest Post" />
              <PostWrapper>
                {comments !== null ? (
                  map(comments, item => {
                    if (moment.unix(item.timestamp).isValid())
                      return <LivePostCard key={item.timestamp} post={item} />
                  })
                ) : (
                  <NoPostLabel>
                    There's no post right now, posts will be feeded when the
                    event was started. Stay Tuned!{' '}
                    <span
                      role="img"
                      aria-label="radio"
                      aria-labelledby="stay tuned"
                    >
                      📻
                    </span>
                  </NoPostLabel>
                )}
              </PostWrapper>
            </LatestPostContainer>
            <RightSide>
              <LiveFeedContainer>
                <HeaderWithLine label="Live Feed" />
                {!isEmpty(get(this.state.post, 'live', null)) ? (
                  <LiveFeed
                    dangerouslySetInnerHTML={{ __html: this.state.post.live }}
                  />
                ) : (
                  <NoPostLabel>
                    Currenly, there's no live feed{' '}
                    <span
                      role="img"
                      aria-label="television"
                      aria-labelledby="television"
                    >
                      📺
                    </span>. We'll put when it available. Stay Tuned!
                  </NoPostLabel>
                )}
              </LiveFeedContainer>

              <EventDetailContainer>
                <HeaderWithLine label="Event Detail" />
                <EventDescription>{detail}</EventDescription>
              </EventDetailContainer>
            </RightSide>
          </Container>
          <MobileFooter />
        </React.Fragment>
      </Layout>
    )
  }
}
