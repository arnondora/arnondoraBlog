import React from 'react'
import styled from 'styled-components'
import {Link} from 'gatsby'

const Container = styled(Link)`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 52px 20px 52px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  overflow: hidden;
  border-radius: 8px;

  :hover {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  }
`

const Heading = styled.h2`
  color: ${props => props.theme.textHeading};
  font-size: 25.92px;
  margin-top: 0;
  margin-bottom: 0;

  ${ContentContainer}:hover > & {
    color: ${props => props.theme.primaryColour};
  }
`

const Subtitle = styled.p`
  color: ${props => props.theme.textSecondary};
  margin-top: 30px;
  margin-bottom: 0;
`

export default class CardLiveImage extends React.Component {
  render() {
    return (
      <Container to={'/live/' + this.props.post.slug}>
        <ContentContainer>
          <Heading to={'/live/' + this.props.post.slug}>
            {this.props.post.title}
          </Heading>
          <Subtitle>{this.props.post.subtitle}</Subtitle>
        </ContentContainer>
      </Container>
    )
  }
}
