import React from 'react'
import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFacebookF from '@fortawesome/fontawesome-free-brands/faFacebookF'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'
import faGooglePlus from '@fortawesome/fontawesome-free-brands/faGooglePlus'

import colours from '../utils/colours'
import { getFacebookShareLink, getTwitterShareLink, getGooglePlusShareLink, convertLinkFromSlug } from '../utils/link'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const IconLink = styled.a`
  margin-left: 20px;

  &:first-child {
    margin-left: 0
  }
`

const Icon = styled(FontAwesomeIcon)`
  align-self: center;
  color: white;

  &:hover {
    color: ${props => props.colour}
  }
`

export default class SocialShareNavBarButtons extends React.Component {
  render () {
    var link = convertLinkFromSlug(this.props.slug)
    return (
      <Container>
        <IconLink href = {getFacebookShareLink(link)} target="_blank"><Icon icon={faFacebookF} colour={colours.facebook}/></IconLink>
        <IconLink href = {getTwitterShareLink(link)} target="_blank"><Icon icon={faTwitter} colour={colours.twitter}/></IconLink>
        <IconLink href = {getGooglePlusShareLink(link)} target="_blank"><Icon icon={faGooglePlus} colour={colours.googlePlus}/></IconLink>
      </Container>
    )
  }
}
