import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import moment from 'moment'

import NavBar from '../components/NavBar'
import ReportForm from '../components/ReportForm'

import firebase from '../utils/firebase'

const Container = styled.div`
  background-color: #FAFAFA;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Content = Container.extend`
  width: 80%;
  margin: 0 auto;
  margin-top:100px;
  margin-bottom: 20px;
`

const PageTitle = styled.h1`
  margin-bottom: 0;
`

const ReportFormContainer = styled.div`
  margin-top:10px;
  margin-bottom: 10px;
`

const LoadingText = styled.p`

`

export default class reporter extends React.Component {
  constructor () {
    super ()
    this.state = {
      reportList: null
    }
  }
  componentDidMount() {
    var db = firebase.firestore()
    db.collection('bugs').get().then((snapshot) => {
      this.setState({reportList: snapshot})
    })
  }

  render () {
    return (
      <Container>
        <Helmet
          title = "Bug Report/Feature Request - Hello World"
        />

        <NavBar/>

        <Content>
          <PageTitle>Feature Request 🚀 / Bug Report 🐛</PageTitle>
          <ReportFormContainer><ReportForm/></ReportFormContainer>
          {
            this.state.reportList === null ? <LoadingText>We are loading the content from server 🐢, please be patient</LoadingText>
            :
            this.state.reportList.size === 0 ? <LoadingText>There is no report right now. You can be the first by fill and submit your problem/ feature request in the form above.</LoadingText>
            :
            this.state.reportList.forEach((report) => {
              <p id="report">report</p>
            })
          }
        </Content>

      </Container>
    )
  }
}
