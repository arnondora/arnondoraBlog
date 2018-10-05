import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  overflow: hidden;
  border-radius: 8px;
  margin-top: 20px;
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

const AuthorLabel = styled(Label)`
  font-size: 14px;
  color: ${props => props.theme.primaryColour};
  padding-top: 20px;
`

const TimeLabel = styled(Label)`
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  margin-top: 0x;
  padding-bottom: 10px;
`

const PostLabel = styled(Label)`
  font-size: 18px;
  padding-bottom: 20px;
  color: ${props => props.theme.textHeading};
`

export default class LivePostCard extends React.Component {
  render() {
    return (
      <ContentContainer>
        {!isEmpty(this.props.post.image) ? (
          <PostImage src={this.props.post.image} />
        ) : null}
        <AuthorLabel>{this.props.post.name}</AuthorLabel>
        <TimeLabel>
          {moment.unix(this.props.post.timestamp).fromNow()}
        </TimeLabel>
        {!isEmpty(this.props.post.comment) ? (
          <PostLabel>{this.props.post.comment}</PostLabel>
        ) : null}
      </ContentContainer>
    )
  }
}
