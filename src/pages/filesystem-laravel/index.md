---
title: "Filesystem Service ใน Laravel"
image: "./Filesystem_Laravel_1.png"
category: Tutorial
excerpt: "กลับมาอีกครั้งกับซีรีส์ของ Laravel ในวันนี้ผมจะพาไปรู้จักอีก Service หนึ่งใน Laravel ที่จะช่วยให้เราจัดเก็บ และจัดการไฟล์ต่าง ๆ ในเว็บไซต์ของเราได้ง่ายขึ้นกับ Service"
date: 2016-07-14T23:14:38.000
author: arnondora
templete: full-width
type: post
isFeatured: false
status: published
---

กลับมาอีกครั้งกับซีรีส์ของ Laravel ในวันนี้ผมจะพาไปรู้จักอีก Service หนึ่งใน Laravel ที่จะช่วยให้เราจัดเก็บ และจัดการไฟล์ต่าง ๆ ในเว็บไซต์ของเราได้ง่ายขึ้นกับ Service ที่มีชื่อว่า **Filesystem**


## Filesystem ใน Laravel ทำอะไรได้ ?
ถ้าเมื่อก่อน ก่อนที่เราจะได้มาใช้ Filesystem Service ใน Laravel ถ้าเราต้องการที่จะเก็บไฟล์ เรียกไฟล์หรือ เรียกค่าต่าง ๆ จากไฟล์ เราจำเป็นต้องเขียนคำสั่งในภาษา PHP เองทั้งหมด ซึ่งเราจะต้องมารับมือกับ Function มากมายก่ายกองไปหมด ถ้าเขียนในระบบเล็ก ๆ ภาระ ในการ Implement อาจจะไม่ยากนัก แต่ถ้าเราเขียนระบบใหญ่ เรื่องง่าย ๆ อย่างการอัพโหลดไฟล์อาจจะเป็นเรื่องใหญ่ ที่สร้างความบรรลัย และปวดหัวมาก ๆ เลยก็ได้

แต่ด้วย **Filesystem Service** ใน Laravel จะช่วยให้เราสามารถ เก็บ เคลื่อนย้าย และเรียกไฟล์ต่าง ๆ ในเว็บไซต์ของเราได้ง่ายขึ้น และโค๊ตสะอาดมากขึ้น

นอกจากความสามารถที่ได้กล่าวไปแล้ว มันยังสามารถที่จะอัพโหลดไฟล์ลงในบน **Cloud Storage** ต่าง ๆ เช่น **Amazon S3** ได้โดยผ่าน Driver ที่ Laravel เตรียมมาให้เรา และยังสามารถสร้าง **Filesystem Service Provider** ขึ้นมาใช้เองได้อีกด้วย (ในบทความนี้จะไม่มีการพูดถึงการสร้าง Filesystem Service Provider เนื่องจากจะทำให้ยาวมาก)

## Workshop
ถ้าให้ค่อย ๆ อธิบายทีละคำสั่ง อาจจะทำให้ไม่เข้าใจว่า **"มันจะเอาไปใช้ยังไง ?"** เลยจะขออธิบายผ่าน Workshop ดีกว่า

ซึ่ง Workshop ที่เราจะมาสร้างกันนี้จะเป็น **File Upload Manager** อย่างง่ายกัน ที่เราสามารถอัพโหลดไฟล์อะไรก็ได้ลงไป, โหลดมันกลับมาได้ และลบทิ้งได้ โดยผมจะค่อย ๆ อธิบายไปทีละขั้นตอน แต่ก่อนอื่น ให้เราเตรียม Project และ **Generate Key** ผ่านคำสั่งด้านล่างนี้ให้เรียบร้อยซะก่อน

    php artisan key:generate



เกือบลืม ให้เข้าไปเอา Bootstrap มา Compile ให้เป็น CSS ผ่าน Gulp ให้เรียบร้อยด้วย เผื่อใครต้องการ Interface ที่สวยงาม

