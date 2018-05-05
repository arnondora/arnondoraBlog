import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { get, isEmpty } from 'lodash'
import colours from '../utils/colours'
import Link from 'gatsby-link'

import NavBar from '../components/NavBar'
import MobileFooter from '../components/MobileFooter'

const NavigationBar = styled(NavBar)`
  position: relative;
`
const SuperWrapper = styled.div`
  background-color: #F5F5F5;
  min-height: 100vh;
`

const Container = styled.div`
  width: 80%;
  margin: 0 auto;

  padding-top: 104px;
  padding-bottom: 50px;

  @media (max-width: 768px) {
    width: 90%;
  }
`

export default class LiveTemplate extends React.Component
{
  render () {
    const post = this.props.pathContext.post
    return (
      <SuperWrapper>
        <Helmet title={post.title}/>
        <NavigationBar siteTitle = {this.props.pathContext.siteInfo.siteMetadata.title}/>
        <Container>

        </Container>
        <MobileFooter/>
      </SuperWrapper>
    )
  }
}
