---
title: "Creating a Minecraft Server on Ubuntu 14.04"
image:
category: Tutorial
excerpt: "ตอนนี้ก็ปิดเทอมแล้ว เกมก็ต้องมา แฮร่~~ วางแผนกันตั้งแต่ก่อนปิดเทอมแล้วว่า จะเปิดเซิพ Minecraft เล่นกัน!!!! ด้วย Digital Ocean เพราะเดือนนึงมันตก 5 USD เองถ้าเล่นกัน 5 คนเดือนนึงก็ตกคนล่ะ 1 USD หรือประมาณ 3x บาทเท่านั้นเอง มาดูกันเลยว่าทำยังไง"
date: 2015-05-22T16:20:26.000
author: arnondora
template: full-width
type: post
isFeatured: false
status: published
---

ตอนนี้ก็ปิดเทอมแล้ว เกมก็ต้องมา แฮร่~~ วางแผนกันตั้งแต่ก่อนปิดเทอมแล้วว่า จะเปิดเซิพ Minecraft เล่นกัน!!!! ด้วย Digital Ocean เพราะเดือนนึงมันตก 5 USD เองถ้าเล่นกัน 5 คนเดือนนึงก็ตกคนล่ะ 1 USD หรือประมาณ 3x บาทเท่านั้นเอง มาดูกันเลยว่าทำยังไง

## Setup Pre-requisites
ก่อนอื่น ก็ต้องไป Register สร้าง Account ของ Digital Ocean กันก่อน จากนั้นก็ให้เราสร้าง droplet ที่ลงเฉพาะ Ubuntu อย่างเดียวมา เราจะใช้ Spec ถูกสุดเลยนั่นคือ Ram 512 MB, CPU 1 Core ให้เลือก Install เฉพาะ Ubuntu เท่านั้นนะ!! จากนั้นรอสัก 30 วินาที เราก็จะได้ Droplet มาแล้ว
ให้เรา SSH เข้าไปใน Droplet ที่เราสร้างและ Install Java ลงไป เพราะตัวเกม Minecraft จำเป็นต้องใช้ JRE (Java Runtime Environment) ให้การรัน และต้องเอา Java ที่ไม่มี GUI ด้วยก็ดี เพราะตัว Droplet เราเป็นแค่ Command Line ปกติเท่านั้นเอง โดยการพิมพ์ตามด้านล่างนี้เพื่อ Install

    apt-get install default-jre-headless

**Note : jre-headless คือ Option ในการ Install JRE แบบไม่เอา GUI มาด้วย อีกอย่างนึง คำสั่งที่จะใช้ในนี้ทั้งหมดอาจจะต้องรันผ่าน sudo เท่านั้นถึงจะทำได้นะจ๊ะ**

## Create a Minecraft System User
ตอนนี้เราจะมาจัดการกับ Permission ต่างๆใน Folder ที่เรากำลังจะสร้าง เพื่อเก็บตัวเกมกัน

    mkdir /srv/minecraft
    addgroup --system minecraft
    adduser --system --no-create-home --home /srv/minecraft --ingroup minecraft minecraft

มันคือการสร้าง folder เพื่อเก็บตัวเกมทั้งหมดและ Set Home Location ให้ไปที่ Folder ของตัวเกมเพื่อความสะดวกต่อไป เราสามารถเปลี่ยนชื่อ Folder ที่เราสร้างได้นะ ไม่จำเป็นต้องเป็นเหมือนกันก็ได้นะ

## Install Minecraft!!
เราจะต้อง cd เข้าไปที่ Directory ที่เราพึ่งสร้างไปเมื่อกี้กันก่อน

    cd /srv/minecraft

ถัดมาเราจะโหลดตัวเกมกัน โดยใช้ wget แล้วชี้ไปที่ Server ของ Minecraft ณ วันที่เขียนคือ 22 May 2015 เวอร์ชั่นล่าสุดคือ 1.8.4 นะ ถ้ามีเวอร์ชั่นที่ใหม่กว่าก็ใช้เวอร์ชั่นใหม่ดีกว่า

    wget https://s3.amazonaws.com/Minecraft.Download/versions/1.8.4/minecraft_server.1.8.4.jar -O minecraft_server.jar

