import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import moment from 'moment'
import {isEmpty, orderBy, map} from 'lodash'

import firebase from '../utils/firebase'
import colours from '../utils/colours'

import Link from 'gatsby-link'

import NavBar from '../components/NavBar'
import HeaderWithLine from '../components/HeaderWithLine'
import LivePostCard from '../components/LivePostCard'
import MobileFooter from '../components/MobileFooter'

const NavigationBar = styled(NavBar)`
  position: relative;
`
const SuperWrapper = styled.div`
  background-color: #F5F5F5;
  min-height: 100vh;
`

const ThumbnailWrapper = styled.div`
  padding-top:44px;
  padding-bottom: 133px;

  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${props => props.thumbnail}), ${colours.primaryColour};
  background-size:cover;
  background-position:center;
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
  color:white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.20);
  font-size: 3em;
  margin-top:0;
  margin-bottom: 0;
  font-weight: 800;
`

const SubHeading = styled.h2`
  color:white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.20);
  margin-top:10px;
  margin-bottom: 0;
`

const LiveStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top:10px;
  margin-bottom: 0;
`

const LiveStatusLabel = styled.span`
  margin-left: 5px;
  color:white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.20);
  font-weight: 300;
  font-size: 18px;
`

const LiveSymbol = styled.div`
  background-color: ${props => props.isLive? "red": colours.textLowProfile};
  box-shadow: 0 2px 4px rgba(0,0,0,0.20);
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
  order:1;

  @media (max-width: 768px) {
    padding-right: 0;
    order: 2
  }
`

const PostWrapper = styled.div`
  margin-top:10px;
`

const RightSide = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  padding-left: 82px;
  order:2;

  @media (max-width: 768px) {
    padding-left: 0;
    order: 1;
  }
`

const LiveFeedContainer = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
`

const LiveFeed = styled.div`
  margin-top:25px;
`

const EventDetailContainer = LiveFeedContainer.extend`
  margin-top: 30px;
`

const EventDescription = styled.span`
  margin-top: 20px;
  font-size: 18px;
  color: ${colours.textHeading};
`

export default class LiveTemplate extends React.Component
{
  constructor(props) {
      super(props)
      this.state = {
        status : 0,
        post: null
      }
  }

  componentDidMount () {
    firebase.database().ref("live/" + this.props.pathContext.post.slug).on('value', (snapshot) => {
      this.setState({
        status: snapshot.val().status,
        post: snapshot.val()
      })
    })
  }

  render () {
    const post = this.props.pathContext.post

    var comments = null
    if (!isEmpty(this.state.post) && !isEmpty(this.state.post.comments)) {
      comments = orderBy(this.state.post.comments, ['timestamp'], ['desc'])
    }

    var liveStatus = null
    if (this.state.status === 1) {
      liveStatus = <LiveStatus>
        <LiveSymbol isLive={true}/>
        <LiveStatusLabel>Live</LiveStatusLabel>
      </LiveStatus>
    }
    else if (this.state.status == 2) {
      liveStatus = <LiveStatus>
        <LiveSymbol isLive={false}/>
        <LiveStatusLabel>Ended</LiveStatusLabel>
      </LiveStatus>
    }
    else  {
      liveStatus = <LiveStatus>
        <LiveSymbol isLive={false}/>
        <LiveStatusLabel>Not started yet</LiveStatusLabel>
      </LiveStatus>
    }

    return (
      <SuperWrapper>
        <Helmet title={post.title}/>
        <NavigationBar siteTitle = {this.props.pathContext.siteInfo.siteMetadata.title}/>
        <ThumbnailWrapper thumbnail={post.thumbnail}>
          <ThumbnailContent>
            <Heading>{post.title}</Heading>
            <SubHeading>{post.subtitle}</SubHeading>
            {liveStatus}
          </ThumbnailContent>
        </ThumbnailWrapper>

        <Container>
          <LatestPostContainer>
            <HeaderWithLine label="Latest Post"/>
            <PostWrapper>
              {
                comments !== null ?
                  map(comments, (item) => {
                    if (moment.unix(item.timestamp).isValid()) return (<LivePostCard key={item.timestamp} post={item}/>)
                  }) : null
              }
            </PostWrapper>
          </LatestPostContainer>
          <RightSide>
            <LiveFeedContainer>
                <HeaderWithLine label="Live Feed"/>
                <LiveFeed dangerouslySetInnerHTML={{ __html: post.live }}/>
            </LiveFeedContainer>

            <EventDetailContainer>
              <HeaderWithLine label="Event Detail"/>
              <EventDescription>{post.detail}</EventDescription>
            </EventDetailContainer>
          </RightSide>
        </Container>
        <MobileFooter/>
      </SuperWrapper>
    )
  }
}