## สร้าง View สำหรับ Upload Form
ในขั้นตอนแรก เราจะต้องสร้าง View สำหรับเก็บ Upload Form กันก่อน โดยการสร้างไฟล์ชื่อ **home.blade.php** ขึ้นมา ใน **/resources/views/** และเขียนโค๊ตตามด้านล่าง

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>File Upload Manager</title>
        <link rel="stylesheet" href="css/app.css" charset="utf-8">
      </head>
      <body>
        <div class = "container">
          <h3>File Upload Manager</h3>
          <form action="/newfile" enctype="multipart/form-data" method="post">
            <div class = "form-group"><input type="file" class = "form-control" name="fileUpload"></div>
            {{csrf_field()}}
            <div class = "form-group"><input type="submit" class = "btn btn-primary" value="Upload new file"></div>
          </form>
        </div>
      </body>
    </html>



อันนี้ไม่น่าจะต้องอธิบายอะไรมากมาย เพราะมันก็คือ File Upload Form โง่ ๆ ธรรมดาเลย แต่สำหรับคนที่ไม่เคยใช้ Laravel มาก่อน อาจจะสงสัยว่า **csrf\_field()** คืออะไร ?

**csrf\_field** มันเกิดมาเพื่อป้องกันไม่ให้ผู้ไม่ประสงค์ดีส่ง Request มาที่เว็บของเราเพื่อจุดประสงค์ที่ไม่ดี หลักการของมันก็คือ เราจะเพิ่ม Hidden Field โดยมี Value เป็นค่า ๆ นึงที่มาจากตอนเรา Generate Key เพื่อให้ระบบสามารถตรวจสอบได้ว่า Request ที่ส่งมา มันมาจากเราจริง ๆ หรือไม่

## สร้าง Controller สำหรับจัดการกับการ Upload File
ให้เรารันคำสั่งตามด้านล่างนี้เพื่อสร้าง Controller ชื่อ **FileUploadController**

    php artisan make:controller FileUploadController



หลังจากที่เราได้ Controller มาแล้ว เราจะมาสร้าง Method ที่จะแสดง View ที่เราสร้างไว้เมื่อสักครู่แล้ว โดยผมจะให้ Method นี้ชื่อว่า **home** ให้เราเพิ่มโค๊ตด้านล่างนี้ลงไปใน Controller ได้เลย

    public function home ()
    {
        return view('home');
    }



โค๊ตด้านบนเป็นการสร้าง Function ชื่อว่า **home** และให้มันคืนค่าเป็น View ที่ชื่อว่า **home** หรือก็คือ ให้มันแสดงหน้า **home** ในหน้าเว็บนั่นเอง (home เยอะไปไหน)

## สร้าง Route ไปยัง home()
ให้เราเข้าไปที่ไฟล์ **routes.php** และแก้ส่วนที่เรียกไปที่ Root ให้ไปที่ Function home ใน FileUploadController ที่เราพึ่งสร้างไปเมื่อครู่ตามโค๊ตด้านล่างเลย

    Route::get('/','FileUploadController@home');



เท่านี้ ถ้าเราลองรัน Server ขึ้นมาแล้วเข้าไป เราก็จะอยู่ที่หน้า Upload File ที่เราพึ่งเขียนไปกันแล้ว

## สร้าง Function สำหรับ Upload File
ถัดไปตอนนี้ เราจะมาสร้าง Function สำหรับรองรับ Request ที่ Form ส่งมาเมื่อครู่ มาย้ายไฟล์ที่ถูกอัพโหลดมาเก็บในเว็บไซต์ของเรา

ให้เราสร้าง Function ชื่อ **upload** ใน **FileUploadController** แล้วลองเขียนโค๊ตตามนี้เลย

    public function upload ()
        {
          //upload file
          $fileName = Input::file('fileUpload')->getClientOriginalName();
          Storage::disk('public')->put($fileName, File::get(Input::file('fileUpload')));

          return back();
        }



ลองมาดูกัน ในบรรทัดแรก ผมสร้างตัวแปรที่เก็บชื่อไฟล์ต้นฉบับไว้ก่อน เพราะว่า เวลาเราอัพโหลดไฟล์ ไฟล์นั้นจะถูกเอาไปเก็บไว้ใน Temp Folder ของ PHP บน Web Server ของเรา และมันจะถูกเปลี่ยนชื่อไปด้วย

จากนั้น บรรทัดแรก เป็นการเรียกคำสั่งใน Filesystem ก่อนอื่น เราบอกมันก่อนว่า เราจะเอาไฟล์ไปไว้ที่ไหนโดยผ่านคำสั่ัง Storage::disk('public') **ถ้า งง เดี๋ยวจะอธิบายอีกรอบนึง อย่างละเอียดข้างล่าง** และเราเรียกคำสั่ง **put** เพื่อเอาไฟล์เข้าไปเก็บ

โดยคำสั่ง **put** เราจะต้องใส่ชื่อไฟล์ที่เราต้องการเก็บเข้าไปเป็น Argument ตัวแรก โดยเราใส่ชื่อไฟล์ต้นฉบับเข้าไป และ Argument ตัวสุดท้ายคือตัวที่อยู่ไฟล์ที่อยู่ใน Temp Folder ของ PHP โดยเราสามารถเรียกผ่านคำสั่ง Input::file('fileupload') ได้เลย

และสุดท้าย เราจะ Redirect กลับไปที่หน้า Upload ที่ผู้ใช้กดเข้ามานั่นเอง เป็นอันจบพิธี

เกือบลืม ก่อนที่ทั้งหมดจะทำงานได้ อย่าลืม Import Class ตามด้านล่างนี้ด้วยนะ

    use Illuminate\Support\Facades\Input;
    use Illuminate\Support\Facades\File;
    use Storage;




## สร้าง Upload Route
ตอนนี้ให้เราเข้าไปที่ Route.php และเขียนโค๊ตเพิ่มตามด้านล่างเลย

    Route::post('/newfile', 'FileUploadController@upload');



คล้าย ๆ กับที่เราเขียน Route ปกติเลย แต่ว่าแทนที่เราจะเรียก Get Method เราต้องเรียก Post Method แทน เพราะว่า เราต้องการส่งข้อมูลจาก Form ที่เราสร้างมาด้วย

ส่วนที่อยู่ให้เรากลับไปที่ Form ของเราว่า From Action ของเราไปที่ไหน เราก็เขียนใน Route File ให้เหมือนกัน

เท่านี้ ถ้าเราลองเปิดหน้า Upload File ของเรา เมื่อเรากด File ก็จะไปอยู่ที่ **Storage/app/public** ให้เราเลย

## สร้าง Download Route และ Function สำหรับดาวน์โหลดไฟล์
เมื่อกี้เรา Upload ได้แล้ว ถัดมาเราจะมาสร้าง Route สำหรับ Download File กันบ้าง โดยผมจะให้เราเรียกไปที่ files/ชื่อไฟล์ เป็นการดาวน์โหลดไฟล์นั้น ๆ มาเริ่มกันเลย

ก่อนอื่นเราจะสร้าง Function สำหรับดาวน์โหลดไฟล์นั้น ๆ ก่อน ให้เราไปสร้าง download Function แล้วใช้โค๊ตตามด้านล่างนี้เลย

    public function download ($filename)
    {
        if(!Storage::disk('public')->has($filename)) abort(404);

      $storagePath  = Storage::disk('public')->getDriver()->getAdapter()->getPathPrefix();

      $file = $storagePath . $filename;

      return response()->download($file);
    }



ใน Function Download เราจะรับชื่อไฟล์ที่ถูกเรียกเข้ามา โดยก่อนที่จะให้โหลด เราจะตรวจสอบก่อนว่า ไฟล์นั้น มีอยู่จริง หรือไม่ ? ถ้าไม่คือให้ แสดง 404 แต่ถ้ามีให้ไปต่อ

จากนั้น เราจะเรียก Path ของไฟล์นั้นกัน ลงในตัวแปรที่ชื่อว่า **storagePath** ซึ่งวิธีนี่อาจจะ งง หน่อย แต่ก็ใช้ตามนี้ไปนะ (ถ้าใครมีวิธีที่ดีกว่า ช่วยมาตอบหน่อย เขียนตาม Document แล้วใช้ไม่ได้) และก็เอา Path ที่ได้มาเชื่อมกับชื่อไฟล์ ก็เป็นอันเสร็จ

และสุดท้าย เราจะ ให้ Request ที่เป็น File Download Request กลับไป ซึ่งแน่นอนว่า Laravel ก็เตรียม Helper Function มาให้เราเรียบร้อยแล้ว ก็คือ **response()-\>download(Path ของไฟล์);**

และท้ายสุดของขั้นตอนนี้คือ การสร้าง Route เพื่อไปเรียก **download()** ที่เราเขียนไปเมื่อครู๋

เราบอกว่า เราจะให้เวลาเราเรียก **/download/ชื่อไฟล์** เป็นการดาวน์โหลดไฟล์นั้น เราก็เขียน Route ตามด้านล่างนี้เลย

    Route::get('/download/{filename}', 'FileUploadController@download');



