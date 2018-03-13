---
title: "How I Get Started With React"
image: "./how-i-get-started-with-react-logo-og.png"
category: Tutorial
excerpt: "From last summer, I was an internship at Like Me Co, Ltd. Many of you might not know this company before but if I say Infographic Thailand. You might heard."
date: 2017-12-25T01:13:53.000
author: arnondora
template: full-width
type: post
isFeatured: false
status: published
---

From last summer, I was an internship at **Like Me Co, Ltd**. Many of you might not know this company before but if I say **Infographic Thailand**. You might heard.

**Front-End Developer** was my intern position which I haven't done before. I did the web front-end programming with React with **ZERO-Experience** in React and Javascript. Here're concepts that I learnt when I get started with React.

## What is React?

First time I heard about React, my brain started to ask
>
> Humm.. What the heck is React?

Some websites said, **"It's the V in MVC"**. That's it ? After I spend lots of time answering my question. I found something ticks in my mind.

Oh my god !! It's just the library that allows you to create the **SPA** (Single Page Application) with less effort. That's the very brief explanation in React in my mind.

## JSX and Components

After I saw the project, I say H0ly $hit!! What the F\_ck is this!!

The concept is very easy when I dig into details more. All of the codes are separate into something call Component.

To understand more, let me show an example. If I have a webpage that has many sections such as **Profile Section** and **Post Section** just like your Timeline on Facebook.

There're lots of Component in there. Profile section is one Component that responsible for **showing your profile picture and your info.** The post section is also one component that responsible for **showing posts**.

Dig even more, in profile component also have lots of components. There's the profile picture component and info component.

To be understandable, let's imagine Lego pieces combine together into a thing you can imagine like a robot but in this case is webpage combined from many components and work together.

But in React we don't usually use HTML to describe the page structure just like the traditional one did, we use something call **JSX**.

It allows us to write an XML in JavaScript. Actually, JSX isn't needed to use React but it makes your code a lot more elegant.

Just like XML, JSX has Tags and tag have tag name, attribute and children. The value of an attribute has to be in the quotes, otherwise just wrap the value in braces and the value is the enclosed JavaScript expression.

## Virtual DOM

You live with DOM or Document Object Model for a very long time, you use it every time when you open webpages. The visualise the DOM, we use tree.

When you see the HTML file, you're looking the page structure. It represents what's this webpage gonna have.

Unfortunately, computer doesn't smart and fast to just run into line by line of HTML and execute in line by line.

DOM is invented to solve this problem by looking quickly into HTML file and try to build the tree to represents the structure of the webpage.

The advantage is when do **searching on the tree is much faster than iteration search**. It enables us to do some operation to DOM tree faster.

Time passed, technology is invented. Modern webpage has **ten to thousands** of nodes, so searching or do some operation on the tree becomes the serious problem.

**Virtual DOM** is hero for this problem. Like the actual DOM, the virtual one is a node tree that lists elements and their attributes but keeps some kind of light-weight copy.

When we make a change of Virtual DOM, It compares and changes only the necessary node in the tree. So, the actual DOM will be changed in the lightning speed compared to the traditional way, which to re-creates all of the DOM nodes.

## Props

Another basic concept is **Props**, you can imagine it as an attribute of the component. To use it just like how you define an attribute to the HTML tag.

It's simple but it also has very hard techniques that use Props to implement. Some optimisation techniques are implemented by using Prop, so know how to use Prop will help you a lot in optimisation.

## Lifecycle & State

In my opinion, this concept is the most important in React. It's the heart of every React components.

It determines how a component will be rendered and behave. In the other word, it allows you to create the dynamic component. The State concept comes from the idea of state machines.

Let's see real-world example, Lightbulb is a very good example. Lightbulb can be only 2 states, which is **"On"** and **"Off"**.

So to switch between these states, it must have something to trigger the state to change into another state. It may be some event happened such as user switch the light switch on or off.

But changing the state looks like the state is changed immediately when user triggers the switch, but it has a lot more complicated steps to change the state.

In React, we can capture these complicated steps very easily from the Life Cycle concept, it facilitates us to change a state or handling a state in the proper way.

## Other Essential Libraries (e.g styled-components)

If you know how to and what is React, your next step is trying to step out into the real world of how people actually using React. React itself has many people using both in production and development.

So, many libraries are developed to help us to achieve more with less effort or enables us to do more tricks in React.

The one that I like the most is **"Styled-Components"**, instead of writing CSS and call by using class attributes. It might be better if we can style a component right away in the JSX Code. No more separated CSS file anymore.

It means that the code that you write will looks cleaner, more elegant and more readable because you don't have to open another CSS file and determine what is this class responsible for. It has its meaning by its name by themselves.

## Conclusion

Let's jump to the conclusion, React is the Front-End framework that has eye-catching from many developers in the world and it has lots of libraries and trick to deal with.

This will cover all of the concepts that I learnt when I get started with React.

When I was being an internship, the project that I worked with using more libraries and concept such as SSR (Server-Side Rendering).

So, there're a lot more concepts and some plank tricks that challenge you everyday so Keep Push!

**PS**. This article is quite long but I hope it might good for you to start using React.
