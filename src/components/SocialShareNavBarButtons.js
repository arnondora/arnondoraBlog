import React from 'react'
import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFacebookF from '@fortawesome/fontawesome-free-brands/faFacebookF'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'
import faGooglePlus from '@fortawesome/fontawesome-free-brands/faGooglePlus'

import { getFacebookShareLink, getTwitterShareLink, getGooglePlusShareLink, convertLinkFromSlug } from '../utils/link'

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
    color: ${props => props.name === "facebook" ? props.theme.facebook : props.name === "twitter" ? props.theme.twitter : props.theme.googlePlus}
  }
`

export default class SocialShareNavBarButtons extends React.Component {
  render () {
    var link = convertLinkFromSlug(this.props.slug)
    return (
      <React.Fragment>
        <IconLink href = {getFacebookShareLink(link)} rel="noopener" target="_blank" aria-label="Share to Facebook"><Icon icon={faFacebookF} name={"facebook"}/></IconLink>
        <IconLink href = {getTwitterShareLink(link)} rel="noopener" target="_blank" aria-label="Share to Twitter"><Icon icon={faTwitter} name={"twitter"}/></IconLink>
        <IconLink href = {getGooglePlusShareLink(link)} rel="noopener" target="_blank" aria-label="Share to Google Plus"><Icon icon={faGooglePlus} name={"google+"}/></IconLink>
      </React.Fragment>
    )
  }
}