อาจจะสงสัยว่า **{filename}** นี่คืออะไร มันคือการส่งตัวแปรที่ Function ที่เราเรียกในที่นี้มันจะชื่อว่า **filename** ซึ่งจะต้องสอดคล้องกับตอนที่เราสร้าง **download()** ด้วย

## สร้างตารางที่แสดงไฟล์ที่มีอยู่ในเว็บไซต์เรา
ตอนนี้เราก็สามารถ อัพโหลด และ ดาวน์โหลด ไฟล์ของเราได้แล้ว แต่มันต้องผ่านลิงค์เท่านั้น ฉะนั้น เราจะมาแก้ไขหน้า Upload ของเราให้สามารถแสดงไฟล์ที่มีอยู่ และมีลิงค์สำหรับดาวน์โหลดได้กัน

แต่เราก็รู้ว่า ใน View มันมีหน้าที่แค่แสดงเท่านั้น ไม่สามารถไปดึงอะไรมาได้ ฉะนั้นจะต้องเป็นหน้าที่ของ Controller แล้ว ที่ต้องไปบอก Model หรือ Function ต่าง ๆ ไปดึงมาให้เรา

ฉะนั้นเข้าไปที่ **FileUploadController** และไปที่ **home()** โดยให้เราแก้เป็นดังโค๊ตด้านล่างนี้เลย

    return view ('home', ['Files' => Storage::disk('public')->files()]);



