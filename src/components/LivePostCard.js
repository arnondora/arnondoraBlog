import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import {isEmpty} from 'lodash'

import colours from '../utils/colours'

const ContentContainer = styled.div `
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.05);
  border-radius: 2px;
  overflow: hidden;

  margin-top: 20px;

  :hover {
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.20);
  }
`

const PostImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 5px;
`

const Label = styled.span`
  margin-left: 20px;
  margin-right: 20px;
`

const AuthorLabel = Label.extend`
  font-size: 14px;
  color: ${colours.primaryColour};
  padding-top:20px;
`

const TimeLabel = Label.extend`
  font-size: 14px;
  color: ${colours.textSecondary};
  margin-top:0x;
  padding-bottom: 10px;
`

const PostLabel = Label.extend`
  font-size: 18px;
  padding-bottom: 20px;
  color: ${colours.textHeading};
`

export default class LivePostCard extends React.Component {
  render () {
    return (
      <ContentContainer>
        {!isEmpty(this.props.post.image)? <PostImage src={this.props.post.image}/>:null}
        <AuthorLabel>{this.props.post.name}</AuthorLabel>
        <TimeLabel>{moment.unix(this.props.post.timestamp).fromNow()}</TimeLabel>
        {!isEmpty(this.props.post.comment)? <PostLabel>{this.props.post.comment}</PostLabel>: null}
      </ContentContainer>
    )
  }
}
