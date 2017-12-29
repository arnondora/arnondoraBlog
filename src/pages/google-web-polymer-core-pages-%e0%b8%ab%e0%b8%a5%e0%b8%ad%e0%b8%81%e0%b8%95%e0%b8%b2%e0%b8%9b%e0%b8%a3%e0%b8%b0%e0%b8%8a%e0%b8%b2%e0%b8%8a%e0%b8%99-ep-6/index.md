---
title: "Google Web Polymer - Core Pages หลอกตาประชาชน (EP.6)"
image: "./webpolymersignep6.png"
category: Tutorial
excerpt: "เมื่อ EP. ทีแล้วเราได้เรียนรู้เรื่องของการผูกข้อมูลกับ JS กันไปแล้ว วันนี้เราขยับมาอีกสเต๊ปนั้นคือ การใช้ Core Pages กับ JS แบบเมื่อ EP. ที่แล้ว"
date: 2015-04-02T20:54:49.000
author: arnondora
template: full-width
type: post
isFeatured: false
status: published
---

เมื่อ EP. ทีแล้วเราได้เรียนรู้เรื่องของการผูกข้อมูลกับ JS กันไปแล้ว วันนี้เราขยับมาอีกสเต๊ปนั้นคือ การใช้ Core Pages กับ JS แบบเมื่อ EP. ที่แล้ว

## Today's Target
วันนี้เราจะมาเรียนรู้เรื่องของการใช้ **Core Pages** เพื่อให้เรากระโดดไปอีกหน้าได้อย่างง่ายดาย (ถ้านึกไม่ออกให้ไปลองเข้าหน้าเว็บของ **Polymer** ดู แล้วลองคลิกลิงค์ดูจะเห็นว่าหน้ามันไม่ได้ถูกโหลดใหม่เลย) จริงๆมันมีหลายวิธีในการทำ แต่วันนี้เราจะ**ใช้วิธีบ้านๆ**ในการทำก่อน นั่นคือ เราจะสร้าง **หน้าของเราทั้งหมดในไฟล์เดียว แล้วใช้ js ควบคุมการแสดงผลอีกที**

## มาเริ่มทำกันเบย~~
ก่อนอื่นให้**ดึงไฟล์ของเมื่อ ep ที่แล้ว**มาก่อนนะ แล้วใน Content ให้ตามนี้เลย

     <core-pages selected = "0">
     <section>
     <h1>Home</h1>
     <div>Home content</div>
     </section>

     <section>
     <h1>Portfolio</h1>
     <div>Portfolio content</div>
     </section>

     <section>
     <h1>Contact</h1>
     <div>Contact content</div>
     </section>
     </core-pages>

**มันคือการสร้าง Core Pages** อยากรู้ว่าคืออะไรลอง Refresh ดู ครับแล้ว**ลองเปลี่ยนตัวเลขตรง selected ดู หน้ามันจะเปลี่ยนไปเรื่อยๆตามที่เราสั่ง แต่ถ้ามี Menu เยอะๆเราก็ไม่รู้เลขใช่ม่ะครับ มันจึงเกิด** Properity ที่ชื่อว่า **valueattr** ขึ้นมา มาลองเล่นกัน

     <core-pages selected = "home" valueattr = "data-category">
     <section data-category = "home">
     <h1>Home</h1>
     <div>Home content</div>
     </section>

     <section data-category = "portfolio">
     <h1>Portfolio</h1>
     <div>Portfolio content</div>
     </section>

     <section data-category = "contact">
     <h1>Contact</h1>
     <div>Contact content</div>
     </section>
     </core-pages>

สังเกตนะครับว่าใน Section Tag นั้นผมเพิ่ม Properity ชื่อว่า data-category ขึ้นมาเพื่อเป็นเหมือน Bookmark ว่าส่วนที่เราต้องการมันอยู่ตรงไหน (เหมือนชื่อของมันนั่นล่ะ) และในส่วนของ Core Pages ผมเพิ่ม valueattr เข้าไป และเปลี่ยน  selected เป็นคำว่า home แทน
แล้วลอง Refresh ดูครับ มันจะเข้าหน้า Home ให้เรา แต่ถ้าเรา เปลี่ยนเป็น Contact แทน มันก็จะเข้าหน้า Contact ให้เรา เจ๋งปุ๊ล่ะ!!

## ปัญหาใหม่!!
**ในเวลาใช้งานจริงๆ User คงไม่มานั่งแก้โค๊ตเราหรอกเนอะ** เพราะงั้นผมจะ**สร้าง Menu เป็นแถบข้างๆ**ล่ะกัน ถ้าใครใช้ไฟล์เก่าก็แก้ที่ core-header-panel ได้เลย

     <core-header-panel drawer>
     <core-toolbar>Menu</core-toolbar>
     <core-menu selected = "home" valueattr = "data-category">
     <core-item data-category = "home" label = "Home"></core-item>
     <core-item data-category = "portfolio" label = "Portfolio"></core-item>
     <core-item data-category = "contact" label = "Contact"></core-item>
     </core-menu>
     </core-header-panel>

เพิ่มแล้วก็ทำเหมือนของ เมื่อกี้เลย ทีนี้ลอง Refresh ดูครับ **จะเห็นว่าคลิกไปก็ไม่มีอะไรเกิดขึ้น 5555** โดนหลอกและ (ซะที่ไหนล่ะเฟ้ย) ปัญหามันคือ 2 Element นี้มันไม่ได้เชื่อมกัน
**เราจะเชื่อมมันด้วย ตัวแปรใน JS เหมือนของ EP. ที่แล้วเลย** ผมเปลี่ยน

     <core-menu selected = "home" valueattr = "data-category">

เป็น แบบด้านล่าง เพื่อให้มันวิ่งตามตัวแปร

     <core-menu selected = "{{page}}" valueattr = "data-category">

**ที่ core-pages ก็เช่นกัน เพราะเราต้องการให้หน้าเปลี่ยนไปด้วย**ใช้ม้าาล่ะ

    <core-pages selected = "{{page}}" valueattr = "data-category">

**ลอง Refresh แล้วลองคลิกที่เมนู ดูเห็นม่ะครับ ได้และ** อิอิ **แต่ก็ปัญหาอีก ตอนเราเข้ามาครั้งแรก มันไม่ขึ้นอะไรเลย นั่นเพราะว่าเราไม่ได้เซ็ตค่า Default ให้มัน** วิธีคือ เราจะเขียน JS เพื่อจัดการมันกัน

    var app = document.querySelector('#app');
    app.page = 'home';

**ผมเช็ตตัวแปร page ให้เป็นหน้า home แทน** พอเวลาเราเข้ามาหน้าแรกก็จะกลายเป็นหน้า home ทันทีจาก ที่ไม่ขึ้นอะไร
**สรุปวันนี้เราได้เรียนรู้เรื่อง**

* **การใช้ valueattr เพื่อเก็บตัวเลือกบน Selected**
* **การใช้ Core Pages เพื่อเปลี่ยนหน้าเว็บโดยไม่ได้ Refresh**
วันนี้น้อยมากครับ ง่ายๆอยู่ วันถัดไปจะเป็นอะไรนั้น รอได้เลยนะครับ
**Source Code :** [https://drive.google.com/folderview?id=0BwrPA9Miv4o2WTFCT3VpTElUdk0&usp=sharing][0]

[0]: https://drive.google.com/folderview?id=0BwrPA9Miv4o2WTFCT3VpTElUdk0&usp=sharing