ของเก่า เราแค่สั่งให้ Laravel ไป Render หน้า home มา แต่ตอนนี้เรามีข้อมูลที่เราต้องการนั่นคือ **ชื่อไฟล์ที่มีอยู่ในเว็บไซต์เรา** ซึ่ง Filesystem ใน Laravel ก็มี Function เตรียมไว้ให้เราเรียบร้อยแล้ว นั่นคือ **files()**

**files()** จะคืนค่ากลับมาเป็น **ชื่อไฟล์** ทั้งหมดที่มีอยู่ในที่ที่เราต้องการ เช่นตอนนี้เราต้องการ รายชื่อไฟล์ใน **Storage::disk('public')** หรือก็คือ **Storage/app/public** (ส่วนว่าทำไมถึงต้องเป็น Path นี้เดี๋ยวไว้ตอนจบมาอธิบาย)

โค๊ตที่เราแก้ไปเป็นการส่งชื่อไฟล์ไปให้หน้า Upload ไฟล์ของเรา อันนี้ไม่น่าจะมีอะไรนะ

มาที่หน้า **home.blade.php** กันบ้าง เราจะเพิ่ม Section ในการแสดง File ที่ Upload เสร็จแล้ว เป็นตามด้านล่างเลย

          <hr>
          <h4>Uploaded File(s)</h4>
          <table class = "table table-hover">
            <tr>
              <td>File Name</td>
              <td>Download Link</td>
            </tr>

            @foreach($Files as $file)
              <tr>
                <td>{{$file}}</td>
                <td><a href="/download/{{$file}}">Download</a></td>
              </tr>
            @endforeach
          </table>



