---
title: "Java 101 - Exception Handling (EP.9)"
image: "./java101ep9.jpg"
category: "Tutorial"
excerpt: "2 เรื่องที่ผ่านมา เป็นเรื่องที่ค่อนข้างยากอยู่พอสมควร แต่วันนี้เป็นเรื่องสั้นๆ ง่ายๆ ไม่มึน งง"
date: 2014-12-29T14:37:22.000
author: arnondora
template: full-width
type: post
isFeatured: false
status: published
---

2 เรื่องที่ผ่านมา เป็นเรื่องที่ค่อนข้างยากอยู่พอสมควร แต่วันนี้เป็นเรื่องสั้นๆ ง่ายๆ ไม่มึน งง คล้ายจะเป็นลมเหมือน 2 เรื่องที่แล้ว
วันนี้เป็นเรื่องของการ จัดการกับ **Error** ก่อนหน้านั้นเราจะมาเข้าใจกับคำว่า Exception กับ Error กันก่อน
มาที่อันแรกก่อน นั่นคือคำว่า **Error** จริงๆแล้วมันก็คือข้อผิดพลาดนี่แหละ อาจ**เกิดจาก Syntax Error** ซึ่งความผิดที่เกิดจาก Syntax Error พวกเราก็น่าจะเคยเจอกันจนชินซะแล้ว (เหรอ?) ส่วน**อีกตัวคือ Logical Error** อันนี้แหละครับ ที่ตัว Compiler มันแจ้งเราไม่ได้เพราะมันตรวจได้แค่ว่า โปรแกรมที่เราเขียนนี้ Syntax ถูกรึเปล่า
ส่วนคำว่า **Exception** นั้นจะเกิดได้จากหลายสาเหตุ **(ที่ไม่ใช่ Logical Error กับ Syntax Error)** เช่นการ**หารด้วยศูนย์** หรือเปิดไฟล์แล้ว**หาไฟล์ไม่เจอ**เป็นต้น**(ส่วนอีกเรื่องของ Exception นั่นเข้าไปดูได้ใน Document ของ Java นะ มันเยอะอธิบายไม่หมด)**
ตัว Error เราแก้มันได้อยู่แล้วล่ะ แต่ Exception เนี่ยมันลำบากเพราะ Compiler ก็ให้ผ่าน แต่มันจะมีที่บางกรณีจะเกิด เพราะฉะนั้นเราจะต้องมีวิธีรับมือกับมัน
ในภาษา **Java** จะมี **Class** ที่ชื่อว่า **Exception** เอาไว้จัดการกับเรื่องแบบนี้อยู่แล้ว ซึ่งเราจะใช้มันร่วมกับคำสั่ง **Try Catch** อารมณ์ของมันจะเหมือนเราใช้**if...else** เลย เช่น ผมมีโค๊ตข้างล่างนี้ ผมบอกให้มันปริ้นค่าของ **x/y** ออกมา


    int x = 2;
    int y = 0;

    System.out.println(x/y);


ซึ่งถ้าเรา **Compile** มันก็ผ่าน แต่เวลารันออกมามันจะขึ้นว่า**java.lang.ArithmeticException** นั่นคือ **Exception** ที่เราเจอ แต่ถ้าเป็นผู้ใช้ทั่วไปก็คงไม่รู้ว่านี่คืออะไร (เอาจริงๆ คนเขียนเอง เขียนไปเขียนมายัง งง เลย) **ทีนี้เราจะมาดัก Exception ผ่าน Try... Catch กัน** ผมจะเอาโค๊ตข้างบนเมื่อกี้มาแก้นะ


    int x = 2;
    int y = 0;

    try
    {
    System.out.println(x/y);
    }
    catch (ArithmeticException error)
    {
    System.out.println("Can't Divied By Zero.");
    }
    finally
    {
    //this will be executed everytime.
    }


**ทีนี้โปรแกรมมันก็จะบอกและว่า Can't Divied By Zero ตามที่เราบอก** วิธีการทำงานของมันคือ มันจะเข้าไปทำใน try ก่อนแล้วถ้าเกิด Exception ขึ้นมันจะวิ่งเข้าไปหา Catch ที่ตรงกับ Exception ที่มันเจอและเก็บค่า Error ไปใน Object ชื่อ error แล้วมันจะทำงานในปีกกาของ Catch (ถ้ายัง งง ให้นึกว่า Exception ที่เกิดจาก Try เป็น If แล้วมันจะวิ่งเข้าไปหาเงื่อนไข (Else if) นั่นคือ catch นั่นเอง สุดท้าย มันจะเข้าไปทำใน finally ทุกครั้ง ย่ำว่า "ทุกครั้ง" **(finally ไม่จำเป็นต้องมีก็ได้นะ)**