## Configuring Minecraft Server
ตอนนี้เราก็มีไฟล์ตัว Server เรียบร้อย ให้เรารันตัวไฟล์ก่อน เพื่อ Generate ไฟล์ที่เกี่ยวข้องต่างๆโดยการพิมพ์

    java -Xms32M -Xmx450M -jar minecraft_server.jar nogui

ในคำสั่งเรากำหนดให้มันจอง Memory ขั้นต่ำที่ 32 MB และสูงสุดที่ 450 MB ค่า 2 ค่านี้เราควรที่จะเซ็ตให้พอดีกันตามจำนวน Memory ที่เรามี เช่นตอนนี้ผมมี Memory อยู่ 512 MB เซ็ต Max ไว้ที่ 450 ก็กำลังดีและ เพื่อ OS มันรันด้วยนิดหน่อย หลังจากที่เรารันครั้งแรก ตัวระบบมันจะ Generate ไฟล์ออกมา ตอนนี้ให้เราสนใจที่ 3 ไฟล์นี้ก่อน นั่นคือ `banned-players.json`, `banned-ips.json`, `ops.json`, และ `whitelist.json` ไฟล์พวกนี้ไว้เก็บ ID ของ Player ที่เข้ามาเล่นรวมถึงสามารถแบน IP ได้
ถัดไป เราจะมาเซ็ต op (หรือ Operator เรียกอีกอย่างคือ Admin นั่นเอง) ก็ไม่ยากให้พิมพ์
`op yournamehere`
เท่านี้เราก็จะกลายร่างเป็น Admin เต็มตัว สามารถใช้ Command ได้หมดเลย!!

## Creating a Startup Script
ตอนนี้เราก็สร้างตัว Server กับ Config พื้นฐานเรียบร้อยแล้ว แต่ๆๆ ทีนี้ถ้าเวลาเราจะ Start Server ทีก็ต้องพิมพ์ Command ยาวๆก็ไม่น่าจะดีเท่าไหร่ เราจะมาเก็บมันเป็น Process กัน ก่อนอื่นให้สร้างไฟล์ minecraft.conf ขึ้นมาก่อน

    vi /etc/init/minecraft.conf

แล้วใส่ Script ตามนี้เลย

    start on runlevel [2345]
    stop on runlevel [^2345]

    console log
    chdir /srv/minecraft
    setuid minecraft
    setgid minecraft

    respawn
    respawn limit 20 5

    exec /usr/bin/java -Xms32M -Xmx450M -jar minecraft_server.jar nogui

จากนั้นเราจะมาสร้าง symlink โดยการรัน

    ln -s /etc/init/minecraft.conf /etc/init.d/minecraft

เท่านี้เวลาเราจะ Start Server เราก็แค่พิมพ์ `service minecraft start` เพื่อรัน Server หรือ `service minecraft stop` เพื่อทำการปิด Server ตัวเกม

## Connecting to our Minecraft Server
หลังจากที่เราสร้าง Server พร้อมกับ Config และรวบคำสั่งเป็น Script แล้วก็ให้ Start Server กันเลย

    service minecraft start

กลับไปที่ตัวเกมของเรา ให้เราเข้าไปที่ Multiplayer แล้วก็เลือก Direct Connect แล้วพิมพ์ IP Address ของเครื่อง Server ลงไป (ถ้าไม่รู้ให้เข้าไปดูที่หน้า Droplet มันจะมีเขียนอยู่) แล้วตามด้วย colon และ port 25565 เพราะฉะนั้นก็จะเป็น

    ipaddress:25565

จากนั้นก็ ยินดีต้อนรับเข้าสู่โลก 8 bits Square Block กันได้เลย!!! วู้~~~ ปิดเทอมของข้าจะอยู่กับ Minecraft แล้ววู้~~~
