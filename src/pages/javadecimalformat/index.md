---
title: "Java Class - DecimalFormat เขียนแม่มก่อนวันสอบนี่แหละ"
image: "./java101decimalformat.png"
category: Tutorial
excerpt: "พรุ่งนี้จะสอบ เจแว้ แล้วเห็นหลายคนถามเยอะมากว่า **DecimalFormat** มันคืออะไรแว้ๆๆ วันนี้จะมาตอบให้อ่านกัน"
date: 2015-03-11T20:25:05.000
author: arnondora
templete: full-width
type: post
isFeatured: false
status: published
---

พรุ่งนี้จะสอบ เจแว้ แล้วเห็นหลายคนถามเยอะมากว่า **DecimalFormat** มันคืออะไรแว้ๆๆ วันนี้จะมาตอบให้อ่านกัน
จริงๆแล้วเจ้า **DecimalFormat** เป็น **Class** นึงที่อยู่ในภาษา **Java** ที่ช่วยให้เราจัดการกับตัวเลขทศนิยมได้ง่ายขึ้น ก่อนอื่น ก่อนจะใช้เราจะต้อง **Import Class** เข้ามาก่อน

    Import java.text.DecimalFormat

**D** ใหญ่ **F** ใหญ่นะเหวย อย่าเขียนผิด เขียนผิดตัวแดง Compile ไม่ผ่านเลยนะเหวย!!!
ทีนี้มาถึงวิธีการใช้ มันง่ายมากๆ แค่เรา **New** มันขึ้นมาเหมือนกับ **Object** ทั่วๆไป

    DecimalFormat df = new DecimalFormat();
    df.applyPattern("0.00");

หลังจากที่ผมสร้างมันออกมาเป็น **Object** แล้ว ก็เรียกใช้ **Method** ชื่อ **applyPattern()** เพื่อใส่รูปแบบให้กับมัน ถามต่อว่าทำไมต้องเป็น **0.00** ล่ะ?
นั่นเพราะว่าผมต้องการทศนิยม **2** ตำแหน่งนั่นเองเช่นจาก **6.1115** เป็น **6.11** เป็นต้น แต่เดี๋ยวก่อน จริงๆแล้วยังมี **Pattern** แบบอื่นอีกด้วยน้า เช่น **\# จะเป็นการบอกว่าถ้ามีก็ใส่ถ้าไม่มีก็ไม่ต้อง **ต่างจาก 0 ตรงที่ **0** จะบังคับถ้าไม่มีมันก็ใส่ **0** ไปถ้ามีมันก็ใส่ตัวเลขไป
ทีนี้เวลาจะแปลงตัวเลขก็เพียงแค่เรียก **Method** ชื่อ **format()** ได้เลยเช่น

    System.out.println(df.format(6.1115));

รู้สึกมั้ยว่าแค่เนี้ยทำไมเขียนตั้ง **3** บรรทัด **เปลืองว่ะ!** ได้ครับเดียวเขียนให้เหลือบรรทัดเดียวเลย

    System.out.println(new DecimalFormat("0.00").format(6.1115);

จากที่เห็นว่าเราสามารถป้อน Pattern ผ่าน Constructor ได้เลยสะดวกมากๆ จบและไบ่~~
**Source Code : **[https://drive.google.com/folderview?id=0BwrPA9Miv4o2eGxIcWVielVVbzQ&usp=sharing][0]

[0]: https://drive.google.com/folderview?id=0BwrPA9Miv4o2eGxIcWVielVVbzQ&usp=sharing
