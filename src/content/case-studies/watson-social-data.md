---
title: "Case Study: Data Visualization for Social Media Data"
slug: "watson-social-data"
projectId: "wasm-data"
published: "2018-05-23"
readingTime: "9 min read"
originalUrl: "https://medium.com/@lehel/case-study-data-visualization-for-social-media-data-cc3a40150674"
description: "Case Study: Data Visualization for Social Media Data Project Brief The work was for a product called Watson Analytics for Social Media (WASM). Like it says on the tin, WASM is a product tailored …"
draft: false
---

<span id="9c70"></span>

## <strong>Project Brief</strong>

<span id="51d7"></span>

The work was for a product called Watson Analytics for Social Media (WASM). Like it says on the tin, WASM is a product tailored specifically for social media analysis — pulling in social media content from a number of sources, and surfacing insights around everything from trending topics, to sentiment analysis, key influencers, audience demographics etc etc… figures such as <em>sales data</em> can show how a product may be doing in a certain market over a period of time. <em>Social media</em> data can help give further context to that <em>business data</em>, enabling users to (hopefully) make more informed decisions.

<span id="e838"></span>

Watson Analytics for Social Media has a number of custom visualizations tailored to surface specific insights and patterns. We’ll be looking at how our team redesigned one of these visualizations.

<span id="b1cd"></span>

### My role

<figure class="story-figure"><a href="/images/case-studies/watson-social-data/01.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/01.webp" alt="Building a Custom Data Visualization — figure 1" width="700" height="266" loading="lazy" decoding="async" /></a></figure>

<span id="1abd"></span>

My primary role on this effort was focused on planning, research, and design. I worked with our PMs and Devs to nail down requirements, translating them into user needs, and then working with my team on taking our designs from initial sketches and ideation, through to high fidelity designs and specs, which our dev team could then leverage to build out the visualization itself.

<span id="8620"></span>

## Laying the groundwork

<figure class="story-figure"><a href="/images/case-studies/watson-social-data/02.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/02.webp" alt="A poster our research team put together to help communicate the high level details for our main persona." width="700" height="1080" loading="lazy" decoding="async" /></a><figcaption>A poster our research team put together to help communicate the high level details for our main persona.</figcaption></figure>

<span id="50ca"></span>

### The Persona (and what we’re trying to help her do)

<span id="6876"></span>

The purpose of the visualization is simple. Help our persona, Natalie, compare data for 3 predefined user groups — <em>Prospective Customers, Existing Customers</em> and <em>Dissatisfied Customers</em>, and see what they are saying about the topics she’s defined. (Are the number of potential customers increasing? Are existing ones unsatisfied or leaving? If so, why?) This would allow her, to quickly do a competitive analysis, see where her company is strong, or alternatively where they may be struggling, and help her craft a business strategy in response.

<span id="9cce"></span>

### The Usecase

<span id="6cff"></span>

To help put things in context, let’s say Natalie’s works at an auto manufacturer such as BMW and she needs to run an analysis on both BMW’s brand and products, as well as some of the competition. For this scenario our list will include

-   Audi
-   BMW
-   Jaguar
-   Mercedes
-   Porsche
-   and Tesla

<span id="e85e"></span>

Her execs want to know about a few things in specific, (we’ll call these <em>themes</em>). They want to know what people are saying about things like:

-   Safety
-   Power
-   Price
-   Self-Driving Capabilities
-   Reliability
-   Warranty etc…

<span id="bcd3"></span>

Are these things driving sales? Is there an opportunity in any one of these areas that they can capitalize on? Between reviewing existing research data and doing our own explorations and inquiries, we boiled things down to the following.

<span id="29a7"></span>

### <strong>User outcomes</strong>

-   <strong>Compare:</strong> Natalie needs to be able to quickly compare data across the 3 groups of users, to see which group is the most active, and go from there.
-   <strong>Drill in:</strong> Once she’s found a point of interest she needs to be able to explore her data by drilling into either a specific user group or a specific data point, getting further information about her selection. (Sentiment breakdown, demographics etc…)
-   <strong>Discover:</strong> Natalie should also be able to discover new insights and see what else her customers are talking about that <em>isn’t</em> captured in her list of defined themes.

<span id="0645"></span>

The above three user outcomes would become the core of our UX Requirements.

<span id="2cc0"></span>

### Understanding the data

<span id="dc87"></span>

The next step was actually gaining a thorough understanding of the data. Answering questions such as:

-   What kind of data are we gathering from each post and each source?
-   What do we know about the author of each post?
-   Could we gather info about \_\_\_\_\_\_\_\_\_\_ ?
-   What’s the single most important piece of information or insight our users want from this chart? What about secondary info?

<span id="205f"></span>

As we gained a better and better understanding of the data itself, it was time to start coming up with ideas.

<span id="250e"></span>

## Ideation

<span id="5b72"></span>

### Sketching

<span id="2ee0"></span>

We started by doing a few rounds of sketching and paper prototyping. We figured it would be good to get some fresh eyes on this and leverage some of the talent in our studio, so we pulled in some other designers from different squads. This is where working within a broader design team really comes in handy.

