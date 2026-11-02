---
title: "How we applied Enterprise Design Thinking to build a data science experience in Cognos Analytics"
slug: "cognos-data-science"
projectId: "ca-datascience"
published: "2019-01-25"
readingTime: "8 min read"
originalUrl: "https://medium.com/@lehel/how-we-applied-enterprise-design-thinking-to-build-a-data-science-experience-in-cognos-analytics-67fd03b5da6a"
description: "How we applied Enterprise Design Thinking to build a data science experience in Cognos Analytics My design director messaged me about a year ago. “There’s a new squad being put together. Sort of …"
draft: false
---

<div class="story-anchor" id="88a9"></div>

My design director messaged me about a year ago. “There’s a new squad being put together. Sort of a side project for now but it could turn into something big. The goal is to give data scientists a home within Cognos. They’re looking for a designer to help drive the user experience. Are you interested?”

<div class="story-anchor" id="923b"></div>

<em>Sign. Me. Up.</em>

<div class="story-anchor" id="33b5"></div>

This case study covers the business case, our initial research, and how we used design thinking to kickstart the project.

<div class="story-anchor" id="5027"></div>

## The Business Goal

<div class="story-anchor" id="ec28"></div>

As companies continue to collect more and more information about us and the world at large, the demand for professionals who can effectively work with large amounts of complex data also continues to increase. In just the past 4 years, the number of searches and interest around the term Data Science on Google has increased over 300%. (And it shows no signs of slowing down.)

<figure class="story-figure wide"><a href="/images/case-studies/cognos-data-science/01.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-science/01.webp" alt="Google Trends Chart for Interest in “Data Science”, from Nov 2014 — Nov 2018." width="1000" height="260" loading="lazy" decoding="async" /></a><figcaption><a href="https://trends.google.com/trends/explore?date=2014-11-29+2018-11-17&amp;q=data+science">Google Trends Chart for Interest in “Data Science”, from Nov 2014 — Nov 2018.</a></figcaption></figure>

<div class="story-anchor" id="f40e"></div>

But regardless of the domain — from finance, to marketing, to healthcare, our research and customer feedback showed that most enterprise companies are still figuring out how to best leverage data scientists in their teams and processes. Some have it down better than others, but there is no great single solution out there — yet.

> I extract the data from SQL databases, some very large databases, and build my model in Python, get the outputs in CSV and do the visualization part in Tableau. It’s a longwinded process, I wish we could do it all in one tool.

> We would like the ability to embed Python, R or Spark code within Cognos Analytics… This would allow us to extend the functionality beyond what comes out of the box of Cognos or even Watson Analytics and really make this a powerful BI and analytics tool.

<div class="story-anchor" id="922e"></div>

So the business goal was simple — skate to where the puck is going to be as the market grows. We want to give our enterprise clients an end to end experience and tool where their data science teams and processes can mature.

<div class="story-anchor" id="8cc9"></div>

## Research

<div class="story-anchor" id="5eba"></div>

The first step was to better understand our users and validate some of our assumptions.

<div class="story-anchor" id="3eca"></div>

### Persona review

<figure class="story-figure wide"><a href="/images/case-studies/cognos-data-science/02.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-science/02.webp" alt="Building a data science experience — figure 2" width="1000" height="323" loading="lazy" decoding="async" /></a></figure>

<figure class="story-figure"><a href="/images/case-studies/cognos-data-science/03.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-science/03.webp" alt="Some of the thoughts and questions captured during our initial persona review" width="700" height="934" loading="lazy" decoding="async" /></a><figcaption>Some of the thoughts and questions captured during our initial persona review</figcaption></figure>

<div class="story-anchor" id="8de2"></div>

Data science is new to Cognos, but other products within the IBM Hybrid Cloud family have done work in this space. We leveraged their persona research as a starting point to better understand Chris –- our data scientist and primary persona.

<div class="story-anchor" id="4c7c"></div>

The second step was aligning around our secondary users, Lucas and Emette. Existing Cognos users most likely to work closely with data scientists in their org.

<div class="story-anchor" id="a509"></div>

### User research

<div class="story-anchor" id="ddaf"></div>

Using some of the questions we generated from our persona review, set up a few client interviews. We wanted to better understand their current data science workflow, the size and distribution of their teams and what their current workflow looked like. Here’s are some highlights from what we found:

-   The most popular tool by far was Jupyter Notebooks.
-   The most popular language by a healthy margin was Python, with R being second.
-   Most of their work involved cleansing and shaping data to be used by the rest of the business, but the lack of a unified environment posed challenges for data governance, version control of assets and even simply sharing and access.
-   Generating visualizations of the data was a secondary but still important task in their work.
-   The ability to use code within their existing IBM Cognos Analytics environment would also allow them to automate many labour intensive tasks they perform manually today.
-   Our customers wanted to leverage their own machine learning algorithms in their predictive work.

<div class="story-anchor" id="be42"></div>

### Market Landscape

<div class="story-gallery" style="--gallery-columns:368fr 334fr 300fr">
<figure class="story-figure"><a href="/images/case-studies/cognos-data-science/04.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-science/04.webp" alt="Building a data science experience — figure 4" width="368" height="880" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-science/05.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-science/05.webp" alt="Building a data science experience — figure 5" width="334" height="805" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-science/06.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-science/06.webp" alt="Building a data science experience — figure 6" width="300" height="809" loading="lazy" decoding="async" /></a></figure>
</div>

<div class="story-anchor" id="ed89"></div>

We also looked at the rest of the industry to see how our competitors such as Tableau and Power BI stacked up. What were the gaps in their solutions, where did we have an opportunity to differentiate our own approach, and how could we add value by integrating with other IBM products.

<div class="story-anchor" id="abd9"></div>

For both Tableau and Power BI, the integration limited and not scalable for deployment across large organizations. We also identified some potential security concerns.

<div class="story-anchor" id="4493"></div>

We decided to align ourselves as closely as we could with Watson Studio because frankly — based on our research, they got it right. Their integration of existing data science tools involved a light touch. Anyone familiar with Jupyter would feel right at home, and users could easily bring in outside assets and continue their work, rather than be forced to learn a new tool. Aligning with Watson Studio would also help ensure a smooth glide path for our customers between Cognos and the rest of IBM’s machine learning focused products.

<div class="story-anchor" id="4ae7"></div>

## Aligning around a common vision

<div class="story-anchor" id="9d11"></div>

Once we had a basic, shared understanding of the business needs and opportunities, as well as our users and their needs, we needed to put this into action and align on a single vision for our MVP.

<div class="story-anchor" id="2987"></div>

### Writing hills

<div class="story-anchor" id="eb29"></div>

