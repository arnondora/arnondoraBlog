---
title: "Google Web Polymer - Basic Elements & Icon มหาสนุก (EP.2)"
image: "./webpolymersignep2.png"
category: Tutorial
excerpt: "อย่างที่เคยบอกไปว่า Web Polymer มันคือการเอา Element มาวางต่อๆกันจนเป็น Application ขึ้นมา วันนี้เราจะมาดูต่อกันว่า เราจะเรียกใช้ Elements ได้ยังไง"
date: 2015-03-25T15:25:10.000
author: arnondora
template: full-width
type: post
isFeatured: false
status: published
---

อย่างที่เคยบอกไปว่า **Web Polymer** มันคือการเอา **Element** มาวางต่อๆกันจนเป็น **Application** ขึ้นมา วันนี้เราจะมาดูต่อกันว่า เราจะเรียกใช้ **Elements** ได้ยังไง

## Google แบ่ง ตัว Build-in Elements ออกเป็น 2 ประเภท นั่นคือ

* **Core Icons** - ตรงตามชื่อเลยครับ มันคือ **Icon** ทั้งหลาย
* **Core Elements** - มันคือ **Element** ที่ใช้งานพื้นฐานเช่นพวก **Layout Element, Icon** หรือจะเป็นพวก **Ajax calling **
* **Paper Elements** - ส่วนอันนี้จะเป็นส่วนของพวก **Material Design** ทั้งหมด
ทั้งหมดที่ว่ามา เราสามารถเลือกติดตั้งได้ตามการใช้งานเลยนะครับ แต่วันนี้เราจะติดตั้งมันทั้ง 3 อย่างเลย
แต่ก่อนจะใช้เราจะต้องติดตั้งมันเข้ามาซะก่อน  ก่อนอื่นให้ **cd** ไปที่ **project** ของเราก่อน หลังจากนั้นให้เราติดตั้งตัว **Core Icons**,**Core Elements** และ **Paper Elements** โดยผ่าน **Bower** (อย่าลืมเติม S นะ ไม่งั้นไม่หาไม่เจอจริงๆนะ โดนมาแล้ว)

    bower install --save Polymer/core-icons
    bower install --save Polymer/core-elements
    bower install --save Polymer/paper-elements

เสร็จแล้วเราจะได้ **Dependencies** ของ **Elements** ทั้งหมดมา
แต่วันนี้เรายังไม่ลองเล่น **Element** ทั้งหมด เพราะมันเยอะมาก วันนี้ขอลองเล่น **Element** ที่ง่ายที่สุดก่อนนั่นคือ Icon นั่นเอง

## ก่อนอื่นต้อง Import File ของ core-icons ก่อน

    <link rel="import" href="bower_components/core-icons/core-icons.html">

จากบรรทัดนี้เราก็ได้ **Import core-icons** เข้ามาเรียบร้อยแล้ว ถัดมาเราจะมาลองใช้มันง่ายก่อน  มันใช้ง่ายผ่าน **Tag** ง่ายๆครับนั่นคือ **<core-icon\> **

    <core-icon icon = "android"></core-icon>

