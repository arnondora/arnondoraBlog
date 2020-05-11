import React from 'react'
import styled from 'styled-components'
import color from 'color'
import { FaFacebookF, FaTwitter, FaLine } from 'react-icons/fa'

import {
  getFacebookShareLink,
  getTwitterShareLink,
  getLineShareLink,
  convertLinkFromSlug,
} from '../utils/link'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const SocialItem = styled.a`
  flex-grow: 1;
  background-color: ${props =>
    props.name === 'facebook'
      ? props.theme.facebook
      : props.name === 'twitter'
      ? props.theme.twitter
      : props.name === 'line'
      ? props.theme.line
      : props.theme.googlePlus};
  justify-content: center;
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;

  :hover {
    background-color: ${props =>
      props.name === 'facebook'
        ? color(props.theme.facebook)
            .darken(0.2)
            .string()
        : props.name === 'twitter'
        ? color(props.theme.twitter)
            .darken(0.2)
            .string()
        : props.name === 'line'
        ? color(props.theme.line)
            .darken(0.2)
            .string()
        : color(props.theme.googlePlus)
            .darken(0.2)
            .string()};
  }
`

const FacebookIcon = styled(FaFacebookF)`
  align-self: center;
  color: white;
`

const TwitterIcon = styled(FaTwitter)`
  align-self: center;
  color: white;
`

const LineIcon = styled(FaLine)`
  align-self: center;
  color: white;
`

export default class StickyMobileShare extends React.Component {
  render() {
    const link = convertLinkFromSlug(this.props.slug)
    return (
      <Container>
        <SocialItem
          href={getFacebookShareLink(link)}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Share to Facebook"
          name={'facebook'}
        >
          <FacebookIcon />
        </SocialItem>
        <SocialItem
          href={getTwitterShareLink(link)}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Share to Twitter"
          name={'twitter'}
        >
          <TwitterIcon />
        </SocialItem>
        <SocialItem
          href={getLineShareLink(link)}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Share to Line"
          name={'line'}
        >
          <LineIcon />
        </SocialItem>
      </Container>
    )
  }
}
