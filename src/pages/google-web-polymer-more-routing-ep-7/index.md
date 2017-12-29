---
title: "Google Web Polymer - More Routing (EP.7)"
image: "./webpolymersign7.png"
category: Tutorial
excerpt: "คราวที่แล้ว เราได้รู้เรื่องของ การ Routing พื้นฐานกันไปแล้ว วันนี้เรามาเรียนอีกแบบนึงกัน รอบนี้เราไม่ต้องแตะ JS สักบรรทัดเลยล่ะ ก่อนอื่น เราต้อง Install ตัวของ more-routing กันก่อน ก็ปกติตามแบบฉบับของ bower เลย"
date: 2015-04-08T22:11:12.000
author: arnondora
template: full-width
type: post
isFeatured: false
status: published
---

คราวที่แล้ว เราได้รู้เรื่องของ การ Routing พื้นฐานกันไปแล้ว วันนี้เรามาเรียนอีกแบบนึงกัน รอบนี้เราไม่ต้องแตะ JS สักบรรทัดเลยล่ะ ก่อนอื่น เราต้อง Install ตัวของ more-routing กันก่อน ก็ปกติตามแบบฉบับของ bower เลย

    bower install --save Polymore/more-routing

เท่านี้เราก็จะได้ตัวของ more-routing กันแล้ว งั้นมาต่อกันเลย
สืบเนื่องจากไฟล์เมื่อคราวที่แล้ว ใน Index.html เรามี Section หรือหน้าของเราอยู่ 3 หน้านั่นคือ Home, Portfoilo และ Contact ทั้งหมดนี้ถูกเชื่อมด้วย js เหมือนเมื่อคราวที่แล้วว่ากันไป แต่วันนี้อย่างที่บอกครับ **เราจะไม่เขียน JS เลยสักบรรทัดเดียว!** ก่อนอื่น เราจะเก็บตัวข้อมูลของ Routing ไว้ที่ไฟล์ route.html

    <link rel="import" href="bower_components/more-routing/more-routing.html">

    <more-routing-config driver = "hash"></more-routing-config>

    <more-route name = "home" path ="/"></more-route>
    <more-route name = "portfolio" path ="/portfolio"></more-route>
    <more-route name = "contact" path ="/contact"></more-route>

ก่อนอื่นในไฟล์ เราจะต้อง Import ตัว more-routing เข้ามาก่อน หลังจากนั้นเราจะมา Config  ตัว more-routing ตัว Tag more-routing-config กันต่อ ในที่นี้ผมให้เลือก driver เป็น hash ไปก่อนล่ะกัน ถัดมาเป็นการสร้าง route ก็ตามด้านบนเลย
ถัดไป เราจะไป import route.html ที่เราสร้างขึ้นมาเมื่อกี้ใน element\_import.html กันก่อน

    <link rel="import" href="route.html">

อันนี้ล่ะครับ งานช้างและ ตอนผมทำ Sample Code  กว่าจะหาเจอ เขียนไว้ห่วยมาก เลยอ่านยากไปหน่อย Simple Step ง่ายๆครับ การเรียกใช้ more-routing ก็คือ Tag <more-route-selector\> แค่เอามันไปไว้บนสิ่งที่เราต้องการให้มันเปลี่ยนตาม route ในที่นี้คือ เราต้องใส่ไว้ใน content เพื่อให้มันแสดง section ตาม route และอีกตัวคือที่ core-menu เพื่อให้ เรากดเลือก route ผ่าน menu ได้นั่นเอง
มาแก้ที่ Section กันก่อน ผมจะใส่ <more-route-selector\> ครอบ <core-pages\> ไว้นะครับ

     <more-route-selector>
        <core-pages>
           <section route = "home">
              <h1>Home</h1>
              <div>Home content</div>
           </section>

           <section route = "portfolio">
              <h1>Portfolio</h1>
              <div>Portfolio content</div>
           </section>

           <section route = "contact">
              <h1>Contact</h1>
              <div>Contact content</div>
              </section>
        </core-pages>
     </more-route-selector>

