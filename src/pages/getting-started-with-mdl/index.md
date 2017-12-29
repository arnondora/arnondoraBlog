---
title: "Getting Started with Material Design Lite (MDL)"
image: "./mdlgettingstarted.png"
category: Tutorial
excerpt: "ย้อนกลับไปที่งาน Google I/O 2014 Google ได้เปิดตัว Guidelines สำหรับการ Design App และ Web ต่างๆ นอกจากนั้นยังเปิดตัวโครงการอย่าง Polymer ที่เปลี่ยนแปลงวิธีการเขียนเว็บของเรา ไปเยอะอยู่เหมือนกัน"
date: 2015-07-15T01:52:25.000
author: arnondora
template: full-width
type: post
isFeatured: false
status: published
---

ย้อนกลับไปที่งาน Google I/O 2014 Google ได้เปิดตัว Guidelines สำหรับการ Design App และ Web ต่างๆ นอกจากนั้นยังเปิดตัวโครงการอย่าง Polymer ที่เปลี่ยนแปลงวิธีการเขียนเว็บของเรา ไปเยอะอยู่เหมือนกัน (เอาจริงๆ Polymer ผมก็ชอบนะ)  แต่ตอนนี้ มาแล้ว Web Component บน Paper Element ใน Web Polymer ถูกเอามาลงใน Version CSS, HTML และ Javascript ซึ่งทาง Google เรียกมันว่า Material Design Lite หรือ MDL นั่นเอง
ถ้ายังนึกไม่ออกว่ามันคืออะไร ให้นึงถึง Front-end Framework อย่าง Bootstrap ที่เราชอบใช้กัน แต่ต่างกันตรงที่ Element ทั้งหมดจะถูกถอด Design มาจาก Paper Element ใน Web Polymer นั่นเอง
แต่ที่น่าสะพรึ่งคือ ขนาดของมัน เมื่อโหลดผ่าน CDN เพียงแค่ 27 kb เท่านั้นเอง **และยังสามารถใช้กับ Web Browser ใหม่ๆ ได้หมดทุกตัว ยกเว้น IE9** นอกจากที่ขนาดจะเล็ก และรองรับ Web Browser ใหม่ๆได้แล้ว ยัง Install และใช้งานได้ง่ายมากๆ ยิ่งถ้าใครเคยใช้พวก Foudation หรือไม่ก็ Bootstrap มาแล้ว ก็คงจะไม่ใช้ปัญหาสักเท่าไหร่
นอกจากนี้ยังมี Template มาตราฐานหลายๆ อย่างให้เราได้ดูเป็นตัวอย่างอีกด้วย สามารถเข้าไปดูได้ที่ หน้า [template][0] ได้เลย

![MDLGetting_started5](./MDLGetting_started5.png) ![MDLGetting_started4](./MDLGetting_started4.png) ![MDLGetting_started3](./MDLGetting_started3.png) ![MDLGetting_started2](./MDLGetting_started2.png) ![MDLGetting_started1](./MDLGetting_started1.png)

หลังจากที่ได้บรรยายสรรพคุณ ไปเยอะแล้ว เราลองเล่นกันเลยดีกว่า ในตอนนี้ เราจะลองมาสร้าง หน้า Home เล่นๆกันดีกว่า
ก่อนอื่น เราก็ต้องไป Import File ของตัว MDL เข้ามาก่อน ในที่นี้ขอใช้ผ่าน CDN ล่ะกัน (แต่ใน Github จะโหลดมาเป็น Local)

    <link rel="stylesheet" href="https://storage.googleapis.com/code.getmdl.io/1.0.0/material.indigo-pink.min.css">
    <script src="https://storage.googleapis.com/code.getmdl.io/1.0.0/material.min.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">


หลังจากที่เรา Import File ที่จำเป็นเข้ามาแล้ว ถัดไปเราจะทำการสร้าง Navbar ด้านบนกัน ถ้าเราเข้าไปดูใน Document จะเห็นกว่ามี Navbar หลายแบบมาก แต่ในที่นี้เราจะเลือกแบบ Fixed-header แต่ก่อนจะวาง Navbar เราจะต้องวาง Container เหมือนกับตัวหุ้มหน้าเว็บเราก่อน

    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">

    </div>

