import React from 'react'
import styled from 'styled-components'
import color from 'color'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import orderBy from 'lodash/orderBy'

import colours from '../utils/colours'
import firebase from '../utils/firebase'

import CommentItem from '../components/CommentItem'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
`

const Header = styled.h2`
  margin-bottom: 10px;
`

const CommentForm = styled.form`
  margin-bottom: 0;
`

const InputGroup = styled.div`
  flex-direction: column;
  align-items: flex-start;
  align-items: baseline;
  margin-top: 10px;

  :first {
    margin-top:0;
  }
`

const InputLabel = styled.span`
  padding-bottom: 5px;
`

const InputField = styled.input`
  width: 100%;
  flex: 1;
`

const TextField = styled.textarea`
  margin-top: 5px;
  width:100%;
  flex: 1;
`

const CommentList = styled.div`
  margin-top:10px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`

const PrimaryButton = styled.button`
  background-color: ${colours.primaryColour};
  color:white;
  float: ${props => props.float};
  padding: 13px 14px 13px 14px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.20);
  border-radius: 2px;
  width:100%;

  :visited {
    color:white;
  }

  :hover {
    background-color: ${color(colours.primaryColour).darken(0.2).string()};
  }
`

const Warning = styled.span `
  color:red;
`

export default class CommentBox extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        name : "",
        comment : "",
        commentList: 0
      }
      this.handleNameChange = this.handleNameChange.bind(this)
      this.handleCommentChange = this.handleCommentChange.bind(this)
      this.addComment = this.addComment.bind(this)
  }

  componentDidMount () {
    firebase.database().ref("articles/" + this.props.slug + "/comments").on('value', (snapshot) => {
      this.setState({
        commentList: orderBy(snapshot.val(), ['timestamp'], ['desc'])
      })
    })
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleCommentChange(event) {
    this.setState({comment: event.target.value});
  }

  render () {
    console.log(this.state.commentList)
    return (
      <Container>
          <Header>Leave a comment?</Header>
          <CommentForm onSubmit={this.addComment}>
            {process.env !== 'production' ? <Warning>Posting to staging database 🔥</Warning>: null}
            <InputGroup>
              <InputLabel>Name : </InputLabel>
              <InputField required name="name" value={this.state.name} onChange={this.handleNameChange}/>
            </InputGroup>

            <InputGroup>
              <InputLabel>Comment : </InputLabel>
              <TextField required rows={5} name = {"comment"} value={this.state.comment} onChange={this.handleCommentChange}></TextField>
            </InputGroup>

            <InputGroup>
              <PrimaryButton>Post a comment</PrimaryButton>
            </InputGroup>
          </CommentForm>

          <CommentList>
            {
              this.state.commentList === 0 ?
                <span>Loading Comment(s)</span>

              : !isEmpty(this.state.commentList) ?
                map(this.state.commentList, (item) => {
                  return (<CommentItem key={item.timestamp} comment={item}/>)
                })
              :<span>There is no comment yet!</span>
            }
          </CommentList>
      </Container>
    )
  }

  addComment (event) {
    firebase.database().ref("articles/" + this.props.slug + "/comments").push({
      name : this.state.name,
      comment : this.state.comment,
      timestamp : Math.round((new Date()).getTime() / 1000)
    })

    this.setState({
      name: "",
      comment: ""
    })

    event.preventDefault()
  }
}
