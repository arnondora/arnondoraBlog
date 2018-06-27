import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const Author = styled.h3`
  margin-bottom: 2px;
`

const Subtitle = styled.span`
  font-size: 14px;
  margin-bottom: 10px;
`

const Content = styled.span`
  font-size: 18px;
`

const Container = styled.div `
  display: flex;
  flex-direction: column;
  padding: 20px 18px 20px 18px;
  background-color: ${props => props.isNight ? props.theme.night_darkBackground : '#FFFFFF'};
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.05);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 25px;
  border-radius: 8px;

  & > ${Author} {
    color: ${props => props.isNight ? props.theme.night_text_light : props.theme.primaryColour};
  }

  & > ${Subtitle} {
    color: ${props => props.isNight ? props.theme.night_text_normal : props.theme.textSecondary};
  }

  & > ${Content} {
    color: ${props => props.isNight ? props.theme.night_text_normal : props.theme.textHeading};
  }
`

export default class CommentItem extends React.Component {
  render() {
    return (
      <Container isNight={this.props.isNight}>
        <Author>{this.props.comment.name}</Author>
        <Subtitle>
          Posted on{' '}
          {moment.unix(this.props.comment.timestamp).format('MMMM DD, YYYY')}
        </Subtitle>
        <Content>{this.props.comment.comment}</Content>
      </Container>
    )
  }
}
