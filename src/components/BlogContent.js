import styled from 'styled-components'

const ArticleWrapper = styled.div`
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 0;
  }

  & > *,
  & > blockquote > p,
  & > ul > li,
  & > ul > li > strong,
  & > ol > li,
  & > ol > li > strong {
    color: ${props =>
      props.isNight ? props.theme.night_text_light : props.theme.textHeading};
  }

  pre > code {
    background-color: ${props =>
      props.isNight
        ? props.theme.night_lightBackground
        : props.theme.secondaryBackground} !important;
    white-space: pre-wrap;
    display: block;
    padding: 10px 15px 10px 15px;
    color: ${props =>
      props.isNight ? props.theme.night_text_light : '#222222'};
    border: 1px solid
      ${props =>
        props.isNight ? props.theme.night_secondaryBorder : '#e6e6e6'};
    border-radius: 8px;
  }

  & > h1 {
    font-size: ${props => props.scale + 2.6058 + 'rem'};
  }

  & > h2 {
    font-size: ${props => props.scale + 2.00448 + 'rem'};
  }

  & > h3 {
    font-size: ${props => props.scale + 1.6704 + 'rem'};
  }

  & > h4 {
    font-size: ${props => props.scale + 1.392 + 'rem'};
  }

  & > p,
  li {
    font-size: ${props => props.scale + 1.1 + 'rem'};
  }

  & > p:first-child::first-letter {
    color: ${props => props.theme.primaryColour};
    font-size: ${props => props.scale + 3.4 + 'rem'};
    line-height: 40px;
    float: left;
    padding-top: ${props => props.scale * 10 + 12 + 'px'};
    padding-right: 10px;
    padding-left: 3px;
  }

  & > p > img {
    width: 100%;
    margin: 0 auto;
  }

  & > h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul > li,
  ol > li {
    color: #424242;
    text-rendering: geometricPrecision;
  }

  & > p > strong {
    font-weight: 700;
  }

  & > p > a {
    text-decoration: none;
    color: ${props => props.theme.primaryColour};

    &:visited {
      color: #0d8aed;
    }
  }

  & > p > em {
    display: inherit;
    text-align: center;
  }

  iframe {
    display: block;
    margin: 0 auto;
    margin-bottom: 20px;
    width: 100%;
  }

  & > blockquote > p {
    margin: 0;
    padding-left: 20px;
    font-size: 25px;
    font-weight: 300;
    color: #666666;
  }

  & > blockquote > p > strong {
    font-weight: 400;
  }

  & > table {
    width: 100%;
    table-layout: fixed;
  }
`

export default ArticleWrapper
