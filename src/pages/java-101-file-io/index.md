---
title: "Java 101 - File I/O (EP.10) (The End)"
image: "./java101ep10.jpg"
category: Tutorial
excerpt: "เรื่องสุดท้ายแล้วนะครับ วันนี้กับเรื่องของ **File I/O** เป็นเรื่องของ**การ เขียน อ่านไฟล์** นั่นเอง เรื่องนี้ไม่ยาก แล้วก็สนุกด้วย มาดูกันเลย"
date: 2014-12-29T15:52:56.000
author: arnondora
template: full-width
type: post
isFeatured: false
status: published
---

เรื่องสุดท้ายแล้วนะครับ วันนี้กับเรื่องของ **File I/O** เป็นเรื่องของ**การ เขียน อ่านไฟล์** นั่นเอง เรื่องนี้ไม่ยาก แล้วก็สนุกด้วย มาดูกันเลย

## **File Class คืออะไร?
**
**File Class** มันเป็น **Class** หนึ่งที่อยู่ใน **Package Java.io (เพราะฉะนั้นการอ่านเขียนทุกครั้งต้อง Import มันเข้ามาด้วย อย่าลืมล่ะ!!) **ในคลาสมันจะประกอบไปด้วย **Method** ที่จะช่วยให้เราทำงานกับไฟล์ได้ วิธีใช้คือ


    File filename = new File(Path);


ซึ่งอย่างทื่บอกว่ามันจะมี **Method** อยู่ มันจะมี **Method** บางตัวที่เราควรจะรู้

* **canRead() -** ไว้เช็คว่าไฟล์นี้อ่านได้มั้ย
* **canWrite() -** เหมือน canRead แต่ตรงข้ามกัน อันนี้เช็คเขียน
* **exist()  -** อันนี้ไว้เช็คว่าไฟล์ที่เราอ้างถึงมันมีอยู่จริงมั้ย
* **getName() -** ไว้เวลาที่เราต้องการชื่อไฟล์
* **getPath() -** ไว้เวลาที่เราต้องการที่อยู่ของไฟล์
* **isFile() -** ไว้เช็คว่า ไอ้ไฟล์ที่เราอ้างถึงมันเป็นไฟล์จริงรึเปล่า หรือมั่ว
* **length() -** ไว้เวลาที่เราต้องการขนาดของไฟล์
* **delete() -** ตามชื่อคือ ลบไฟล์ มันจะคืนค่าเมื่อ ไฟล์นั้นมีอยู่จริงและลบสำเร็จ
* **renameTo() -** อันนี้ก็เอาไว้เปลี่ยนชื่อไฟล์
หลังจากที่เรารู้เรื่องของ **File Class** ไปแล้ว เราจะมาหัดอ่านไฟล์กัน **วิธีแรก จะสอนการอ่านไฟล์ด้วย Class FileReader และ Scanner** ก่อน
ก่อนอื่นเราต้อง **Import Package** ที่จำเป็นเข้ามาก่อน


    import java.util.Scanner;
    import java.io.*;


หลังจากนั้น เราจะต้องใช้ฟังก์ชั่น **Try Catch** ด้วย เพราะ **Java** มันจะไม่ยอมให้เรา **Compile** เมื่อเราจะทำงานกับไฟล์แล้วไม่มีการจัดการเรื่องของ **Exception** **(ที่เราเรียนกันบทที่แล้ว) (อ่อลืม ถ้าไม่ใช้ Try Catch ก็เติม throws Exception บนบรรทัดตอนประกาศ Class ก็ได้)**


    public static void main (String [] args) throws Exception
    {
    File filename = new File ("Hello.txt");
    FileReader reader = new FileReader (filename);
    Scanner sc = new Scanner (reader);
    }


