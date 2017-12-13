import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import color from 'color'

import colours from '../utils/colours'

import Card from '../components/Card'
import CategoryButton from '../components/CategoryButton'
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
  letter-spacing: 2.5pt;
  font-size: 14px;
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
      tabIndex : 1,
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
      categories: [
        {
          name: "My Life",
          slug: "my-life",
          description: "รวบรวมเรื่องต่าง ๆ เกี่ยวกับชีวิตอันแสนสนุกของผม",
          thumbnail: "https://themagicalmiss.files.wordpress.com/2012/07/enjoying-life-iheartfaces-wm.jpg",
        },
        {
          name: "Movie Review",
          slug: "movie-review",
          description: "รวบรวม Review หนังที่ได้ไปดูมา",
          thumbnail: "https://www.statisticbrain.com/wp-content/uploads/2015/04/star-wars-franchise-revenue-statistics.jpg",
        },
        {
          name: "Programming 101",
          slug: "programming-101",
          description: "รวบรวมเรื่องต่าง ๆ เกี่ยวกับชีวิตอันแสนสนุกของผม",
          thumbnail: "http://www.gettingsmart.com/wp-content/uploads/2017/06/Program-Code-Feature-Image.jpg",
        },
        {
          name: "Review",
          slug: "review",
          description: "Review อะไรก็ได้โตแล้ว รีวิวมันทุกอย่างยันเรือดำน้ำ",
          thumbnail: "https://cnet4.cbsistatic.com/img/qhWOoIqPUIs0E8Fs-USZ-6cIQxU=/830x467/2017/10/16/b3f7c184-cbd5-4073-958e-02d33c0ddc88/google-pixel-2-0490-025.jpg",
        },
        {
          name: "Tutorial",
          slug: "tutorial",
          description: "อยากสอนอะไรก็สอน อยากเขียน",
          thumbnail: "https://dynomapper.com/images/sitemap_tutorial_2.jpg",
        },
      ],
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

    var categories = this.state.categories.map((item) => {
      return (
          <CategoryCard
            key={item.slug}
            name={item.name}
            slug={item.slug}
            description={item.description}
            thumbnail={item.thumbnail}
          />
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
              this.state.categories.length == 0 ? <h2>There is no category!</h2> : <CategoryContainer>{categories}</CategoryContainer>
            :
              null
          }
        </ContentContainer>
      </Container>
    )
  }

}