<span id="c243"></span>

After a few iterations we converged on 3 approaches and reviewed them with the rest of the product team. The feedback was the following.

<span id="4459"></span>

### Bubble / Bar Matrix

<figure class="story-figure"><a href="/images/case-studies/watson-social-data/03.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/03.webp" alt="Eagle eyed readers will notice that we decided to have some fun in this sketching session and switched to a Star Wars theme for our mock data." width="700" height="525" loading="lazy" decoding="async" /></a><figcaption>Eagle eyed readers will notice that we decided to have some fun in this sketching session and switched to a Star Wars theme for our mock data.</figcaption></figure>

<span id="7836"></span>

<strong>Pros</strong>

<span id="0cc4"></span>

Being able to scan across groups as well as individual columns or rows makes it easy to compare data across a number of metrics and quickly find outliers.

<span id="bda4"></span>

Easy to show secondary information such as sentiment or demographics breakdown by turning each bubble into a pie chart.

<span id="8633"></span>

<strong>Cons</strong>

<span id="8815"></span>

Showing sentiment or demographics by default may make things very busy.

<span id="5b5a"></span>

Still need a way to show conversations <em>not captured by her themes</em>.

<span id="472a"></span>

### Donut Chart with themes toggle and “Related Viz” Panel

<div class="story-gallery" style="--gallery-columns:334fr 334fr 334fr">
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/04.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/04.webp" alt="Building a Custom Data Visualization — figure 4" width="334" height="600" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/05.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/05.webp" alt="Building a Custom Data Visualization — figure 5" width="334" height="600" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/06.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/06.webp" alt="Left: Default state. Middle: Toggle showing number of comments without themes. Right: Drilling in to a specific part of the chart to show related visualizations." width="334" height="600" loading="lazy" decoding="async" /></a><figcaption>Left: Default state. Middle: Toggle showing number of comments without themes. Right: Drilling in to a specific part of the chart to show related visualizations.</figcaption></figure>
</div>

<span id="9ed2"></span>

<strong>Pros</strong>

<span id="5966"></span>

Nice left-to-right progression in terms of granularity of data with a clear CTA for exploration.

<span id="4b2a"></span>

Chart gives quick, easy to understand breakdown of each Topic’s prominence within a User Group.

<span id="6021"></span>

The toggle helps the user control if they want to see content with no detected themes in their visualization or not. (Seeing this data can be valuable, but it can often also skew things).

<span id="3d62"></span>

<strong>Cons</strong>

<span id="c9aa"></span>

Lack of ability to quickly compare across groups.

<span id="f053"></span>

May be a bit too simplistic.

<span id="d3ee"></span>

### Stacked bar charts

<figure class="story-figure"><a href="/images/case-studies/watson-social-data/07.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/07.webp" alt="Building a Custom Data Visualization — figure 7" width="800" height="600" loading="lazy" decoding="async" /></a></figure>

<span id="5019"></span>

<strong>Pros</strong>

<span id="f582"></span>

Tabs make it easy to switch between groups

<span id="c773"></span>

Stacked bar charts provide an easy way to compare secondary info (such as sentiment) across themes / topics.

<span id="d4e8"></span>

<strong>Cons</strong>

<span id="7626"></span>

No way to compare across user groups side by side

<span id="5f9d"></span>

May not scale well to a large number of topics or themes.

<span id="3c6e"></span>

May break down if the user hasn’t defined any themes.

<span id="76be"></span>

## Converge

<span id="89ef"></span>

After a few more rounds of lo-mid fi designs and reviews we started to converged on a single solution that leveraged some of the pros of each option. We did away with the bar graph cause frankly — it’s often times the easy solution and our product was already had a bunch of bar graphs… and we wanted to do something more interesting.

<div class="story-gallery" style="--gallery-columns:330fr 303fr 368fr">
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/08.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/08.webp" alt="Building a Custom Data Visualization — figure 8" width="330" height="2750" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/09.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/09.webp" alt="Building a Custom Data Visualization — figure 9" width="303" height="3024" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/10.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/10.webp" alt="Same interaction pattern as above, just with a bit more detail." width="368" height="2493" loading="lazy" decoding="async" /></a><figcaption>Same interaction pattern as above, just with a bit more detail.</figcaption></figure>
</div>

<span id="ba40"></span>

For the first option, we added the tabs from the bar graphs design, and added in our “Mentions” panel, which shows pieces of content and conversations related to your selected datapoint.

<div class="story-gallery" style="--gallery-columns:500fr 500fr">
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/11.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/11.webp" alt="Building a Custom Data Visualization — figure 11" width="500" height="3024" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/12.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/12.webp" alt="Building a Custom Data Visualization — figure 12" width="500" height="3024" loading="lazy" decoding="async" /></a></figure>
</div>

<span id="b9ba"></span>

For the second option, we added in the same mentions panel and the “related visualizations” panel, which would come up from the bottom once the user has drilled into a datapoint. Testing things internally as we went along, we continued to refine our approach. We also added a bar-graph overlay on each row, to show the accumulative sum of conversation happening around each brand for each user group.

