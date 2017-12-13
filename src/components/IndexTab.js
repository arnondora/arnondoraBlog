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
  border-bottom-color: ${color(colours.textHeading).alpha(0.2).string()};
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
    const tabs = ["Posts", "Categories"]

    return (
      <Container>
        <Tabs>
          {
            tabs.map((item, index) => {
              return (
                <Tab key={item} selected={this.state.tabIndex == index} onClick={() => this.setState({tabIndex: index})}>{item}</Tab>
              )
            })
          }
        </Tabs>
        <ContentContainer>
          { this.state.tabIndex == 0 ?
            // Posts
            <div>{tabs[0]}</div>
            :
            //Categories
            <div>{tabs[1]}</div>
          }
        </ContentContainer>
      </Container>
    )
  }

}
