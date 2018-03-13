---
title: "Java 101 - ว่าด้วย Thread (EP. พิเศษอีกแล้ว เพราะคนเขียนอยากเขียน)"
image: "./java101signthread.png"
category: Tutorial
excerpt: "วันนี้ก็อยากเขียนอีกแล้ว เรื่องนี้มีหลายคนถามอยู่เหมือนกันว่า ทำยังไง วันนี้ผมเลยจะมาพูดถึงมันกัน นั่นคือเรื่องของ Thread นั่นเอง"
date: 2015-01-03T12:14:43.000
author: arnondora
template: full-width
type: post
isFeatured: false
status: published
---

วันนี้ก็อยากเขียนอีกแล้ว เรื่องนี้มีหลายคนถามอยู่เหมือนกันว่า ทำยังไง วันนี้ผมเลยจะมาพูดถึงมันกัน นั่นคือเรื่องของ **Thread** นั่นเอง

## Thread คืออะไร?
มันคือการทำงานหลายๆงานพร้อมๆกัน ถ้าเราเขียนปกติ มันก็จะทำงานจากบนลงล่าง แต่ถ้าเราเขียนโปรแกรมให้มันทำงานแบบ **Multitasking** ก็จะทำให้โปรแกรมของเรานั่นมีประสิทธิภาพมากขึ้น ซึ่งใน Java ที่เป็นภาษาที่เจ๋ง คือเราสามารถกำหนดให้ **Object** ของ **Class** อะไรก็ได้ ทำงานแบบ thread หรือนั่นก็คือ ทำพร้อมกันนั่นเอง
ซึ่งใน **Java** เราก็มีหลายวิธีในการทำงานกับ **Object** **Thread** แต่วันนี้ขอแค่ยกตัวอย่างมาสักวิธีนึงก่อนล่ะกัน

    public static void startThread (final String name)
    {
        Runnable runner = new Runnable ()
        {
        };
    }

