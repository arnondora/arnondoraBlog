import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import Error404Icon from '../assets/Error404Icon.svg'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 100px;
  width: 80%;
`

const Header = styled.span`
  font-size: 48px;
  text-align: center;
  margin-bottom: 50px;
  line-height: 1.2;
`

const StyledLink = styled(Link)`
  font-size: 36px;
  text-decoration: none;
  text-align: center;
  margin-top: 20px;
`

const ErrorIcon = styled.img`
  width: 100%;
  height: auto;
  max-width: 450px;
  max-height: 260px;
  margin: 0 auto;
`

const NotFoundPage = () => (
  <Container>
    <Helmet title="Error 404 - Page Not Found" />
    <Header>The page you’re looking for does not exist</Header>
    <ErrorIcon src={Error404Icon} alt="404" />
    <StyledLink to="/">Go to home?</StyledLink>
  </Container>
)

export default NotFoundPage
