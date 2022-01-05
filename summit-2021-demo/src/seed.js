const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const products = [];
  products.push({
    name: "Gateway",
    description:
      "Kong or Kong API Gateway is a cloud-native, platform-agnostic, scalable API Gateway distinguished for its high performance and extensibility via plugins.",
    type: "oss",
  });

  products.push({
    name: "Insomnia",
    description:
      "Insomnia is an open-source, cross-platform API Client for GraphQL, REST, and gRPC.",
    type: "oss",
  });

  products.push({
    name: "Developer Portal",
    description:
      "The Kong Developer Portal provides a single source of truth for all developers to locate, access, and consume services. With intuitive content management for documentation, streamlined developer onboarding, and role-based access control (RBAC), Kong’s Developer Portal provides a comprehensive solution for creating and customizing a unified developer experience.",
    type: "enterprise",
  });

  for (let p of products) {
    await prisma.product.upsert({
      where: { name: p.name },
      update: {},
      create: p,
    });
  }

  // Sessions
  let tuesSessions = [
    {
      title:
        "Transforming Customer Experience with Cloud-Native Patterns using EKS, GitOps and APIOps",
      description:
        "The Department for Work and Pensions (DWP) is the UK’s largest government department responsible for welfare, pensions and child maintenance policy. Join DWP's Jacqui Leggetter, Head of Integration and Dean Clark, Technical Lead, as they discuss how DWP is transforming through their recovery from the pandemic by focusing on re-use and holistic citizen/agent facing services. This session will talk about:- The human impact of APIs- How DWP is offering a distributed network of gateways deployed in Kubernetes containers- How DWP is promoting GitOps and APIOps as best practices",
      speakers: ["Jacqui Leggetter", "Dean Clark"],
    },
    {
      title: "Opening Keynote: Developing the Connected World",
      description:
        "Join Kong's co-founders, along with special guests, live as they explore cloud connectivity in today's digital world and what that means for modern, connected enterprises. They will also unveil the latest in Kong products and technology -- be the first to see a sneak peek of Kong's newest features and updates.",
      speakers: ["Augusto Marietti", "Marco Palladino", "Reza Shafii"],
    },
    {
      title:
        "Identity Proxy: Microservice Security So Your Developers Don't Have To!",
      description:
        "Securing your APIs and web applications in today's world is a challenge every developer faces on top of the already complex work of simply building their services. In this talk, we'll explore how we at Vanguard have used Kong (and a few other friends!) to help shift the security requirements away from the application itself so that our developers can focus on what they're best at: developing applications! I'll be stepping through how we leverage a combination of Kong and some open standards to protect all of our apps and services, how this pattern can improve the overall developer experience, and how you can do the same at your organization.",
      speakers: ["Ryan Swanson"],
    },
    {
      title: "How to Run APIs at Scale: An Insider’s Guide",
      description:
        "APIs and microservices are seeing explosive growth in large organisations. All that growth means that the challenge of managing and governing APIs is getting even more difficult. In this talk, we'll cover the principles, practices and patterns we've used to help global banks manage APIs and microservices at scale.Attendees will learn about:* How to design a target architectural and operating model for success* The technology stack you need to succeed* Challenges, blind spots and lessons learned from our experience in large-scale digital transformation",
      speakers: ["Ronnie Mitra"],
    },
    {
      title: "Controlling Your Kong Gateway With decK and CI/CD",
      description:
        "We used to configure services by hand, then came tools such as Puppet, Chef and Ansible. Then we used to build infrastructure by hand, and we got tools like Terraform and Pulumi. So why are we still configuring routes and plugins in Kong manually?This session will introduce you to Kong’s declarative configuration capabilities and how to use your CI system to lint and apply these configurations in a variety of environments. Test your changes in a staging environment, then apply exactly the same config to production with a click of a button.",
      speakers: ["Michael Heap"],
    },
    {
      title: "Unifying Commerce APIs With Kong",
      description:
        "Bold has been part of the e-commerce explosion since the early days of Shopify and delivering apps that provide extended value for merchants. Bold has evolved from an app-focused to an API-first company that delivers headless commerce and composable solutions for brands on multiple platforms. This talk will outline how we transitioned from siloed apps to a unified API for our commerce capabilities, including centralizing cross-cutting concerns such as authentication, rate limiting and custom behaviour. We’ll also discuss our increased focus on developer experience with partners, agencies and large commerce brands.This session explores how Kong supports Bold’s unified API and MACH architecture (microservices, API-first, cloud native and headless) to provide scalable commerce solutions for our brands.",
      speakers: ["Mark St.Godard"],
    },
    {
      title: "Be Supportive: Legacy Protocols in a Modern World",
      description:
        "In this session, we will talk about how enterprises can leverage Kong to support legacy protocols such as SOAP on their journey of digital transformation into a modernized API-enabled platform.",
      speakers: ["Aaron Weikle"],
    },
    {
      title:
        "Using Kong to Accelerate Your Digital Transformation: FactSet's Journey With Kong",
      description:
        "In this talk, I'll discuss how FactSet has leveraged Kong to begin retiring its legacy API platform, migrate to AWS, consolidate its API ingress solutions, and dramatically reduce the time it takes for developers to create and update APIs for FactSet clients.",
      speakers: ["Stephen Tyree"],
    },
    {
      title:
        "Best Practices and Architectural Patterns to Build a Cloud Fabric Layer Using Kong on AWS",
      description:
        "Kong Enterprise provides a modular approach in building a cloud fabric layer on AWS, which unlocks multiple use cases and architectural patterns to be built on AWS. In this session, we will uncover some of the use cases, along with their respective architectural patterns and associated best practices. Attendees will leave the session with:* How to correlate use cases with Kong on AWS architectural patterns* Best practices for using Kong on AWS for the respective architectural patterns* In-depth understanding of AWS services used",
      speakers: ["Anuj Sharma"],
    },
    {
      title:
        "Beyond the Wall: Breaking Barriers to Innovation and Modernization",
      description:
        "Enterprise software companies are all dealing with some amount of legacy technology, monolithic systems, aging code bases and other constraints. This can seem like a barrier to adopting modern tooling such as API gateways or service mesh and to incorporating microservice architectures and other design paradigms.  We will take a look at RealPage's journey to embracing some modern concepts such as microservices architecture and how we arrived at Kong as an API gateway solution. We'll discuss how Kong has enabled us to take a pragmatic approach to this modernization and blend new development with legacy systems, as well as the next set of yet-to-be-solved challenges and how we see Kong and other tools helping that next phase of the journey.",
      speakers: ["Travis Koenig", "Piotr Gruszecki"],
    },
    {
      title: "GitOps, the Next Big Thing for DevOps and Automation",
      description:
        "Today, we are quickly moving towards GitOps and making Git as a single source of truth for everything. In this talk, I will cover questions like: - What’s GitOps?- Why we are moving towards this?- How and when can one implement this strategy in the current running environment?- What are the tools it includes?",
      speakers: ["Aditya Soni"],
    },
    {
      title:
        "Konnect-ing the Dots Across Organizational Silos: APIOps at the Core of API Transformation",
      description:
        'Microservices architecture organically grew into large distributed realities. With distribution, coordination has become the main challenge when considering team complexities and governance. Infrastructure also evolved first to the cloud and then to an aggregation of different environments. The service mesh then became the fulcrum of this transformation (or we better say (r)evolution), and "APIOps" helped this transition by alleviating the delivery challenges from the different teams. Connectivity transformed how we design modern distributed architectures that need to be reliable, resilient and scalable. In this session, we are tackling the reference architecture for continuously delivering APIs at scale by leveraging the full Kong toolchain to achieve the ultimate planetary scale and hybrid service mesh across multiple clouds/environments using Konnect.',
      speakers: ["Luca Maraschi"],
    },
    {
      title: "Turning Infrastructure Into Software Through Cloud Engineering",
      description:
        "In this talk, I will demonstrate why defining infrastructure in general programming languages is a better choice for infrastructure management. From defining resources to testing and validation, software engineering processes and best practices can be applied to cloud infrastructure to help teams ship faster.Pulumi is an open-source tool that allows users to write their infrastructure code in TypeScript, Python, DotNet or Go. General-purpose languages allow infrastructure code to have integrated testing, compile-time checks as well as being able to create infrastructure APIs and is more suited to infrastructure management than DSLs, JSON or YAML. In addition, Paul will demonstrate how to build infrastructure that manages serverless, Kubernetes, PaaS and IaaS systems across multiple cloud providers.",
      speakers: ["Matt Stratton"],
    },
    {
      title:
        "Work Smarter, Not Harder: Using ML to Observe Your Kuma API Metrics",
      description:
        "Observability is catching on these days as the de-facto way to provide visibility into essential aspects of systems. It would be unwise for you not to leverage it with Kuma service mesh — the place that allows your services to communicate with the rest of the world. However, many observability solutions restrict themselves to the works: simple metric collection that provides them with dashboards. Expecting users to simply sit on their chairs and look at those metrics all day long is an invitation to failure, as we know that one can only do so much when they get tired and bored.This talk will change the status quo and show how you can work smart by combining the flexibility of Kuma with the power of the Elastic Stack to ingest, store and analyze massive amounts of data. Join to learn how to collect metrics from Kuma via Prometheus, bring these metrics into Elasticsearch using Metricbeat and create machine learning jobs to look for anomalies that can alert you when something interesting happens.",
      speakers: ["Ricardo Ferreira", "Viktor Gamov"],
    },
    {
      title:
        "Service Mesh 101: Understanding the Basics of Envoy Configuration",
      description:
        "One step in understanding how Kuma and Kong Mesh work is understanding the basics of how they configure Envoy in response to service mesh configuration. In this session, you will learn the basics of Envoy configuration, get introduced to Envoy's xDS APIs, and see some real-world examples of how Kuma and Kong Mesh program Envoy to enact policies.",
      speakers: ["Scott Lowe"],
    },
    {
      title: "Kong for API Management and Integration Needs at Lytx",
      description:
        "Lytx is a leading provider of complete fleet management solutions using machine vision and video telematics. Lytx is empowering its technology teams to focus on agility instead of application management by migrating applications to microservices and leveraging Kubernetes. In this session, Maggie Moradi will discuss how Lytx has leveraged Kong to manage its customer API portfolio, transformed to microservices, integrated with CI/CD and used Kong as an API gateway to manage connectivity across different cloud accounts.",
      speakers: ["Maggie Moradi", "Patrick Farry"],
    },
    {
      title:
        "Zero Trust for APIs: Securing Userless APIs with Multi-Factor Authentication",
      description:
        "Cyber attacks against APIs are accelerating. Much of the cybersecurity focus has been on protecting APIs that back applications used by humans. However, a large segment of API traffic is between machines, where no human is involved. Security solutions for this userless API segment have proven difficult, but a new security approach has emerged leveraging cybersecurity lessons learned in the human user context. Corsha has developed a method for dynamic, fully automated multi-factor authentication (MFA) for userless API traffic. In this session, we will explain the security principles involved, how MFA can be implemented in connection with modern automated pipelines and how Corsha is working with Kong to make this security solution available to enterprises.",
      speakers: ["Anusha Iyer"],
    },
    {
      title: "Keeping You Up (to Speed) With Insomnia",
      description:
        "Hear about the latest and greatest innovations with Insomnia, the industry-leading API development tool for designing, debugging and testing. Along with recently delivered features, you'll hear about our vision, strategy and roadmap. Don't blink -- you'll want to catch everything.",
      speakers: ["Wils Dawson"],
    },
    {
      title:
        "Automated APIs for Scaling Enterprises: How to Set Standards and Create Smooth API Implementations",
      description:
        "API standards and schemas have helped to automate much of API design, implementation and maintenance -- and not a moment too soon. As many tech companies experienced growth spurts in the past year, they ended up with multiple teams working on new products and new APIs. Consequently, they learned that their ways to create well-designed APIs wouldn't work so easily when multiple teams have to create them.Thanks to new solutions (centralized around a good API gateway), growing companies can establish a scalable system for designing, implementing and launching consistent APIs across many teams. We’ll share best practices and solutions from experiences with enterprises in this phase to understand how to be effective working across Product, Infrastructure and Engineering teams to do so.",
      speakers: ["Jeremy Glassenberg"],
    },
    {
      title: "Building a Platform for Self-Service at Scale",
      description:
        "How do you scale a self-service experience to hundreds of developers across tribes and across locations in a large organisation? Offering a self-service experience means putting the power to deploy and promote services into the hands of a developer. Owning an enterprise platform means always knowing the state of your platform and what’s deployed to it. These needs can appear as a paradox, but this talk will describe how we have designed a platform, backed by Kong, that satisfies both of these needs and resolves the apparent paradox. By the means of thoughtful design, the platform and platform owner can retain control of their environments while also handing the keys to deployment to their users -- elevating self-service beyond the pull request.",
      speakers: ["Nicole Renvoize", "Martin Brennan"],
    },
    {
      title: "Kuma Service Mesh and Backstage.io at American Airlines",
      description:
        "At American Airlines, we are working to modernize and automate the developer expierence. We have implemented Kuma on our clusters within the Developer Experience product to enable multi-cluster connectivity for our application teams as well as automate the application of Kuma policies within the service mesh. Witness how American Airlines has used Backstage.io to automate the developer experience and  Kuma service mesh to connect our apps between regions. We will share our experience working with Kuma and the plans we have to automate policies in the service mesh.",
      speakers: ["Karl Haworth"],
    },
    {
      title: "The Application Modernization Journey at DBS",
      description:
        "DBS has been ranked as the world's best bank and best digital bank. API strategy has played a crucial role in DBS’ digital transformation journey. Although the bank already had another API solution in place, they found it challenging to keep up with increasing demands as they moved into a microservices architecture. About two years ago, after a comprehensive evaluation process, the bank adopted Kong as the next-generation API platform to support future growth. Since then, Kong has been deployed both as an internal and external gateway thanks to its lightweight architecture and agnostic platform support. Join DBS’ Siddhartha Singh as he discusses how they have been leveraging Kong Gateway to offload the legacy API gateway and to use it as an abstraction layer to modernize the core applications behind the APIs. With the flexibility provided by Kong via custom plugins, DBS has been able to implement reusable custom logic so that developers can focus on the business use cases and innovate faster.",
      speakers: ["Siddhartha Singh"],
    },
    {
      title:
        "Styra DAS & Kong Mesh: Policy-as-Code to Control Microservice-Based Communication at Scale",
      description:
        "It wasn't that long ago that coarse-grained access control lists (ACL) rules on a network firewall were enough to satisfy security requirements. As application architectures have become more distributed — composed of multiple microservices, housed in containers, the way we control access between resources has evolved from focusing on hosts/IPs to one based on services and message payloads. That's why our team here at Styra created Open Policy Agent, which supports a cloud-native, declarative, policy-as-code model for defining and enforcing authorization and other policies.  Join us as we share how world-class organizations are using Kong Mesh and API Gateway with Styra Declarative Authorization Service (DAS) to address these challenges, accelerate their microservices strategy and provide their teams of operators and developers with a platform that deliver the ability to:- Manage policy-as-code as part of an established GitOps process- Validate the impact of policy changes before committing or deploying- Distribute policy across clusters, clouds and teams- Monitor authorization decisions (in real-time and historically) to ensure policy works as expected",
      speakers: ["Corin  Imai"],
    },
  ];

  tuesSessions = tuesSessions.map((s) => {
    s.presenters = s.speakers;
    delete s.speakers;
    return { ...s, date: new Date(2021, 8, 28, 12, 0, 0, 0) };
  });

  for (let p of tuesSessions) {
    await prisma.session.upsert({
      where: { title: p.title },
      update: {},
      create: p,
    });
  }

  const wedSessions = [
    {
      title:
        "Managing Self-Service at Scale: How Comcast Manages their API Platform Across Multiple Service Teams",
      description:
        "This presentation is for engineers interested in building tooling and processes for a self-service API Platform that can scale to dozens of teams. How do you manage access for your developers? Are there constraints to IDP driven role assignment? How do you reduce friction while still maintaining control of your platform? In this presentation Tyler Rivera, Principal Engineer at Comcast Connected Living will discuss Comcast's strategy for managing Developer Portals, Workspaces, onboarding, and role assignment across multiple service teams in a self-service environment. Tyler will walk through Comcast's declarative configuration solution to these problems, discuss some of the challenges encountered, lessons learned, and future efforts towards building a large-scale self-service API Platform for a diverse ecosystem of services.",
      speakers: ["Tyler Rivera"],
    },
    {
      title: "Digital Acceleration in Global Pharma",
      description:
        "To build the needed business agility in drug research and quickly enable the roll-out of new vaccines and drugs, a major global pharma company embarked on a digital acceleration journey encompassing their R&D, Pharma, Vaccine and other core divisions. The customer partnered with TCS to re-imagine its IT landscape for drug research to vaccine delivery. As a first step, the cloud-based digital integration backbone was envisioned and implemented, integrating data from multiple sources and making it available in a secure, democratized and seamless manner to different external and internal partners/stakeholders for consumption and decision-making. Post this, modernizing legacy applications using cloud native principles and migrating to the cloud is being undertaken. This has helped streamline and improve time to market for the vaccine R&D to delivery lifecycle.",
      speakers: ["Vinita Dargan"],
    },
    {
      title: "Delivering APIs at Scale With APIOps and Kong at Lombard Odier",
      description:
        "Organisations are increasingly adopting federated delivery models to support the demand and pace of digital transformation. Learn how Lombard Odier's central IT team has shifted from service providers to service enablers, leveraging modern engineering principles to accelerate delivery teams at scale whilst maintaining quality and consistency using APIOps with Kong. In this session, Ludovic Pourrat will cover how to:• Automate the standardization and governance of APIs as part of the CI/CD pipeline• Deliver a seamless API management experience through declarative configuration• Provision Kong Dev Portal and Kong Gateway using Infrastructure as Code• Generate consumable documentation for development teams",
      speakers: ["Ludovic Pourrat"],
    },
    {
      title: "Accelerating Service Mesh With Intel's 3rd Gen Xeon",
      description:
        "As more and more enterprises migrate from a monolithic application stack to microservices-based architecture patterns, service mesh security and performance becomes more important than ever. By using Intel’s new AVX512 crypto capabilities and Envoy upstream codebase, service mesh implementations such as Kuma can offload TLS handshakes in order to handle more connections, with lower latency and save CPU cycles to other activities.In this talk, we'll discuss in which scenarios your service mesh will gain from the acceleration and how to deploy and configure your mesh to get the best possible performance.",
      speakers: ["Sakari Poussa"],
    },
    {
      title: "Nigerian Central  Switch APIs - Zero to Hero!",
      description:
        "Nigeria Inter-Bank Settlement System Plc (NIBSS), otherwise referred to as the Nigeria Central Switch (NCS) was incorporated in 1993 and is owned by all licensed banks in Nigeria including the Central Bank of Nigeria (CBN).With an ever-increasing demand for digital payments from existing and new entrants in the Nigerian payments space, NIBSS recently embarked on a transformative journey to become a world-class shared utility for the Nigerian payments industry. At the heart of this is to create a modern API platform that standardizes all NIBSS APIs, scales efficiently and creates a world-class developer experience. In this session, Aminu Maida, Executive Director - Tech & Ops and Yusuf Sheriff, Strategy & Research Associate at NIBSS, will talk about the role played by Kong in helping to begin this journey of transformation.",
      speakers: ["Aminu Maida", "Yusuf Sheriff"],
    },
    {
      title: "The Emperor's New Clothes: A Tale About Legacy and Cloud",
      description:
        "We all dream of the cloud and the possibilities it offers in terms of the respective application landscape. In reality, however, there are heavyweight machines in the server rooms that quickly destroy the dream. Well, there is a need for solutions that help one get out of this dilemma.In his session, Daniel Kocot will show how legacy systems can be technologically brought into the modern era with the help of integration patterns, APIs, containers and gateways or service meshes.",
      speakers: ["Daniel Kocot"],
    },
    {
      title:
        "Using a Hybrid Multi-Cloud Architecture With an IaC, GitOps-Powered Approach at Kore Labs",
      description:
        "As the world’s first Product Relationship Management (PRM) SaaS platform, Kore Labs delivers a cloud-enabled solution that provides financial institutions with the ability to digitize data and events throughout the financial product lifecycle, from ideation to retirement. In this session, Angelo Ovidi, chief architect and head of technology at Kore Labs, and James Farquhar, CTO at Kore Labs, will discuss how the company has adopted an API-based, modular approach with Kong to ensure safe, secure and reliable integration for many of its leading financial institutions. This session will explore how Kore is leveraging Kong’s API gateway to automatically deploy its microservices-based SaaS platform via strict CI/CD pipelines on hybrid/multi-cloud and Kubernetes environments.",
      speakers: ["Angelo Ovidi", "James Farquhar"],
    },
    {
      title: "Top New CNCF Projects to Look Out For",
      description:
        "The Cloud Native Computing Foundation (CNCF) brought you such fan favorites like Kubernetes and Prometheus. In this talk, Annie Talvasto will introduce you to the most interesting and coolest upcoming CNCF tools and projects.This compact and demo-filled talk will give you ideas and inspiration that you can: 1) discover new technologies and tools to use in your future projects as well as 2) be the coolest kid in the block by being up to date with the latest and greatest.",
      speakers: ["Annie Talvasto"],
    },
    {
      title:
        "Kong as a Strategic Initiative to Smoothly Migrate Legacy Systems to a Modern Security Concept",
      description:
        "API gateways are a classic, efficient way of managing services and the communication between them. But applying service orientation within a larger environment of legacy systems and a heterogeneous mix of distributed software can be cumbersome and really time-consuming. The introduction of modern authentication frameworks like OAuth2 and OpenID Connect is especially a challenge. The use of Kong as an API gateway can leverage different aspects of migration activities. In this talk, I will share our journey at GfK of modernization and security enhancement with Kong and how we intend to move a large number of services and web applications within a hopefully short time to the next generation.",
      speakers: ["Victor Sauermann"],
    },
    {
      title: "Securing Serverless Applications Using Azure",
      description:
        "Serverless is all about increasing a developer's productivity by reducing the management burden and allowing you to focus on the application logic. But even for serverless applications, security is the major key!In this session, I will guide you on how to secure your serverless applications built in Microsoft Azure. We are going to take a deep dive of the different options for securing your serverless apps, such as using the Azure Key Vault, ClaimsPrincipal binding data for Azure Functions and much more.",
      speakers: ["Shodipo Ayomide"],
    },
    {
      title: "Building API as a Product",
      description:
        "As an industry, we talk a lot about APIs and integrating businesses through them.  It's relatively easy today to get a microservice up and running, design APIs and then expose them through an API gateway. But do we focus enough on getting the right microservices boundaries and the right API surface area?In this talk, Rob Prince, Senior Technology Manager at Just Eat Takeaway, will cover how to: - Align microservices to business process models - Provide the right information architecture for APIs - Group APIs together to make API-as-a-Product - Run effective API governance for the creation and maintenance of APIs - Make the information visible to potential integrators",
      speakers: ["Rob Prince"],
    },
    {
      title: "Progressive Delivery in Kubernetes Without Service Meshes",
      description:
        "Will a new version of my service drive more traffic? Will it increase the overall latency of my application? Can I test it in production for a set of users first? Progressive delivery, A/B testing or canary deployments are strategies that help answer those questions by splitting and shifting network traffic in a controlled manner.When implementing these strategies in Kubernetes, we may want to add a service mesh to our cluster to make it happen, but is that really required? In this talk, we’ll explain and demo several ways to implement progressive delivery in Kubernetes without requiring a service mesh. We’ll also cover some Kubernetes network internals to illustrate these concepts.Finally, we’ll introduce the Kubernetes Gateway API, a new extension to the Kubernetes API to standardize the different service networking implementations.",
      speakers: ["Ara Pulido"],
    },
    {
      title: "Developing an API-First Mindset at Telus",
      description:
        "APIs have become critical tools for business growth and agility. With APIs becoming such a central part of many companies' digital strategies, it becomes essential to have proper API lifecycle management in place. In this session, Randi Bryne reviews the journey that Telus is taking, developing a program with a grassroots approach to consolidating their end-to-end lifecycle management for APIs. This session will cover how Telus has:• Standardized different technologies and established the right fit governance to increase adoption and accelerate time to market• Deployed Kong to help smoothly transition to the cloud",
      speakers: ["Randi Byrne"],
    },
    {
      title:
        "Reducing Root Cause Analysis of Distributed and Deep Systems from 45 Minutes to 2 Minutes",
      description:
        "QuadCorps is a leading trusted partner for API and Integration Ecosystem transformations. In this session, QuadCorps' Andrew Kew, principal engineer, and Jeyaram Deivachandran, engagement lead, will share their experiences on what techniques and tooling have helped the most for narrowing down the root cause quickly and effectively, including: - How do you use those tools to identify patterns of behaviour in the system? - How can all of this be reasonably achieved without having to instrument code?DevOps and developers will walk away with a better understanding of how the right kind of tooling and technique can help in significantly reducing mean time to resolution (MTTR) while also boosting developer productivity.",
      speakers: ["Jeyaram Deivachandran", "Andrew Kew"],
    },
    {
      title:
        "Fireside Chat: Implementing Authorization for Cloud Native Applications",
      description:
        "Application modernization requires a plethora of different kinds of technological decisions, one of which is authorization. How do you control which actions your users can take and under what conditions? Modern applications require solving that problem throughout your application: from the frontend, to the backend, to the database, and so on. In this fireside chat, we will discuss best practices for using modern technologies like Kuma and Open Policy Agent to implement authorization within your application.",
      speakers: ["Tim Hinrichs", "Marco Palladino"],
    },
    {
      title:
        "Synchronous Communication Patterns: A Journey from ESB to APIs & Service Mesh",
      description:
        "Devoteam nexDigital is a leading IT consulting company specializing in the modernization and transformation of Information Systems. In this session, Yohann AGOSTINI, CTO at Devoteam nexDigital, will discuss how their customer, a major French insurance company, has redefined and evolved its legacy Enterprise Service Bus (ESB) integration architecture to a modern-day microservices and service mesh-based architecture. This session explores the benefits of adopting service mesh technology to handle the complex connectivity, security and reliability challenges between services deployed across VM-based and Kubernetes infrastructures.",
      speakers: ["Yohann AGOSTINI"],
    },
    {
      title:
        "Extending Kong via Custom Plugins: Cargill's Experience With Lua and Go",
      description:
        "As part of Cargill's API platform, we support multiple Identity Providers (IdP) in support of our API development community. Each IdP supports varying portions of the OIDC specification. In order to provide a consistent developer experience, Cargill created a solution to manage the revokation of access tokens using APIs fronted by the Kong API gateway and a plugin to check on the revokation status. Join Colin and Rob as they share their journey and experience implementing their own plugin (developed in both Golang and Lua) within Kong and share a live demonstration.",
      speakers: ["Colin Schaub", "Rob Hayes"],
    },
    {
      title: "The Importance of API Management Governance",
      description:
        "API management gives your organization a fantastic toolbox that enables digital transformation. In order to properly utilize these tools and gain the value a service mesh provides, it is important to define a proper governance framework and define your organization’s rules regarding:- Roles and responsibilities for development and a development portal- Service mesh vs. event mesh- API patterns and policies- Naming standards and metadata for applications and APIs- API lifecycles- Service mesh vs. integration platform- Monitoring, KPIs and distribution of this information During this session, we will go through the framework and show an example of how this adds value to your organization’s use of Kong.",
      speakers: ["Peter Kreiner-Sasady"],
    },
    {
      title: "Understanding 5xx and Other Errors in Your APIs Faster",
      description:
        "You've just added an API gateway to your setup, and now you're buried under a load of developer complaints that your services are not working. However, your API gateway is configured and working as intended. Your teams end up spending time they do not have troubleshooting 4xx and 5xx errors along with a wide variety of other common issues. The assumption is usually that the gateway is misconfigured; however, the issues are more likely due to problems with the upstream or downstream applications.  In this session, Derick Felsman will discuss the need for proper error management tools for your services and provide guidance for incorporating them as a critical component of your operational toolchain.",
      speakers: ["Derick Felsman"],
    },
    {
      title: "Monitoring and Troubleshooting APIs With Distributed Tracing",
      description:
        "As more and more organizations start using a combination of cloud and third-party APIs, monitoring and troubleshooting applications has become increasingly challenging. In this session, we will describe how to use distributed tracing to correlate metrics, logs and events to troubleshoot microservices-based applications effectively. We will also explore the must-haves for a modern observability solution.",
      speakers: ["Chinmay Gaikwad"],
    },
    {
      title: "Going Multi-Cloud: Running Kong at Scale Across AWS and Azure",
      description:
        "APIs and public cloud providers are key enablers in National Australia Bank’s (NAB) technology strategy. In this session, Jason D'Souza will talk about how and why NAB runs Kong across both AWS and Azure, as well as demonstrate how quickly NAB can swap API traffic between AWS and Azure hosted workloads.",
      speakers: ["Jason D'Souza"],
    },
    {
      title: "API and Microservices: DevOps to APIOps Designed to Connect",
      description:
        "What are we seeing in the world of APIs, integration and low code? Why is the developer and on up to the organization's experiences equally important? DevOps would not exist without microservices, and business value would not exist without APIs and collaboration among key stakeholders.",
      speakers: ["Emmelyn Wang"],
    },
    {
      title: "Transforming Connectivity With Kong",
      description:
        "First Abu Dhabi Bank is the largest bank in the United Arab Emirates and is leveraging microservice-based APIs to fast-track the digital transformation of its business. In this session, we will share how to run microservices at scale and the best practices/patterns on setting up different typologies of APIs within a multi-cloud setup. We will cover the following types of APIs to provide a practical example of how to build a foundation for a successful API strategy in the banking industry: • Customer channel APIs• Assisted channel APIs• B2B communication APIs• Customer information APIs with consent management",
      speakers: ["Jayakumar Ganesan"],
    },
    {
      title:
        "Proxies, Gateways and Meshes: Cloud Connectivity for Apache Kafka® Developers",
      description:
        "API gateway technology has evolved a lot in the past decade, capturing more prominent and more comprehensive use cases in what the industry calls “full lifecycle API management.” API gateways were just the management of the network runtime that allows us to expose and consume the APIs (RESTful or not) as well as secures and governs our API traffic. However, today they provide a series of functionalities to support the complete development cycle, including creation, testing, documentation, monitoring, event monetization, monitoring and overall exposure of our APIs.Then around 2017, another pattern emerged from the industry: service mesh! Service Mesh is an infrastructure layer for microservices communication. It abstracts the underlying network details and provides discovery, routing and a variety of other functionalities. Many attempted to describe the differences between gateways and service meshes, e.g., API gateways are for north-south traffic and service meshes for east-west traffic. I want to illustrate the differences between API gateways and service mesh — and when to use one or the other pragmatically and objectively. In this talk, I will also discuss the similarities and differences between the communication layer provided by gateways, service mesh and Apache Kafka. Finally, you will learn a few ways to use Apache Kafka within a service mesh architecture.",
      speakers: ["Viktor Gamov"],
    },
    {
      title: "Okta and Kong: Integrate Identity Into Your APIs",
      description:
        "Okta is the leading provider for identity and access management. With the number of microservices and APIs exploding, security is a bigger challenge than ever. With Okta's OAuth as a Service plugin, you can quickly add API Access Management to Kong Gateway. Authenticate once through Okta, enforce the token in Kong, and authorize API access quickly and securely.At Kong Summit 2021, Okta and Kong are excited to announce how they are expanding their collaboration with identity and APIs. In this session, attendees will learn best practices for API authentication and authorization and how the next phase of our partnership will make this even easier to implement. Be sure to join us for a live demo and what we're working on next.",
      speakers: ["Bharat Bhat"],
    },
    {
      title: "Running Secure IoT Services at the Edge",
      description:
        "Edge computing provides perhaps the most fertile ground we have had for truly realizing the power of the Internet of Things (IoT), but even as \"edge\" becomes the hot new buzzword, IoT has become (almost) commonplace -- and so have security threats. In this session, we'll look at how to get the advantages of IoT at the edge without falling into security black holes. You'll learn:- How edge changes Kubernetes services- Where service mesh fits into the picture- How to secure your devices- Network security concerns- Application security concerns- How to plan for mitigation (just in case)",
      speakers: ["Nočnica Fee"],
    },
    {
      title:
        "Developing the Fearless Girl: Changing the Tech World One Action at a Time",
      description:
        "Who was the first programmer in the world? Who designed the technology that kept submarines on course and is still used in Bluetooth today? Who led the team that created the onboard flight software for the Apollo missions, including Apollo 11? What is the ratio of women to men in the tech industry? Join Siew Choo Soh, head of technology for consumer banking and big data/AI at DBS Bank, as she discusses the under-representation of women in tech, the powerful impact they can make in tech roles and how you can bring change to the tech world.",
      speakers: ["Siew Choo Soh"],
    },
  ].map((s) => {
    s.presenters = s.speakers;
    delete s.speakers;
    return { ...s, date: new Date(2021, 8, 29, 12, 0, 0, 0) };
  });

  for (let p of wedSessions) {
    await prisma.session.upsert({
      where: { title: p.title },
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