แล้วใน **Method** **startThread** ผมจะ **Implement** **Interface** ที่ชื่อ **Runnable** **(ใน Java การทำงานกับ Thread เราสามารถทำงานผ่าน Interface โดยใช้ Interface ที่ชื่อว่า Runnable แต่ถ้าต้องการใช้ Object มันต้องใช้ Object ที่ชื่อว่า Thread) มีปีกกาเปิดปิด แล้วอย่าลืมใส่ semi-colon ด้วยล่ะ**

    public static void startThread (final String name)
    {
        Runnable runner = new Runnable ()
        {
        int value = i;
        try
        {
            Thread.sleep(100);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        System.out.println("Item Thread " + name + " (value = " + value + " )");
         new Thread (runner).start();
    }


อาจจะ งง นิดนึง งั้นขออธิบายโค๊ตกันก่อนเลย ใน **runnable** ผมประกาศตัวแปรมาตัวนึง แล้วสั่งให้มันหยุดทำงาน 100 มิลลิวินาที แต่การใช้ **Method Sleep** ที่อยู่ใน**Class Thread** จะต้องใช้ **Try Catch** ด้วย ไม่งั้นมันจะไม่ยอม แล้วก็สั่งให้มันปริ้นค่าออกทางหน้าจอ สุดท้าย เราก็สร้าง **Thread** แล้วสั่งให้มันทำงานโดยใช้ **Method** ชื่อ **Start**

    public static void main (String [] args)
    {
        startThread("A");
        startThread("B");
        startThread("C");
    }

และใน **Main** ผมก็ให้มันสร้าง **Thread** จาก **Method startThread** ที่เราสร้างกันเมื่อกี้ขึ้นมา ซึ่งผลลัพธ์ก็จะได้ประมาณนี้

    Item Thread B (value = 0 )
    Item Thread C (value = 0 )
    Item Thread A (value = 0 )
    Item Thread B (value = 1 )
    Item Thread A (value = 1 )
    Item Thread C (value = 1 )
    Item Thread C (value = 2 )
    Item Thread B (value = 2 )
    Item Thread A (value = 2 )
    Item Thread C (value = 3 )
    Item Thread A (value = 3 )
    Item Thread B (value = 3 )
    Item Thread A (value = 4 )
    Item Thread B (value = 4 )
    Item Thread C (value = 4 )
    Item Thread B (value = 5 )
    Item Thread A (value = 5 )
    Item Thread C (value = 5 )
    Item Thread A (value = 6 )
    Item Thread C (value = 6 )
    Item Thread B (value = 6 )
    Item Thread C (value = 7 )
    Item Thread B (value = 7 )
    Item Thread A (value = 7 )
    Item Thread B (value = 8 )
    Item Thread A (value = 8 )
    Item Thread C (value = 8 )
    Item Thread A (value = 9 )
    Item Thread C (value = 9 )
    Item Thread B (value = 9 )
    Item Thread A (value = 10 )
    Item Thread C (value = 10 )
    Item Thread B (value = 10 )

**จริงแล้วในเรื่องของ Thread มันจะมี Lifecycle ของมันด้วย เรามาดูกัน**
![](http://www.somanyword.com/wp-content/uploads/2014/03/java-concurrency.gif)
**ภาพที่เห็นด้านบนนั้นเป็น Diagram ที่แสดงให้เห็นถึงช่วงชีวิตของ Thread โดยใน Thread มันก็จะมีสถานะของมัน**

* **New (Start)** - เป็นสถานะแรกที่เราสร้าง **Thread** ขึ้นมา ก่อนจะมีการเรียกใช้ **Method** ชื่อ **start()**
* **Runnable** - เป็นสถานะที่เรียกว่าพร้อมทำงาน โดยมันจะเป็นสถานะที่เกิดจากเมื่อ **Thread** ทำงานเสร็จแล้วหรือถูก **Blocked**
* **Blocked** - สถานะนี้จะเกิดจากการที่ **Thread** นั่นอยู่ในสถานะ **Running** แล้วเราสั่ง **Blocked** ซึ่งอาจเกิดขึ้นโดยการเรียกใช้ **Method wait(),suspend(),sleep()**
* **Dead** - เป็นสถานะเมื่อ **Thread** นั้นได้รับ **Method run()** แล้วอยู่ในสถานะ **Running** และมีการส่ง **Exception** กลับมา **(ง่ายๆคือเจอ Exception นั่นเอง)**
ต่อเนื่องจากเมื่อกี้ เรามาพูดถึง **Method ของ Thread กันบ้าง**

* **run() -** เป็น **Method** ที่ถูกเรียกใช้เพื่อให้ **CPU** รันโปรแกรมใน **Thread**
* **start() -** เป็น **Method** เพื่อทำให้ **Thread** เข้าสู่สถานะ **Runnable**
* **suspend() -** เป็น **Method** ที่ใช้หยุดการทำงานของ **Thread** **Method นี้ไม่แนะนำให้ใช้เพราะอาจจะเกิด deadlock ได้** **(เรื่อง deadlock เดียวจะอธิบายให้ข้างล่างเน้อ)**
* **resume() -** เป็น **Method** ที่ทำให้ **Thread** นั่นกลับมาสู่สถานะ **Runnable** อีกครั้งหลังจาก อยู่ในสถานะ **dead** หรือ **blocked**
* **sleep() -** เป็น **Method** ที่ทำให้ **Thread** ที่อยู่ในสถานะ **Running** หยุดทำงานเป็นเวลามิลลิวินาที
* **isAlive() -** เป็น **Method** ที่เอาไว้เช็คว่า Thread นี้ยัง อยู่ในสถานะ **Running** อยู่รึเปล่า
และเรื่องสุดท้าย เราจะพูดถึงอีก **Keyword** นึงที่เกี่ยวกับเรื่องของ **Thread** นั่นคือ **synchronized**
**synchronized จะทำให้ Thread หยุดทำงานชั่วคราวเพื่อให้ อีก Thread ทำงานให้เสร็จก่อนแล้วจึงค่อยทำอีก Thread ที่ยังไม่เสร็จในตอนแรก**

    public synchronized void hello ()
    {
    }

ซึ่งในเรื่องของ **Keyword synchronized** ก็จะมี **Method** ที่เกี่ยวข้องอีก นั่นคือ **wait()** มันจะทำให้ **Method** ที่อยู่ในสถานะ **Running** กลับมาเป็นสถานะ **Runnable** เพื่อรอให้ **Thread** ตัวอื่นๆส่ง **Method** **notify()** หรือ **notifyAll()** มาให้

## Deadlock คืออะไร
มันคือกรณีที่ **Thread** ทั้งหมดไม่ได้อยู่ในสถานะ **Running** อยู่เลยสักตัว ทำให้ในโปรแกรมไม่มีการทำงานอะไรเกิดขึ้น
**Source Code :** [https://drive.google.com/folderview?id=0BwrPA9Miv4o2QTAxeWZVemJDZGM&usp=sharing][0]


[0]: https://drive.google.com/folderview?id=0BwrPA9Miv4o2QTAxeWZVemJDZGM&usp=sharing
