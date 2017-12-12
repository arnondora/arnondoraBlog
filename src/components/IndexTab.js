import React from 'react'
import styled from 'styled-components'
import color from 'color'

import colours from '../utils/colours'

const Container = styled.div`
  display: flex;
  flex-direction:column;
`

const Tabs = styled.div`
  display: flex;
  width:100%;
  border-bottom-color: ${colours.textDisable};
  border-bottom-style: solid;
  border-bottom-width: 1px;
`

const Tab = styled.span`
  font-weight: 700;
  color: ${props => props.selected ? colours.textHeading : color(colours.textHeading).alpha(0.3).string()};
  border-bottom-style: solid;
  border-bottom-color: ${colours.textDisable};
  border-bottom-width: ${props => props.selected ? 5 : 0}px;
  margin-left: 20px;
  :first-child {
    margin-left: 0;
  }
`

const ContentContainer = styled.div`
  margin-top:20px;
`
export default class IndexTab extends React.Component {
  constructor (props)
  {
    super()
    this.state = {
      tabIndex : 0,
    }
  }

  render () {
    return (
      <Container>
        <Tabs>
            <Tab selected={this.state.tabIndex == 0} onClick={() => this.setState({tabIndex: 0})}>Posts</Tab>
            <Tab selected={this.state.tabIndex == 1} onClick={() => this.setState({tabIndex: 1})}>Categories</Tab>
        </Tabs>
        <ContentContainer>
          { this.state.tabIndex == 0 ?
            // Posts
            <div>Posts</div>
            :
            //Categories
            <div>Categories</div>
          }
        </ContentContainer>
      </Container>
    )
  }

}
