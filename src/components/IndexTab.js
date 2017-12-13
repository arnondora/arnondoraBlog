import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import color from 'color'

import colours from '../utils/colours'

import Card from '../components/Card'
import PrimaryButton from '../components/PrimaryButton'

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

const Tab = styled.button`
  font-weight: 700;
  color: ${props => props.selected ? colours.textHeading : color(colours.textHeading).alpha(0.3).string()};
  border:none;
  background: none;
  outline: none;
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
  padding-bottom: 50px;
`

const CardWrapper = styled.div`
  margin-top: 40px;
  :first-child{
    margin-top: 0;
    margin-bottom: 0;
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
      posts: [
        {
          slug: "wonder",
          heading: "#ไปดูมาแล้วกับ Wonder หนุ่มน้อยมหัศจรรย์ที่ทำให้ทุกคน…",
          excerpt: "เรื่อง “Wonder” หรือชื่อภาษาไทยว่า “ชีวิตมหัศจรรย์” เป็นหนังเรื่องนึงที่ดูตัวอย่างปุ๊บธาตุความอยากมันก็เข้าแทรกทันที พอดีกับที่ช่วงนี้เป็นช่วงใกล้สอบด้วย มันก็จะว่าง ๆ หน่อย (เหรอ ?) ก็ไปกดมา คนเดียว ! ย้ำว่าคนเดียว",
          category: "Movie Review",
          publishedDate: "December 10th, 2017",
          author: "arnondora"
        },
        {
          slug: "programming-101-writing-clean-code",
          heading: "Programming 101 – Writing Clean Code",
          excerpt: "อีกหนึ่งเรื่องที่มักจะเห็นได้ชัดจากคนที่พึ่งเขียนโปรแกรมใหม่ ๆ คือเรื่องของลักษณะในการเขียน Code มันก็เหมือนลายมือที่บางคนอาจสวยบางคนอาจไม่สวย แต่มันก็ฝึกกันได้ บางทีผมอ่านแล้วก็จะรู้เลยว่า คน ๆ นี้เขียนเป็นหรือเขียนได้กันแน่ วันนี้เลยจะพามาดูกันว่าจะเขียน Clean Code ที่เขาว่ากัน มันทำยังไง",
          category: "Programming 101",
          publishedDate: "December 10th, 2017",
          author: "arnondora"
        },
        {
          slug: "programming-101-2=days-miracle",
          heading: "Programming 101 – 2-Days Miracle",
          excerpt: "หลังจากที่ได้เขียน Programming 101 ในอันก่อนเรื่องที่บอกว่า ทำยังไงถึงเราจะเรียนรู้เทคโนโลยีใหม่ ๆ ได้อย่างรวดเร็ว (นี่ ๆ อ่านได้ที่ลิงค์นี้)วันนี้เลยจะมาแชร์ทริก ไม่รู้เหมือนกันมันคืออะไร ผมคิดขึ้นมาใช้เอง ผมเรียกมันว่า 2-Days Miracle",
          category: "Programming 101",
          publishedDate: "November 26th, 2017",
          author: "arnondora"
        },
      ],
      categories: [],
      page: props.page || 1,
    }
  }

  render () {
    const tabs = ["Posts", "Categories"]

    var posts = this.state.posts.map((item) => {
        return (
          <CardWrapper key={item.slug}><Card slug={item.slug} heading={item.heading} excerpt={item.excerpt} category={item.category} publishedDate={item.publishedDate} author={item.author}/></CardWrapper>
        )
    })

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

              this.state.posts.length == 0 ? <h2>There is no post!</h2> : posts
            :
              null
          }

          {this.state.tabIndex == 0 && this.state.posts.length > 0 ?
            <MoreButtonWrapper>
              {this.state.page >= 1 ? <Link to = {"/page/" + (this.state.page+1)}><PrimaryButton float="left" label="Older Posts"/></Link>  : null}
              {this.state.page < 1 ? <Link to = {"/page/" + (this.state.page-1)}><PrimaryButton float="right" label="Newer Posts"/></Link>  : null}

            </MoreButtonWrapper> : null}

          { this.state.tabIndex == 1 ?
              this.state.categories.length == 0 ? <h2>There is no category!</h2> :<p>Categories goes here!</p>
            :
              null
          }
        </ContentContainer>
      </Container>
    )
  }

}
