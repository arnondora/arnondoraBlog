import React from 'react'
import styled from 'styled-components'
import color from 'color'
import htmlfilter from 'sanitize-html'
import moment from 'moment'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import orderBy from 'lodash/orderBy'

import firebase from '../utils/firebase'

import CommentItem from '../components/CommentItem'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > h2 {
    color: ${props =>
      props.isNight ? props.theme.night_text_light : props.theme.textHeading} !important;
  }

  & > div > span {
    color: ${props =>
      props.isNight ? props.theme.night_text_normal : props.theme.textHeading} !important;
  }
`

const Header = styled.h2`
  margin-bottom: 10px;
`

const InputGroup = styled.div`
  flex-direction: column;
  align-items: flex-start;
  align-items: baseline;
  margin-top: 10px;

  :first {
    margin-top: 0;
  }

  ${'' /* TODO: Change Colour of InputField to be Dark */};
`

const InputLabel = styled.span`
  padding-bottom: 5px;
`

const InputField = styled.input`
  width: 100%;
  flex: 1;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
  padding: 7px;
`

const TextField = styled.textarea`
  margin-top: 5px;
  width: 100%;
  flex: 1;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
  padding: 7px;
`

const CommentList = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`

const PrimaryButton = styled.div`
  background-color: ${props =>
    props.isNight
      ? color(props.theme.night_darkBackground)
          .darken(0.3)
          .toString()
      : props.theme.primaryColour};
  color: white;
  text-align: center;
  float: ${props => props.float};
  padding: 13px 14px 13px 14px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  width: 100%;

  :visited {
    color: white;
  }

  :hover {
    background-color: ${props =>
      props.isNight
        ? color(props.theme.night_darkBackground)
            .darken(0.2)
            .string()
        : color(props.theme.primaryColour)
            .darken(0.2)
            .string()};
  }
`

const Warning = styled.span`
  color: red;
`

const Info = styled.span`
  color: ${props =>
    props.isNight ? props.theme.night_text_normal : props.theme.textHeading};
`

export default class CommentBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      comment: '',
      commentList: 0,
      firebaseRef: firebase
        .database()
        .ref('articles/' + this.props.slug + '/comments'),
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.addComment = this.addComment.bind(this)
  }

  componentDidMount() {
    this.state.firebaseRef.on('value', snapshot => {
      this.setState({
        commentList: orderBy(snapshot.val(), ['timestamp'], ['desc']),
      })
    })
  }

  componentWillUnmount() {
    this.state.firebaseRef.off()
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value })
  }

  handleCommentChange(event) {
    this.setState({ comment: event.target.value })
  }

  render() {
    var comments = null
    if (!isEmpty(this.state.commentList))
      comments = map(this.state.commentList, item => {
        if (item.name !== '' && item.comment !== '')
          return (
            <CommentItem
              key={item.timestamp}
              comment={item}
              isNight={this.props.isNight}
            />
          )
      })
    else if (this.state.commentList === 0) comments = this.state.commentList

    return (
      <Container isNight={this.props.isNight}>
        <Header>Leave a comment?</Header>
        {process.env.NODE_ENV !== 'production' ? (
          <Warning>
            Posting to staging database{' '}
            <span role="img" aria-label="fire" aria-labelledby="beta">
              🔥
            </span>
          </Warning>
        ) : null}
        <InputGroup>
          <InputLabel>Name : </InputLabel>
          <InputField
            required
            name="name"
            value={this.state.name}
            onChange={this.handleNameChange}
            aria-label="Name Box"
          />
        </InputGroup>

        <InputGroup>
          <InputLabel>Comment : </InputLabel>
          <TextField
            required
            rows={5}
            name={'comment'}
            value={this.state.comment}
            onChange={this.handleCommentChange}
            aria-label="Message Box"
          />
        </InputGroup>

        <InputGroup>
          <PrimaryButton isNight={this.props.isNight} onClick={this.addComment}>
            Post a comment
          </PrimaryButton>
        </InputGroup>

        <CommentList>
          {comments === 0 ? (
            <Info isNight={this.props.isNight}>Loading Comment(s)</Info>
          ) : !isEmpty(comments) ? (
            map(comments, item => {
              item = item.props.comment
              if (
                !isEmpty(item.name) > 0 &&
                !isEmpty(item.comment) > 0 &&
                moment.unix(item.timestamp).isValid()
              )
                return (
                  <CommentItem
                    key={item.timestamp}
                    isNight={this.props.isNight}
                    comment={item}
                  />
                )
            })
          ) : (
            <Info isNight={this.props.isNight}>There is no comment yet!</Info>
          )}
        </CommentList>
      </Container>
    )
  }

  addComment(event) {
    const filteredName = htmlfilter(this.state.name)
    const filteredComment = htmlfilter(this.state.comment)

    if (isEmpty(filteredName) || isEmpty(filteredComment)) return

    firebase
      .database()
      .ref('articles/' + this.props.slug + '/comments')
      .push({
        name: filteredName,
        comment: filteredComment,
        timestamp: Math.round(new Date().getTime() / 1000),
      })

    this.setState({
      name: '',
      comment: '',
    })

    event.preventDefault()
  }
}
