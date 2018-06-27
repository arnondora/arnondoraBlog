import React from 'react'
import styled from 'styled-components'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart'

// Import Social Logo
import Facebook from '../assets/Facebook.svg'
import Twitter from '../assets/Twitter.svg'
import GooglePlus from '../assets/GooglePlus.svg'
import Email from '../assets/Email.svg'

fontawesome.library.add(faHeart)

const Container = styled.div`
  background-color: ${props =>
    props.isNight
      ? props.theme.night_darkBackground
      : props.theme.primaryColour};
  padding-top: 20px;
  padding-bottom: 20px;

  @media (max-width: 576px) {
    display: ${props => (props.mobilehide ? 'none' : 'block')};
  }
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
  height: 25px;
  width: auto;
  margin: 0 0 0 20px;

  :first {
    margin: 0;
  }
`

const BottomText = styled.div`
  display: flex;
  margin-top: 18px;
  margin-bottom: 0px;
  flex-direction: row;
  justify-content: space-between;
`
const BottomTextItem = styled.span`
  color: white;
  font-size: 18px;
`

const CopyrightText = BottomTextItem.extend`
  align-self: flex-start;
`

const ThemeText = BottomTextItem.extend`
  align-self: flex-end;
`

const FooterIcon = styled(FontAwesomeIcon)`
  height: 18px;
`

const GithubLink = styled.a`
  color: white;
  text-decoration: none;
  &:link {
    color: white;
  }
  &:visited {
    color: white;
  }
`

export default class Footer extends React.Component {
  render() {
    return (
      <Container
        isNight={this.props.isNight}
        mobilehide={this.props.mobilehide}
      >
        <Wrapper>
          <ContactList>
            <a
              href="https://www.facebook.com/arnondora"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Facebook"
            >
              <ContactItem alt="Facebook" src={Facebook} />
            </a>
            <a
              href="https://www.twitter.com/arnondora"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Twitter"
            >
              <ContactItem alt="Twitter" src={Twitter} />
            </a>
            <a
              href="https://www.plus.google.com/+arnonpuitrakul"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Google Plus"
            >
              <ContactItem alt="Google+" src={GooglePlus} />
            </a>
            <a
              href="mailto:peter.arnon@gmail.com"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Mail"
            >
              <ContactItem alt="Email" src={Email} />
            </a>
          </ContactList>

          <BottomText>
            <CopyrightText>
              © 2014-{new Date().getFullYear()} Arnon Puitrakul all right
              reserved.
            </CopyrightText>
            {process.env.GATSBY_ENV === 'staging' ? (
              <ThemeText>
                <span role="img" aria-label="fire" aria-labelledby="beta">
                  🔥
                </span>{' '}
                {process.env.APP_VERSION}
              </ThemeText>
            ) : (
              <ThemeText>
                Code with{' '}
                <FooterIcon
                  icon={['fas', 'heart']}
                  style={{ color: '#E91E63' }}
                />{' '}
                by{' '}
                <GithubLink href="https://github.com/arnondora">
                  @arnondora
                </GithubLink>
              </ThemeText>
            )}
          </BottomText>
        </Wrapper>
      </Container>
    )
  }
}
