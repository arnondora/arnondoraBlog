---
title: "Java 101 - Method & Constructor (EP.6)"
image: "./java101ep6.jpg"
category: Tutorial
excerpt: "เมื่อวานเราได้เรียนเรื่องของ String StringBuffer และ StringBuilder ไปแล้ว"
date: 2014-12-26T13:56:33.000
author: arnondora
templete: full-width
type: post
isFeatured: false
status: published
---

เมื่อวานเราได้เรียนเรื่องของ String StringBuffer และ StringBuilder ไปแล้ว
วันนี้ขอย้อนกลับไปใน EP.2 หน่อยล่ะกัน เพราะในนั้นไม่ได้เจาะลึกอะไร
วันนี้เราจะมาเจาะเรื่องของ Method กัน
ต่อจาก [EP.2][0] ที่เราได้รู้ว่า Class จะมี Attribute และ Method
จริงๆถามก่อนว่า **Method คืออะไร?**
Method จริงๆแล้วมันก็**คือ ชุดคำสั่งที่ถูกสร้างขึ้นมาเพื่อทำอะไรตามที่เราสั่ง** อารมณ์**เหมือนกับ Function ใน Structured Programming** เลย
แต่จริงๆแล้ว Mehtod ก็มันก็มีประเภทของมันเหมือนกัน
ก่อนอื่น ผมจะสร้าง Class ที่ชื่อว่า Employee แล้วก็สร้าง Attribute ชื่อ นามสกุล เงินเดือน แล้วก็ระยะเวลาที่ทำงานมา ก่อนล่ะกัน


    public class Employee
    {
    String name;
    String surname;
    double salary;
    double work_month;
    }


จากเดิมเวลาเราสร้าง Method ขึ้นมาสักตัว Form มันจะต้องเป็น


    [modifier] return_type MethodName ([parameter])
    {
    return sth;
    }


เวลาเรียกเราก็สามารถเรียกได้ดังนี้


    object_name.methodname([argument]);


ถูกมั้ยครับ เพราะฉะนั้นถ้าเราต้องการส่งค่าอะไรไปให้ Method เราก็ต้องใส่ argument ที่ต้องส่งไปด้วย
กลับกัน ถ้าเรารับข้อมูลกลับมาก็ต้องเอาตัวแปรมารองรับข้อมูลเช่นกัน
หลายๆคนอาจ งง ที่ผมเขียนมาเมื่อกี้ว่า **Parameter กับ Argument มันต่างกันยังไง ไม่สิก่อนหน้านั้นมันคืออะไร**
เอาง่ายๆครับ **Argument** มันคือค่าที่ส่งไปยัง Method หรือ Function เลยครับง่ายๆ
ส่วน **Parameter** คือตัวแปรที่คอยรับค่า Argument ที่เข้ามาใน Method
ถัดมา เรามาดูกันว่า Method มันมีกี่ประเภทอะไรบ้าง

* **Instance Method** - คือ Method ธรรมดาสามัญชนทั่วไปที่เราสร้างนั่นเลยครับ
* **Static Method** - คือ Method ที่สรามารถเรียกได้โดยไม่ต้องสร้าง Object เช่นที่เราเห็นบ่อยๆคือ main นั้นเอง วิธีใส่ก็ใส่คำว่า "static" ไว้หลัง modifier ซะก็จบเรื่อง
* **Overloading Method** - คือ Method รูปแบบพิเศษที่มีคุณสมบัติ **Polymorphism (ถ้าใคร งง เชิญไปอ่าน [OOP101][1] ก่อนเลย)** เราสามารถสร้าง Method ชื่อเดียวกันแต่ Parameter ที่เอามารับจะไม่เหมือนกันได้ เช่น


    public double cal_salary (double month)
    {
    return salary*month;
    }

    public double cal_salary ()
    {
    return salary*work_month;
    }


