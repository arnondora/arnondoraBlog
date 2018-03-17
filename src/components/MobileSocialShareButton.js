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
  padding-bottom: 20px;
  display: flex;
  flex-direction:column;
`

const Header = styled.span`
  color: ${colours.textSecondary};
  font-weight: 300;
  margin-bottom: 10px;
`

const ButtonGroup = styled.div`
  display: flex;
`

const IconLink = styled.a`
  margin-left: 20px;

  &:first-child {
    margin-left: 0
  }
`

const Icon = styled(FontAwesomeIcon)`
  align-self: center;
  color: ${color(colours.textSecondary).lighten(0.2).string()};

  &:hover {
    color: ${props => props.colour}
  }
`

export default class MobileSocialShareButton extends React.Component {
  render () {
    var link = convertLinkFromSlug(this.props.slug)
    return (
      <Container>
          <Header>Share this article to social network?</Header>
          <ButtonGroup>
            <IconLink href = {getFacebookShareLink(link)} rel="noopener" target="_blank" aria-label="Share to Facebook"><Icon icon={faFacebookF} colour={colours.facebook} size="2x"/></IconLink>
            <IconLink href = {getTwitterShareLink(link)} rel="noopener" target="_blank" aria-label="Share to Twitter"><Icon icon={faTwitter} colour={colours.twitter} size="2x"/></IconLink>
            <IconLink href = {getGooglePlusShareLink(link)} rel="noopener" target="_blank" aria-label="Share to Google Plus"><Icon icon={faGooglePlus} colour={colours.googlePlus} size="2x"/></IconLink>
          </ButtonGroup>
      </Container>
    )
  }
}