If you’re not familiar with the concept of hills, they’re one of the keys to Enterprise Design Thinking at IBM, and how our teams work. You can [read more about them here](https://www.ibm.com/design/thinking/page/framework/keys/hills), but in short:

> Hills are statements of intent written as meaningful user outcomes. They tell you where to go, not how to get there, empowering teams to explore breakthrough ideas without losing sight of the goal.

<div class="story-anchor" id="36d7"></div>

Think of it like a Needs Statement on steroids. All hills have 3 components:

<div class="story-anchor" id="585a"></div>

<strong>The Who</strong>: Who is your target user?

<div class="story-anchor" id="0c05"></div>

<strong>The What</strong>: What problem are you solving, or what are you enabling them to do? What is the user outcome?

<div class="story-anchor" id="2ad8"></div>

<strong>The Wow</strong>: What’s the market differentiator? What makes this solution unique and impactful to your users (and in turn to your business)? The wow should be concrete and measurable.

<div class="story-anchor" id="1345"></div>

Here’s some examples from the above link.

<figure class="story-figure wide"><a href="/images/case-studies/cognos-data-science/07.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-science/07.webp" alt="Building a data science experience — figure 7" width="1000" height="477" loading="lazy" decoding="async" /></a></figure>

<div class="story-anchor" id="00d8"></div>

One more thing about hills — they are living documents. A hill’s primary purpose isn’t to act as a commandment set in stone. It’s to keep teams aligned around a shared, user focused outcome. It can and <strong>should</strong> be refined or even changed all together as our understanding improves.

<div class="story-gallery" style="--gallery-columns:632fr 369fr">
<figure class="story-figure"><a href="/images/case-studies/cognos-data-science/08.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-science/08.webp" alt="Building a data science experience — figure 8" width="632" height="663" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-science/09.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-science/09.webp" alt="Building a data science experience — figure 9" width="369" height="2042" loading="lazy" decoding="async" /></a></figure>
</div>

<div class="story-anchor" id="a219"></div>

Above are the hills we first came up with, going from sticky notes to a first draft. Below are the same hills after a few revisions over time.

<figure class="story-figure"><a href="/images/case-studies/cognos-data-science/10.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-science/10.webp" alt="Building a data science experience — figure 10" width="700" height="442" loading="lazy" decoding="async" /></a></figure>

<figure class="story-figure"><a href="/images/case-studies/cognos-data-science/11.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-science/11.webp" alt="Building a data science experience — figure 11" width="628" height="837" loading="lazy" decoding="async" /></a></figure>

<div class="story-anchor" id="b88a"></div>

### Wrapping things up and figuring out what we don’t know

<div class="story-anchor" id="999b"></div>

While the research was an ongoing effort, the bulk of the above work was tackled over a multiday kick off workshop I ran with my dev team and our PM in Ottawa.

<div class="story-anchor" id="cacd"></div>

After we had written the first draft of our hills, it was time to determine next steps. What were the things development could start on immediately, and what things still needed investigation? As we discussed, we kept uncovering more and more questions.

<div class="story-anchor" id="43b0"></div>

I asked my teammates to write their questions down and put them up. Once all the questions were up, we drew a grid, then discussed, grouped and prioritized each question.

<div class="story-anchor" id="ce5b"></div>

This is especially helpful in situations where teams are dealing with a lot of ambiguity. Doing this now (and following it up during sprint retros), helps teams share knowledge, understand the risks, prioritize what needs attention and (hopefully) avoid nasty surprises later on.

<div class="story-anchor" id="a311"></div>

## Reflections

<div class="story-anchor" id="13d0"></div>

At this point we had enough of a foundation to start production work. Our journey from this initial kickoff to how our team delivered on our MVP warrants its own write up — but for now I wanted to close this piece with a bit of reflection, and give a giant shoutout to my dev team and PM. They were <strong>awesome.</strong> They actively sought out design involvement in the project from the get-go, and even people who were new to design thinking were open to doing things a little differently and getting out of their comfort zone.

<div class="story-anchor" id="fe90"></div>

But not all teams are as strong and there are a lot of misconceptions out there about what design thinking is and isn’t.

<div class="story-anchor" id="a6ee"></div>

Execs and PMs sometimes treat Design Thinking as some magic formula, that after a one off workshop will make their product “user centric” and “UX driven”.

<figure class="story-figure wide"><a href="/images/case-studies/cognos-data-science/12.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-science/12.webp" alt="Building a data science experience — figure 12" width="1000" height="457" loading="lazy" decoding="async" /></a></figure>

<div class="story-anchor" id="b357"></div>

Spoiler alert: that’s not how this works… Design Thinking is an ongoing, iterative process that is present at every step of a product’s life cycle and I was really fortunate my team understood this.

<div class="story-anchor" id="8b3a"></div>

On the other hand, I’ve also seen designers get a bit too attached to these tools and how they’re applied. A hammer in want of a nail, which then feeds into the problems above.

<figure class="story-figure"><a href="/images/case-studies/cognos-data-science/13.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-science/13.webp" alt="Building a data science experience — figure 13" width="700" height="417" loading="lazy" decoding="async" /></a></figure>

<div class="story-anchor" id="6894"></div>

Since this project was promising to be pretty complex, and our time for the kickoff was limited, making sure we all left the session with actionable information was really important. If you’re looking at running a similar session here’s my advice:

<div class="story-anchor" id="0b28"></div>

### One thing that worked well

<div class="story-anchor" id="fb0f"></div>

<strong>Not being dogmatic about process and being able to improvise  
</strong>Like I said above, the exercises here are just tools and <em>starting points</em> to help us solve common challenges product teams face. We should be free to use and tweak them as we see fit, and as our situations require.

<div class="story-anchor" id="d8e7"></div>

During the workshop I cut certain exercises, tweaked others on the fly, and adjusted our agenda based on the team’s feedback. Being flexible and receptive to my team built trust and respect, while also making the best use of everyone’s time. We left the session with a better, shared understanding of our users and the problems we were trying to solve. As well as the opportunities we had and some of the pitfalls we had to be aware of.

<div class="story-anchor" id="0220"></div>

### One thing I would improve

<div class="story-anchor" id="a074"></div>

<strong>I’d get a facilitator (or at least a co-facilitator).  
</strong>Keeping time. Setting up the next exercise. Working with others who may be stuck. Having to oversee all this and more meant I wasn’t always able to fully participate and focus on the problem we were trying to solve. As a result I had to spend additional time later reviewing materials and following up with others. It ultimately didn’t hinder our progress, but it’s helpful in these situations to have someone who can share the load, help run the sessions and keep things moving along.

<div class="story-anchor" id="8c1e"></div>

Thanks for reading, I hope this was helpful and gave you some insight into how we work, with some lessons you can leverage in your own practice. If you have any questions or feedback on how you and your teams work, hit me up, I’d love to hear from you!
