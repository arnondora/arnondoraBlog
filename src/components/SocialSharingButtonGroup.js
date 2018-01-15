import React from 'react'
import styled from 'styled-components'
import color from 'color'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFacebookF from '@fortawesome/fontawesome-free-brands/faFacebookF'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'
import faGooglePlus from '@fortawesome/fontawesome-free-brands/faGooglePlus'

import colours from '../utils/colours'
import { getFacebookShareLink, getTwitterShareLink, getGooglePlusShareLink, convertLinkFromSlug } from '../utils/link'

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
`
const IconLink = styled.a`
  margin-top: 15px;
  width:30px;
  height: auto;

  &:first-child {
    margin-top: 0
  }
`

const Icon = styled(FontAwesomeIcon)`
  align-self: center;
  color: ${color(colours.textSecondary).lighten(0.2).string()};

  &:hover {
    color: ${props => props.colour}
  }
`

export default class SocialSharingButtonGroup extends React.Component {
  render () {
    var link = convertLinkFromSlug(this.props.slug)
    return (
      <Container>
        <IconLink href = {getFacebookShareLink(link)} target="_blank"><Icon icon={faFacebookF} colour={colours.facebook} size="2x"/></IconLink>
        <IconLink href = {getTwitterShareLink(link)} target="_blank"><Icon icon={faTwitter} colour={colours.twitter} size="2x"/></IconLink>
        <IconLink href = {getGooglePlusShareLink(link)} target="_blank"><Icon icon={faGooglePlus} colour={colours.googlePlus} size="2x"/></IconLink>
      </Container>
    )
  }
}