**ในที่นี้ผมขออนุญาติไม่ใช้ Try Catch นะครับ** เพราะมันทำให้ดูยุ่ง ตอนนี้ขอให้มันดูง่ายๆก่อน ก่อนอื่นเลย **ผมสร้าง Object File ชื่อ filename ก่อน** ถัดมาผมบอกว่า **สร้าง Object FileReader ชื่อ reader ออกมาโดยที่ใน Constructor เราใส่ filename เข้าไป**เพื่อให้มันรู้ว่าจะให้อ่านอะไร**สุดท้ายเราก็สร้าง Object Scanner ขึ้นมาชื่อ sc เช่นกัน เรากำหนด Constructor ให้เป็น reader** เสร็จและ ถัดมาเรามาดูกันว่าเราจะอ่านยังไง


    public static void main (String [] args) throws Exception
    {
    String ln;
    while (sc.hasNextLine())
    {
    ln = sc.nextLine();
    System.out.println(ln);
    }
    }


    หลังจากเราสร้าง **Object** แล้ว เราจะมาใช้มันกัน นั่นคือผมบอกว่า สร้าง **String** ชื่อ **ln** ก่อน
    แล้วใส่ While ให้วนลูป **Method hasNextLine()** คือ **Method** ไว้เช็คว่าในไฟล์มันมีบรรทัดถัดไปมั้ย
    บรรทัดลงมาให้ **String ln** มีค่าคือ ให้ **sc** ไปดึงข้อความบรรทัดถัดไปมา
    สุดท้ายธรรมดามากให้ เอาข้อความออกหน้าจอปกติ

    **ต่อมา เราจะมาเขียนไฟล์กัน** อันนี้ผมขอสอนการเขียนไฟล์แบบง่ายๆก่อนเลยนะครับ **ในที่นี้ผมขอใช้ Class PrintWriter ในการเขียนไฟล์ (จริงๆการอ่าน เขียนไฟล์มันมีหลายวิธีมาก ผมขอเลือกมาสอนไม่กี่วิธีพอนะครับ)**

    การใช้ไฟล์ **PrintWriter** นั้นไม่ยากเลยครับ **แค่สร้าง Object จาก PrintWriter มา แล้วใช้ Method println ได้เลยครับ** ง่ายมาก


    PrintWriter pw = new PrintWriter ("Test.txt");
    pw.println("Hi!");
    pw.close();


แบบที่บอกเมื่อกี้เลยครับ ว่า แค่**สร้าง Object PrintWriter ขึ้นมาก่อน ในที่นี้ผมตั้งชื่อให้มันว่า pw และให้ Constructor Method เป็น Path** และชื่อไฟล์ (ในที่นี้ผมให้มันอยู่ Path เดียวกับที่เรียกโปรแกรมเลย เพราะฉะนั้นไม่ต้องใส่ Path)
จากนั้นผม**เรียก Method println เพื่อเขียนลงไฟล์ ในที่นี้ผมให้มันเขียนว่า Hi! ลงไฟล์ชื่อ Test.txt**
สุดท้าย **ใช้เสร็จก็ต้องปิดมันด้วย ด้วยการเรียก Method ที่ชื่อว่า close()** ได้เลย เป็นอันจบ

## **Buffer Steam คืออะไรอะ?**
มันคือที่พักในหน่วยความจำในการรับส่งข้อมูล ซึ่งวิธีของมันคือ มันจะเ**อาข้อมูลที่ อ่านเขียน ไปเก็บในหน่วยความจำก่อน ทำให้การ อ่านเขียนไฟล์ขนาดใหญ่ๆ ทำได้มีประสิทธิภาพมากขึ้น แต่ก็แลกมากับหน่วยความจำเหมือนกัน**
ต่อไปเราจะมาอ่านไฟล์โดยใช้ **Buffer Steam** ผ่าน **Class BufferedReader** การอ่านไฟล์วิธีนี้คล้ายๆกับการอ่านไฟล์โดยใช้**FileReader กับ Scanner แค่เปลี่ยนจากใช้ Scanner เป็นใช้ BufferedReader เท่านั้นเอง**


    File filename = new File ("Hello.txt");
    FileReader f_reader = new FileReader (filename);
    BufferedReader b_reader = new BufferedReader (f_reader);

    String data;
    while ((data = b_reader.readLine()) != null)
    {
    System.out.println(data);
    }


