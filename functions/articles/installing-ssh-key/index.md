---
title: "ทำให้ชีวิตง่ายขึ้นด้วย SSH Key"
image: "./installing_ssh_key.png"
category: Tutorial
excerpt: "วันนี้ เราจะมาดูกันว่า เราสามารถติดตั้ง SSH Key ลงบน Server ของเราได้อย่างไร ในตัวอย่างนี้ ผมจะติดตั้งมันลงไปใน Server ของเว็บนี้กัน"
date: 2015-12-14T22:13:46.000
author: arnondora
template: full-width
type: post
isFeatured: false
status: published
---

วันนี้ เราจะมาดูกันว่า เราสามารถติดตั้ง SSH Key ลงบน Server ของเราได้อย่างไร ในตัวอย่างนี้ ผมจะติดตั้งมันลงไปใน Server ของเว็บนี้กัน

## SSH Key คืออะไร ?
ถ้าเราถามว่า ปกติเวลาเรา Login เข้าไปที่ Server เราก็ต้องผ่านตัว SSH หรือ Secure Shell โดยการใช้ Password แต่ปัญหาคือ **ความปลอดภัย **เพราะว่า Password ถ้าเราอยากจะรู้ก็ไม่ยากแค่ Brute Force ก็ออกมาอย่างง่ายดาย ดั่งสายลงวิ่งผ่าน แต่ถ้าเป็น SSH Key ที่กำลังจะได้ดูวิธีการใช้งานกันวันนี้จะเห็นได้ว่า แทบไม่มีทางที่จะใช้แค่ Brute Force แล้วออกเลย เพราะว่า ตัว Key จะถูกแบ่งออกเป็น 2 อันคือ Public Key และ Private Key โดยเราสามารถนำ Public Key ไปวางในที่ที่เราต้องการที่เราจะเข้าถึง และเมื่อเรา Login ระบบ มันจะเอา Private Key ที่อยู่ในเครื่องเรา มาทำการเทียบกับ Public Key ที่เราใส่ไว้ใน Server (โดยมี Algorithm เฉพาะนะ) และถ้าตรงมันก็จะปลดล๊อคให้เราเข้าไปได้นั่นเอง
ในขั้นตอนที่กำลังจะทำให้อ่าน ต่อไปนี้ผมทำโดยผ่าน Terminal ของ OSX หรือถ้าใครใช้พวก Linux ก็สามารถทำผ่าน Terminal บนเครื่องตัวเองได้เช่นกันส่วน Windows ก็ลาก่อยนะครับ

## Step 1 สร้าง RSA Key บนเครื่อง
ให้เราเข้าไปใน Terminal บนเครื่องของเรา และพิมพ์คำสั่งตามด้านล่าง เพื่อทำการสร้างกุญแจให้กับเครื่องของเรา

    ssh-keygen -t rsa

หลังจากที่เรารันคำสั่งด้านบน มันจะมีถามว่าจะใช้ Save ไฟล์ Key ไว้ที่ไหน ถ้าต้องการเติม Path ของ Key ก็ให้เติมลงไปได้เลย แต่ถ้าไม่ก็กด Enter ได้เลย

    Enter file in which to save the key (/home/demo/.ssh/id_rsa):

นอกจาก เราจะมี Key File เพื่อ Login แล้ว เราอาจจะเพิ่ม passphrase เข้าไปเพิ่มได้อีก

    Enter passphrase (empty for no passphrase):

passphrase อารมณ์มันเหมือนเราไปเข้ารหัสตัว Key อีกครั้งด้วย passphrase มันเอาไว้ใช้ในสถานการณ์ประมาณว่า ถ้า Hacker ได้ Key File ของเราไป มันอาจจะช่วย เป็นการป้องกัน Hacker ใช้ Key File ของเราอีกชั้นหนึ่ง เพราะว่า ถ้าเราตั้ง passphrase เอาไว้ เวลาเราต้องการใช้ Key File มันจะถาม passphrase เสมอ ทำให้เรามั่นใจได้อีกขั้นนึงเลย
หลังจากที่เรา Config อะไรเรียบร้อยแล้ว มันก็จะแสดง Key ของเราขึ้นมา (อะไรประมาณนี้ แต่ล่ะเครื่องอาจจะแสดง Key ไม่เหมือนกัน ถ้าเหมือนกัน ก็บ้าแล้วล่ะ !!!!)

    Your identification has been saved in /home/.ssh/id_rsa.
    Your public key has been saved in /home/.ssh/id_rsa.pub.
    The key fingerprint is:
    4a:dd:0a:c6:35:4e:3f:ed:27:38:8c:74:44:4d:93:67 demo@a
    The key's randomart image is:
    +--[ RSA 2048]----+
    |          .oo.   |
    |         .  o.E  |
    |        + .  o   |
    |     . = = .     |
    |      = S = .    |
    |     o + = +     |
    |      . o + o .  |
    |           . o   |
    |                 |
    +-----------------+

