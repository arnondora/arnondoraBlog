import React from 'react'
import styled from 'styled-components'
import color from 'color'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faLine from '@fortawesome/fontawesome-free-brands/faLine'
import faFacebookF from '@fortawesome/fontawesome-free-brands/faFacebookF'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'
import faGooglePlusG from '@fortawesome/fontawesome-free-brands/faGooglePlusG'

import colours from '../utils/colours'
import { getFacebookShareLink, getTwitterShareLink, getGooglePlusShareLink, getLineShareLink, convertLinkFromSlug } from '../utils/link'

const Container = styled.div`
  display: flex;
  flex-direction:row;
`

const SocialItem = styled.a`
  flex-grow: 1;
  background-color: ${props => props.bgColour};
  justify-content: center;
  display: flex;
  padding-top:10px;
  padding-bottom: 10px;

  :hover {
    background-color: ${props => color(props.bgColour).darken(0.2).string()}
  }
`

const Icon = styled(FontAwesomeIcon)`
  align-self: center;
  color: white;
`

export default class StickyMobileShare extends React.Component {
  render() {
    const link = convertLinkFromSlug(this.props.slug)
    return (
        <Container>
          <SocialItem href = {getFacebookShareLink(link)} rel="noopener" target="_blank" aria-label="Share to Facebook" bgColour={colours.facebook}><Icon icon={faFacebookF} colour={"white"}/></SocialItem>
          <SocialItem href = {getTwitterShareLink(link)} rel="noopener" target="_blank" aria-label="Share to Twitter" bgColour={colours.twitter}><Icon icon={faTwitter} colour={"white"}/></SocialItem>
          <SocialItem href = {getGooglePlusShareLink(link)} rel="noopener" target="_blank" aria-label="Share to Google Pplus" bgColour={colours.googlePlus}><Icon icon={faGooglePlusG} colour={"white"}/></SocialItem>
          <SocialItem href = {getLineShareLink(link)} rel="noopener" target="_blank" aria-label="Share to Line" bgColour={colours.line}><Icon icon={faLine} colour={"white"}/></SocialItem>
        </Container>
    )
  }
}
