---
title: "Java 101 : Java Collection Framework"
image: "./java101collectionframework.png"
category: Tutorial
excerpt: "Java Collection Framework คืออะไร
ง่ายๆไม่คิดมาก มันคือ Class และ Interface ที่อยู่ใน Package java.util"
date: 2015-01-09T14:20:09.000
author: arnondora
template: full-width
type: post
isFeatured: false
status: published
---

## **Java Collection Framework คืออะไร?**
ง่ายๆไม่คิดมาก มันคือ **Class** และ **Interface** ที่อยู่ใน **Package java.util.\*** ซึ่งโดยพื้นฐานแล้วไม่ว่าจะ **Collection** ชนิดไหน มันก็เก็บข้อมูลหลายๆอย่างมาเก็บอยู่ในตัวแปรอันเดียวเท่านั้นเอง บ้างอันเก็บซ้ำมาได้ บางอันเก็บได้ อันนี้ก็แล้วแต่ประเภทของ **Collection**
![](http://upload.wikimedia.org/wikipedia/commons/f/f8/Java_collection_framework.jpg)
จากรูปข้างบนสรุปเอาง่ายๆ  เราจะแยกมันออกเป็น **Interface** และ **Class** ก่อน **(ถ้าใครไม่รู้ว่า Interface คืออะไร เชิญไปอ่าน [EP.8 ][0]ก่อนเลยนะครับ ไม่งั้นอาจจะเกิดอาการมึนงงและเลิกอ่านในที่สุด)**
**Interface** จะประกอบไปด้วย

* **Collection**
* **Set**
* **List**
* **Map**
ส่วน **Class** ก็จะมีย่อยๆ ประมาณข้างล่างนี้ ย้ำว่าประมาณนะ เพราะว่ามันมีเยอะมาก

* **HashSet**
* **ArrayList**
* **Vector**
* **Linked List**
* **Hash Map**
ถัดมาเราจะมาดูว่า **Class** ไหน **Implement** มาจาก **Interface** อะไร

* **Collection <Interface\>**
  * **Set <Class\>**
    * **HashSet**
  * **List <Class\>**
    * **ArrayList**
    * **Vector**
    * **Linked List**
* **Map <Interface\>**
  * **Hash Map**
**Interface Collection** คือ **Interface** ที่สามารถหรือไม่จำเป็นก็ได้ที่จะระบุลำดับความสำคัญของข้อมูล และข้อมูลยังสามารถซ้ำกันได้อีกด้วย
**Interface Set** -\> มันถูกสืบทอดมาจาก **Interface Collection** อีกทีนึง  อารมณ์มันเหมือน Set ในคณิตศาสตร์เลยครับ สามาชิกซ้ำไม่ได้ และ ไม่สนใจลำดับก่อนหลัง

    Set s = new HashSet();
    s.add("A");
    s.add("B");
    s.add("C");
    System.out.println("The size of this set is " + s.size());
    System.out.println("Content are : " + s);
    s.remove("A");
    System.out.println("Is A in this set? " + s.contains("A"));

เอาทีล่ะบรรทัดเลยนะ ก่อนอื่นผมสร้าง Set ขึ้นมาตัวนึงก่อน ในทีนี้ขอให้ **HashSet** ในการยกตัวอย่าง ต่อมา อีก 3 บรรทัดผมเพิ่ม **Element** ลงไป ถัดมาเป็นการหา **size** ของ Set ตัวนี้ผ่าน **Method set()**
ในการเรียก **Element** ทั้งหมด เราสามารถเติมชื่อของ Set ลงไปได้เลย
ถ้าต้องการจะลบข้อมูลออกจาก **Set** ก็ใช้ **Method remove();** ในการลบออก จากในตัวอย่างผมลบ **A** ออกไป
และสุดท้าย ผมต้องการเช็คว่ามี **A** อยู่ใน **Set** ตัวนี้มั้ยโดยใช้**Method contains();** ซึ่งมันจะ **Return** ค่ากลับมาเป็น **true** หรือ **false**
**Interface List** -\> เป็น **Interface** ที่ถูกสืบทอดมาจาก **Collection** อีกเช่นกัน แต่ **List** นี้จะเก็บข้อมูลซ้ำได้ และที่สำคัญคือ สนใจลำดับก่อนหลัง (ตามความหมาย List เลย)

    List l = new LinkedList ();
    l.add(1);
    l.add(2);
    l.add(3);
    System.out.println("Size is " + l.size());
    System.out.println("The Content Are : " + l);
    System.out.println("The first one is " + l.get(0));
    l.remove(0); // remove l(0) that is 1
    System.out.println("Index of 1 is " + l.indexOf(1));

อธิบายอีก (งง กันมั้ยเนี่ย) ก่อนอื่นเลยผมสร้าง **Linked List** มาตัวนึงก่อน**(สมมุติว่ารู้นะว่า Linked List คืออะไร)** แล้วถัดมาอีก 3 บรรทัด ผมใช้ **Method add();** ในการเพิ่มข้อมูลลงไป
ผมสามารถหาจำนวนของ **element** ได้โดยใช้ **Method size();**
ถ้าผมต้องการข้อมูลใน **Linked List** ตัวที่**x** ผมก็แค่ใช้ **Method get(x);** ออกมา เช่นในตัวอย่างผมหาตัวที่ 0 ผมก็บอกว่า **get(0);** เป็นต้น
เอาข้อมูลออกก็ไม่ยาก แค่ใช้ **Method remove();** **(ในวงเล็บเป็น Index นะไม่ใช้ ค่า)**
สุดท้ายถ้าผมต้องการรู้ว่า ข้อมูลตัวนี้อยู่ **Index** ที่เท่าไหร่ก็ใช้ **Method** ชื่อ **indexOf();**
**Interface Map** -\> เป็นการเก็บข้อมูลที่พิเศษกว่าชาวบ้าน ชาวเมืองเขา นั่นก็คือ เราจะต้องเก็บค่า **Key** คู่กับข้อมูลด้วยเสมอ **(โดย Key ห้ามซ้ำกัน แต่ข้อมูลซำ้ได้)**

    Map m = new HashMap ();
    m.put(1, "Hello");
    m.put(2, "Hi");
    m.put(3, "Ant");
    m.remove(1); //remove m(1) that is delete Hello
    System.out.println("Index 2 in map is " + m.get(2));
    System.out.println("Key of the map is " + m.keySet());
    System.out.println("Content in the map are : " + m.entrySet());

ก่อนอื่นผมก็สร้าง **HashMap** ออกมาก่อนเลยปกติ แล้วก็เพิ่มข้อมูลลงใน **Map** โดยใช้ **Method put();** **(ถ้าสังเกต เราจะต้องเติม Key เข้าไปแล้วค่อยตามด้วยข้อมูล)** ถัดมา ถ้าต้องการเอาข้อมูลออกก็ใช้ **Method** **remove()** ได้เลยเหมือนกัน **(ข้างในค่าใส่เป็น Index นะ)**
ถ้าผมต้องการเอาข้อมูลของ **Key** ที่ มาก็แค่ใช้คำสั่ง **get()**
ถ้าต้องการ เฉพาะ **Key** ทั้งหมดของ **Map** ก็เรียก **Method keySet();** ออกมาเราก็จะได้ **Key** ทั้งหมดของ **Map**
และสุดท้าย ถ้าต้องการ **Key** และข้อมูลด้วยกันทั้งหมด ก็ให้เรียก **Method entrySet();** ออกมา
**Class Vector** -\> มันเป็น **Class** ที่ **Implement** มาจาก**Interface List** อีกทีนึง เพราะฉะนั้นคุณสมบัติของมันจะคล้ายๆ **List** เลยล่ะ

    Vector v = new Vector ();
    v.add(1);
    v.add(2);
    v.add(3);
    Enumeration e = v.elements();
    while (e.hasMoreElements()) System.out.println(e.nextElement());

อธิบายโค๊ตกันต่อ (เหนื่อยและ) ก่อนอื่นผมก็สร้าง **Vector** ขึ้นมาแล้ว ใช้ **Method add()** มาเติมข้อมูลลงใน **Vector** หลังจากนั้นผมสร้าง **Enumeration** ขึ้นมาให้มันเท่ากับ **element** ของ **Vector** ที่สร้าง แล้ว **While Loop** ให้มันเอา **Element** ออกมาทางหน้าจอ โดยใช้ **Method hasMoreElements()** มาเช็คว่ามี **Element** เหลืออยู่มั้ย และ **nextElement()** ในการเลื่อน **Cursor** ของ **element** ไปข้างหน้า**(อารมณ์เหมือนกับ next ในตอนที่เรียนเรื่อง Linked List ใน C เลย)**
เมื่อกี้ยังไม่ได้อธิบายเรื่องของ **Enumeration** จริงๆแล้วมันคือ **Interface** นึงที่ใช้ในการเข้าถึงข้อมูลประเภท **List** แค่นี้จบ
เรื่องนี้อาจจะ งง ไปหน่อยสำหรับ มือใหม่ก็ขออภัย ถ้าไม่เข้าใจตรงไหนก็เฟสมาถาม ไม่ก็เมลมาก็ได้นะ ถ้ามีเวลาเดียวจะตอบให้ อย่างรวดเร็ว
**Source Code : **[https://drive.google.com/folderview?id=0BwrPA9Miv4o2b2lqcS01bElwVG8&usp=sharing][1]

[0]: http://www.arnondora.in.th/java-101-abstract-interface-ep-8/ "Java 101 – Abstract & Interface (EP.8)"
[1]: https://drive.google.com/folderview?id=0BwrPA9Miv4o2b2lqcS01bElwVG8&usp=sharing
