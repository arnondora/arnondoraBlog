---
title: "Twitter Bootstrap Basic - What is Bootstrap? (EP.0)"
image: "./bootstrap_basic_ep0.png"
category: Tutorial
excerpt: "หลังจากที่หายไปจากการเขียน Tutorial มานาน วันนี้กลับมาแล้ว กับหัวข้อที่หลายๆ คน Request เข้ามา ว่าอยากจะสร้างเว็บที่เป็น Responsive ง่ายๆ โดยที่ไม่ต้องเขียน Breakpoint เลยมีคนแนะนำให้เขียน Tutorial ของ Bootstrap ขึ้นมานั่นเอง"
date: 2015-08-15T09:49:57.000
author: arnondora
templete: full-width
type: post
isFeatured: false
status: published
---

หลังจากที่หายไปจากการเขียน Tutorial มานาน วันนี้กลับมาแล้ว กับหัวข้อที่หลายๆ คน Request เข้ามา ว่าอยากจะสร้างเว็บที่เป็น Responsive ง่ายๆ โดยที่ไม่ต้องเขียน Breakpoint เลยมีคนแนะนำให้เขียน Tutorial ของ Bootstrap ขึ้นมานั่นเอง

## Twitter Bootstrap คืออะไร ?
นั่นดิ มันคืออะไร ? เอาจริงๆ ใช้มาตั้งนานก็ยังไม่รู้เลยว่า สรุปแล้ว เราจะให้คำนิยามว่ามันเป็นอะไรดี แต่ถ้าเอาตามที่เจ้าของเขียนไว้ในเว็บว่ามันเป็น HTML, CSS, JS Framework หรือเรียกอีกอย่างว่า Front end Framework

## Front end Framework คืออะไร ?
เราจับมันแยกทีล่ะคำเลยดีกว่า ก่อนอื่นคำว่า Front end มันคือส่วนหน้าบ้านของเรา หรือว่า เป็นส่วนที่ User ของเราจะมองเห็นนั่นเอง ส่วนอีกคำ Framework มันเหมือนกับกรอบการทำงาน ถ้าสมมุติว่าเราไม่มี Framework เหมือนเมื่อก่อน พอหลายๆ คนเขียนโปรแกรมด้วยกัน ปัญหาที่จะเกิดขึ้นเลยคือ คนนึงก็เขียนอีกแบบนึง อีกคนก็เขียนอีกแบบนึง ทะเลาะกันตายเลย เพราะฉะนั้น Framework จึงเข้ามาช่วยให้เราทำงานด้วยกันได้ง่ายขึ้น เป็นระบบมากขึ้นโดยการกำหนด ข้อกำหนดต่างๆ เข้าไป

## ใน Bootstrap มีอะไรมาให้เราบ้าง ?
หลายอย่างเลยแหละ ตั้งแต่ Grid System, Base Element หรือพวก Style ของ Tag พื้นฐานต่างๆ เช่นพวก Form อะไรแบบนี้, Components ต่างๆ เช่นพวก Navigation, Pagination เป็นต้น และสุดท้ายคือ JS ต่างๆ

## มาติดตั้ง Bootstrap กัน
หลังจากที่เรารู้แล้วว่า Boostrap มันคืออะไร แล้วใช้ทำอะไร (ถ้าไม่รู้ก็กลับขึ้นไปอ่านข้างบนใหม่ ไล่แล้วไปชิ้วๆๆ) ถัดมาเราจะมาติดตั้งมันกัน
การใช้งาน Bootstrap นั้นไม่ยากเลย เพราะว่าเราแค่ Import มันเข้ามาในไฟล์หน้าเว็บของเราเพราะฉะนั้น เราสามารถติดตั้งเอาแบบง่ายๆ ได้อยู่ 2 วิธี

* ติดตั้งปกติ - ให้เราเข้าไปโหลดตัวไฟล์ของ Bootstrap เข้ามาก่อน หลังจากที่เราแตกไฟล์ออกมาแล้ว เราจะได้ 3 Folders ออกมานั่นคือ css , js และก็ font และหลังจากที่เราได้ไฟล์ของ Bootstrap เข้ามาแล้ว เราก็ต้อง Import มันเข้ามาในหน้าเว็บของเรา พร้อมทั้ง Import jquery เข้ามาผ่าน CDN

    <link rel="stylesheet" media="screen" href="bootstrap.min.css">
    <script src="bootstrap.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

วิธีนี้เหมาะสำหรับคนที่ต้องการ Custom ตัว Code ของ Bootstrap เพื่อให้มันทำงานได้ตามที่เราต้องการ
* ผ่าน CDN หรือ Content Delivery Network - วิธีนี้ง่ายมากๆ แต่ Custom อะไรไม่ได้เลย เพราะเราไม่ต้องไปโหลดไฟล์ js และ css ของ Bootstrap ผ่านทาง CDN ได้เลย เพียงแค่เราเอา Code ตรงนี้เข้าไปแปะก็ใช้ได้เลย

    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

สำหรับ EP ก็ขอจบเพียงเท่านี้ กำลังเริ่มสงสัยแล้วว่า Tutorial นี้จะยาวสักกี่ EP ดี ท่าทางจะเยอะ แต่ก็ช่างมันเถอะ EP ต่อไปจะเป็นเรื่องอะไรนั้นรอติดตามอ่านกันได้เลย!! และสำหรับใครที่อ่านมาแล้วยังไม่รู้จัก HTML, CSS และ JS แนะนำให้ไปอ่านล่วงหน้าก่อนมาอ่านพวกนี้นะ ไม่งั้น งง จริงจังมาก
