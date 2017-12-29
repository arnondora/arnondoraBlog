---
title: "Java 101 – Inheritance & Encapsulation (EP.7)"
image: "./java101ep7.jpg"
category: Tutorial
excerpt: "เรื่องที่จะอธิบายในวันนี้นั้นจะใช้ความรู้ของเรื่อง OOP ค่อนข้างเยอะ เพราะฉะนั้นถ้าใครยังมึนงงกับเรื่องนี้อยู่"
date: 2014-12-27T14:41:03.000
author: arnondora
template: full-width
type: post
isFeatured: false
status: published
---

**คำเตือน!!** เรื่องที่จะอธิบายในวันนี้นั้นจะใช้ความรู้ของเรื่อง OOP ค่อนข้างเยอะ เพราะฉะนั้น**ถ้าใครยังมึนงงกับเรื่องนี้อยู่ โปรดกลับไปอ่านเรื่อง [OOP101][0] ก่อนที่จะมาเรียน เรื่องนี้นะครับ**
**ปล. นี่คือเขียนรอบ 2 แล้ว รอบแรก Save ไว้หายหมดเลย TT... อาจจะชุ่ยหน่อยนะครับ**
ใครที่อ่านมาแล้ว เชิญทางนี้เลย วันนี้เราจะมาพูดถึงสมบัตินึงของ OOP ที่เราเรียกว่า Inheritance และ Encapsulation
เอาที่ล่ะอัน Inheritance หรือภาษาไทยเรียกตามตัวเลยว่า การสืบทอด -\> **มันคือการที่ Class นั้นสืบทอดมาจากอีก Class นึงโดยที่เราจะได้ Class ใหม่ที่มี Attribute และ Method ที่เหมือน Class แม่ทุกประการและเรายังสามารถเพิ่ม Attribute และ Method ได้อีกด้วย **ถ้ามองภาพไม่ออกอีกดูนี่


    public class animal
    {
    String name;

    public void walk ()
    {
    System.out.println("I'm walking.");
    }

    public void eat ()
    {
    System.out.printf("I'm eating");
    }
    }


ผมสร้าง **Class animal** ขึ้นมาโดยที่มี **Attribute** ชื่อ **name** 1 ตัว และมี **Method** 2 อันคือ **walk()** กับ **eat()**
หลังจากนั้นผมจะสร้างอีก **Class** นึงขึ้นมา ให้ชื่อว่า **dog** ล่ะกัน


    public class dog extends animal
    {
    private String owner_name;

    dog ()
    {
    owner_name = "";
    }

    dog (String in_name)
    {
    owner_name = in_name;
    }

    public void foo ()
    {
    System.out.println(name + " foo foo");
    }

    public void show_name ()
    {
    System.out.println(owner_name);
    }
    }


**Class dog** ที่สร้างมาใหม่นั้น ผมให้มันสืบทอดจาก**Class animal** อีกทีหนึ่ง เพราะฉะนั้น **Attribute** ของ **Class dog** จะมี **name** ที่มาจาก **Class animal** และ **owner\_name** ที่มาจากตัว **Class dog** เอง
ส่วน Method ก็เช่นกัน ก็จะมี walk() และ eat() ที่มาจาก Class animal และมี foo(),show\_name() ของตัว Class dog เอง (ส่วน method อีก 2 อันใน Class Dog ไม่พูดถึงล่ะกัน อันนั้นคือ constructor ในเรื่องนี้จะไม่เกี่ยวเท่าไหร่)
**สรุปแล้ว การสืบทอด คือการที่ Class สามารถเข้าถึง Method และ Attribute ของ Class แม่ได้ ซึ่งการเขียนคือใช้ Keyword คำว่า extends (อย่าลืมเติม s ด้วยล่ะ ไม่งั้น Error) ใส่ไว้หลังชื่อ Class ลูก แล้วตามด้วยชื่อของ Class แม่**
**อีกเรื่องย่อยของ Inheritance นั่นคือ Final Class**
**Final Class - คือ Class ที่เราบังคับว่าไม่ให้มัน Inheritance ไปต่อได้** ไม่ยากเพียง**ใส่ Keyword คำว่า final ไว้หน้า Class** ซะก็จบ เพราะฉะนั้นมันจะทำให้ **Class** ที่เราใส่ **final** ไปนั้นไม่สามารถเป็น **Class แม่**ได้ **(ถ้ามองเป็น Tree เจ้า Class ที่เราใส่ final เข้าไปมันก็จะเป็น leaf โดยทันที)** เช่น


    final class puddle extends dog
    {
    private int id;

    puddle ()
    {
    id = 0;
    }

    puddle (int in_id)
    {
    id = in_id;
    }

    public void show_id ()
    {
    System.out.println("Puddle Id " + id);
    }
    }