ตรงนี้ก็ไม่มีอะไรเช่นกัน จะมีก็ตรง Foreach ที่เราเอาชื่อไฟล์ที่เราส่งเข้ามา มาวนลูปเพื่อเอามันมาแสดงในตารางที่มีชื่อไฟล์เป็น Column แรก และ ลิงค์ดาวน์โหลด ที่เราสร้างไว้เป็นอีก Column

## ทำปุ่ม และ Function สำหรับลบไฟล์
ไหน ๆ ก็เปิดไฟล์ **home.blade.php** อยู่แล้ว เราก็มาเพิ่มลิงค์สำหรับลบไฟล์กันเลยละกัน ให้เราไปแก้ตรงส่วนตารางที่พึ่งเขียนกันไปให้มี Column สำหรับลบไฟล์อีกอันหนึ่ง ก็จะเป็นตามด้านล่างนี้เลย

          <table class = "table table-hover">
            <tr>
              <td>File Name</td>
              <td>Download Link</td>
              <td>Delete File</td>
            </tr>

            @foreach($Files as $file)
              <tr>
                <td>{{$file}}</td>
                <td><a href="/download/{{$file}}">Download</a></td>
                <td><a href="/delete/{{$file}}">Delete This File</a></td>
              </tr>
            @endforeach
          </table>



บรรทัดที่เพิ่มมาคือ **Delete File ** ที่เป็นหัวตาราง และบรรทัดที่เป็นลิงค์สำหรับลบไฟล์ ซึ่งเราให้มันลิงค์ไปที่ **/delete/ชื่อไฟล์** ที่เราจะมาเขียน Function สำหรับ Route นี้กัน

ถัดมาหลังจากที่เราสร้างลิงค์สำหรับลบแล้ว เราจะมาเขียน **delete()** ใน **FileUploadController** ซึ่งจะเป็นตามด้านล่างนี้เลย

    public function delete ($filename)
    {
        Storage::disk('public')->delete($filename);
        return back();
    }



ง่าย ๆ เลยคือ เรามี Function ชื่อว่า **delete** ที่เราจะรับชื่อไฟล์เข้ามา และในนั้น เราสั่งให้มันลบไฟล์ด้วยชื่อไฟล์ที่เรารับเข้ามา โดยเรียก **delete()** ที่เป็น Function ของ Filesystem ที่มีอยู่แล้ว ซึ่งมันจะรับชื่อไฟล์เข้าไปเป็น Argument และจะเข้าไปชื่อไฟล์นั้น ถ้าเจอก็ลบ ถ้าไม่เจอก็ไม่มีอะไร และสุดท้าย ก็ให้มัน Redirect กลับไปที่หน้าก่อนหน้า นั่นก็คือ

เท่านี้เราก็สามารถสร้างหน้าสำหรับ อัพโหลด ดาวน์โหลด และลบ ไฟล์ด้วยตัวเราเองได้แล้ว เย้ ~~

## รู้จักกับ filesystem.php
อันนี้จะมาตอบคำถามกันว่า **ทำไมเวลาเราอัพไฟล์ ไฟล์มันถึงไปอยู่ใน storage/app/public ?** และ **ทำไมต้องเติม Storage::disk('public') ตลอดเลย ไม่เติมได้มั้ย ?** เรามาดูกัน

