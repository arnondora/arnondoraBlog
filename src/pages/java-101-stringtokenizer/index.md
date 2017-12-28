---
title: "Java 101 - StringTokenizer (EP.พิเศษ เพราะคนเขียนอยากเขียน)"
image: "./java101-StringTokenizer.jpg"
category: Tutorial
excerpt: "อันนี้อยากเขียนเป็นพิเศษ ไม่มีอะไรมาก อยากเขียนเฉยๆ OK เข้าใจตรงกันนะ
มาเข้าเรื่องกันเลยดีกว่า StringTokenizer"
date: 2015-01-01T18:58:18.000
author: arnondora
templete: full-width
type: post
isFeatured: false
status: published
---

อันนี้อยากเขียนเป็นพิเศษ ไม่มีอะไรมาก อยากเขียนเฉยๆ OK เข้าใจตรงกันนะ
มาเข้าเรื่องกันเลยดีกว่า **StringTokenizer** มันจะทำหน้าที่ในการแบ่ง String ออกเป็นส่วนๆตามที่เราบอกมัน โดยมันจะอยู่ใน Package java.util.StringTokenizer
วิธีใช้คือ ต้องสร้าง **Object StringTokenizer** ขึ้นมาก่อน ก็ปกติเลย

    StringTokenizer st = new StringTokenizer (String,delim);

โดยที่ **String** ก็คือข้อความที่เราต้องการแยกมัน ส่วน delim คือเครื่องหมาย หรือสัญลักษณ์ที่ใช้แยก เช่น (,) , (?) , (.) เป็นต้น **(จริงๆแล้วถ้าเราใช้ Space ในการแยก ไม่จำเป็นต้องใส่ delim ก็ได้นะ)**
เรามาลองใช้กันดีกว่า เราจะให้ User ป้อนข้อความเข้ามา แล้วให้มันแยกด้วย ช่องว่างกันดีกว่า

    import java.util.Scanner;
    import java.util.StringTokenizer;

ก่อนอื่นเราก็**import library** เข้ามาก่อน

    Scanner sc = new Scanner (System.in);
    String in_str = sc.nextLine();

หลังจากนั้นก็สร้าง **Object Scanner** และ สร้าง **String** ให้มันรับค่า **String** มาจาก **User**

    StringTokenizer st = new StringTokenizer (in_str);

เสร็จแล้วเราก็สร้าง **StringTokenizer** ขึ้นมา ใส่ **Constructor** เป็น **String** ที่เรา **Input** เข้าไป
ถัดมาเราจะมาดูเรื่องของ **Method** ของมันกันบ้าง

* **countTokens() -** เอาไว้นับว่าใน String ที่เราให้มันไปมันจะตัดออกมาได้กี่อัน
* **hasMoreTokens() -** เอาไว้เช็คว่า Token ถัดไปเป็น String ว่างรึยัง เหมือนกับเช็คว่ามีต่อมั้ย
* **nextToken() -** จะใช้ดึง Token ถัดไปออกมา
เราจะเอามันมาใช้กัน

    System.out.println("This String Can Sperate into : " + st.countTokens() + " Tokens");

    while (st.hasMoreTokens())
    {
       System.out.println(st.nextToken());
    }

ตอนแรกก็ให้มันโชว์ก่อนว่า ใน **String** ที่เรา **Input** เข้าไปมันจะแยกออกมาได้กี่อัน ถัดมาก็ใส่ **Loop** ไปจนกว่าจะหมด **String** และในลูปก็ในมันโชว์ทีล่ะ **Token** ออกมา
จบและเห็นม่ะ ไม่ยากเลย **แค่สร้าง Object ออกมาแล้วเรียก Method ออกมาจัดการกับมัน**
**Source Code : **[https://drive.google.com/folderview?id=0BwrPA9Miv4o2NTNuT015RGNOU0E&usp=sharing][0]

[0]: https://drive.google.com/folderview?id=0BwrPA9Miv4o2NTNuT015RGNOU0E&usp=sharing