<span id="8ce1"></span>

In the end we converged on Option 2, with the benefit of highlighting both patterns and outliers being the key difference that tipped the scales in its favour.

<span id="4297"></span>

## Moving to Mid-High Fidelity

<span id="5090"></span>

Once we had settled on a solution, we moved from low to mid fidelity designs to help nail down some of the interaction patterns, sizing and spacing.

<div class="story-gallery" style="--gallery-columns:334fr 334fr 334fr">
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/13.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/13.webp" alt="Building a Custom Data Visualization — figure 13" width="334" height="900" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/14.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/14.webp" alt="Building a Custom Data Visualization — figure 14" width="334" height="900" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/15.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/15.webp" alt="Building a Custom Data Visualization — figure 15" width="334" height="900" loading="lazy" decoding="async" /></a></figure>
</div>

<div class="story-gallery" style="--gallery-columns:334fr 334fr 334fr">
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/16.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/16.webp" alt="Building a Custom Data Visualization — figure 16" width="334" height="900" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/17.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/17.webp" alt="Building a Custom Data Visualization — figure 17" width="334" height="900" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/18.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/18.webp" alt="Building a Custom Data Visualization — figure 18" width="334" height="900" loading="lazy" decoding="async" /></a></figure>
</div>

<span id="7eb2"></span>

I’ve found working at mixed fidelity like this really beneficial when doing design reviews. Parts of the UI that are not important to <em>what is being designed for right now</em> are abstracted out, while the key points of focus are mapped out in more detail. I’ve found this helps:

<span id="e386"></span>

a) Keep teams focused during a review by removing noise from the UI. And it also keeps people from going down rabbit holes about “the label on that button there that has nothing to do with what we’re reviewing, but someone in the room has really strong opinions on”.

<span id="575f"></span>

b) Make my life easier because I don’t have to make up unique copy for each item, which I then have to make sure stays consistent throughout.

<span id="1cbc"></span>

At this stage we also decided to decrease the scope of our MVP, and leave out the Related Visualizations panel. If we were going to introduce the feature, we figured we should do it right and bring it in as a more high level enhancement, that’s available for <em>all</em> charts within our product, rather than just this one.

<span id="d18a"></span>

### Specs

<div class="story-gallery" style="--gallery-columns:500fr 500fr">
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/19.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/19.webp" alt="Building a Custom Data Visualization — figure 19" width="500" height="900" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/20.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/20.webp" alt="Building a Custom Data Visualization — figure 20" width="500" height="900" loading="lazy" decoding="async" /></a></figure>
</div>

<div class="story-gallery" style="--gallery-columns:334fr 334fr 334fr">
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/21.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/21.webp" alt="Building a Custom Data Visualization — figure 21" width="334" height="900" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/22.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/22.webp" alt="Building a Custom Data Visualization — figure 22" width="334" height="900" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/23.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/23.webp" alt="Building a Custom Data Visualization — figure 23" width="334" height="900" loading="lazy" decoding="async" /></a></figure>
</div>

<div class="story-gallery" style="--gallery-columns:500fr 500fr">
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/24.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/24.webp" alt="Building a Custom Data Visualization — figure 24" width="500" height="900" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/watson-social-data/25.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/25.webp" alt="Building a Custom Data Visualization — figure 25" width="500" height="900" loading="lazy" decoding="async" /></a></figure>
</div>

<span id="2ffa"></span>

Last but not least, once the general layout, interactions and visual treatment were locked down, I moved on to speccing things out in detail. The full design spec ended up being over 30 pages long. Dissecting that page by page is a bit outside the scope of this case study, but these snapshots should give you an idea of what the rest of the specs looked like.

<span id="13d8"></span>

## Reflection

<figure class="story-figure wide"><a href="/images/case-studies/watson-social-data/26.webp" aria-label="View full-size image"><img src="/images/case-studies/watson-social-data/26.webp" alt="The IBM Design Thinking Loop" width="1000" height="354" loading="lazy" decoding="async" /></a><figcaption>The IBM Design Thinking Loop</figcaption></figure>

<span id="9a1b"></span>

This was an interesting new challenge for me. Most of my work tends to have more of a traditional UX/UI focus. This project helped me take some of those same skills and tools, and apply them in a new domain. While data viz design has its unique challenges, it was reassuring to see a lot of the same processes’ used in more traditional “UX Design” work equally well here.

-   Understand the user
-   Understand their problems, tasks and desired outcomes
-   Work with Dev and PM to understand requirements, resource and technical limitations, and explore possibilities.
-   Ideate as a team. Diverge to explore options, then converge on a solution.
-   Research and test as much as your situation and timeline allows.
-   Figure out what’s needed for a Minimum Viable Experience, and build a roadmap for how to ship that and then move beyond.
-   Flesh out the details as you move along that roadmap. Adjust as needed.

<span id="3967"></span>

Or as the key principles of IBM Design Thinking state, <strong><em>Observe, Reflect, Make.</em></strong>