จากขั้นตอนที่เราทำไป ตอนนี้เราก็จะได้ Public Key และ Private Key ออกมา โดย Public Key ของเราจะอยู่ที่ ~/.ssh/id\_rsa และ Private Key จะอยู่ที่ ~/.ssh/id\_rsa.pub (ถ้าเราไม่ได้ไป Config Path อะไรตั้งแต่ตอนที่มันถาม ตอนที่เราสร้าง Key นะ)

## Step 2 Copy Key ลงเครื่อง Server
หลังจากที่เราได้ Public Key และ Private Key กันมาแล้วจากขั้นตอน ที่  1 ในขั้นตอนนี้ เราจะมาทำการ Copy ตัว Public Key ของเราลง Server กัน
ในการที่เราจะ Copy Public Key เข้าไป เราจะต้องรันคำสั่ง

    cat ~/.ssh/id_rsa.pub | ssh user@example.com "mkdir -p ~/.ssh && cat >>  ~/.ssh/authorized_keys"

จากคำสั่งนี้ มันจะทำการ Copy ไฟล์ Public Key ของเราไปอยู่ใน ~/.ssh/authorized\_keys ทางฝั่งเครื่อง Server เองโดยทันที

## Optional Step 3 ยกเลิกการ Login ตัว Password
เมื่อเรา Copy Key ของเราลงไปในเครื่อง Server ของเราแล้ว ตอนนี้เราสามารถที่จะ Login โดยการใช้ SSH Key ที่เราสร้างขึ้นมาได้แล้ว (โดยไม่ต้องใช้ Password ในการ Login) ในขั้นตอนนี้มี Optional จะทำหรือไม่ทำก็ได้ นั่นคือการ ไม่ยอมให้ใครหน้าไหน Login ผ่าน SSH ตัว Password อีกต่อไป (ก็ไหน ๆ เราก็มี SSH Key ไว้แล้วนิเนอะ)
ก่อนอื่น ให้เราเข้าไปในไฟล์ Config ของ SSH ก่อน โดยการรันคำสั่ง

    sudo vim /etc/ssh/sshd_config

ในไฟล์ที่เราเข้าไป มันจะมีอยู่บรรทัดนึงเขียนว่า PermitRootLogin ให้เราแก้ ทั้งบรรทัดข้อความข้างล่างแทน เพื่อไม่ยอมให้ Login ผ่าน Password อีกต่อไป

    PermitRootLogin without-password

## บทสรุป
การเปลี่ยนมาใช้ SSH Key ทำให้ Server ที่เราหวงแหน รักดั่งลูกหลาน ของเรามีความปลอดภัยมากขึ้น จาก Brute Force Attack หรือถ้าใครไม่ได้เป็นคนที่ เครียดกับเรื่องของความปลอดภัยมากนัก ก็ทำให้สะดวกมากขึ้นในการ Login ผ่าน SSH ของเรา เพราะว่า เราไม่จำเป็นต้องใส่ Password เพื่อ Login เพราะว่าตัว Key มันอยู่ในเครื่องของเราอยู่แล้ว ก็หวังว่าที่เข้ามาอ่านกันตอนนี้จะมีความสุขกับการใช้ SSH Key นะครับ สวัสดีครับ

## แหล่งอ้างอิง
เนื่องจาก ผมก็พึ่งหัด Setup เหมือนกัน เพราะฉะนั้นจะ นั่งเทียนเขียนเหมือนก่อน ๆ ไม่ได้ รอบนี้ก็เอามาจาก 2 เว็บนี้ แล้วก็ลองทำนี่แหละ ใครที่หลงเข้ามาอ่าน อยากลองศึกษาเพิ่มเติม ให้ลองเข้าไปดูได้ตามลิงค์ข้างล่างได้เลย
[How To Set Up SSH Keys][0] - Digital Ocean
[HowTo: Setup SSH Keys on a Linux / Unix System][1] - cyberciti.biz

[0]: https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2
[1]: http://www.cyberciti.biz/faq/how-to-set-up-ssh-keys-on-linux-unix/
