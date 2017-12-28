---
title: "Twitter Bootstrap Basic – All About Table! Just like old times! (EP.2)"
image: "./bootstrap_basic3.png"
category: Tutorial
excerpt: "กลับมาแล้วกับ EP.2 เมื่อตอนที่แล้ว เราก็ได้พูดถึงเรื่อง Grid ซึ่งเป็นอะไรที่ช่วยทำให้เราจัดหน้าเว็บของเราได้ง่าย และสวยขึ้นเยอะเลย"
date: 2015-08-25T12:44:01.000
author: arnondora
templete: full-width
type: post
isFeatured: false
status: published
---

กลับมาแล้วกับ EP.2 เมื่อตอนที่แล้ว เราก็ได้พูดถึงเรื่อง Grid ซึ่งเป็นอะไรที่ช่วยทำให้เราจัดหน้าเว็บของเราได้ง่าย และสวยขึ้นเยอะเลย อีกทั้งมันยังเป็น Responsive อีกด้วย แต่ในวันนี้เราจะไม่ได้มาคุยกันเรื่อง Grid อีกแล้ว แต่วันนี้เราจะมาพูดถึงกันในอีกหัวข้อนึง นั่นคือ Table
ทบทวนกันหน่อย ว่าเราจะสร้าง Table กันได้ยังไง?
ใน HTML เวลาเราจะสร้าง Table เราก็ต้องเรียก <table\> ออกมาก่อน จากนั้นใน <table\> ก็ต้องมี <tr\> เพื่อบอกแถว และ <td\> เพื่อบอกหลัก เช่น

    <table>
        <tr>
           <td>ID</td>
           <td>Name</td>
        </tr>

        <tr>
            <td>001</td>
            <td>Person 1</td>
        </tr>

        <tr>
            <td>002</td>
            <td>Person 2</td>
        </tr>
    </table>

ผลที่ได้ก็จะออกมาเป็น

    ID  Name
    001 Person 1
    002 Person 2

จากที่เราเห็นมันก็จะเป็นตารางโง่ๆ อันนึงเลย ทีนี้ ตัว Bootstrap มันก็มี Table มาให้เราใช้เช่นกัน และมีหลายแบบมากๆ เราจะมาค่อยๆ เจาะดูทีล่ะแบบเลยล่ะกันว่ามีแบบไหนบ้าง
**แบบง่ายๆ ปกติ**

![bootstrap_table01](http://www.arnondora.in.th/wp-content/uploads/2015/08/bootstrap_table01.png)

แบบนี้ก็เป็นแบบพื้นฐานสุดเลย มีขอบมีอะไรให้ ก็แค่เรียก Class Table ออกมา

    <table class = "table">
    ...
    </table>

## Striped Row

แบบนี้ก็ Upgrade จากแบบที่แล้วหน่อย แต่จะมีสีขาวและสีเทาสลับกัน
![bootstrap_table02](http://www.arnondora.in.th/wp-content/uploads/2015/08/bootstrap_table02.png)

    <table class = "table table-stripped">
    ...
    </table>

เอาคร่าวๆ ก็ประมาณนี้เลย ส่วนแบบที่เหลือ เราสามารถเข้าไปดูได้ใน Document ของ Bootstrap ได้เลย แต่มาดูกันอีกอย่างนึงกันดีกว่า เพราะว่า เราสามารถใส่สีตามสถานะของตารางได้ด้วยล่ะ

![bootstrap_table03](http://www.arnondora.in.th/wp-content/uploads/2015/08/bootstrap_table03.png)

อย่างที่เราเห็นเลย จะมีสี เขียว ฟ้า เหลืองและแดง มันเป็นตามสถานะ เราสามารถใส่สีพวกนี้ได้โดยการเรียก Class ตามนี้

    <tr class="active">...</tr>
    <tr class="success">...</tr>
    <tr class="warning">...</tr>
    <tr class="danger">...</tr>
    <tr class="info">...</tr>

โดย active จะเป็นการใส่สีเทา success จะเป็นสีเขียว warning เป็นสีเหลือง danger เป็นสีแดง และ info เป็นสีฟ้าาาา อ ตารางมันก็จะมีประมาณนี้ล่ะ ไม่มีอะไรเลย ส่วนพวกที่เหลือแนะนำให้เข้าไปอ่านใน Document กันเอานะครับ....
