import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import color from 'color'

const SuperWrapper = styled.div`
  background-color: ${props =>
    props.isNight
      ? props.theme.night_lightBackground
      : props.theme.secondaryBackground};
  border-top: 1px solid
    ${props =>
      props.isNight
        ? props.theme.night_secondaryBorder
        : props.theme.secondaryBorder};
  border-bottom: ${props =>
    props.hasRelated
      ? '1px solid ' + props.isNight
        ? props.theme.night_secondaryBorder
        : props.theme.secondaryBorder
      : 'none'};
  padding-top: 35px;
  padding-bottom: 35px;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: nowrap;
  width: 70%;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Label = styled.span`
  font-size: 1.2em;
  font-weight: 300;
  margin: 0;
`

const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 3px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0;
    margin-bottom: 0;

    :last-child {
      margin-top: 10px;
    }
  }
`
const PreviousStoryContainer = styled(StoryContainer)`
  float: left;
  padding-left: 20px;

  ${Label} {
    color: ${props =>
      props.isNight ? props.theme.night_text_normal : '#666666'};
  }

  & > a,
  & > a:visited,
  & > a:hover {
    color: ${props =>
      props.isNight ? props.theme.night_text_light : props.theme.primaryColour};
  }

  @media (max-width: 768px) {
    padding-left: 0;
  }
`

const NextStoryContainer = styled(StoryContainer)`
  float: right;
  padding-right: 20px;

  ${Label} {
    color: ${props =>
      props.isNight ? props.theme.night_text_normal : '#666666'};
  }

  & > a,
  & > a:visited,
  & > a:hover {
    color: ${props =>
      props.isNight ? props.theme.night_text_light : props.theme.primaryColour};
  }

  & > ${Label} {
    text-align: right;
  }

  @media (max-width: 768px) {
    & > ${Label} {
      text-align: left;
    }
  }

  @media (max-width: 768px) {
    padding-right: 0;
  }
`

const Heading = styled(Link)`
  font-size: 1.4em;
  font-weight: 700;
  margin: 10px 0 0 0;

  ${NextStoryContainer} > & {
    text-align: right;

    @media (max-width: 768px) {
      text-align: left;
    }
  }

  :hover {
    color: ${props =>
      color(props.theme.primaryColour)
        .darken(0.2)
        .string()};
  }
`

export default class NextStory extends React.Component {
  render() {
    return (
      <SuperWrapper
        hasRelated={this.props.hasRelated}
        isNight={this.props.isNight}
      >
        <Container>
          {this.props.next !== false ? (
            <NextStoryContainer isNight={this.props.isNight}>
              <Label>Previous</Label>
              <Heading to={this.props.next.fields.slug}>
                ← {this.props.next.frontmatter.title}
              </Heading>
            </NextStoryContainer>
          ) : null}

          {this.props.prev !== false ? (
            <PreviousStoryContainer isNight={this.props.isNight}>
              <Label>Next</Label>
              <Heading to={this.props.prev.fields.slug}>
                {this.props.prev.frontmatter.title} →
              </Heading>
            </PreviousStoryContainer>
          ) : null}
        </Container>
      </SuperWrapper>
    )
  }
}