ผมสร้าง **Class** ชื่อ **puddle** ขึ้นมาอันนึงแล้วบอกว่าให้มันเป็น **Class** ลูกของ **Class dog** แล้วก็ให้มันเป็น **Final Class** อีกโดยมี **Attribute** เพิ่มเติมอีกคือ **id** ที่เป็น **integer** หรือจำนวนเต็ม และมี **Method** ชื่อ **show\_id** อีกตัว
ถ้าเราลองดูครับ ลองเขียน Class ใหม่อีกตัวนึงแล้วต่อท้ายไปว่า extends puddle มันจะ error โดยทันที เพราะว่า Class puddle นั้นเป็น Final Class ไปแล้วทำให้มันเป็น Class แม่ไม่ได้อีกแล้ว... ยาวๆไป (ไม่น่าเกี่ยวนะไอ้ยาวๆไปเนี่ย)
อีกนิดนึง เกือบลืมแล้วคือเรื่องของ **Override Method
Override Method คือ Method ที่มีชื่อเหมือนกับ Method ที่อยู่ใน Class แม่ ถ้าเราสร้างมันมาใน Class ลูกเวลาเราเรียกใช้ Method นี้ผ่าน Object ที่สร้างจาก Class ลูก เราจะไปเรียก Method ที่อยู่บน Class ลูกแทน แต่ในเวลาเดียวกันถ้าเราสร้าง Object จาก Class แม่เวลาเราเรียก Method มันจะไปเรียกที่ Class แม่โดยตรง **เช่น****


    public void walk ()
    {
    System.out.println("Dog is walking.");
    }
    [/code]

    ผมสร้าง **Method** นี้ใน **Class dog **แล้วเวลาผมบอกใน main ว่า

    [code language="java"]
    public static void main (String [] args)
    {
    Dog d1 = new Dog ();
    System.out.println(d1.walk());
    }


**Output** ที่ออกมาจะเป็น **Dog is walking. **แทนที่จะเป็น **I'm walking.** เหมือนใน **Class animal** ที่เป็น **Class แม่ของ Class dog**
อีกเรื่องคือเรื่องของ **Encapsulation**
**Encapsulation คือกลไกตัวหนึ่งที่เป็นตัวกำหนดสิทธิในการเข้าถึง โดยเราจะไม่ให้ตัว Object สามารถเข้าถึง Attribute ได้โดยตรงจะต้องวิ่งผ่าน Method เท่านั้น**
**ถามว่าแล้วจะควบคุมยังไง?**
ไม่ยาก ถ้าเราจำเรื่อง **Modifier** ได้ ถ้า **Attribute** ไหนที่ใช้แค่ใน **Class** ตัวเองก็ใส่เป็น **private** ซะก็จบ ส่วนอันไหนที่ Class ลูกต้องใช้ก็ใส่เป็น **protected** ซะก็จบ เช่น ใน Class dog ผมแก้


    String owner_name;
    [/code]

    เป็น

    [code language="java"]
    private String owner_name;


เราก็จำกัดเรื่องของการเข้าถึงได้แล้ว มีแค่นี้เลยเรื่องของ **Encapsulation** ทีนี้มันก็อยู่ที่เราเขียนแล้วว่า เราจะเขียนแล้วออกมาเป็นยังไง อยู่ที่การออกแบบของตัวเราครับ
**ถามว่าแล้วไอ้ที่ว่ามายาวๆเนี่ยมันสำคัญยังไงล่ะ?**
พวกนี้เป็นสมบัติที่มากับภาษาที่เป็น OOP มันทำให้เราเขียนโค๊ตสั้นลงเยอะเลยครับ เช่นผมมี Object ตัวหนึ่งแล้วมี Class ลูกสัก 100 ตัว นั่นคือผมเขียนโค๊ตน้อยลงไปเท่ากับ จำนวนบรรทัด Class แม่ คูณด้วย 100 เลยนะ และยังป้องกันความผิดพลาดที่จะเกิดได้ง่าย เช่นวันนึงผมเขียนผิดอุ๊ย! ไปเล่นกับ Class แปลกๆทำให้โปรแกรมรวนไปหมด OOP นั้นออกแบบมาเพื่อให้มัน Scale ได้ง่าย โปรแกรมันจะออกแบบเป็นส่วนๆ เวลาเราจะ Extend โปรแกรมเราออกไป ก็จะง่ายมากๆเลย แค่เขียน Module เพิ่มแล้วก็เชื่อมต่อกับ Module ตัวเก่าเท่านั้นเอง ไม่ยากเลย มันทำให้การเขียนโปรแกมที่ใหญ่ได้ ง่ายขึ้น และเร็วขึ้นนั่นเอง.
สุดท้ายของวันนี้และ **เรื่องนี้ถือว่าเป็นเรื่องที่สำคัญมากเรื่องนึงของการเขียน Java เพราะว่า Java เป็นภาษาที่ค่อนข้าง OOP จ๋าอยู่ เพราะฉะนั้น เรื่องนี้ควรจะแม่นนะครับ** ถ้ามีคำถามก็เมลมาก็ก็เฟสมาก็ได้นะครับ จะพยายามตอบให้
**Source Code :** [https://drive.google.com/folderview?id=0BwrPA9Miv4o2THBWeFNYQ1ZPaHc&usp=sharing][1]

[0]: https://arnondora.wordpress.com/2014/12/18/oop-101-what-is-oop/ "OOP 101 – What is OOP?"
[1]: https://drive.google.com/folderview?id=0BwrPA9Miv4o2THBWeFNYQ1ZPaHc&usp=sharing
