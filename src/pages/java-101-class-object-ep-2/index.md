---
title: "Java 101 - Class & Object (EP.2)"
image: "./java101ep2.jpg"
category: Tutorial
excerpt: "วันนี้เราจะมาเรียนรู้สิ่งนึงของ Java ที่เจ๋งคือ เรื่องของ Class และ Object"
date: 2014-12-22T16:10:23.000
author: arnondora
template: full-width
type: post
isFeatured: false
status: published
---

จากตอนที่แล้ว [EP.1][0] เราได้เขียนโปรแกรมเพื่อแสดงผลออกทางหน้าจอไปแล้ว
วันนี้เราจะมาเรียนรู้สิ่งนึงของ Java ที่เจ๋งคือ เรื่องของ Class และ Object
ผมจะพยายามเล่าให้เห็นภาพ สมมุติว่าเรากำลังจะสร้างบ้าน
เราจะต้องมีพิมพ์เขียวนั่นคือแบบบ้านว่า บ้านจะหน้าตาเป็นยังไง หน้าต่างวางตรงไหน ตรงไหนทำอะไรได้บ้าง พวกนี้เราจะเรียกมันว่า **Class** หรือพูดอีกอย่างก็คือ แบบแปลนของวัตถุในโปรแกรมเรา
ซึ่งในโปรแกรมมิ่ง Class จะประกอบไปด้วย

* **Attribute** - มันจะเป็นตัวบอกรูปร่างหน้าตาของ Class ว่ามันหน้าตาเป็นยังไงประมาณไหน เช่นบ้าน บ้านสีอะไร บ้านกี่ชั้น
* **Method** - อันนี้จะเป็นการบอกว่า Class เราทำอะไรได้บ้าง เช่นบ้านเราเปิดประตูได้มั้ย? เปิดหน้าต่างได้รึเปล่า เป็นต้น
หลังจากเราได้พิมพ์เขียวหรือ Class แล้ว เราจะนำพิมพ์เขียวของเรามาสร้างเป็นบ้าน บ้านที่เราสร้างเราจะเรียกว่า **Object** ซึ่ง Object ที่เราสร้างขึ้นมาจาก Class นั้นจะมีหน้าตาเหมือน Class เลย 100%
ถามต่อว่าเราจะใช้ Class สร้าง Object หลายๆอันจาก Class อันเดียวได้มั้ย ตอบเลยว่า **"ได้"**
นึกภาพง่ายๆครับ หมู่บ้าน เราเขียนพิมพ์เขียวอันเดียว แต่เราสามารถเอาพิมพ์เขียวอันเดียวมาสร้างบ้านได้หลายๆหลัง นี่ก็เหมือนกับเรื่องของ Class กับ Object ในโปรแกรมเป๊ะเลย
จบทฤษฏี ทีนี้มาที่เรื่องของโค๊ตกันบ้าง ใน Java **การประกาศ Class ง่ายมากๆ บอก Modifier ตามด้วย Class แล้ว ใส่ชื่อ** จบ ง่ายมาก


    public class name
    {
    Attribute Here...

    Method Here....
    }


เช่นๆ ผมสร้างไฟล์ ชื่อ **Student.java** ขึ้นมา ผมบอกว่า


    public class Student
    {
    String name;
    String surname;
    int year;
    int age;

    public void setData()
    {
    name = "Test";
    surname = "Class";
    year = 1;
    age = 18;
    }

    public void showData ()
    {
    System.out.println("Name: "+ name);
    System.out.println("Surname: " + surname);
    System.out.println("Year: " + year);
    System.out.println("Age: " + age);
    }
    }


จากโค๊ตด้านบน ผมมีคลาสชื่อ **Student** มี **Attribute**

* Name เป็น String ไว้เก็บชื่อ นศ.
* surname เป็น String อีกเช่นกัน ไว้เก็บนามสกุล นศ.
* year เป็น Integer ไว้กับชั้นปี
* age เป็น Integer อีกเช่นกัน ไว้เก็บ อายุ
จากที่เราเห็น **Attribute** มันคือการประกาศตัวแปรธรรมดา ซึ่งถ้าเราเอา **Class** นี้ไปสร้างเป็น Object แล้วเราสามารถเข้าถึงค่าพวกนี้ได้อย่างอิสระ อาจจะยังไม่เห็นภาพ ผมจะลองยกตัวอย่างดู
สมมุติผมเอา **Class** นี้ไปสร้างเป็น **Object** ชื่อ **Student1** กับ **Student2**
Attribute **Name** ของ **Student1** กับ **Student2** จะแยกออกเป็นอิสระต่อกัน เหมือนกับเราสร้างบ้านแล้วหลังแรกอยากให้มันมีสีเขียวกับอีกหลังมีสีฟ้า ก็ย่อมได้ แต่จริงๆแล้ว มันก็คือบ้านเหมือนกัน แต่ต่างกันแค่สีของบ้่านเท่านั้นเอง
แต่ก็อีกเราไม่ควรที่จะเข้าถึงตัวแปรโดยตรง เราจำเป็นที่จะต้องสร้าง **Method** ขึ้นมาเพื่อเปลี่ยนมัน เหมือนกับเรามีประตูในบ้าน แล้วเราบอกประตูว่า "เปลี่ยนสีให้หน่อยสิ" ซึ่งในความเป็นจริง ประตูเปลี่ยนสีเองไม่ได้ ถูกมั้ยครับ?
เราจึงต้องสร้าง Method ทาสีขึ้นมาเพื่อเปลี่ยนสีประตู เช่นเดียวกับโปรแกรม เราจะต้องกำหนด **Method** เพิ่ือจัดการกับ **Attribute** เหล่านี้
ทีนี้เรามาดูการสร้าง **Method** บ้าง


    Modifier Returntype Name (Argument)
    {
    //write sth here
    }