สังเกตที่ tag Section นะครับผมเปลี่ยนมาใช้ Properity route แทน แล้วให้มันเท่ากับชื่อของ route ที่เราตั้งไว้ใน route.html ง่ายๆมากเลย ทีนี่เราจะมาทำเหมือนกันใน core-menu กันบ้าง

     <more-route-selector>
        <core-menu>
           <core-item label = "Home" route = "home"><a href ="{{urlFor('home')}}"></a></core-item>
          <core-item label = "Portfolio" route = "portfolio"><a href ="{{urlFor('portfolio')}}"></a></core-item>
          <core-item label = "Contact" route = "contact"><a href ="{{urlFor('contact')}}"></a></core-item>
        </core-menu>
     </more-route-selector>

แต่ในนี้เราต้องเพิ่มนิดนึง นั่นคือ ตัว Link เพราะถ้าเราไม่เปลี่ยนตัว html มันจะไม่รู้ว่าอ้าวแล้วคลิกแล้วให้ไปไหน เราเลยต้องเพิ่ม  {{urlFor('home')}} (มันก็คือตัวแปร จำได้ชิมิครับ) เข้าไปเพื่อให้รู้ว่า มันจะต้อง route ไปไหน
และสุดท้ายของวันนี้ เราจะมารู้เรื่องของการ Handle Parameter ใน more-routing กัน ก่อนอื่นเลย

## มันคืออะไร?
ตอบง่ายๆครับ เหมือนกับ Route ที่เราเคยทำมาก่อนหน้านี้เลยครับ แต่อันนี้เราเพิ่มเรื่องของ Parameter เข้ามา **ถ้าใครเคยเขียน PHP มาแล้ว มันจะเหมือนกับ เราส่ง GET กับ POST** เลยครับ แต่อันนี้เราจะทำผ่าน HTML ง่ายๆเลยครับ
ก่อนอื่นเราจะมาเพิ่ม Properity selectParams ที่ <more-route-selector\> กันก่อน **เพื่อให้เจ้า <more-route-selector\> รู้จักชื่อตัวแปรกันก่อน**

    <more-route-selector selectParams = "{{selectParams}}></more-route-selector>

ในที่นี้ผมตั้งชื่อมันเป็น **selectParams** ไว้ก่อนนะครับ
**ลืมบอกไป!!** เป้าหมายของตัวอย่างนี้ คือเราจะสร้างหน้าของ contact ให้มีลิงค์โชว์รายละเอียดของ Contact ที่คลิกเข้าไป
**ซึ่งผมจะต้องสร้างลิงค์ เพื่อไปหาหน้านั้นกันก่อน**

    <a href="{{urlFor('contact-name', {name: 'Me'})}}">Me</a>

ใช้หลักการเหมือนเมื่อกี้เลย แต่ด้านใน ตรง contact-name มันจะเป็นชื่อของ  Section ที่เราต้องการวิ่งไปหา และตามด้วย Parameter ที่ต้องการส่งไป **ในที่นี้ผมส่ง Parameter ชื่อ name ค่าเป็น Me**
สุดท้าย ท้ายสุด! **เราก็มาสร้าง Section contact-name จริงๆกัน**

     <section route = "contact-name">
        <h1>{{selectParams.name}} Contact Info</h1>
        <div>Name : {{selectParams.name}}</div>
     </section>

**ส่วนวิธีการเรียก Parameter ที่ส่งมาเราจะเรียกชื่อตัวแปรใหญ่ที่เราตั้งไว้ตอนแรกนั่นคือ selectParams แล้วจุดด้วยชื่อของ Parameter ที่เราตั้งไว้ ก็เป็นอันเสร็จ**
**เพราะฉะนั้นวันนี้เราได้รู้เรื่องของ**

* **การสร้าง route ด้วย more-route**
* **การจัดการ Parameter ใน more-route**
บางทีก็คิดนะว่า ตัวเองเขียนอ่านไม่รู้เรื่อง ถ้ามีคำถามก็เมล์มาได้นะฮ้า~
**Source Code : **[https://drive.google.com/folderview?id=0BwrPA9Miv4o2dEk2a09BM01wejQ&usp=sharing][0]

[0]: https://drive.google.com/folderview?id=0BwrPA9Miv4o2dEk2a09BM01wejQ&usp=sharing
