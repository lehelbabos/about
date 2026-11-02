---
title: "Case Study: Improving how users manage data connections in Cognos Analytics"
slug: "cognos-data-connections"
projectId: "ca-dataconnections"
published: "2018-11-27"
readingTime: "10 min read"
originalUrl: "https://blog.prototypr.io/design-case-study-improving-how-users-connect-to-data-in-cognos-analytics-c919ddab9891"
description: "Case Study: Improving how users manage data connections in Cognos Analytics Taking a complex task and making it simple Project brief This is a quick look at one of the more significant projects I …"
draft: false
---

<span id="32f8"></span>

## Taking a complex task and making it simple

<span id="bd3a"></span>

## Project brief

<span id="fc68"></span>

This is a quick look at one of the more significant projects I tackled as part of my work on IBM Cognos Analytics. Aimed primarily at enterprise clients, Cognos is a data analytics, reporting and visualization tool. We help enterprise clients working with large amounts of data from disparate sources, to help them gain business insights and manage their operations. Here’s a quick promo showing some of the this in action.

<figure class="story-figure story-video"><iframe src="https://www.youtube-nocookie.com/embed/sxHaCa16XEc" title="Cognos Analytics data connections video" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen></iframe><figcaption><a href="https://www.youtube.com/watch?v=sxHaCa16XEc">Watch the video on YouTube</a></figcaption></figure>

<span id="d157"></span>

The first task performed in any data analytics tool is… well… uploading data. Users today have the option of uploading their datasets directly, or connecting to an outside database and importing their assets from there.

<span id="6992"></span>

My focus was improving the experience, design and efficiency of the second task, as well as how users managed these connections later on. Here’s how my team and I tackled this.

<span id="4e9c"></span>

## Laying the groundwork

<span id="6b26"></span>

The bulk of the team is based in Ottawa, so I flew down for two days to help kick things off. My primary goal was to learn, ensure we had a shared understanding of the problem we were trying to solve and tease out questions we still had.

<span id="0dcd"></span>

### Persona Review

<div class="story-gallery" style="--gallery-columns:518fr 483fr">
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/01.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/01.webp" alt="Improving how users connect to data — figure 1" width="518" height="450" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/02.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/02.webp" alt="Improving how users connect to data — figure 2" width="483" height="619" loading="lazy" decoding="async" /></a></figure>
</div>

<span id="92ca"></span>

Cognos has historically been a B2B, on-prem only product. If you wanted access, you had an IBM rep show up, work with your IT team to set things up and train your staff, and then IT would run everything in a very tightly managed environment. For many of our clients this is still the case.

<span id="8e80"></span>

However as we move towards turning Cognos into more of a cloud based, self managed product, this model has changed.

<span id="a124"></span>

Connecting to new data sources is now a task that’s done increasingly by the data analysts themselves. People who don’t have an admin team to contact, or can’t wait in a queue for 2 days before getting their data.

<span id="ce7f"></span>

So we started by aligning on who our key personas were and reviewing existing user feedback. Our primary persona was Sergio “The Admin”, but after some discussion it became clear that we had a secondary user — Lucas “ The Data Analyst”.

<span id="5241"></span>

After reviewing their summaries we started working through each user’s Tasks, Goals and Pains (a slight twist on the classic Tasks, Pains and Gains exercise). This helped us compare and contrast what each user is trying to accomplish and the challenges they face.

<span id="1a9f"></span>

### Needs statements

<span id="e21e"></span>

Then it was time for needs statements — what are users <strong>actually</strong> trying to accomplish and <strong>why</strong>.

<span id="11e8"></span>

After diverging and everyone putting up various different needs statements, we began to converge and cluster them. As we did, a few patterns emerged. On a high level, both users needed to be able to do the following with ease:

<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/03.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/03.webp" alt="Improving how users connect to data — figure 3" width="700" height="740" loading="lazy" decoding="async" /></a></figure>

-   Create new connections <em>from within the context they’re used to working in.</em> For admins, this was the existing admin panel — where this task is done today. For analysts, this had to be done as part of their existing data shaping workflow.
-   Analysts generally need to set up simple connections quickly so they can get to their business insights.
-   Admins need to do more extensive customization and set up more complex connections in order to track and control access, as well as test and edit multiple connections.

<span id="e042"></span>