เราจะต้องใส่ **Modifier** แล้วตามด้วย **Return Type** ว่าเราต้องการให้ **Method** นี้ส่งกลับค่าเป็นอะไร เช่น Int,String,double เป็นต้น แล้วก็ใส่ชื่อ **Method** เข้าไป สุดท้ายตามด้วย **Argument** (เหมือนกับการสร้างฟังก์ชั่นในภาษา C เลยแต่เพิ่ม Modifier เข้ามาเฉยๆ) เช่นๆๆ


    public void showData ()
    {
    System.out.println("Name: " + name);
    System.out.println("Surname: " + surname);
    System.out.println("Year: " + year);
    System.out.println("Age: " + age);
    }


จากโค๊ตด้านบนผมสร้าง Method ชื่อ showData ขึ้นมา เรามาอ่านมันกัน
ผมบอกว่า **public** แปลว่า ผมจะเรียก **Method** นี้จากที่ไหนก็ได้ที่ผมสามารถเข้าถึง **Object** ที่สร้างจาก **Class** นี้ได้
**void** คือ **Method** นี้ไ**ม่ส่งค่าใดๆ**กลับไปเลย
**showData** คือ**ชื่อของ Method**
ส่วนด้านใน **Method** น่าจะรู้อยู่แล้วนะครับ ไม่รู้เชิญไปอ่าน [EP.1][1] ก่อนเลย
ตอนนี้ เราก็ได้คลาสชื่อ Student แล้ว ต่อมาเราจะมาสร้าง **Object** จาก **Class Student** กัน
ผมจะสร้างไฟล์ใหม่ชื่อ **main\_class.java** (มันจะอยู่ในโปรเจ็คเดียวกันกับ Student.java นะครับ) แล้วผมบอกว่า


    public class main_class
    {
    public static void main (String[] args)
    {
    Student test1 = new Student();
    test1.setData();
    test1.showData();
    }
    }


โค๊ตด้านบน ผมสร้าง **class** ชื่อ **main\_class** ขึ้นมา
แล้วสร้าง **method** ชื่อ main ขึ้นมาตัวนึง
บรรทัดลงมานี่คือการสร้าง Object แล้วครับ
**Student test1 = new Student();**
คือ ผมสร้าง **Object** ลอกแบบจาก **Class** ชื่อ **Student** ชื่อ **Test1** ขึ้นมา 1 ตัว
เพราะฉะนั้นผมสามารถเข้าถึง **Attribute** และ **Method** ของ Student ในชื่อของ test1 ได้
บรรทัดถัดมาผมบอกว่าให้ **test1** ทำ **Method** ชื่อ **setData** (ถามว่ามันทำอะไร อันนี้ไปดูด้านบน ไม่ก็โหลด Source Code ด้านล่างแล้วเปิดไฟล์ Student.java ขึ้นมานะ)
ถัดมาผมบอกให้มันทำ **Method** ชื่อ **showData**
เพราะฉะนั้น Output ที่ผมได้คือ


    Name: Test
    Surname: Class
    Year: 1
    Age: 18


แต่เดียวก่อน จริงๆแล้วเราสามารถสร้าง **Object** เป็น **Array** เลยก็ยังได้ โดย


    Student [] stu = new Student [5];


ใช้โค๊ตด้านบนนี้เลย ด้านบนผมสร้าง **Object** จาก **Class** ชื่อ **Student** เป็น **Array** มี 5 Elements (คล้ายๆกับเมื่อกี้เลยใช่มั้ยครับ แต่เราแค่เพิ่มปีกกาเพื่อบอกว่ามันคือ **Array** แล้วมีกี่ **Element** ในนั้นเท่านั้นเอง)
ส่วนการอ้างถึง เราสามารถอ้างได้เหมือน Array ปกติได้เลย เช่น **stu\[1\].setData();** เป็นต้น
สรุปวันนี้เราได้เรียนรู้**การสร้าง Class** ขึ้นมาโดย


    class ชื่อclass
    {
    Attribute Here

    Method Here
    }


แล้วนำ **Class ที่สร้างนั้นมาสร้างเป็น Object** โดย


    ชื่อclass ชื่อobject = new ชื่อclass


**แต่ถ้าเป็น array ก็ต้องใส่จำนวน Element เข้าไปด้วย**คือ


    ชื่อclass [] ชื่อobject = new ชื่อclass [จำนวน Elements]


**Source Code** : https://drive.google.com/folderview?id=0BwrPA9Miv4o2ZzZWYnc5Z01GV0U&usp=sharing

[0]: https://arnondora.wordpress.com/2014/12/21/java-101-lets-say-hello-world-ep-1/ "EP.1"
[1]: https://arnondora.wordpress.com/2014/12/21/java-101-lets-say-hello-world-ep-1/ "Java 101 – Let’s say Hello World!! (EP.1)"