เราสามารถเข้าไปดูรูปแบบของ **Icon** ที่ **Google** ทำไว้ให้ได้ที่ **[https://www.polymer-project.org/0.5/components/core-icons/demo.html][0]**

## มาลองเปลี่ยนสี, ขนาดของมันกัน
การเปลี่ยนสีและขนาดของมันนั้น เราสามารถทำได้ง่ายๆ **โดยการกำหนด Class ผ่าน CSS** ได้เลย เช่น

    <style>
       .icon-larger
       {
          width : 200px;
          height : 200px;
       }

       .android-colour
       {
          color: #9aed00;
       }
    </style>

จากนั้นผมก็มีแก้ที่บรรทัด **Icon** ที่เราสร้างไว้โดยการ**Apply Style** ที่เราสร้างขึ้นมาเมื่อกี้กัน

    <core-icon class = "icon-larger android-colour" icon = "android"></core-icon>

แค่นี้เราก็ได้ **Android Icon** ที่มีสีเขียวแล้วล่ะ!!!

## เรามาสร้าง Icon เองกัน !!!
ก่อนอื่น เราจะสร้าง ไฟล์ชื่อ **custom-icon** ขึ้นมาก่อน ในนั้นให้ใส่ตามนี้เลย

    <link rel="import" href="bower_compoments/core-iconset-svg/core-iconset-svg.html">

    <core-iconset-svg id = "custom-icons" iconSize = "50">
        <svg>
          <defs>
             <g id = "fancy-circles">
                 <circle cx= "25" cy = "25" r ="18"/>
                 <circle cx= "12" cy = "12" r ="10"/>
                 <circle cx= "35" cy = "40" r ="6"/>
             </g>
          </defs>
        </svg>
    </core-iconset-svg>

บรรทัดแรกเป็นการ **Import core-iconset-svg** เข้ามาเพื่อสร้าง **Icon Set** ของเราเอง จากนั้นก็เปิดแท๊ค ขึ้นมาพร้อมกับตั้งชื่อบน **Id** และข้างในนั้นก็เป็น **Defintion** ของตัว **Icon** ที่เราสร้าง ถัดมาเราจะกลับมาที่ **Index.html** เพื่อเรียกใช้ **Icon** ที่เราสร้างกัน

    <link rel="import" href="custom-icons.html">

ก่อนอื่นเราต้องมา **Import** ไฟล์ **custom-icons** ที่เราสร้างเมื่อกี้ก่อน ทีนี้เราก็สามารถเรียกใช้ **Icon** นี้ได้แล้ว เราจะมาเรียกกัน

    <core-icon icon = "custom-icons:circles"></core-icon>

สังเกตุนะครับ ว่า เวลาเราเรียก **icon** เราจะต้องเขียนเป็น **custom-icons:circles** อันนี้มันคือ ชื่อของ **Collection** ตามด้วย **: (Colon)** และชื่อ **Icon **เพราะ**ฉะนั้นถ้าเราสร้าง Icon Collection เองหรือจะเรียก Collection ที่เราโหลดมาก็เพียงแค่ Import และเรียกใช้ได้โดยตรง**เหมือนด้านบนเลย

### **สุดท้ายของวันนี้แล้ว นั่นคือการสร้าง ปุ่ม กัน!!**
ก่อนอื่นให้ Import File นึงเข้ามาก่อน

    <link rel="import" href="bower_components/core-icon-button/core-icon-button.html">

ส่วนวิธีการเรียกใช้ก็เหมือนกับปกติเลยครับ นั่นคือเรียกผ่าน Tag เช่น

    <core-icon-button icon = "android"></core-icon-button>

**และก็หมดแล้วสำหรับวันนี้ สรุปวันนี้เราได้เรียนรู้เรื่อง**

* **ประเภทของ Elements**
* **การติดตั้ง Elements**
* **การ Custom ตัว Icons ด้วย CSS**
* **การสร้างและเรียกใช้ Icon Collection ที่เป็น SVG**
* **การสร้างปุ่มด้วย core-icon-button**
ไว้ต่อคราวหน้า คราวหน้าจะเป็นเรื่องอะไรนั้นรอต่อไปนะครัช ......
**Source Code:**[https://drive.google.com/folderview?id=0BwrPA9Miv4o2M3dLUmFPeXNkUms&usp=sharing][1]
**Lesson Translated and Modified From **[Polycasts EP1,2][2] From [Google Developers Channel][3]

[0]: https://www.polymer-project.org/0.5/components/core-icons/demo.html
[1]: https://drive.google.com/folderview?id=0BwrPA9Miv4o2M3dLUmFPeXNkUms&usp=sharing
[2]: https://www.youtube.com/playlist?list=PLOU2XLYxmsII5c3Mgw6fNYCzaWrsM3sMN
[3]: https://www.youtube.com/user/GoogleDevelopers