We teased out a few more but I wanted to have these ready for our next exercise. Our needs statements also helped keep us focused later on when we had to define what our MVP is, and push back against scope creep. If something was proposed that didn’t directly address our needs statements, it was pushed out of MVP.

<span id="5dae"></span>

### As-Is Scenario Mapping

<figure class="story-figure wide"><a href="/images/case-studies/cognos-data-connections/04.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/04.webp" alt="Improving how users connect to data — figure 4" width="2400" height="1232" loading="lazy" decoding="async" /></a></figure>

<span id="12fb"></span>

We used our needs statements to help guide us as we did an As Is Scenario Map.

> If a sys admin wants to edit the details of an existing connection to fix an error, so their CFO can update their dashboard, what would they have to do?

<span id="4b65"></span>

The As-Is scenario helped us break things down into steps and gain a more thorough understanding of what the current pain points were

<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/05.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/05.webp" alt="Hope you like slideouts" width="700" height="438" loading="lazy" decoding="async" /></a><figcaption>Hope you like slideouts</figcaption></figure>

<span id="e21b"></span>

<em>To help give you a bit of context, here is the current process for simply getting to the connection details screen showing the URL. (Assuming you know where to click).</em>

<span id="3e63"></span>

<em>Cognos is a really powerful tool, but parts of the admin experience have clearly been neglected.</em>

<span id="bdc2"></span>

### Sketching

<div class="story-gallery" style="--gallery-columns:334fr 334fr 334fr">
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/06.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/06.webp" alt="Improving how users connect to data — figure 6" width="334" height="1080" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/07.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/07.webp" alt="Improving how users connect to data — figure 7" width="334" height="1080" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/08.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/08.webp" alt="Improving how users connect to data — figure 8" width="334" height="1080" loading="lazy" decoding="async" /></a></figure>
</div>

<div class="story-gallery" style="--gallery-columns:500fr 500fr">
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/09.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/09.webp" alt="Improving how users connect to data — figure 9" width="500" height="1080" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/10.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/10.webp" alt="Improving how users connect to data — figure 10" width="500" height="1080" loading="lazy" decoding="async" /></a></figure>
</div>

<div class="story-gallery" style="--gallery-columns:500fr 500fr">
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/11.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/11.webp" alt="Improving how users connect to data — figure 11" width="500" height="1080" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/12.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/12.webp" alt="Improving how users connect to data — figure 12" width="500" height="1080" loading="lazy" decoding="async" /></a></figure>
</div>

<span id="b590"></span>

Every Design Thinking workshop I’ve been involved with has had one thing in common — all of them required a bit of improvisation as we went along… and this was no different.

<span id="68e5"></span>

I wanted to run a few more exercises before we got to sketching, but I only had a bit of time left. Instead, I decided leverage the team’s enthusiasm and give everyone an opportunity to get their ideas down and share them with others.

<span id="0845"></span>

This was one of the best examples for why having a diverse set of perspectives on a team and giving them a voice during the design process can be so beneficial. As designers, we’re responsible for the final outcome, but no one has a monopoly on good ideas. These sketches gave me a lot of great material to work, and gave others on my team a sense of ownership in the design itself.

<span id="8ddc"></span>

## Wireframing

<span id="bb47"></span>

Over the next few weeks we began to converge and flesh things out in more detail. I broke things down to the following views:

<span id="71a1"></span>

<strong>The New Connection View</strong>

<div class="story-gallery" style="--gallery-columns:500fr 500fr">
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/13.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/13.webp" alt="Improving how users connect to data — figure 13" width="500" height="964" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/14.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/14.webp" alt="2 different options for what the first New connection screen could look like" width="500" height="964" loading="lazy" decoding="async" /></a><figcaption>2 different options for what the first New connection screen could look like</figcaption></figure>
</div>

<div class="story-gallery" style="--gallery-columns:334fr 334fr 334fr">
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/15.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/15.webp" alt="Improving how users connect to data — figure 15" width="334" height="964" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/16.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/16.webp" alt="Improving how users connect to data — figure 16" width="334" height="964" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/17.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/17.webp" alt="Left: Menu to invoke the new data overlay" width="334" height="964" loading="lazy" decoding="async" /></a><figcaption>Left: Menu to invoke the new data overlay</figcaption></figure>
</div>

<span id="630b"></span>

The user would be able to invoke this view as an overlay from a few different places in the UI. The main one being the Plus button at the top which we currently use to create new assets in Cognos and add in data files. This helps update our current experience to be more streamlined for analysts, who’d no longer have to go into the admin panel to set up new connections.

