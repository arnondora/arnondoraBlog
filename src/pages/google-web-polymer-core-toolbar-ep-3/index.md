---
title: "Google Web Polymer - Core Toolbar & Core Header Panel (EP.3)"
image: "./webpolymersignep3.png"
category: Tutorial
excerpt: "เมื่อตอนก่อน เราพูดเรื่องของ Elements พื้นฐานไปบ้างและ ลงลึกเรื่องของ Icon ไปแล้ว วันนี้เราจะมาลงลึกในเรื่องของ Toolbar กันบ้าง แบบที่เราเห็นอยู่ใน Android Application"
date: 2015-03-26T15:38:09.000
author: arnondora
template: full-width
type: post
isFeatured: false
status: published
---

เมื่อตอนก่อน เราพูดเรื่องของ Elements พื้นฐานไปบ้างและ ลงลึกเรื่องของ Icon ไปแล้ว วันนี้เราจะมาลงลึกในเรื่องของ Toolbar กันบ้าง แบบที่เราเห็นอยู่ใน Android Application
ก่อนอื่นให้ลง **core-toolbar, paper-icon-button, core-icon และ paper-progress ไปก่อน** อย่าลืมลง platform ด้วยล่ะ ไม่งั้นรันไม่ได้เน้อ โดยใช้คำสั่งตามนี้เลย

    bower install --save Polymer/core-toolbar Polymer/paper-icon-button Polymer/paper-progress

หลังจากที่เราได้ติดตั้ง **Element** ที่จำเป็นทั้งหมดในวันนี้แล้ว มาเริ่มสร้างกัน ก่อนอื่น เราจะมาสร้าง Toolbar กันก่อนโดยใช้ **tag core-toolbar** และจะเพิ่มข้อความว่า **My App** ลงไปใน **Toolbar** ที่พึ่งสร้างด้วย

    <core-toolbar>
       <div>My App</div>
    </core-toolbar>

หลังจากนั้นผมอยากได้ผม **Menu** เราก็เติม **Button** เข้าไป ที่สอนไปเมื่อ EP. ที่แล้ว แต่ผมจะใช้เป็นปุ่มจาก Paper Icon แทน และเอาปุ่มค้นหาไว้ขวาสุดด้วย

    <core-toolbar>
        <paper-icon-button icon = "menu"></paper-icon-button>
        <div>My App</div>
        <paper-icon-button icon = "search"></paper-icon-button>
    </core-toolbar>

ถ้าเราได้รันแล้ว เราจะสังเกตว่า ปุ่มค้นหามันจะอยู่ติดกับคำว่า **My App** วิธีแก้คือ **เราจะใช้ Properites พิเศษนั่นคือ flex**

    <core-toolbar>
        <paper-icon-button icon = "menu"></paper-icon-button>
        <div flex>My App</div>
        <paper-icon-button icon = "search"></paper-icon-button>
    </core-toolbar>

แต่ถ้าเราลองรันดูแล้ว เราจะเห็นว่า ถ้าเราใส่ลิงค์ลงไปใน **My App** แล้ว เวลาใช้งานจริงเราจะคลิกแล้วลิงค์จะทำงานได้ทุกจุดเลยตรงที่ว่างๆอยู่ วิธีแก้คือ เพิ่ม **span** ที่มี **flex** เข้าไป

    <core-toolbar>
        <paper-icon-button icon = "menu"></paper-icon-button>
        <div>My App</div>
        <span flex></span>
        <paper-icon-button icon = "search"></paper-icon-button>
    </core-toolbar>

และลองรันดูครับ โอ้ว!! เราได้สิ่งที่ต้องการเรียบร้อยแล้ว แต่สียังไม่ได้ เราจะใช้ **CSS** ในการเปลี่ยนสีพื้นหลังของ **Toobar** กัน ซึ่งก็ใช้ผ่าน **properity background-color** ปกติได้เลย

## ลองมาเล่น Properites อย่างอื่นใน Toolbar กันบ้าง!!
เราสามารถขยายขนาดของ Toolbar ให้สูงขึ้นได้โดยการ เพิ่ม Class tall ลงใน core-toolbar เช่น

    <core-toolbar class = "tall"></core-toolbar>

หลังจาก **Toolbar** ของเราขยายก็ทำให้พื้นที่บน **Toolbar** มันเยอะขึ้น เราสามารถจัดวาง **Element** ใน **Toolbar** ได้เยอะขึ้น จึงมี **Class top, middle และ bottom** ขึ้นมาเพื่อจัดวาง **Element** เช่น

    <core-toolbar class = "tall">
        <div class = "middle">My App</div>
    </core-toolbar>