คล้ายๆเลย แค่เปลี่ยนจาก **Method hasNextLine** ใน **while** เป็นเช็คว่า บรรทัดที่อ่านอยู่ว่างมั้ย เท่านั้นเอง นอกจากนั้น **BufferReader** ยังมี **Method skip()** ไว้ข้ามบางตัวอักษรด้วยน้าา**(อันนี้ไปลองดูใน Document ของ Java ล่ะกันนะ)**
เมื่อกี้อ่านไปแล้ว **ทีนี้มาเขียนบ้าง** ในการเขียนเราจะใช้ **Class** ที่ชื่อว่า **BufferedWriter** วิธีใช้คล้ายๆ **BufferedReader** เลย


    File filename = new File ("Hello.txt");
    FileWriter f_writer = new FileWriter (filename);
    BufferedWriter b_writer = new BufferedWriter (f_writer);


ก่อนอื่นเราต้องสร้าง **Object** ซะก่อน จริงๆเราสามารถย่อได้ด้วยนะ เหลือ บรรทัดเดียวเอง **(ที่ก่อนหน้านี้ไม่ย่อเพราะกลัว งง อันนี้อันสุดท้ายแล้ว ขอย่อหน่อยล่ะกัน)**


    BufferWriter b_writer = new BufferWriter (new FileWriter (new File ("Hello.txt")));


ความหมายก็เหมือนกัน **อ่อใน Class FileWriter เราสามารถเลือกได้ด้วยนะว่าจะให้มันเขียนทับไปเลย หรือเขียนต่อก็ได้ ถ้าจะเขียนทับก็เขียนเหมือนข้างบนเลย แต่ถ้าต้องการจะเขียนต่อ เราต้องกำหนดใน Class FileWriter ไว้ด้วยว่า true**

    FileWriter f_writer = new FileWriter (filename,true);

หลังจากที่เราสร้าง **Object** เสร็จแล้ว เรามาเขียนกันเลย เราจะใช้ **Method** ที่ชื่อ **write** ของ **b\_reader** ในการเขียน

    code language="java">
    b_writer.write("Hello Worldn");


**แค่นี้เองครับ ง่ายนิดเดียว โค๊ตที่ผมเขียนอยู่ในนี้มันอาจจะไม่ประติดประต่อกันเท่าไหร่ ถ้าอยากดูโค๊ตเต็มๆให้ไปโหลด Source Code ด้านล่างเลยนะครับ**
จบแล้วสำหรับเรื่อง **File I/O** และอีกล่ะ จบสำหรับซีรีส์ Java 101 จบแล้ว ผมก็หวังว่า ถ้าอ่านแล้วไปหัดทำต่อ ผมว่าต้องเขียนได้แน่นอน (ถึงบางเรื่องจะอ่านไม่รู้เรื่องเพราะคนเขียนมันมึนก็เถอะ)
**ถ้ามีคนอ่านอยู่ เดียวจะมาสอนเรื่องการเขียน Android Application ต่อ (ถ้ามีคนอ่านอยู่อ่านะ) กับเรื่องของ Java EE ด้วย**
**ถ้าไม่ได้ตรงไหนก็สามารถเมล์มา ไม่ก็เฟสมาถามได้นะครับ** สำหรับวันนี้สวัสดีครับ
**Source Code :** [https://drive.google.com/folderview?id=0BwrPA9Miv4o2dThLR0gwck5Mbm8&usp=sharing][0]

[0]: https://drive.google.com/folderview?id=0BwrPA9Miv4o2dThLR0gwck5Mbm8&usp=sharing