<span id="1475"></span>

<strong>The Servers List</strong>

<div class="story-gallery" style="--gallery-columns:500fr 500fr">
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/18.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/18.webp" alt="Improving how users connect to data — figure 18" width="500" height="964" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/19.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/19.webp" alt="Option 1: Tree view on the left and detail view on the right based on selection. Option 2: Accordion view showing hierarchy and basic info on each server and connection at a glance." width="500" height="964" loading="lazy" decoding="async" /></a><figcaption>Option 1: Tree view on the left and detail view on the right based on selection. Option 2: Accordion view showing hierarchy and basic info on each server and connection at a glance.</figcaption></figure>
</div>

<span id="693e"></span>

We explored different layouts and indicators to show the hierarchy and relationships between Servers and Connections, while providing high level information about each item that the users could take action on.

<span id="864f"></span>

<strong>The Server Details, Connection Details and Authentication Details Views</strong>

<div class="story-gallery" style="--gallery-columns:331fr 340fr 331fr">
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/20.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/20.webp" alt="Improving how users connect to data — figure 20" width="331" height="964" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/21.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/21.webp" alt="Improving how users connect to data — figure 21" width="340" height="900" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/22.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/22.webp" alt="From left to right, the same general layout template used for the 3 different levels in the IA’s hierarchy" width="331" height="964" loading="lazy" decoding="async" /></a><figcaption>From left to right, the same general layout template used for the 3 different levels in the IA’s hierarchy</figcaption></figure>
</div>

<span id="daa7"></span>

For these screens I decided to focus on mapping out general layout and information architecture, while my team gathered more detailed requirements.

<span id="ff9a"></span>

Understanding the hierarchy and relationship between Servers, Connections and Authentication Methods is something users struggled with in the existing experience due to key parts of the UI being hidden behind tabs and links, as well as unclear directions, vernacular and calls to action. My goal was to clean up this hierarchy, clarify the wording and create a layout template that could be reused between the different levels in the IA to help create consistency and familiarity for the user.

<span id="986a"></span>

## HiFi Designs

<span id="c6b8"></span>

We went through a number of iterations, meeting weekly with the core team to review and update, bringing in additional stakeholders and domain experts as needed.

<span id="9de7"></span>

<strong>The New Connection View</strong>

<figure class="story-figure wide"><a href="/images/case-studies/cognos-data-connections/23.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/23.webp" alt="Improving how users connect to data — figure 23" width="1664" height="964" loading="lazy" decoding="async" /></a></figure>

<div class="story-gallery" style="--gallery-columns:334fr 334fr 334fr">
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/24.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/24.webp" alt="Improving how users connect to data — figure 24" width="334" height="964" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/25.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/25.webp" alt="Improving how users connect to data — figure 25" width="334" height="964" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/26.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/26.webp" alt="Improving how users connect to data — figure 26" width="334" height="964" loading="lazy" decoding="async" /></a></figure>
</div>

<span id="691c"></span>

For an analysts, the intention was to be able to create a new connection in 3 steps:

-   Give us a name and a URL — based on that URL we’ll configure all the required settings for you.
-   Set up your authentication method — we’ll preselect the most commonly used option for this data server type.
-   Choose what data you want to load — and you’re done!

<span id="6e72"></span>

This is a much more streamlined approach than the previous experience for both analysts and admins alike.

<span id="70fb"></span>

For power users, the ability to perform more heavy duty configuration is still there, but the non-essential and more technical fields have been placed under the advanced tab.

<span id="881c"></span>

<strong>The Server List</strong>

<figure class="story-figure wide"><a href="/images/case-studies/cognos-data-connections/27.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/27.webp" alt="Improving how users connect to data — figure 27" width="1664" height="964" loading="lazy" decoding="async" /></a></figure>

<div class="story-gallery" style="--gallery-columns:334fr 334fr 334fr">
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/28.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/28.webp" alt="Improving how users connect to data — figure 28" width="334" height="964" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/29.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/29.webp" alt="Improving how users connect to data — figure 29" width="334" height="964" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/30.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/30.webp" alt="Improving how users connect to data — figure 30" width="334" height="964" loading="lazy" decoding="async" /></a></figure>
</div>

<span id="0e8b"></span>

The key user outcomes here were the following:

-   We’ve given sys admins more high level, glanceable information about their existing servers and connections, and the ability to better organize these items.
-   We’ve added the ability to test multiple connections quickly, without needing to drill down through multiple levels of the UI. <em>Something that required at least five clicks to do before could now be done in one.</em>

<span id="17f1"></span>

A couple of things here got held back for our MVP

-   The visualizations and summary view at the top
-   Live tracking and display of each connection’s status

<span id="5c8d"></span>

This was primarily due to technical limitations, but we still wanted to give users a clear visual indicator that showed which connections have been tested and which connections needed troubleshooting.

<span id="79dc"></span>

<strong>The Server Details, Connection Details and Authentication Details Views</strong>

<figure class="story-figure wide"><a href="/images/case-studies/cognos-data-connections/31.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/31.webp" alt="Improving how users connect to data — figure 31" width="1664" height="964" loading="lazy" decoding="async" /></a></figure>

<div class="story-gallery" style="--gallery-columns:440fr 121fr 440fr">
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/32.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/32.webp" alt="Improving how users connect to data — figure 32" width="440" height="964" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/33.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/33.webp" alt="Improving how users connect to data — figure 33" width="121" height="1903" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/34.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/34.webp" alt="Improving how users connect to data — figure 34" width="440" height="964" loading="lazy" decoding="async" /></a></figure>
</div>

<span id="66e8"></span>

As users continued to drill down through the various levels, the information displayed could get pretty complex. (See the third screengrab for an example of what a fully configured connection setup could look like in advanced view).

<span id="012d"></span>

The desired user outcomes here were the following:

-   The most relevant information is always front and center. If something breaks, users have a clear trail to follow, with links to support material at each step.
-   Secondary info (such as permissions and object properties) are easily accessible but out of the way.
-   Tests can be run quickly. But power users can run more complex tests and configurations if required.

<span id="5958"></span>

## Reflection

<figure class="story-figure wide"><a href="/images/case-studies/cognos-data-connections/35.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/35.webp" alt="Improving how users connect to data — figure 35" width="2100" height="1067" loading="lazy" decoding="async" /></a></figure>

<div class="story-gallery" style="--gallery-columns:334fr 334fr 334fr">
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/36.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/36.webp" alt="Improving how users connect to data — figure 36" width="334" height="1067" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/37.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/37.webp" alt="Improving how users connect to data — figure 37" width="334" height="1067" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/cognos-data-connections/38.webp" aria-label="View full-size image"><img src="/images/case-studies/cognos-data-connections/38.webp" alt="The evolution of a few different parts of the UI" width="334" height="1067" loading="lazy" decoding="async" /></a><figcaption>The evolution of a few different parts of the UI</figcaption></figure>
</div>

<span id="e1ea"></span>

## Overall Outcomes

<span id="eee9"></span>

This redesign ended up being much more complex than any of us had initially anticipated. This post here provides a glimpse into how we worked and the final outcome, but really I’ve only just scratched the surface.

<span id="1c47"></span>

It took us a few months to get there but the net outcomes of the redesign were the following:

-   Analysts and Admins now both had ways of connecting to their data that integrated with their respective workflows.
-   Key tasks were simplified and the information architecture was cleaned up. Seeing people navigate the Server &gt; Connection &gt; Authentication Method hierarchy clearly in the redesign when we were doing internal testing was a huge win for the team.
-   The UI was completely redone and modernized, providing a more discoverable and cleaner experience..
-   We introduced new capabilities around bulk actions, and made support documentation and in context help much more prominent.
-   Built the design in a way which lays the groundwork for future enhancements around things like showing in context data visualization and introducing natural language based search and an AI driven UI.

<span id="d77f"></span>

## Lessons learned

<span id="b3de"></span>

Looking back, the biggest takeaway for me was this — <em>always be ready to learn, re-evaluate and adjust.</em>

<span id="5d05"></span>

When dealing with sufficiently complex systems, (and especially legacy systems), chances are you’ll never have all the answers at the outset.

<span id="5cc8"></span>

Requirements will change, unexpected technical limitations will surface, user validation will show you things you didn’t expect. Be ready to change course as a team accordingly — even in the 11th hour. Because designing a good solution and shipping one are two different things.

<span id="88b2"></span>

If this case study has piqued your interest and you’d like to hear more about how we incorporated testing and validation into our process, how we managed scope creep or worked through implementation, or if you have any other questions — feel free to get in touch!
