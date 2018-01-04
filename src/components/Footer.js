import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faHeart} from '@fortawesome/fontawesome-free-solid'
import colours from '../utils/colours'

fontawesome.library.add(faHeart)

// Import Social Logo
import Facebook from '../assets/Facebook.svg'
import Twitter from '../assets/Twitter.svg'
import GooglePlus from '../assets/GooglePlus.svg'
import Email from '../assets/Email.svg'

const Container = styled.div`
  background-color: ${props => props.bgColour};
  padding-top: 20px;
  padding-bottom: 20px;
`

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`

const ContactList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-bottom: 0px !important;
`
const ContactItem = styled.img`
  height: 35px;
  width: auto;
  margin: 0 0 0 20px;

  :first {
    margin:0;
  }
`

const BottomText = styled.div`
  display: flex;
  margin-top: 18px;
  margin-bottom: 0px;
  flex-direction: row;
  justify-content: space-between;
`
const BottomTextItem = styled.p`
    color: white;
    font-size: 18px;
`

const CopyrightText = BottomTextItem.extend`
  align-self: flex-start;
`

const ThemeText = BottomTextItem.extend`
  align-self: flex-end;
`

export default class Footer extends React.Component {
  render () {
    return (
      <Container bgColour={colours.primaryColour}>
        <Wrapper>
          <ContactList>
            <a href ="https://www.facebook.com/arnondora"><ContactItem src = {Facebook}/></a>
            <a href ="https://www.twitter.com/arnondora"><ContactItem src = {Twitter}/></a>
            <a href ="https://www.plus.google.com/+arnonpuitrakul"><ContactItem src = {GooglePlus}/></a>
            <a href ="mailto:me@arnondora.in.th"><ContactItem src = {Email}/></a>
          </ContactList>

          <BottomText>
            <CopyrightText>© 2014-{new Date().getFullYear()} Arnon Puitrakul all right reserved.</CopyrightText>
            {process.env.GATSBY_ENV === "staging" ?
                <ThemeText>🔥 {process.env.APP_VERSION}</ThemeText>
              :
                <ThemeText>Code with <FontAwesomeIcon icon={["fas", "heart"]} style = {{color: "#E91E63"}}/> by @arnondora</ThemeText>
            }
          </BottomText>
        </Wrapper>
      </Container>
    )
  }
}