นอกจากนี้ยังมี **Class indent เพื่อขยับ Element ไปข้างขวา** เหมือนกับเรา Indent ในโค๊ตเลยล่ะะ!!! และอีกอันที่เด็ด คือ **Class fit มันจะทำให้ Element นั่นไม่มี margin** นั่นคือชิดไปกับ toolbar ได้เลย เช่นผมจะใช้ paper-progress มาลองให้ดู

    <core-toolbar>
         <paper-progress class= "fit"></core-progress>
    </core-toolbar>

## เราจะมาเพิ่มอะไรให้ตัว App เรากัน!
ในที่นี้ผมจะใช้ **core-header-panel** แต่ก่อนอื่น install มันกันก่อน

    bower install --save Polymer/core-elements

เราจะเอาไฟล์ **index.html ของเราเมื่อกี้มาปรับปรุงกันนะครับ** ก่อนอื่น**เราจะค่อม core-toolbar ด้วย core-header-panel ทั้งหมด และเติม properites fullbleed layout vertical ลงใน body**

     <body fullbleed layout vertical>
        <core-header-panel flex>
           <core-toolbar>
              <paper-icon-button icon = "menu"></paper-icon-button>
              <div>My App</div>
              <span flex></span>
              <paper-icon-button icon = "search"></paper-icon-button>
              <paper-progress class= "fit" value = "30"></paper-progress>
           </core-toolbar>
        </core-header-panel>
     </body>

จากนั้นก็เพิ่ม **Div tag** ลงไปต่อจาก**core-toolbar** และลองเพิ่ม **content** มั่วๆลงไปดู

     <body fullbleed layout vertical>
        <core-header-panel flex>
           <core-toolbar>
              <paper-icon-button icon = "menu"></paper-icon-button>
              <div>My App</div>
              <span flex></span>
              <paper-icon-button icon = "search"></paper-icon-button>
              <paper-progress class= "fit" value = "30"></paper-progress>
           </core-toolbar>
           <div class = "container">
              <div class = "banner">
                 Banner 1
              </div>
           <div class = "container">
              <div class = "banner">
                 Banner 2
              </div>
           <div class = "container">
              <div class = "banner">
                 Banner 3
              </div>
           <div class = "container">
              <div class = "banner">
                 Banner 4
              </div>
           <div class = "container">
              <div class = "banner">
                 Banner 5
              </div>

          </div>
        </core-header-panel>
     </body>

หลังจากเราได้ลองใช้เจ้า **core-header-panel แบบพื้นๆ**ไปแล้ว ทีนี้เรามาลองดู **Mode** ของมันมั่งดีกว่า

* **Scroll** - อันนี้จะทำให้ Toolbar ไม่เลื่อนตามเราเวลาเราเลื่อนหน้าลงไปข้างล่าง
* **sceamed** - จะทำให้ Drop Shadow หายไป
* **waterfall** - จะทำให้เหมือนมีเงาวิ่งตาม content ที่วิ่งผ่านไป
* **waterfall-tall** อันนี้เด็ด มันจะขยาย Toolbar ตอนเราเลื่อนไปข้างบนและหดเล็กเหลือเท่าเดิมเวลาเราเลื่อนลงข้างล่าง
วิธีใช้ทั้งหมดนี้ เช่น

    <core-header-panel mode = "waterfall-tall">
       <core-toolbar>
          <div>My App</div>
       </core-toolbar>
    </core-header-panel>

และนี่ก็จบแล้วครับ สำหรับวันนี้
**สรุปวันนี้เราได้เรียนรู้เรื่อง**

* **การติดตั้งและสร้าง core-toolbar**
* **Positioning Properties เช่น centre bottom middle**
* **Properties flex เพื่อให้ Element ยืดจนสุดขอบ**
* **Properties fit เพื่อให้ Element ไม่มี Margin (ติดกันไปเลย)**
* **การติดตั้งและสร้าง core-header-panel**
* **Mode ต่างๆของ core-header-panel**
**Source Code : **[https://drive.google.com/folderview?id=0BwrPA9Miv4o2TGNtV1g0VUxBMHc&usp=sharing][0]

[0]: https://drive.google.com/folderview?id=0BwrPA9Miv4o2TGNtV1g0VUxBMHc&usp=sharing
