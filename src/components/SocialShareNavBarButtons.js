import React from 'react'
import styled from 'styled-components'
import { FaFacebookF, FaTwitter } from 'react-icons/fa'

import {
  getFacebookShareLink,
  getTwitterShareLink,
  convertLinkFromSlug,
} from '../utils/link'

const IconLink = styled.a`
  margin-left: 20px;

  &:first-child {
    margin-left: 0;
  }
`

const FacebookIcon = styled(FaFacebookF)`
  align-self: center;
  color: white;
  &:hover {
    color: ${props => props.theme.facebook};
  }
`

const TwitterIcon = styled(FaTwitter)`
  align-self: center;
  color: white;
  &:hover {
    color: ${props => props.theme.twitter};
  }
`

export default class SocialShareNavBarButtons extends React.Component {
  render() {
    var link = convertLinkFromSlug(this.props.slug)
    return (
      <React.Fragment>
        <IconLink
          href={getFacebookShareLink(link)}
          rel="noopener"
          target="_blank"
          aria-label="Share to Facebook"
        >
          <FacebookIcon />
        </IconLink>
        <IconLink
          href={getTwitterShareLink(link)}
          rel="noopener"
          target="_blank"
          aria-label="Share to Twitter"
        >
          <TwitterIcon />
        </IconLink>
      </React.Fragment>
    )
  }
}
