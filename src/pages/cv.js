import React from 'react'
import Helmet from 'react-helmet'

export default class cv extends React.Component {
  render() {
    const htmlContent = `
    <body>
      <style>
        /* Nunito Import */
        @import url('https://fonts.googleapis.com/css?family=Nunito+Sans');

        html
        {
          font-family: 'Nunito Sans', sans-serif;
        }

        h1,h2,h3,h4,h5,p
        {
          margin: 0;
          color: #212121;
        }

        h1 {font-size: 22px;}
        h2 {font-size: 18px;}
        h3 {font-size: 16px;}
        p,li {font-size: 14px;}

        .container
        {
          width: 70%;
          margin: 0 auto;
        }

        section:first-child
        {
          margin-top: 0;
        }

        section
        {
          margin-top: 30px;
        }

        .subtitle
        {
          color: #848788;
        }

        .introduction > .title, .subtitle, p
        {
          margin-bottom: 0;
        }

        .introduction > .title
        {
          font-size: 3em;
          margin-top: 20px;
        }

        .introduction > .subtitle
        {
          font-size: 1.5em;
          margin-top: 5px;
        }

        .introduction > .super-subtitle
        {
          margin-top: 5px;
          font-size: 1.2em;
          color: #848788;
        }

        .introduction > .contact-info
        {
          margin-top: 5px;
          display: flex;
          flex-direction: column;
        }

        .introduction > .personal-statement
        {
          margin-top: 10px;
        }

        section > .section-list-wrapper
        {
          margin-top: 15px;
        }

        .section-list-wrapper > .section-list-item
        {
          margin-top: 20px;
        }

        .languages > ul
        {
          margin-top: 5px;
        }

        .skills > .chip-wrapper
        {
          list-style: none;
          padding: 0;
          margin-top: 10px;
        }

        .chip-wrapper > .chip
        {
          background-color: #ecf2f5;
          float: left;
          padding: 5px 18px;
          margin-right: 3px;
          margin-bottom: 12px;
        }

        .notes
        {
          margin-top: 130px;
        }

        @media screen and (max-width: 500px)
        {
          .container
          {
            width: 90%;
          }
        }

        /* For Printed Version */
        @media print {

          h1,h2,h3,h4,h5,p
          {
            color: #000000;
          }

          .container
          {
            width: 90%;
            margin: 0 auto;
          }

          .introduction > .contact-info > .website > a:link, a:visited
          {
            text-decoration: none;
            color: #212121;
          }

          .notes
          {
            display: none;
          }
        }

      </style>

      <div class = "container">
        <section class = "introduction">
          <h1 class = "title">Arnon Puitrakul</h1>
          <h2 class = "subtitle">Student</h2>
          <h3 class = "super-subtitle">Faculty of ICT, Mahidol University</h3>
          <div class = "contact-info">
            <span class = "email"><strong>Email:</strong> peter.arnon@gmail.com</span>
            <span class = "website"><strong>Website:</strong> <a href = "https://www.arnondora.in.th">https://www.arnondora.in.th</a></span>
          </div>
          <span class = "personal-statement">I believe in technology and sharing, as they enable us with a better world via several clicks.
  Especially, programming is one of the most powerful tools which inspire people to make
  their dreams come true. I want to share, publicise and innovate new technology so as to
  change our world in the way we could hardly imagine.</span>
        </section>


        <section class = "education">
          <h2>Education</h2>

          <div class = "section-list-wrapper">
            <div class = "section-list-item">
              <h3>Sriboonyanon School</h3>
              <p class = "subtitle">Secondary and High School in Science - Mathematic Programme | 2008 - 2014</p>
            </div>

            <div class = "section-list-item">
              <h3>Faculty of ICT, Mahidol University</h3>
              <p class = "subtitle">Bachelor’s Degree - Information and Communication Technology | 2014 - 2018</p>
            </div>

          </div>
        </section>

        <section class = "work-experience">
          <h2>Work Experience</h2>

          <div class = "section-list-wrapper">

            <div class = "section-list-item">
              <h3>Like Me Co., Ltd.</h3>
              <p class = "subtitle">Former Front-End Developer Intern | Jun-Jul 2017</p>
              <p>Tech Stack : React, Express</p>
            </div>

            <div class =  "section-list-item">
              <h3>Acourse.io</h3>
              <p class = "subtitle">Instructor | 2016 - Current</p>
              <p>Taught : Laravel</p>
            </div>

            <div class = "section-list-item">
              <h3>Arnondora.in.th</h3>
              <p class = "subtitle">Founder, Writer | 2014 - Current</p>
            </div>

          </div>

        </section>

        <section class = "awards">
          <h2>Awards & Participated Competition</h2>

          <div class = "section-list-wrapper">

            <div class =  "section-list-item">
              <h3>Asia Pacific ICT Award (APICTA) 2016</h3>
              <p class = "subtitle">Merit Award in Tertiary Student Project Category</p>
            </div>

            <div class =  "section-list-item">
              <h3>Thailand ICT Award (TICTA) 2016</h3>
              <p class = "subtitle">1st Place in Tertiary Student Project Category</p>
            </div>

            <div class =  "section-list-item">
              <h3>Microsoft Imagine Cup Thailand 2016</h3>
              <p class = "subtitle">1st Place in Innovation Category</p>
            </div>

            <div class = "section-list-item">
              <h3>Inventor Day Award 2018</h3>
              <p class = "subtitle">Award in Information and Communication Technology Category</p>
            </div>

            <div class = "section-list-item">
              <h3>Salaya Life Photo Contest</h3>
              <p class = "subtitle">2nd Place in Student Category</p>
            </div>

            <div class = "section-list-item">
              <h3>International ICT Innovative Services Contest (InnoServe)</h3>
              <p class = "subtitle">Finalist</p>
            </div>

            <div class = "section-list-item">
              <h3>National Software Contest (NSC)</h3>
              <p class = "subtitle">Finalist</p>
            </div>

            <div class = "section-list-item">
              <h3>Young Scientist and Technologist Programme (YSTP) - National Science and Technology Development Agency (NSTDA)</h3>
              <p class = "subtitle">Scholarship Student</p>
            </div>

            <div class = "section-list-item">
              <h3>ACM-ICPC Programming Competition Middle Regional Group B Offline Round (2016)</h3>
              <p class = "subtitle">Contestant</p>
            </div>

            <div class = "section-list-item">
              <h3>IEEEXtreme 9.0 Programming Competition</h3>
              <p class = "subtitle">Contestant</p>
            </div>

            <div class = "section-list-item">
              <h3>ACM-ICPC Programming Competition Asia Regional Round</h3>
              <p class = "subtitle">Contestant</p>
            </div>

          </div>
        </section>

        <section class = "extra-activities">
          <h2>Extracurricular Activities </h2>

          <div class = "section-list-wrapper">

            <div class = "section-list-item">
              <h3>MUICT Open House 2017</h3>
              <p class = "subtitle">Head of Project Section | 2017</p>
            </div>

            <div class = "section-list-item">
              <h3>MU Guide</h3>
              <p class = "subtitle">University Guide | 2015-2017</p>
            </div>

            <div class = "section-list-item">
              <h3>Junior Webmaster Camp 9 (JWC) (2017)</h3>
              <p class = "subtitle">Camp President | 2017</p>
            </div>

            <div class = "section-list-item">
              <h3>RPST Yours & Big Camera Photography Camp (2017)</h3>
              <p class = "subtitle">Campper | 2017</p>
            </div>

            <div class = "section-list-item">
              <h3>Young Webmaster Camp 14 (YWC)</h3>
              <p class = "subtitle">Campper | 2016</p>
            </div>

            <div class = "section-list-item">
              <h3>MUICT Open House 2016</h3>
              <p class = "subtitle">Head of Project Section | 2016</p>
            </div>

            <div class = "section-list-item">
              <h3>Microsoft Student Partner FY16 (2016)</h3>
            </div>

            <div class = "section-list-item">
              <h3>Student Orientation Ceremony, Mahidol University</h3>
              <p class = "subtitle">Photographer Staff | 2016</p>
            </div>

            <div class = "section-list-item">
              <h3>MUICT Open House 2015</h3>
              <p class = "subtitle">Staff in Project Section | 2015</p>
            </div>

            <div class = "section-list-item">
              <h3>Student Council, Mahidol University</h3>
              <p class = "subtitle">President Assistant of Information Technology | 2015-2016</p>
            </div>

            <div class = "section-list-item">
              <h3>Student Orientation Ceremony, Faculty of ICT, Mahidol University (2016)</h3>
              <p class = "subtitle">Master of Ceremony (MC) | 2016</p>
            </div>

            <div class = "section-list-item">
              <h3>Salaya Tour for MUICT #13</h3>
              <p class = "subtitle">Photographer Staff | 2015</p>
            </div>

            <div class = "section-list-item">
              <h3>MUICT Preparatory Program 2015</h3>
              <p class = "subtitle">Teacher Assistant in English Subject  | 2015</p>
            </div>

          </div>
        </section>

        <section class = "trained">
          <h2>Extracurricular Trainings</h2>

          <div class = "section-list-wrapper">

            <div class = "section-list-item">
              <h3>Positive Psychology: Applications and Interventions</h3>
              <p class = "subtitle">Coursera's course created by University of Pennsylvania | 2016</p>
            </div>

            <div class = "section-list-item">
              <h3>Psychological First Aid</h3>
              <p class = "subtitle">Coursera's course created by Johns Hopkins University | 2016</p>
            </div>

            <div class = "section-list-item">
              <h3>Introduction to Psychology</h3>
              <p class = "subtitle">Coursera's course created by University of Toronto | 2016</p>
            </div>

            <div class = "section-list-item">
              <h3>Game Theory</h3>
              <p class = "subtitle">Coursera's course created by Stanford University, The University of British Columbia | 2016</p>
            </div>

            <div class = "section-list-item">
              <h3>Machine Learning Engineer Nanodegree Course</h3>
              <p class = "subtitle">Udacity's course created by Kaggle | 2015</p>
            </div>

            <div class = "section-list-item">
              <h3>Data Analyst Nanodegree Course</h3>
              <p class = "subtitle">Udacity's course created by Facebook and Tableau | 2015</p>
            </div>

          </div>
        </section>

        <section class = "projects">
          <h2>Projects</h2>

          <div class = "section-list-wrapper">

            <div class = "section-list-item">
              <h3>arnondora.in.th</h3>
              <p class = "subtitle">A website where I share my own personal experience, training and knowledge articles related to programming and technology.</p>
            </div>

            <div class = "section-list-item">
              <h3>Appropriateness of Using Thai Language Measurement for Youth in Social Network</h3>
              <p class = "subtitle">The research project which aims to develop the mathematical model by using machine learning technique to classify the inappropriate usage of Thai language in Thai social network (both semantics and words meaning). This research is funded by Young Scientist and Technologist Programme (YSTP) and under supervision of Dr.Suppawong Tuarob.</p>
            </div>

            <div class = "section-list-item">
              <h3>ArnondoraBlog</h3>
              <p class = "subtitle">The custom made website from GatsbyJS and React for my personal blog which I open-source the source code for other developer to follow. The purpose of this project is to reflect my designing and web development skill.</p>
            </div>

            <div class = "section-list-item">
              <h3>PaperTheme Redux</h3>
              <p class = "subtitle">PaperTheme have been released for 2 years, the design have to be changed. PaperTheme Redux is the new version of PaperTheme which change in design and improve performance.</p>
            </div>

            <div class = "section-list-item">
              <h3>Mahidol University Student Council Website</h3>
              <p class = "subtitle">In 2016, I took care all of the information
  system of the student council, Mahidol
  University. I have an idea to improve the
  website. This website will be the project
  document archive for club in the
  university.</p>
            </div>

            <div class = "section-list-item">
              <h3>PaperTheme for Wordpress</h3>
              <p class = "subtitle">I developed this theme not only for my
  personal use, but I also published all of
  the source code on Github so that
  anyone who is able to clone will be able
  to use it for free.</p>
            </div>

            <div class = "section-list-item">
              <h3>Prothier</h3>
              <p class = "subtitle">The platform which connects customer and small business together by suggesting promotions that match user's interest from the nearby shops and also provides the in-detail statistics about customers for small business owners to understand about their customer more. This project got several awards such as Winner in Innovation Category from Microsoft Imagine Cup Thailand 2016 and Merit award from APICTA 2016.</p>
            </div>

            <div class = "section-list-item">
              <h3>Maritime Disasters Prediction Model</h3>
              <p class = "subtitle">This project aims to build a model that detect maritime disaster such as Tsunami by using data from coastal radar, using deep learning to detect significant sign from the data to predict future disaster in real-time.</p>
            </div>

            <div class = "section-list-item">
              <h3>Plant Species Identification System (PSIS)</h3>
              <p class = "subtitle">I came up with the idea for this project
  when I was in the high school that
  "Plants are around us, but we dont
  know much about them", so this system
  was created with the ability to extract the
  features from the images of the plants
  before using the deep learning</p>
            </div>

            <div class = "section-list-item">
              <h3>Automatic Feature Detection In Video</h3>
              <p class = "subtitle">This project was begun with problem in
  own daily life. Doing a motion tracking, I
  sometimes could not detect the features
  that I wanted correctly. Therefore, I
  employed a mathematical model to
  calculate calculate the energy of the
  pixel, frame by frame. All of these have
  been implemented using C# and
  OpenCV.</p>
            </div>

            <div class = "section-list-item">
              <h3>MathEngine</h3>
              <p class = "subtitle">This project was started in 2009, called
  as MathEngine. It was built upon my
  hobby which was writing a program
  aimed to turn a complex task into a much
  simpler one. This project processed on
  creating an API to do complex
  mathematical task with a single line of
  code.</p>
            </div>

          </div>
        </section>

        <section class = "languages">
          <h2>Languages</h2>
          <ul>
            <li>Thai | Native</li>
            <li>English | Execellent</li>
            <li>Japanese | Good</li>
            <li>French | Basic</li>
          </ul>
        </section>

        <section class = "skills">
          <h2>Skills</h2>

          <ul class = "chip-wrapper">
            <li class = "chip">html</li>
            <li class = "chip">javascript</li>
            <li class = "chip">nodejs</li>
            <li class = "chip">react</li>
            <li class = "chip">android</li>
            <li class = "chip">php</li>
            <li class = "chip">laravel</li>
            <li class = "chip">python</li>
            <li class = "chip">docker</li>
            <li class = "chip">tensorflow</li>
            <li class = "chip">weka</li>
            <li class = "chip">R</li>
            <li class = "chip">java</li>
            <li class = "chip">elasticsearch</li>
            <li class = "chip">machine learning</li>
            <li class = "chip">data science</li>
          </ul>
        </section>
      </div>
    </body>
    `
    return (
      <div>
        <Helmet
          title="Arnon Puitrakul"
          meta={[
            {
              name: 'description',
              content: 'Fully Detail CV of Arnon Puitrakul',
            },
            { property: 'og:title', content: 'Arnon Puitrakul' },
            {
              property: 'og:description',
              content: 'Fully Detail CV of Arnon Puitrakul',
            },
            { property: 'og:locale', content: 'en_us' },
            { property: 'og:type', content: 'webpage' },
            { property: 'og:url', content: 'https://www.arnondora.in.th/cv' },
            { property: 'og:site_name', content: 'Arnon Puitrakul' },
          ]}
        >
          <html lang="en" />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-64833813-2"
          />
          <script>
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-64833813-2');`}
          </script>
        </Helmet>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    )
  }
}
