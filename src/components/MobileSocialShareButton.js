import React from 'react'
import styled from 'styled-components'
import color from 'color'
import { FaFacebookF, FaTwitter } from 'react-icons/fa'

import {
  getFacebookShareLink,
  getTwitterShareLink,
  convertLinkFromSlug,
} from '../utils/link'

const Header = styled.span`
  font-weight: 300;
  margin-bottom: 10px;
`

const Container = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;

  ${Header} {
    color: ${props =>
      props.isNight
        ? props.theme.night_text_normal
        : props.theme.textSecondary};
  }
`

const ButtonGroup = styled.div`
  display: flex;
`

const IconLink = styled.a`
  margin-left: 20px;

  &:first-child {
    margin-left: 0;
  }
`

const FacebookIcon = styled(FaFacebookF)`
  align-self: center;
  width: 35px;
  height: auto;
  color: ${props =>
    props.isnight
      ? props.theme.night_text_normal
      : color(props.theme.textSecondary)
          .lighten(0.2)
          .string()};

  &:hover {
    color: ${props => props.theme.facebook};
  }
`

const TwitterIcon = styled(FaTwitter)`
  align-self: center;
  width: 35px;
  height: auto;
  color: ${props =>
    props.isnight
      ? props.theme.night_text_normal
      : color(props.theme.textSecondary)
          .lighten(0.2)
          .string()};

  &:hover {
    color: ${props => props.theme.twitter};
  }
`

export default class MobileSocialShareButton extends React.Component {
  render() {
    var link = convertLinkFromSlug(this.props.slug)
    return (
      <Container isNight={this.props.isNight}>
        <Header>Share this article to social network?</Header>
        <ButtonGroup>
          <IconLink
            href={getFacebookShareLink(link)}
            rel="noopener"
            target="_blank"
            aria-label="Share to Facebook"
          >
            <FacebookIcon
              isnight={this.props.isNight ? 1 : 0}
              name={'facebook'}
            />
          </IconLink>
          <IconLink
            href={getTwitterShareLink(link)}
            rel="noopener"
            target="_blank"
            aria-label="Share to Twitter"
          >
            <TwitterIcon
              isnight={this.props.isNight ? 1 : 0}
              name={'twitter'}
            />
          </IconLink>
        </ButtonGroup>
      </Container>
    )
  }
}
