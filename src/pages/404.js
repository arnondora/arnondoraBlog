import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Error404Icon from "../assets/Error404Icon.svg"

const Container = styled.div `
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 80%;
`

const ItemWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

const Header = styled.p`
  font-family: 'Open Sans';
  color: #424242;
  font-size: 48px;
  line-height: 100%;
  text-align:center;
  margin-bottom: 50px;
`

const StyledLink = styled(Link)`
  font-family: 'Open Sans';
  color: #424242;
  font-size: 36px;
  text-decoration: none;
  text-align:center;
  margin-top:10px;
`

const ErrorIcon = styled.img`
  width:100%;
  height: auto;
  max-width: 450px;
  max-height: 260px;
  margin: 0 auto;
`

const NotFoundPage = () => (
  <Container>
    <Helmet
      title="Error 404 - Page Not Found"
    />
    <Header>The page you’re looking for does not exist</Header>
    <ErrorIcon src={Error404Icon} alt="404" />
    <StyledLink to="/">Go to home?</StyledLink>
  </Container>
)

export default NotFoundPage
