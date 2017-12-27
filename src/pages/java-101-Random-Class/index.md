---
title: "Java Class - Random Class คลาสมหาสนุก"
image: "./java101random.png"
category: Tutorial
excerpt: "กลับมาอีกแล้ว อันนี้ก็ถามกันมาเยอะ นั่นคือเรื่องของ Random Class มันใช้ยังไง ทำอะไร"
date: 2015-03-11T21:23:34.000
author: arnondora
templete: full-width
type: post
isFeatured: false
status: published
---

กลับมาอีกแล้ว อันนี้ก็ถามกันมาเยอะ นั่นคือเรื่องของ **Random Class** มันใช้ยังไง ทำอะไร
เรื่องที่ว่ามันเอามาทำอะไรนั้นก็ไปอ่านชื่อ **Class** ซะว่ามันชื่ออะไร นั่นแหละคือสิ่งที่มันทำ
ใช้ยังไง? ก่อนอื่นต้อง **Import** มันเข้ามาก่อน

    import java.util.Random;

ทีนี้เราจะมาลอง **Random Int** กันแต่ก่อนอื่นเรามาสร้าง **Object** จาก**Class Random** กันก่อน

    Random rand = new Random ();

ในการที่เราจะ **Random** ค่าตัวเลขมาสักค่านึงเราจะต้องเรียก **Method** ชื่อ **nextInt()** ใน **Argument** จะเป็น **Bound** (ขอบเขต) ของมันซึ่งจะตั้งแต่ 0 ถึงที่เราป้อนลงไป แต่ถ้าไม่ใส่มันจะเอาเลขอะไรมาให้เราก็ได้

    for (int i = 1;i<=20;i++)
    {
       System.out.println(rand.nextInt(20)+1);
    }

จากโค๊ตด้านบนผมก็วนลูป 20 รอบให้มัน **Generate** เลขออกมา แต่สงสัยใช่มั้ยว่าทำไมต้องบวก 1 ด้วย?
เจ้านี่เป็นทริกอย่างนึง คือใน Argument เราไม่สามารถกำหนดเลขเริ่มต้นได้ว่าให้มันเริ่มที่เลขอะไร ผมเลยบวกมันเข้าไปเลยให้มันเริ่มด้วยเลขที่เราต้องการนั่นเอง เพราะฉะนั้นมันจะ **Random** เลขตั้งแต่ **1-21** นั่นเอง
แต่จริงๆแล้วเรา Random อย่างอื่นได้อีกโดยการเรียก **Method next...()** เช่น **nextBoolean(), nextByte(), NextDouble(), NextLong()** เป็นต้น
เรามาลองใช้มันทำอะไรสนุกกันดีกว่า เช่น จั่วไพ่เป็นต้น //เรื่องการพนันนี่มาไวเลย
ก่อนอื่นเราจะต้องรู้ว่าไพ่นั้นมี **52** ใบ เกิดจาก ตัวเลข **A,2,3,4,5,6,7,8,9,J,Q,K** และหน้าการ์ด นั้นคือ **Clubs**, **Diamonds**, **Hearts** และ **Spades**
เพราะฉะนั้นเราจะต้อง **Random** 2 อย่างนั่นคือเลขการ์ดกับหน้าการ์ด แต่ผมจะให้ผู้ใช้สามารถป้อนจำนวนไพ่ได้ด้วย

    import java.util.Scanner;
    import java.util.Random;

    public class PlayCard
    {
        public static void main (String [] args)
        {
            Random rand = new Random();

            Scanner sc = new Scanner (System.in);
            System.out.print("Input Number of Card : ");
            int numOfCard = sc.nextInt();

            for(int i=1;i<= numOfCard;i++)
            {
                System.out.println(GetCardFace(rand.nextInt(3)) + " " + getCardNumber(rand.nextInt(12)+1));
            }

            sc.close();
        }

        public static String GetCardFace (int faceNumber)
        {
            if (faceNumber == 0) return "Clubs";
            else if (faceNumber == 1) return "Diamonds";
            else if (faceNumber == 2) return "Hearts";
            else return "Spades";
        }

        public static String getCardNumber (int cardNumber)
        {
            if (cardNumber == 1) return "A";
            else if (cardNumber == 10) return "J";
            else if (cardNumber == 11) return "Q";
            else if (cardNumber == 12) return "K";
            else return Integer.toString(cardNumber);
        }
    }

มาดูที่ main กันก่อน ก่อนอื่นผมก็ให้ **User** กรอกจำนวนไพ่ที่ต้องการจั่วเข้ามา จากนั้นก็เข้า **For Loop** ตามจำนวนไพ่ที่กรอกเข้าไป แล้วในลูปก็ให้เราปริ้นไพ่ที่จั่วได้ออกมา โดยสร้าง **Method** ชื่อ **getCardFace()** ขึ้นมาเพื่อแปลงจากเลขที่สุ่มให้กลายเป็นชื่อหน้าของไพ่ และ **getCardNumber()** เพื่อแปลหน้าไพ่ให้เรา แล้วถามว่าทำไมตรง **Random** อันหลังต้องบวก 1 ด้วยล่ะ
นั่นเพราะเพื่อให้เราสะดวกมากขึ้นครับ เพราะไพ่มันไม่มีแต้ม 0 มันมีแค่ **A,1,2,3,4,5,6,7,8,9,J,Q,K** เพราะฉะนั้นตัวที่เราจะต้องเปลี่ยนนั่นก็มีแค่**A,J,Q,K** มันทำให้เราจัดการกับ **Index** ที่สุ่มมาได้ง่ายขึ้นนั่นเอง!

## **ปล ตัวแดงๆ ตัวหนา ใหญ่ๆ : ที่เขียน Random ไพ่นี้ไป มันยังไม่สมบูรณ์เท่าไหร่นะครับ ลองเขียนให้ดูคร่าวๆ (ยังไม่ได้จัดการกับการ์ดซ้ำ)**
**Sources Code : **[https://drive.google.com/folderview?id=0BwrPA9Miv4o2TDBESTgxcVkyR00&usp=sharing][0]

[0]: https://drive.google.com/folderview?id=0BwrPA9Miv4o2TDBESTgxcVkyR00&usp=sharing
