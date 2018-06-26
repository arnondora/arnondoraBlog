import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import color from 'color'

import Card from '../components/Card'
import CategoryButton from '../components/CategoryButton'
import PrimaryButton from '../components/PrimaryButton'

const Tabs = styled.div`
  display: flex;
  width:100%;
  border-bottom-color: ${props => color(props.theme.textHeading).alpha(0.2).string()};
  border-bottom-style: solid;
  border-bottom-width: 1px;
`

const Tab = styled.button`
  font-weight: 700;
  letter-spacing: 2.5pt;
  font-size: 14px;
  color: ${props => props.selected ? props.theme.textHeading : '#6f6f6f'};
  border:none;
  background: none;
  outline: none;
  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme.textDisable};
  border-bottom-width: ${props => props.selected ? 5 : 0}px;
  margin-left: 20px;
  :first-child {
    margin-left: 0;
  }
`

const ContentContainer = styled.div`
  margin-top:20px;
  padding-bottom: 50px;
`

const CardWrapper = styled.div`
  margin-top: 40px;
  :first-child{
    margin-top: 0;
    margin-bottom: 0;
  }
`

const CategoryContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-basis: 300px;
  justify-content: flex-start;
  padding-bottom: 80px;

  @media (max-width: 693px)
  {
    flex-direction: column;
    margin: 10px 0 0 0;
  }
`

const CategoryCard = styled(CategoryButton)`
  margin-right: 20%;
  flex-basis: 50%;
  margin:0;

  @media (max-width: 693px)
  {
    flex-basis: 0;
    margin: 10px 0 0 0;
  }
`

const MoreButtonWrapper = styled.div`
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
    var posts = this.props.context.posts.map((item) => {
        return (
          <CardWrapper key={item.node.fields.slug}><Card slug={item.node.fields.slug} heading={item.node.frontmatter.title} excerpt={item.node.frontmatter.excerpt} category={item.node.frontmatter.category} publishedDate={item.node.frontmatter.date} author={item.node.frontmatter.author}/></CardWrapper>
        )
    })
    var categories = this.props.context.categories.map((item) => {
      return (
          <CategoryCard
            key={item.link}
            name={item.name}
            slug={item.link}
            description={item.description}
            thumbnail={item.thumbnail}
          />
      )
    })

    return (
      <React.Fragment>
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

              this.props.context.posts.length == 0 ? <h2>There is no post!</h2> : posts
            :
              null
          }

          {this.state.tabIndex == 0 ?
            <MoreButtonWrapper>
              {!this.props.context.isLast ? <Link to = {"/" + (this.props.context.page+1)}><PrimaryButton float="left" label="Older Posts"/></Link>  : null}
              {!this.props.context.isFirst && this.props.context.page !== 2 ? <Link to = {(this.props.context.page-1)}><PrimaryButton float="right" label="Newer Posts"/></Link>  : null}
              {this.props.context.page === 2 ? <Link to = {"/"}><PrimaryButton float="right" label="Newer Posts"/></Link>  : null}

            </MoreButtonWrapper> : null}

          { this.state.tabIndex == 1 ?
              this.props.context.categories.length == 0 ? <h2>There is no category!</h2> : <CategoryContainer> {categories} </CategoryContainer>
            :
              null
          }
        </ContentContainer>
      </React.Fragment>
    )
  }

}
