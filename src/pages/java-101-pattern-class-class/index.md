---
title: "Java 101 : Pattern Class (Class ฟรุ้งฟริ้ง.. :~ มึนทั้งตำบล )"
image: "./java101regaxpattern.png"
category: Tutorial
excerpt: "วันนี้ก็กลับมาอีกแล้ว วันนี้อยากมาเอง ไม่มีใครจุดธูปเรียก เฮ้ยไม่ใช่ เข้าเรื่องดีกว่า ช่วงนี้ก็เปิดเทอมแล้วก็เลยทำโจทย์อะไรหน่อย พอดีไปเจอโจทย์ข้อนึงใน Google Code Jam"
date: 2015-01-18T16:27:54.000
author: arnondora
template: full-width
type: post
isFeatured: false
status: published
---

วันนี้ก็กลับมาอีกแล้ว วันนี้อยากมาเอง ไม่มีใครจุดธูปเรียก เฮ้ยไม่ใช่ เข้าเรื่องดีกว่า ช่วงนี้ก็เปิดเทอมแล้วก็เลยทำโจทย์อะไรหน่อย พอดีไปเจอโจทย์ข้อนึงใน **Google Code Jam** แล้วนั่งแก้อยู่ประมาณ 2 ชม. ได้ และก็ทำให้ได้คิดถึง **Class** ที่จะพูดในวันนี้นั่นคือ **Pattern Class**

## **Regular Expression คืออะไร?**
ก่อนจะไปถึง Pattern Class ก่อนอื่นขออธิบายก่อนว่า **Regular Expression** หรือ **Regex** คืออะไร ง่ายๆแล้วมันคือการบอกรูปแบบของข้อความ เช่น a\* มันอาจจะแปลว่า aa หรือ aaa ไปได้เรื่อยๆ หรือจะเป็น a_b_ ก็อาจจะแปลว่า aabb abb ไปเรื่อยๆ ซึ่งมันก็มีนอกจากเครื่องหมายดอกจันทร์อีก ซึ่งไม่ขอพูด
เราจะมาลองเล่นกันคร่าวๆ เราจะป้อน **String** เข้าไปอันนึง แล้วก็ **String** อีกอันที่เป็น **Pattern**

    String in_str = sc.nextLine();
    String in_pattern = sc.nextLine();

ถัดมาเราจะมาสร้าง **Pattern** กัน

    Pattern pattern = Pattern.compile(in_pattern);

ถัดมาเราสร้าง **Object pattern** ขึ้นมาพร้อมกับเรียก **Method compile** ให้มัน **Generate** ข้อความจาก **Regular Expression** ที่เราป้อนเข้าไป

    if (pattern.matcher(in_str).matches()) System.out.println("Match");
    else System.out.println("Not Match");

ถัดมาเราจะมาเช็คกันในที่นี้ผมใช้**If** แล้วเรียก **Method matcher** ขึ้นมาเพื่อเช็คกับ **String** ที่เราป้อนเข้าไป และเรียก **Method matches** ทับเพื่อให้มัน **Return** ค่า เป็น **True/False** ถ้าเป็น **True** ก็ให้มันบอกว่ **Match** หรือถ้าไม่ก็ให้มันบอกว่า **Not Match **
รูปแบบของ **Regular Expression** ที่จะให้**Method compile** เรียกนั้นมีหลายแบบสามารถเข้าไปอ่านได้ใน **Document** ของตัว **Java** เองได้ ไม่อธิบายเพราะมันเยอะ ตอนนี้ขอเล่น**\[\]** ก่อน เพราะมันง่ายดี เรามาลองรันกัน ผมป้อนว่า

    abc
    [abr]b[ad]

เพราะฉะนั้นผลมันออกมาจะเป็น **Not Match** เพราะว่า เราป้อน **Pattern** บอกว่าตัวแรกอาจจะเป็น a,b,r เท่านั้นก็คือผ่าน ตัวที่ 2 ก็คือ b แน่นอนก็ตรงอีก มาตัวสุดท้าย เป็นได้เฉพาะ a หรือ d เท่านั้นซึ่งไม่ตรงมันเลยออกมาเป็น **Not Match** ตามที่เราโปรแกรมไว้
**Source Code : **[https://drive.google.com/folderview?id=0BwrPA9Miv4o2NkZWUHpjV0ZXY2M&usp=sharing][0]

[0]: https://drive.google.com/folderview?id=0BwrPA9Miv4o2NkZWUHpjV0ZXY2M&usp=sharing
