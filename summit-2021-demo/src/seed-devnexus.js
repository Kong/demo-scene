const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    // Sessions
    let tuesSessions = [
        {
            title:
                "Opening Keynote: Meta-modern Software Architecture",
            description:
                "Where do architecture styles come from? Do architects retreat to an ivory tower to decide what the Next Big Thing will be? No–new capabilities constantly appear in the software development ecosystem, and clever architects figure out new ways to leverage the new building blocks, leading to new named architecture styles which are only named after they have existed for a while. This is similar to art and cultural movements, how Victorianism became Modernism. In this keynote, Neal traces the similarities between architecture styles and cultural movements, how each affect the other, and points towards how Metamodernism will inform architecture, corporations, and individual workers in a fundamental way.",
            speakers: ["Neal Ford"],
        },
        {
            title: "What's in Kubernetes that developers should care about (and why)",
            description:
                "Learn the tools, best practices, and approaches to take the best results from Kubernetes (as a developer), without feeling overwhelmed about it.",
            speakers: ["Elder Moraes"],
        },
        {
            title:
                "Forward with Java 18 and Beyond!",
            description:
                "The most recent LTS Java 17 was released in September, so the question is obviously, what’s next for Java? In this presentation we will look at some of the new features introduced between Java 11 and Java 17 that are laying the foundation for some exciting new changes coming in Java in 18 and beyond!",
            speakers: ["Billy Korando"],
        },
        {
            title: "Refactoring Code: An Incremental and Purpose Driven Approach",
            description:
                "Continuous refactoring is critical to succeeding in projects and is an important part of sustainable agile development. In this workshop, we will start by discussing how to approach refactoring, the essential steps we need to take, and look into how to incrementally improve the internal design of code to make it extensible, maintainable, and cost-effective to change. In addition to discussing the concepts, we will take several code examples from real projects, discuss the code smells and explore the refactoring techniques. Along the way, we will also dive into refactoring short code samples and measure the quality of code before and after refactoring.",
            speakers: ["Venkat Subramaniam"],
        },
        {
            title: "Apache Kafka simply explained",
            description:
                "Learn Apache Kafka in uncomplicated and entertaining terms and get equipped with practical knowledge for your first steps in the Apache Kafka world.",
            speakers: ["Olena Kutsenko"],
        },
        {
            title: "Why having your own Mr. Miyagi shouldn’t be luck but a given.",
            description:
                "Mr. Who? Besides one of my childhood heroes, Mr. Miyagi is a fictional karate master from Okinawa, Japan, in the movie series “The Karate Kid”. He was the karate mentor of several people and made them worthy champions. I wanted to be each of those people and then my own karate journey started with my own “sensei” (mentor). Then I became a lawyer and got a so-called “patroon” (another mentor). When I took my first steps in my career switch to the IT world, I discovered that mentorship is not a matter of course. What a pity! Fortunately, I managed to find one again. I have experienced the difference of not having and having one, as a difference between day and night.",
            speakers: ["Kelly Jille"],
        },
        {
            title: "Double-plus Ungood: Why Log4Shell Is So Bad",
            description:
                "Log4Shell shook the Java community. What made it so bad and what do we do about it?",
            speakers: ["Josh Cummings"],
        },
        {
            title:
                "Alpine.js : Declare and React with Simplitcy",
            description:
                "In this session we will introduce the power of Alpine.js as a modern, lightweight, declarative and reactive Javascript framework that can be embedded on any webpage without any need of webpack or complicated build processes.",
            speakers: ["Luis Majano"],
        },
        {
            title:
                "CI/CD Pipelines : What, Why, How?",
            description:
                "To avoid getting caught up in notions of “the right tool” it is important to understand the core concepts of continuous integration (CI) and continuous delivery or continuous deployment (CD). Choosing the right tool should be a consequence of defining the right goals, metrics and processes to automate. In this session we will explore common ideas that must be present in commercial and open source solutions to monitor, automate, verify and deliver software. For example: Tasks, Steps, Runs, End-to-end automation, Workflows, Tool orchestration, Release cycles, among others.",
            speakers: ["Ixchel Ruiz"],
        },
        {
            title:
                "A Tour of the Modern Java Platform",
            description:
                "The Java Platform has seen a tremendous amount of evolution and improvements over the past 5 years in many different areas including: language features in Java, Kotlin, and Scala, Functional Programming, dev environments, test workflows, Reactive, Stream processing, distributed data, containerization, Serverless, and AoT compilation. This talk will give you a tour of the most important improvements, why they matter, and how to take advantage of them.",
            speakers: ["James Ward"],
        },
        {
            title: "Java on Kubernetes: What I wish I knew first",
            description:
                "The Kubernetes ecosystem can be very operator-focussed, and it can be a challenge for developers to distil the information that is relevant for their job.",
            speakers: ["Abel Salgado", "Alberto C. Ríos"],
        },
        {
            title:
                "Zero Trust Architecture",
            description:
                "Do you know your users, devices, services, data, architecture? Do you have policies to enable accesses? Do you always authorize and authenticate or implicitly trust anyone when accessing your services? Come let us talk about building a resilient and secure organization with Zero trust.",
            speakers: ["Sendil Kumar"],
        },
        {
            title: "Batch Processing in Action",
            description:
                "In the enterprise world, we need to deal with a large amount of data that comes from multiple sources, and there’s a considerable amount of effort to read, process, and distribute it. As the number of records increases, plain Java may not be the best solution. With many out-of-the-box solutions such as transaction management, retry, chunk processing, and several templates, Spring Batch is a lightweight framework to help you in these tasks. This talk will dig into Spring Batch, discuss its architecture and templates, and live code examples to demonstrate its power.",
            speakers: ["Hillmer Chona", "Rodrigo Graciano"],
        },
        {
            title:
                "Liberation for your data!",
            description:
                "Join us in this session to see a live demo using Apache Kafka showing how to set up a change data stream out of your application’s database without any code changes and consume change events in other services, update search indexes, and much more.",
            speakers: ["Hugo Guerrero"],
        },
        {
            title:
                "What is Adoptium?",
            description:
                "AdoptOpenJDK has moved to the Eclipse Foundation. In this session, I will explain what the move means, the progress we’ve made and the exciting new opportunities! Come along and learn what Eclipse Temurin is, what the migration path looks like and how to get involved in the project!",
            speakers: ["George Adams"],
        },
        {
            title: "Writing Code for the Future",
            description:
                "Are you still referring to your primary instances as “master?” In our evolving culture, there are myriad words and phrases to be avoided in our code, towards the goal of software being an equitable, welcoming space. Join me to learn what’s problematic to include in your code, why these things ought to be avoided, and what to write instead.",
            speakers: ["Valarie Regas"],
        },
        {
            title:
                "Exploring Stateful Microservices in the Cloud Native World",
            description:
                "While stateless systems are easier to architect, design, and implement, the truth of the matter is that we live in a stateful world in which we need to keep track of the state of data in a lot of cases. So how can we handle persisting data with containerized microservices in a Cloud Native world?",
            speakers: ["Grace Jansen"],
        },
        {
            title: "Measuring the Impact of Software Craft",
            description:
                "At the business level it’s hard to effectively measure the quality of software. We start quality initiatives and they don’t always work and we’re hard press to understand why. Our code coverage went up, our time to market decreased yet we’re still finding issues that slow us down. Time To Market is just one aspect of measuring speed. In this talk tie in delivery techniques to metrics and how business can use these metrics to shape their software craft transformations.",
            speakers: ["Ben Scott"],
        },
        {
            title:
                "Stranger Danger: Your Java Attack Surface Just Got Bigger",
            description:
                "Building cloud-native Java applications is undoubtedly awesome. However, it comes with undeniable new risks. Next to your own code, you are relying on so many other things. Blindly depending on open-source libraries and Docker images can form a massive risk for your application. The wrong package can introduce severe vulnerabilities into your application, exposing your application and your user’s data. Join this hands-on Java cloud-native live-hacking session where we’ll show common threats, vulnerabilities, and misconfigurations. Most importantly, you’ll learn how to protect your application with actionable remediation and best practices",
            speakers: ["Brian Vermeer"],
        },
        {
            title: "On the Edge of My Server",
            description:
                "Edge functions can be potentially game changing. You get the power of serverless functions but running at the CDN level - meaning the response is incredibly fast. All the providers are piling into the space – AWS, Cloudflare, Netlify and Vercel to name just a few – but all the offerings are quite different. In this talk, we’ll explore why edge functions can be powerful, the different offerings available, and examples of how you can use them on different providers.",
            speakers: ["Brian Rinaldi"],
        },
        {
            title: "Making Maven Marvelous",
            description:
                "Have you ever used Maven, ran into a bug and thought: “How on earth can a project this old have this bug?”. Then join this session! Maven, although a well-known and well-trusted project, is run by a relatively small bunch of people. There’s simply more work to do than these people can do!\n" +
                "\n" +
                "So instead of getting angry, or looking for alternatives, you can contribute to Maven yourself and work on making it even better. Join us on our journey from “how on earth” to “works like heaven”. We’ll discuss how we did it, what we did, and most importantly: how you can start contributing to Maven as well!\n" +
                "\n" +
                "As you walk out the room, better reserve some time in your calendar to start working on that bug ;-).",
            speakers: ["Giovanni van der Schelde"],
        },
        {
            title: "What's \"Loom\"ing in Java: The Why and What of Project Loom",
            description:
                "Multithreading has been in Java from day one. The multithreading API has gone through significant changes over the years. And yet, we have something major that’s threading again. What’s the reason for yet another implementation, yet another change? How is that different from what we already have. When will we use the new model and when will we stick to the existing APIs.\n" +
                "\n" +
                "Too many questions but we will not take them all in parallel. Instead we will give the questions serious thoughts and get a deeper understanding of the purpose of Project Loom, what problems it solves, and how and when we can benefit from it.",
            speakers: ["Venkat Subramaniam"],
        },
        {
            title:
                "Container Usage Patterns",
            description:
                "Embraced containers yet? If so, that only presents the beginning of the journey. Designing your images to be lean, and your containers configurable requires us to leverage Dockerfiles to their maximum potential. At scale, everything matters—build times, testing, multi-stage builds, conventions around tagging and logging. There is a whole ecosystem of tools around how we can best build our images and containers.\n" +
                "\n" +
                "In this session we will learn many a trick on how we can leverage Docker’s own tooling as well as third-party tools to ensure that our first steps in the container world are the right ones.",
            speakers: ["Raju Gandhi"],
        },
        {
            title:
                "How does a matching engine work?",
            description:
                "Electronic exchanges have allowed global markets to become digital. At the heart of an exchange sits a “matching engine” application. Being ultimately responsible for connecting buyers and sellers, a matching engine poses difficult technical challenges around latency, high availability, fairness, determinism, auditability, stability, etc. In this presentation we will discuss the journey we traveled to build new matching engines at the Intercontinental Exchange, and how we addressed each of those concerns.",
            speakers: ["Juan D Bustamante"],
        },
        {
            title:
                "What’s New in Spring in 2022",
            description:
                "Spring Framework 5, Spring Boot 2, and Spring Cloud have had stable versions since 2017-2018. This year each active Spring project will have a new major release. We will talk about the practical implications of changes to the Java baseline, Jakarta EE, native compilation, observability and more. We will discuss the support options for remaining on the existing generation. We will show what upgrading an existing application looks like using the latest milestones.",
            speakers: ["Spencer Gibb"],
        },
        {
            title:
                "Quarkus. A Bliss for developers",
            description:
                "Everyone is excited about Quarkus, the Kubernetes Native Java stack that lets you create Java applications with a small memory footprint and amazingly fast boot time (just some milliseconds) offering near-instant scale-up and high-density memory utilization in container orchestration platforms like Kubernetes and a perfect match for serverless. But these capabilities are useful at runtime, but what does Quarkus offer to developers to use at development time?",
            speakers: ["Alex Soto"],
        },
        {
            title:
                "Supercharge your Ingress with Kong",
            description:
                "During this talk, you will learn how to declaratively enable security, API rate limiting, how to add native gRPC support using Kong Gateway and plugins.",
            speakers: ["Viktor Gamov"],
        },
        {
            title:
                "Removing complexity from integration tests using Testcontainers!",
            description:
                "Integration tests are essential for testing both microservices and enterprise applications. Learn the best practices of using Testcontainers to make integration tests fast, flexible, stable, & repeatable.",
            speakers: ["Oleg Šelajev"],
        },

    ];

    tuesSessions = tuesSessions.map((s) => {
        s.presenters = s.speakers;
        delete s.speakers;
        return {...s, date: new Date(2022, 3, 13, 6, 0, 0, 0)};
    });

    for (let p of tuesSessions) {
        await prisma.session.upsert({
            where: {title: p.title},
            update: {},
            create: p,
        });
    }

    const wedSessions = [
        {
            title:
                "The Future is Kube-Native",
            description:
                "We’ve heard about Cloud and Cloud-Native in the past years, but don’t be mistaken: the future is Kube-Native. Kubernetes is an open-source platform that runs everywhere, and ensuring that applications are Kube-Native allows you to reuse your super skills no matter where you deploy.\n" +
                "\n" +
                "Join us in this session to learn how a common set of best practices regarding patterns and tools can help you solve today’s challenging problems in monolithic and microservices architectures.\n" +
                "\n",
            speakers: ["Edson Yanaga"],
        },
        {
            title: "Getting Caught up with Kotlin",
            description:
                "Kotlin is one of the industry’s newest darlings. It’s sleek. It’s succinct. It’s seemingly everywhere these days. It gets crazy amounts of hype but is it worth it? I say yes, of course, but it’s actually easy to find out for yourself! This talk will go over the basics of the syntax and show scads of examples of how Kotlin can make your life easier. And it’s not just for mobile development! We’ll look, briefly, at a number of preexisting libraries that have nothing to do with mobile dev that you can use today in whatever project you have in mind. Curious about Kotlin? Come join the journey and find out more!",
            speakers: ["Justin Lee"],
        },
        {
            title: "Bootiful Edge Services",
            description:
                "Hi, Spring fans! So much of the difficulty of microservices is not the services themselves, but the clients that connect to them. There are just so many things that can go wrong or cause bumps on the road to production! Clients may not speak the same protocols as the services to which they’re connecting. Clients may need to adapt the data coming from services to suit their use cases, tailoring them to the user interface’s particular requirements. Join me, Spring Developer Advocate Josh Long (@starbuxman) and we’ll look at how to use reactive programming to build better API adapters, how to use Spring GraphQL to build better data integration gateways, and we’ll look at Spring Cloud Gateway to build API gateways.",
            speakers: ["Josh Long"],
        },
        {
            title: "Typescript for the busy Java developer",
            description:
                "Even if you haven’t used Javascript, you have probably heard scary stories about an inconsistent language, with no type system, that is used by almost every single modern web application that runs in your browser. What if I tell you that it is also used for backend services! Oh, the horror! As a Java backend developer, that idea gives me the chills. Typescript to the rescue! Typescript is a modern language developed by Microsoft that’s built on top of Javascript, adding additional syntax, tooling and most importantly, a type system! This talk provides an introduction to the language, we’ll explore some similarities and differences with Java through code examples!",
            speakers: ["Orlando Valdez"],
        },
        {
            title: "DevOps for Java Shops",
            description:
                "DevOps is great, if you have the people, processes and tools to support it. In this session I’ll highlight the easiest ways for Java developers to work with their IT organizations and partners to deliver their code to the cloud, including the best ways to reliably make updates and maintain production cloud code. The focus is on real-world examples using Linux command line tools, open source tools including Jenkins, and other free SDKs and tools available on GitHub.",
            speakers: ["Brian Benz"],
        },
    ].map((s) => {
        s.presenters = s.speakers;
        delete s.speakers;
        return {...s, date: new Date(2022, 3, 14, 6, 0, 0, 0)};
    });

    for (let p of wedSessions) {
        await prisma.session.upsert({
            where: {title: p.title},
            update: {},
            create: p,
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