จากที่เห็นข้างบนเราจะเห็นว่า เฮ้ย เรามี **Method** 2 อันชื่อเดียวกันเลย แต่ต่างกันตรงที่ **Parameter** ไม่เหมือนกัน อันนึงต้องรับค่า เดือน เข้ามา กับอีกอันไม่ต้องรับ แต่แหละครับคือจุดที่แตกต่างกัน ถ้าเวลาเราเรียกแล้วเราป้อน Argument มามันก็จะไปเรียก Method อันแรก ตรงข้ามถ้าเราไม่ให้อะไรมัน มันก็จะไปเรียก **Method** อันที่ 2 มาแทน
* **Constructor Method** - เป็น **Method** พิเศษอีกเหมือนกัน ทั้งพิเศษในหน้าที่คือ ตามชื่อเลย มันจะเป็นตัว **Intial** ค่าให้กับ **Object** และยังพิเศษในชื่ออีก คือ ชื่อมันจะตามชื่อของ **Class** เป๊ะเลย เช่น (สมมุติผมมี **Class Employee**)


    Employee ()
    {
    name = &quot;&quot;;
    surname = &quot;&quot;;
    salary = 0;
    work_month = 0;
    }


จากที่เห็น เมื่อเราสร้าง **Object** จาก **Class Employee** โปรแกรมมันจะไปเรียก **Constructor Method** มาทันที (ถ้ามี) งงล่ะสิว่ามันไปเรียกเอาตอนไหน จำตอนที่เราสร้าง **Object** ได้มั้ยครับ สมมุตินะ


    Employee emp1 = new Employee();


เห็นคำว่า **Employee()** นี่มั้ยครับ นี่แหละครับคือเราสั่งให้มันไปเรียก **Constructor**
**ถามว่าไม่เรียกได้มั้ย?** ตอบเลยว่า ไม่ได้ครับ **เพราะมันเป็น Syntax บังคับ**
* **Overloading Constructor Method - **เราสามารถสร้าง Constructor หลายๆอันก็ได้เหมือนที่เราสร้าง Overloading Method เลยครับ อันแรกอาจจะแค่ Intital ค่าเฉยๆ แต่อันที่ Overload ออกมาอาจจะทำให้กำหนดค่าไปก็ได้เช่น


    Employee ()
    {
    name = &quot;&quot;;
    surname = &quot;&quot;;
    salary = 0;
    work_month = 0;
    }

    Employee (String in_name, String in_surname, double in_salary , double in_work_month)
    {
    name = in_name;
    surname = in_surname;
    salary = in_salary;
    work_month = in_work_month;
    }


เพราะฉะนั้น เวลาเราสร้าง **Object** เราก็จะสามารถกำหนดค่าของ **Attribute** ลงไปได้เลย (จริงๆแล้วเราจะได้อะไรก็ได้เลย แล้วแต่เราเลย) วิธีสร้างก็เหมือนเดิม แต่ในตอนที่เรียก Employee() ก็ต้องใส่ **Argument** ลงในวงเล็บด้วย


    Employee emp2 = new Employee (&quot;Hello&quot;,&quot;World&quot;,20000,12);


เป็นต้น และนี่ก็จบแล้วเรื่องของ Method กับ Constructor เห็นม่ะ ไม่ยากเลย ไม่เข้าใจตรงไหนก็เมลมาถามได้ ไม่ก็เฟสมาก็ได้นะ บายๆ
**Source Code : **[https://drive.google.com/folderview?id=0BwrPA9Miv4o2a3NxbVU1OElhNDg&usp=sharing][2]

[0]: https://arnondora.wordpress.com/2014/12/22/java-101-class-object-ep-2/ "Java 101 – Class & Object (EP.2)"
[1]: https://arnondora.wordpress.com/2014/12/18/oop-101-what-is-oop/ "OOP 101 – What is OOP?"
[2]: https://drive.google.com/folderview?id=0BwrPA9Miv4o2a3NxbVU1OElhNDg&usp=sharing
