---
title: "[Dev Tip] Getting Started with Bower"
image: "./bower_sign.png"
category: Tutorial
excerpt: "อย่างที่รู้กันว่า ตอนนี้ผมกำลังเขียน Tutorial ของ Bootstrap อยู่ มันเลยทำให้ผมนึงถึงของสิ่งนึงที่ทำให้เรา Install Bootstrap หรือ Web Components อื่นๆ ได้ง่ายขึ้นเพียงแค่ Enter เดียว นั่นคือ Bower นั่นเอง"
date: 2015-08-16T16:18:07.000
author: arnondora
templete: full-width
type: post
isFeatured: false
status: published
---

อย่างที่รู้กันว่า ตอนนี้ผมกำลังเขียน Tutorial ของ Bootstrap อยู่ มันเลยทำให้ผมนึงถึงของสิ่งนึงที่ทำให้เรา Install Bootstrap หรือ Web Components อื่นๆ ได้ง่ายขึ้นเพียงแค่ Enter เดียว นั่นคือ Bower นั่นเอง

#### **Bower คืออะไร ?**
มันเหมือนกับ Package Manager ตัวนึงเลย เราสามารถโหลดของพวก Web Components เช่น Bootstrap, jquery เข้ามาได้ง่ายมาก โดยที่เราไม่ต้องเข้าไปโหลดมันมาจากทีล่ะเว็บเหมือนเมื่อก่อน

#### **การติดตั้ง Bower**
Bower เป็น Package นึงใน Node.js เพราะฉะนั้นเราจะต้องลง Node.js กันก่อน ให้เราเข้าไปโหลดและติดตั้งตัว [Node.js][0] มาก่อน

![bower_install1](./bower_install1.jpg)

หลังจากที่เราได้ Node.js มาแล้ว เราก็จะมา Install Bower กันโดยผ่าน Command Line โดยการพิมพ์คำสั่ง

    Mac OSX
    sudo npm install -g bower

    Windows
    npm install -g bower

![bower_install2](./bower_install2.jpg)


พอกดออกมามันก็จะได้หน้าตาประมาณนี้เลย ก็เป็นอันเสร็จสิ้นพิธีกรรมในการติดตั้ง Bower เพียงเท่านี้

#### **มาลองใช้กันเถอะ**
ในที่นี้ ผมจะติดตั้ง Boostrap + jquery เป็นตัวอย่าง ก่อนอื่น เราต้องสร้าง Folder เพื่อเก็บ Project เราซะก่อน แล้วให้เข้า Command Line แล้ว cd ไปหา Directory ที่เป็น Project ของเรา (ถ้าใช้ OSX ให้เราลาก Folder ที่เป็น Project ของเราไปที่ Terminal มันจะเป็นการสร้างหน้าต่างใหม่แล้ว cd ไปหา Directory ที่เราลากไปได้เลยแหละ)
ขั้นแรก เราจะติดตั้ง jquery กันก่อนโดยการพิมพ์คำสั่ง

    bower install jquery

ถัดมาก็ Install Bootstrap ก็คล้ายๆ เดิมก็พิมพ์

    bower install bootstrap

ทั้ง 2 คำสั่งเป็นการสั่งให้ bower install components ที่เราบอกชื่อมันไป มันจะเข้าไปหาใน Github และ Clone Git มาลงให้เราแบบอัตโนมัติกันเลยทีเดียว มันก็จะได้หน้าจอแบบด้านล่างนี่เลย (ตรง Progress มันอาจไม่ได้เยอะขนาดนี้นะ อันนี้เป็นเพราะเน็ตช้ามาก!!)

![bower_install3](./bower_install3.jpg)

ถ้าเราเข้าไปดูใน Project ของเรา เราจะเห็นว่ามี Folder ชื่อ bower\_components โผล่มา นั่นแหละมันคือที่อยู่ของพวก Components ที่เราโหลดมาทั้งหมด

    |- bower_components
    |-- jquery
    |--- dist
    |--- src
    |-- bootstrap
    |--- dist
    |--- font
    |--- grunt
    |--- js
    |--- less

เวลาเราจะใช้งานก็เหมือนเดิม แค่ Import เข้ามาใช้ในหน้าเว็บของเราเหมือนปกติได้เลย
นอกจากที่เราสามารถ Install Components ที่อยู่บน Github ได้แล้ว มันยัง Install จากที่อื่นได้ด้วยเพียงแค่เรามี Address มาให้มัน เช่นด้านล่างเป็นต้น

    bower install http://example.com/script.js


#### **Reference**
* [Bower][4]


[0]: https://nodejs.org
[4]: http://bower.io
