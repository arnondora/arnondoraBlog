import React from 'react'
import styled from 'styled-components'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import color from 'color'

const Container = styled.div `
  display: flex;
  flex-direction: column;
`

const ButtonWrapper = styled.div`
  margin-top:5px;
`

const SubmitButton = styled.button`
  background-color: ${props => props.theme.primaryColour};
  color:white;
  float: ${props => props.float};
  padding: 13px 14px 13px 14px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.20);
  border-radius: 2px;
  float: right;

  :hover {
    background-color: ${props => color(props.theme.primaryColour).darken(0.2).string()};
  }
`
export default class ReportForm extends React.Component {
  render () {
    return (
        <MuiThemeProvider>
          <Container>
              <TextField
                hintText="Type what you think here!"
                floatingLabelText="Description"
                multiLine={true}
                fullWidth={true}
                rows={5}
              />

              <SelectField
                floatingLabelText="Report Type"
                fullWidth={true}
              >
                <MenuItem value={"Feature Request"} primaryText="Feature Request 🚀" />
                <MenuItem value={"Bug"} primaryText="Bug 🐛" />
              </SelectField>

              <ButtonWrapper><SubmitButton>Submit</SubmitButton></ButtonWrapper>
          </Container>
        </MuiThemeProvider>
    )
  }
}