ทีนี้ล่ะ เราก็จะได้มาสร้าง Navbar กันจริงๆ ล่ะ เราจะต้องใช้ Header Tag เข้ามาช่วยในการสร้างด้วย มาเติมกันเลย

    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
       <header class="mdl-layout__header">

       </header>
    </div>

ถ้าลองเปิดหน้าที่เราเขียนตอนนี้ก็จะมีแต่จะมาเพิ่ม Link กับ Title ใน Navbar กัน

    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
       <header class="mdl-layout__header">
         <div class="mdl-layout__header-row">
            <!-- Title -->
               <span class="mdl-layout-title">Title</span>
            <!-- Spacer -->
               <div class="mdl-layout-spacer"></div>
            <!-- Nav <- Hide in smaller screen -->
               <nav class="mdl-navigation mdl-layout--large-screen-only">
                  <a href="" class="mdl-navigation__link">Home</a>
                  <a href="" class="mdl-navigation__link">Tutorial</a>
                  <a href="" class="mdl-navigation__link">about:me</a>
               </nav>
          </div>
       </header>
    </div>

เมื่อกี้ เราก็ได้เพิ่ม Link และ Title ถัดไปเราจะทำ Drawer กัน

     <!-- Drawer Layout -->
     <div class="mdl-layout__drawer">
        <span class="mdl-layout-title">Arnon Puitrakul</span>
        <nav class="mdl-navigation">
           <a href="" class="mdl-navigation__link">Home</a>
           <a href="" class="mdl-navigation__link">Tutorial</a>
           <a href="" class="mdl-navigation__link">about:me</a>
        </nav>
     </div>

ในการสร้าง Drawer เราก็ต้องสร้าวให้มันอยู่ใน Div Tag เข้าไป และถัดไป เราจะวางที่อยู่ให้กับ Content ในหน้าของเรา โดยเรียก Class mdl-layout\_\_content

     <!-- Main Content -->
     <main class="mdl-layout__content">
        <div class="page-content">
           <!-- Page Content Goes Here -->
           <h3>Hello World</h3>
         </div>
     </main>

โดยเราจะเรียกผ่าน Tag Main และกำหนด Class เป็น mdl-layout\_\_content และสุดท้าย เราจะมาสร้าง Footer กัน

     <!-- Footer -->
     <footer class="mdl-mini-footer">
        <div class="mdl-mini-footer--left-section"> <div class="mdl-logo">Copyright 2014-20ๅ5 Arnon Puitrakul all right reserved.</div></div>

        <div class="mdl-mini-footer--right-section"> <div class="mdl-logo">Getting Started with MDL by @arnondora</div></div>
     </footer>

เท่านี้ เราก็จะได้ หน้าเว็บเริ่มต้นง่ายๆ กับ MDL กันแล้ว ส่วน Code ที่เขียนในนี้สามารถเข้าไปดูได้ใน [Github][6] ได้เลย
จะเห็นได้ว่า MDL ทำให้เราสามารถสร้างหน้าเว็บที่สวยงาม ตาม Material Design ได้ง่ายขึ้นเยอะมากๆ MDL จะเหมาะสำหรับเว็บที่ ไม่ต้องการรัน Web Polymer เต็มๆ หรือแค่ต้องการ Design จาก Paper Element ใน Web Polymer ก็ได้ สามารถดูข้อมูลเพิ่มเติมได้ที่ หน้าเว็บของ MDL ได้เลย
เดี๋ยวก็จะเขียน Theme อีก รอบนี้จะเอา MDL มาใช้นี่แหละ รอดูกันได้เลย เผื่อจะเอามาแจกกัน

[0]: http://www.getmdl.io/templates/index.html
[6]: https://github.com/arnondora/mdl.gettingstarted
