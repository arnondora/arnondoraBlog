---
title: "Java 101 - What is Lambda Expressions in Java 8"
image: "./java8LambdaExpression.png"
category: Tutorial
excerpt: "Lambda Expressions เป็น Feature ใหม่ที่พึ่งเพิ่มเข้ามาใน JSE8 เป็นหนึ่งในหลายๆ Feature ที่คนที่ใช้ Java หลายๆคนบอกว่า"
date: 2015-01-06T19:57:05.000
author: arnondora
template: full-width
type: post
isFeatured: false
status: published
---

**Lambda Expressions** เป็น **Feature** ใหม่ที่พึ่งเพิ่มเข้ามาใน **JSE8** เป็นหนึ่งในหลายๆ **Feature** ที่คนที่ใช้ **Java** หลายๆคนบอกว่า "ในที่สุดก็มีกะเขามั่ง" เพราะว่าในภาษาอื่นเขามีใช้กันจนเป็นเรื่องอันโคตรจะธรรมชาติมนุษย์ประตุชนคนธรรมดาใช้กันเกื่อนเลยล่ะครับ
จากเมื่อก่อนเวลาเราจะทำอะไรก็ต้องสร้าง **Class Implement Interface** อะไรกันปวดตับไปหมด แทบทุกปัญหาที่ว่ามาเมื่อกี้จะหมดไป ด้วย**Lambda Expression** เช่นผมบอกว่า **(a,b)-\>a+b;** **(คือสร้าง Method ที่รับค่า a กับ b เข้าไป แล้ว Return ค่าของ a+b ออกมา)** รูปของมันคือ

    (parameter) -> {body}

เช่นๆ

    (a,b)-> a+b;

เป็นต้น เรามาลองเล่นตัวอย่างเล่นๆกันบ้าง เราลองมาสร้าง **Thread** แบบเก่ากันก่อน

    new Thread (new Runnable() {
        public void run () {
        System.out.println("This is from old way");
        }}).start();

จากด้านบนผมก็สร้าง **Thread** ธรรมดาเลย ใน **Thread** ผมให้มัน โชว์ข้อความ **This is from old way** ทีนี้เราลองมาใช้ **Lambda Expression** กันบ้าง

    new Thread ( () -> System.out.println("This is Lambda Example") ).start();

ผลการทำงานของโค๊ต 2 อันนี้เหมือนกันเลย แต่สังเกตมั้ยครับพอเราใช้ **Lambda Expression** จะเห็นได้ว่ามันย่นจาก 4 บรรทัด เหลือเพียงแค่บรรทัดเดียวเอง ง่ายมากๆ มาลอง เล่นกันอีกสักตัวอย่างล่ะกัน ผมจะสร้าง List ขึ้นมาตัวนึง ที่ในนั้นมี 1,2,3 เป็นสมาชิก

    List <Integer> a = Arrays.asList (1,2,3);

ทีนี้ผมจะเขียนโปรแกรมเพื่อโชว์สมาชิกใน **List** กัน ในที่นี้ผมขอให้ **for-each** ล่ะกัน

    for (int n: a) {
      System.out.println(n);
    }

เมื่อกี้เป็นโค๊ตแบบเก่า **เรามาลองเขียนเป็นแบบ Lambda Expression กันบ้าง**

    a.forEach(n-> System.out.println(n));

การทำงานเหมือนกันเลย เพียงแค่ย่อให้มันสั้นกว่าเท่านั้นเอง
**เรามาลองกันอีกสักตัวอย่าง** ผมมีตัวเลขอยู่ใน **ArrayList**

    List <Integer> numList = Arrays.asList(1,2,3,4,5,6,7,8,9);

แล้วทีนี้**ผมอยากจะเขียน Fillter** ให้มัน เช่นบอกว่า ให้ เอาเลขคู่มาอย่างเดียว ผมก็ต้องสร้าง **Method** ใหม่อีก

    public static List <Integer> showEven (List<Integer> source)
    {
       List <Integer> result = new ArrayList <Integer> ();
       for (int num : source)
       {
          if (num%2 == 0)
             result.add(num);
       }
       return result;
    }

