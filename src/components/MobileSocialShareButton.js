import React from 'react'
import styled from 'styled-components'
import color from 'color'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFacebookF from '@fortawesome/fontawesome-free-brands/faFacebookF'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'
import faGooglePlus from '@fortawesome/fontawesome-free-brands/faGooglePlus'

import {
  getFacebookShareLink,
  getTwitterShareLink,
  getGooglePlusShareLink,
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

const Icon = styled(FontAwesomeIcon)`
  align-self: center;
  color: ${props =>
    props.isnight
      ? props.theme.night_text_normal
      : color(props.theme.textSecondary)
          .lighten(0.2)
          .string()};

  &:hover {
    color: ${props =>
      props.name === 'facebook'
        ? props.theme.facebook
        : props.name === 'twitter'
          ? props.theme.twitter
          : props.theme.googlePlus};
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
            <Icon
              icon={faFacebookF}
              isnight={this.props.isNight ? 1 : 0}
              name={'facebook'}
              size="2x"
            />
          </IconLink>
          <IconLink
            href={getTwitterShareLink(link)}
            rel="noopener"
            target="_blank"
            aria-label="Share to Twitter"
          >
            <Icon
              icon={faTwitter}
              isnight={this.props.isNight ? 1 : 0}
              name={'twitter'}
              size="2x"
            />
          </IconLink>
          <IconLink
            href={getGooglePlusShareLink(link)}
            rel="noopener"
            target="_blank"
            aria-label="Share to Google Plus"
          >
            <Icon
              icon={faGooglePlus}
              isnight={this.props.isNight ? 1 : 0}
              name={'google+'}
              size="2x"
            />
          </IconLink>
        </ButtonGroup>
      </Container>
    )
  }
}
