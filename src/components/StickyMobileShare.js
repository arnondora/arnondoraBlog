import React from 'react'
import styled from 'styled-components'
import color from 'color'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faGooglePlusG, faLine } from '@fortawesome/fontawesome-free-brands'

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
          <SocialItem href = {getFacebookShareLink(link)} target="_blank" bgColour={colours.facebook}><Icon icon={faFacebookF} colour={"white"}/></SocialItem>
          <SocialItem href = {getTwitterShareLink(link)} target="_blank" bgColour={colours.twitter}><Icon icon={faTwitter} colour={"white"}/></SocialItem>
          <SocialItem href = {getGooglePlusShareLink(link)} target="_blank" bgColour={colours.googlePlus}><Icon icon={faGooglePlusG} colour={"white"}/></SocialItem>
          <SocialItem href = {getLineShareLink(link)} target="_blank" bgColour={colours.line}><Icon icon={faLine} colour={"white"}/></SocialItem>
        </Container>
    )
  }
}
