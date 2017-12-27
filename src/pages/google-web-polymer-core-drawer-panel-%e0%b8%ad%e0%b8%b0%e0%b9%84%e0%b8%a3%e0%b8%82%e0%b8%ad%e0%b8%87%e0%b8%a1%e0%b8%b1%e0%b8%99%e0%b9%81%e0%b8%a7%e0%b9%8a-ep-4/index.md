---
title: "Google Web Polymer - Core Drawer Panel อะไรของมันแว๊! (EP.4)"
image: "./webpolymersignep4.png"
category: Tutorial
excerpt: "กลับมาอีกแล้วนะฮ่ะ ตอนที่เขียนตอนนี้ Class โดน Cancel ได้เจ็บปวดมาก เลยว่างออกมาเขียน Blog นี่แหละ มาต่อจากความที่แล้วกันเลยครับ"
date: 2015-03-27T16:43:00.000
author: arnondora
templete: full-width
type: post
isFeatured: false
status: published
---

กลับมาอีกแล้วนะฮ่ะ ตอนที่เขียนตอนนี้ Class โดน Cancel ได้เจ็บปวดมาก เลยว่างออกมาเขียน Blog นี่แหละ มาต่อจากความที่แล้วกันเลยครับ

## ย้อนความแปบ!
เมื่อตอนที่แล้ว **เราได้สร้างหน้า Index.html ที่มี Toolbar ที่มีปุ่ม Hamburger กับ search เรียบร้อยแล้ว** ด้วย core-header-panel และเติมความหวืหว่าด้วย core-header-panel ไปแล้ว แต่มันเกิดปัญหาอยู่ว่า **ถ้าเราเปิดบน Smart Device มันก็แล้วไปเพราะมันโออยู่นะครับ แต่ถ้ามาเปิดใน Desktop แล้วเนี่ย มันเหมือนเอาแอฟโทรศัพท์มายืดให้เราใช้เลย มันโคตรไม่สวยเลย** วันนี้เราจะทำให้มันโอ้วเย้ ขึ้นด้วย core-drawer-panel

## มารู้จักกับ core-drawer-panel กัน
เอาง่ายๆ**มันก็คือ**แถบที่อยู่ทางซ้าย **ที่เป็นเมนูเหมือนเวลาเราใช้ Application บนโทรศัพท์เลยครับ** ตอนนี้กลับมาที่ไฟล์ของเมื่อ EP ที่แล้วก่อน เ**ราจะสร้าง core-drawer-panel มาคร่อม core-header-panel อีกทีนึง** (เขียนไปเยอะก็เริ่มแอบงงเหมือนกัน) **และ**ผมจะ**ให้ชื่อกับมันหน่อย เพื่อความน่ารัก ให้ id มันเป็น drawerPanel** **พร้อมกับเติม id ให้ปุ่มเมนูของเราด้วย** เพื่อความน่ารักเช่นกัน ใ**ห้มันชื่อว่า navicon** ล่ะกัน และสุดท้าย ท้ายสุด**สร้าง core-header-panel อีกอัน อันนี้เขียนคำว่า drawer เข้าไปด้วย**เพื่อให้มันรู้ว่า มันกำลังจะแปลงร่างเป็นหน้าเมนู (drawer ข้างซ้ายน่ะ) และในนั้นผมสร้าง core-menu เพื่อเก็บชือเมนูในนั้นด้วย

     <core-drawer-panel id = "drawerPanel">
        <core-header-panel drawer>
           <core-toolbar>Menu</core-toolbar>
           <core-menu>
               <core-item label = "one"></core-item>
               <core-item label = "two"></core-item>
           </core-menu>
        </core-header-panel>

        <core-header-panel main>
           <core-toolbar>
               <paper-icon-button icon = "menu" id = "navicon"></paper-icon-button>
               <div>My App</div>
               <span flex></span>
               <paper-icon-button icon = "search"></paper-icon-button>
               <paper-progress class= "fit" value = "30"></paper-progress>
           </core-toolbar>

           <div class = "content">
              <div class = "container banner-container">
                 <div class= "banner" layout vertical center>
                    Banner 1
                 </div>

            <div class= "banner" layout vertical center>
               Banner 2
           </div>

           <div class= "banner" layout vertical center>
               Banner 3
           </div>

           <div class= "banner" layout vertical center>
               Banner 4
           </div>
         </div>
        </core-header-panel>
     </core-drawer-panel>

พอลอง Refresh จะเห็นว่า**เราได้ Drawer Menu ทางด้านซ้ายแล้ว แต่ปุ่ม Hamburger Menu มันยังอยู่เลย** **เราจะใช้ CSS** ช่วยจัดการกับมันกัน

     [main]
     {
        background-color: #F9F9F9;
     }
     [drawer]
     {
        background-color: #F0F0F5;
     }

     core-drawer-panel:not([narrow]) #navicon
     {
        display: none;
     }

อันแรกผมจะของ**เปลี่ยน Font ของหน้าหน่อย** เพื่อความสวยงาม ถัดมา **drawer ผมเปลี่ยนสีพื้นหลัง** และสุดท้ายอันนี้น่าสนใจ อันนี้คือ **การอ้างถึง core-drawer-panel ที่ method narrow ยังเป็น not อยู่ ให้ navicon ที่เราตั้งชื่อไว้หายไป **ทีนี้ลอง Refresh ดูครับ
เราจะเห็นว่า โอ้วมันเกือบสมบูรณ์และ ถ้าเราย่อหน้าลงไปปุ่ม Hamburger Menu มันกดแล้วก็ยังไม่ขึ้น เราจะมาเขียน JS กัน **สร้างไฟล์ชื่อ app.js ก่อนเลยครับ**

    document.addEventListener('polymer-ready',function()
    {
     var navicon = document.getElementById('navicon');
     var drawerPanel = document.getElementById('drawerPanel');
     navicon.addEventListener('click',function()
     {
     drawerPanel.togglePanel();
     });
    });

อธิบายโค๊ตก่อนนะครับ ตอนแรกเราใ**ห้มันเช็คว่า Document มัน Ready รึยัง** ถ้าแล้วก็ **ให้สร้าง Object จาก navicon กับ drawerPanel ที่เราตั้งไว้ใน Index.html** และตั้ง EventListener (ถ้าไม่ได้ JS กลับไปอ่านเรื่องของ JS ก่อนนะครับ) ว่า**ถ้าคลิกให้ drawerPanel รัน Method togglePanel()** (Method พวกนี้เราสามารถเข้าไปดูได้ใน Document ของ Polymer ได้เลยนะครับ)

**พอเรา Refresh มาแล้วลองคลิกดูปุ่ม Hamburger ก็จะกดแล้วเลื่อนเมนูออกมาได้และ** เย้และก็หมดสำหรับวันนี้แล้ว เหมื่อยและ
**สรุปวันนี้เราได้เรียนรู้เรื่อง**

* **รู้จักกับ core-drawer-panel**
* **การใช้งาน core-drawer-panel กับ Web Application ที่เรากำลังทำอยู่**
* **การ Custom core-drawer-panel ด้วย CSS และ JS**
คราวหน้าจะเป็นอะไรนั้นติดตามอ่านได้เบย
**Source Code :**[https://drive.google.com/folderview?id=0BwrPA9Miv4o2aDBnWE9JNUxuNzQ&usp=sharing][0]

[0]: https://drive.google.com/folderview?id=0BwrPA9Miv4o2aDBnWE9JNUxuNzQ&usp=sharing