## **เทคนิค**

* ถ้าไม่รู้ว่าจะ **catch exception** อะไรให้เขียนไปก่อนว่า **Exception** เพราะไม่ว่ามันจะเกิด **Exception** อะไรมันจะเข้าหมด เหมือน **else** เลย
* เราสามารถที่จะใส่ **throws Exception** ไว้หลัง บรรทัดตอนประกาศ Method ก็ได้ เวลามันเกิด **Exception** ใน **Method** มันจะเด้งออกเลยทันที เช่น


    public static void main (String [] args) throws Exception
    {
    }


* ใน catch ถ้าเราอยากจะรู้ว่าเกิด Exception ตรงไหนถ้าเราบอกว่า\[code language="java"\]
catch (Exception e)
{
System.out.println(e);
}
\[/code\]เราก็จะรู้ว่า มันเกิด **Exception** อะไร แต่ ไม่ได้บอกว่าตรงไหนบ้าง ซึ่งใน **Class Exception** จะมี **Method** นึงชื่อว่า **printStackTrace() เอาไว้ให้มันโชว์ว่า มันเกิด Exception จากตรงไหนของ Code กันแน่**
ทีนี้เรารู้แล้วว่า เราจะดัก **Exception** ยังไง ตอนนี้เราจะมาสร้าง **Exception** ใช้เองกัน ไม่ยาก ก่อนอื่นสร้าง **Class** ก่อน ซึ่งการที่ **Class** นี้จะเป็น **Exception** ได้ เราก็ต้องให้มันสืบทอดมาจาก **Class Exception** กันก่อน สำหรับตัวอย่างผมจะให้มันเช็คว่าผมลัพธ์เป็นเลขคู่มั้ย ถ้าเป็นเลขคี่จะให้มันเกิด **Exception**


    public class NotEvenException extends Exception //สร้าง Class ที่เป็น Class ลูกของ Class Exception
    {
    void checkval (int value)
    throws NotEvenException
    {
    if (value % 2 != 0) //ถ้าเป็นจริง
    throw new NotEvenException(); //ก็ให้เกิด Exception
    }
    }


อธิบายโค๊ตก่อน ตอนแรกผมบอกให้มันสร้าง **Class** ก่อนโดยที่เป็น**Class ลูก**ของ**Class Exception** จากนั้นสร้าง **Method** ขึ้นมาให้มันเกิด Exception ก็ต่อเมื่อใน **if** เป็นจริง แต่นี้เอง เวลาเราใช้ เราก็แค่ สร้าง **object** จาก **Class** ที่เราสร้างมา แล้วก็ให้มันเช็คใน **Try** ส่วนใน **Catch** ก็ ใส่ชื่อ **Exception** ที่เราสร้างได้เลย **(ผมจะเอา Exception เลขคี่เมื่อกี้มาใช้นะ)**


    public static void main (String [] args)
    {
    int a = 4;
    int b = 3;

    NotEventException err = new NotEventException ();

    try
    {
    err.checkval(a/b);
    }
    catch (NotEventException)
    {
    System.out.println("Result isn't an event number");
    }
    }


ไล่ตามโค๊ตเลยนะ ก่อนอื่นเราก็ สร้าง **Object** จาก **Class Exception** ที่เราสร้างก่อน แล้วเรามาเขียน **Try Catch** แล้วก็ให้มัน **Try** เรียก **Method checkval** ที่มาจาก **class exception** ที่เราสร้าง จากใน **Class Exception** ที่เราสร้าง เราบอกว่าถ้า มันหารแล้วไม่เป็นเลขคู่ให้ โยน **Exception** ออกมา มันก็จะไปเข้ากับ **Catch** พอดีเลย แล้ว มันก็จะทำใน **Catch** และก็เสร็จ จบกระบวนการ
**เห็นมั้ยครับ ไม่ยากเลย หลักๆวันนี้ก็เรียนรู้เรื่องของ Exception กับ Error, การดัก Exception ด้วย try catch และสุดท้ายคือการสร้าง Exception** ใช้เอง สำหรับ EP. นี้ก็จบเพียงเท่านี้ สวัสดีครับ อ่อลืมบอกไปว่า **EP หน้าจะเป็น EP สุดท้ายของซีรีส์ Java 101 แล้วนะ**
**Source Code :** [https://drive.google.com/folderview?id=0BwrPA9Miv4o2T3BBMDczNjFzcE0&usp=sharing][0]

[0]: https://drive.google.com/folderview?id=0BwrPA9Miv4o2T3BBMDczNjFzcE0&usp=sharing