ตอนนี้ ถ้าเราเขียนแค่นี้มันก็ไม่เป็นไร แต่ถ้าในอนาคตเราต้องการ **Filter** มากกว่านี้ล่ะ เราก็จะเขียนกันมืองิกกันเลยทีเดียว เพราะฉะนั้น เราจะใช้ **Lambda Expression** เข้ามาช่วยแก้ปัญหากัน ก่อนอื่นผมขอสร้าง **Method** ชื่อ **checkNumber** มาก่อนเพื่อใช้ในการแยกตัวเลขตาม **Case** ที่เราต้องการ

    public static List<Integer> checkNumber (List<Integer> source, Predicate<Integer> tester)
    {
       List<Integer> result = New ArrayList<Integer>();
       for (int numrun: source)
       {
          if (tester.test(numrun)) result.add(numrun);
       }
       return result;
    }

อธิบายโค๊ตข้างบนก่อน ผมสร้าง **Method** ชื่อ **checkNumber** ที่ **Return** ค่าเป็น **ArrayList** ที่เป็น **Integer** แล้วรับ **Argument** เป็น **source** กับ **tester** เข้ามา หลังจากนั้นข้างในผมสร้าง **ArrayList** ชื่อ **result** เพื่อเก็บผลลัพธ์ แล้วใช้ **For Each** ไล่ๆ ถ้าใช่ก็เติมใน **result** สุดท้ายก็โยน **result** กลับไป **(ปล. เรื่องของ Predicate ขอไปอธิบายในโอกาสหน้าล่ะกันนะ ไม่งั้นยาว.....)**
ถัดมาเรามาดูที่ **Main** กันบ้าง

    public static void main (String [] args)
    {
      List <Integer> numList = Arrays.asList(1,2,3,4,5,6,7,8,9);
      List <Integer> result = checkNumber(numList,numchk -> (numchk%2) == 0);
      result.forEach(re_num->{System.out.println(re_num);});
    }

ผมสร้าง **ArrayList** ชื่อ **numList** ขึ้นมาเก็บตัวเลขที่ต้องการ ถัดมาผมต้อง **ArrayList** ชื่อ **result** มาเพื่อเก็บผลลัพธ์ โดยให้มันไปเรียก **Method checkNumber** แล้วส่ง **numList** และตัวเลขไปตัวนึง โดยให้ ส่งมาเฉพาะเลขที่หาร 2 เหลือเศษ 0 เท่านั้น

## **สรุปแล้ว ทำไมเราต้องการ Lambda Expression ล่ะ?**
สมัยนี้เครื่องคอมพิวเตอร์ส่วนใหญ่ก็เป็น **Multi-Core, Multi-Processor** กันหมดแล้ว เพราะฉะนั้นเราจำเป็นที่จะต้อง ทำให้การทำงานกับ **Multi-Thread** นั้นง่ายขึ้น**Lambda Expression** กับ **Streams API** จึงเป็นทางออกที่ค่อนข้างดี เพราะทำให้เราเขียนได้สะดวกและสั้นขึ้นมาก หรือว่าจะเป็นในเรื่องของ **Anonymous Class **ก็สามารถใช้ **Lambda Expression** ทำได้เหมือนกัน ถือว่าเป็น **Feature** นึงของ **Java 8** ที่ค่อนข้างน่าสนใจเลยล่ะ
**Source Code :** [https://drive.google.com/folderview?id=0BwrPA9Miv4o2ZUtFYVF6SU45MWM&usp=sharing
][0]
**Number Checker Source Code : **[https://drive.google.com/folderview?id=0BwrPA9Miv4o2VmZtNllETzZFTVk&usp=sharing][1]

[0]: https://drive.google.com/folderview?id=0BwrPA9Miv4o2ZUtFYVF6SU45MWM&usp=sharing
[1]: https://drive.google.com/folderview?id=0BwrPA9Miv4o2VmZtNllETzZFTVk&usp=sharing
