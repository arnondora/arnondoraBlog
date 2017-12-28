---
title: "Java 101 - Input & Output (EP.3)"
image: "./java101ep3.jpg"
category: Tutorial
excerpt: "จากเรื่องที่แล้วเราได้เรียนเรื่องของ Class กับ ** ไปแล้วว่ามันต่างกันยังไง ใช้งานยังไง"
date: 2014-12-23T21:22:47.000
author: arnondora
templete: full-width
type: post
isFeatured: false
status: published
---

จากเรื่องที่แล้วเราได้เรียนเรื่องของ **Class** กับ **Object** ไปแล้วว่ามันต่างกันยังไง ใช้งานยังไง
วันนี้เรื่องสั้นๆครับ นั่นคือเรื่องของ **Input & Output** นั่นเอง
ก่อนอื่น เราพูดถึงเรื่องของการเอาข้อมูลออกโดยใช้คำสั่งตามข้างล่างนี้เลย


    System.out.println(“Write Sth”);


คล้ายๆ **printf** บนภาษา C เลย เห็นมั้ย ไม่ยากอย่างที่คิด
แต่จริงๆแล้วคำสั่ง **Print **นั้นไม่ได้มีแค่ println แต่มันมีอีกเยอะเลย เช่น **printf **(ตัว printf ผมมีตัวอย่างให้ใน Source Code แล้ว) ส่วนตัวที่เหลือให้ลองไปดูใน Doc ของตัว Java
ถัดมาเป็นเรื่องของการเอาข้อมูลเข้าหรือ **Input **อันนี้จะซับซ้อนกว่า **Input **นิดหน่อย เราจะต้องสร้าง Object **นิดหน่อย **ก่อนอื่นเราจะต้อง **Import Library** เข้ามาก่อน โดยเพิ่ม


    Import java.util.Scanner;


ไว้บนหัวโปรแกรมก่อน หลังจากนั้น เราต้องมาสร้าง **Object** จาก **Class** ชื่อ **Scanner** กัน


    Scanner sc = new Scanner (System.in);


ถ้าจำไม่ได้ให้กลับไปอ่าน [EP.2][0] แล้วจะเข้าใจ โค๊ตด้านบนนี้ เราสร้าง **Object** ชื่อ **sc** จาก **Class Scanner** ขึ้นมา
หลังจากเราได้ **Object** ชื่อ **sc** เข้ามาแล้ว ทีนี้เราจะมาใช้ **Object** ตัวนี้กัน


    String name = sc.nextLine();


ด้านคือโค๊ตตัวอย่าง มาอธิบายโค๊ตกัน
เราสร้างตัวแปรชื่อ **name** ที่เป็น String ขึ้นมา แล้วให้ค่ามันคือ ให้ Object **sc** ไปรับค่าจาก Keyboard มาทั้งบรรทัด (อารมณ์เหมือนกับ gets() ในภาษา C เป๊ะเลย)

# แล้วถามต่อว่า เราจะรับค่าตัวเลขแค่ตัวเดียวทำยังไง?
ไม่ยากเลย แค่เปลี่ยนจาก nextLine เป็น nextInt เท่านั้นเองใช้ได้เหมือนกัน
สุดท้าย หลังจากใช้ Scanner เสร็จแล้วอย่าลืมปิดมันด้วยโดยเรียก Method close จากตัว Object Scanner ที่เราสร้าง ในที่นี้ผมใช้ชื่อ Object ว่า sc เพราะฉะนั้นโค๊ตควรจะเป็นอย่างด้านล่าง


    sc.close();


**Source Code :**[https://drive.google.com/folderview?id=0BwrPA9Miv4o2WmRERjg2ZGRrREk&usp=sharing][1]

[0]: https://arnondora.wordpress.com/2014/12/22/java-101-class-object-ep-2/
[1]: https://drive.google.com/folderview?id=0BwrPA9Miv4o2WmRERjg2ZGRrREk&usp=sharing