filesystem.php เป็นที่ที่ทุกอย่างถูกตั้งค่าไว้ (อยากจะพิมพ์ประมาณว่า this is where magic happens! มาก ๆ) ถ้าเราลองเปิดมาจะพบโค๊ตประมาณนี้ (เอา Comment ออกแล้วนะ)

    return [
        'default' => 'local',

        'cloud' => 's3',

        'disks' => [

            'local' => [
                'driver' => 'local',
                'root' => storage_path('app'),
            ],

            'public' => [
                'driver' => 'local',
                'root' => storage_path('app/public'),
                'visibility' => 'public',
            ],

            's3' => [
                'driver' => 's3',
                'key' => 'your-key',
                'secret' => 'your-secret',
                'region' => 'your-region',
                'bucket' => 'your-bucket',
            ],

        ],

    ];



ก่อนอื่น สิ่งที่อยากให้ดูเป็นอย่างแรกเลยคือตรง Array ที่ชื่อว่า **Disk** เป็นเหมือน Interface ที่ใช้คุยกับเราเลยก็ว่าได้ เราสามารถตั้งค่าได้เลยว่า เราจะให้มันยุ่งกับไปที่ไหน และใช้ Driver อะไร ซึ่งเราสามารถเพิ่ม Disk ของเราเอง ก็ได้เช่นกัน

นอกจากที่จะเพิ่ม Disk ได้แล้ว ยังมีเรื่องของ Driver ที่จะเป็น **Service Provider** (ถ้ามือใหม่ก็น่าจะยังไม่รู้จัก อันนี้ลองไปหาเพิ่มได้) ที่เราสามารถเขียน และเอามาเรียกใช้้เป็น Driver ได้เช่นกัน ดั่งเช่น Driver s3 ที่ Disk s3 เรียกใช้อยู่

และส่วนต่อไปที่อยากจะให้ดูคือบรรทัดนี้เลย

    'default' => 'local',



มันคือบรรทัดที่จะบอกว่า Default ถ้าเราไม่ได้เติม **Storage::disk('สักชื่อ')** จะให้มันไปเรียกที่ Disk ไหน อย่างเช่น ถ้าเราแก้จาก **local** เป็น **public** เราก็จะไม่ต้องพิมพ์ **Storage::disk('public');** เลย เราก็สามารถเรียกเป็น **Storage::สักคำสั่ง()** ได้โดยตรงเลย

และบรรทัดสุดท้ายนั่นคือ

    'cloud' => 's3',

Filesystem ใน Laravel นอกจากเราสามารถที่จัดการไฟล์ใน Host ของเราได้แล้ว ยังสามารถ อัพโหลดไฟล์ต่าง ๆ ไปที่ Cloud Storage ต่าง ๆ ได้เช่นตอนนี้ที่เซ็ตอยู่ก็จะเป็น [Amazon S3][0] ซึ่งเราสามารถไปหา Driver สำหรับ Cloud Storage อื่น ๆ มาใช้ได้เช่นกัน

## สรุป
Filesystem ใน Laravel จะช่วยให้เราสามารถจัดการ และเก็บไฟล์ต่าง ๆ ในเว็บไซต์ของเราได้ง่ายขึ้นมาก ๆ

นอกจากนั้น เรายังสามารถที่จะอัพโหลดไฟล์ของเราลงไปใน Cloud Storage ต่าง ๆ ได้ด้วย ทำให้ย่นเวลาเขียน Funtion ต่าง ๆ เพื่อจัดการของพวกนี้ไปเลย ง่ายมาก ๆ เขียนมายาวมาก ก็หวังว่าจะได้อะไรจากการอ่านบทความนี้ไม่มากก็น้อยนะครับ มีคำถาม หรือ วิธีเขียนที่ง่ายกว่า ก็ลองมาแชร์กันได้นะครับ สวัสดีครับ

ปล. สามารถไปโหลดอันที่เขียนเสร็จแล้ว หรืออยากลองดูขั้นตอนได้ที่ [Repository นี้][1] ได้เลยครับ

[0]: https://aws.amazon.com/s3/
[1]: https://github.com/arnondora/LaravelFilesystemWorkshop/
