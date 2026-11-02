---
title: "A lean design system: How we built Tablekit"
slug: "tablekit"
projectId: "tablekit"
published: "2020-08-31"
readingTime: "13 min read"
originalUrl: "https://medium.com/@lehel/a-lean-design-system-how-we-built-tablekit-27fdacc66858"
description: "A lean design system: How we built Tablekit When I first joined TableCheck and we discussed having a new design system, I was excited — but also worried. I’ve worked on a number of these types of …"
draft: false
---

<figure class="story-figure wide"><a href="/images/case-studies/tablekit/01.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/01.webp" alt="Tablekit: A lean design system — figure 1" width="2400" height="1200" loading="lazy" decoding="async" /></a></figure>

<span id="905f"></span>

When I first joined TableCheck and we discussed having a new design system, I was excited — but also worried. I’ve worked on a number of these types of projects before so I knew how impactful they can be when they succeed. I also knew how difficult they can be to get right and to sustain.

<span id="bc80"></span>

A design system is a long term investment. They’re not something you build overnight, or are ever “done” with. They need to be living things that continue to grow and adapt to meet the needs of your team and product. Unfortunately, unless you’re at a company like Google, IBM or Atlassian, you’re probably just not gonna have the ability to have a team dedicated solely to the growth and maintenance of this framework.

<span id="6e84"></span>

To my relief, almost a year later, TableKit continues to mature and improve with each release. While we still have a long road ahead and we continue to evolve, here are the things I believe we did right so far. If you’re a developer or a designer at a small to mid-sized company, involved in building a design system for your own team, hopefully these insights can help you find success as well.

<span id="1a33"></span>

## Laying a foundation you can build on

<span id="ac70"></span>

It’s easy to look at something like Material and be intimidated or lost in the sea of components and guidelines they provide. So if you’re looking for a place to start, this is where I would suggest. Establish the basic, foundational rules of your visual design system. Also known as your “Design Tokens” or if you’re following the principles of Atomic Design, your “Atom” level elements. Your main areas of focus should be colours, composition (layout and spacing) and typography.

<figure class="story-figure"><a href="/images/case-studies/tablekit/02.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/02.webp" alt="The trifecta of UI fundamentals" width="700" height="196" loading="lazy" decoding="async" /></a><figcaption>The trifecta of UI fundamentals</figcaption></figure>

<span id="d73d"></span>

Once you settle on a set of colours, type specs, spacing increments and a grid, you’ve overcome the first big hurdle. Even without a standardized set of reusable UI components and patterns (yet), just establishing and adopting these rules will do wonders for enhancing the visual fidelity and cohesion of your products.

<span id="33c4"></span>

With TableKit, we did exactly this. We needed a single colour palette that would suit all our needs, from branding, UI design, illustrations, data visualization — everything.

<figure class="story-figure"><a href="/images/case-studies/tablekit/03.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/03.webp" alt="Tablekit: A lean design system — figure 3" width="600" height="422" loading="lazy" decoding="async" /></a></figure>

<span id="0337"></span>

We did this by taking our brand colour. Then creating 7 additional “core” colours with the same visual brightness and saturation. Once we had our 8 core colours, we added 4 darker and 4 lighter shades of each for our scales. This gave us a total of 72 unique colours to work with.

<figure class="story-figure wide"><a href="/images/case-studies/tablekit/04.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/04.webp" alt="Tablekit: A lean design system — figure 4" width="1000" height="691" loading="lazy" decoding="async" /></a></figure>

<span id="2d33"></span>

While this is <em>absolutely overkill</em> for UI work, it’s something we needed for the additional use cases I mentioned above. Defining our palette this way allowed us to have a semantic way of referring to colours. Instead of #7935D2 it’s Purple 07. This gave us the structure and shared vernacular we needed to set up more specific palettes for things like data visualization as well as UI work.

<div class="story-gallery" style="--gallery-columns:485fr 516fr">
<figure class="story-figure"><a href="/images/case-studies/tablekit/05.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/05.webp" alt="Tablekit: A lean design system — figure 5" width="485" height="900" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/tablekit/06.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/06.webp" alt="Ruleset for generating palettes to display divergent data (Left) • Additional samples and contrast check (Right)" width="516" height="900" loading="lazy" decoding="async" /></a><figcaption>Ruleset for generating palettes to display divergent data (Left) • Additional samples and contrast check (Right)</figcaption></figure>
</div>

<figure class="story-figure wide"><a href="/images/case-studies/tablekit/07.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/07.webp" alt="Full palette (left) • Theme and UI Colours subset (Right)" width="1000" height="863" loading="lazy" decoding="async" /></a><figcaption>Full palette (left) • Theme and UI Colours subset (Right)</figcaption></figure>

<span id="3aa4"></span>

If all you need to do is UI work, you can sidestep curating a full palette like we did, and just start with establishing your Theme and UI colours. For a deep dive on colour theory and a tool for establishing your own scales, I <em>highly recommend</em> Lyft’s [ColorBox tool](https://www.colorbox.io/) and the [accompanying article](https://design.lyft.com/re-approaching-color-9e604ba22c88) that goes into how they rebuilt their own colour library and developed the tool. If you’re curious as to how we arrived at our own colour library, (why we have 8 core colours instead of 9? Why 9 shades instead of 6? etc…) Let me know and I will do a more focused deep dive on this process and building palettes for data visualizations specifically.

<span id="953f"></span>

Alongside the colour guidelines, we also established a fixed set of pixel values for our spacing scale. This would help us make sure our components and layouts had a consistent set of values for things like paddings and margins.

<figure class="story-figure"><a href="/images/case-studies/tablekit/08.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/08.webp" alt="Tablekit: A lean design system — figure 8" width="700" height="785" loading="lazy" decoding="async" /></a></figure>

<span id="261b"></span>

IBM calls this “the mini unit” but it’s basically just the idea of <em>ems,</em> adopted from frontend development and applied to visual design. You define a base value (in our case 8) and then set every other step in your scale as an increment of that base value. This is also known as [an 8pt grid](https://spec.fm/specifics/8-pt-grid). Check out this article for a more detailed look at this approach to UI composition.

<span id="6395"></span>

We also extended the same framework to our typescale, setting our line-heights for each step in full or half increments of 8; and then fine tuning the font size to sit well within that specific line height.

<figure class="story-figure wide"><a href="/images/case-studies/tablekit/09.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/09.webp" alt="For more info on this and some other approaches to creating a typescale, check out this article" width="1000" height="465" loading="lazy" decoding="async" /></a><figcaption>For more info on this and some other approaches to creating a typescale, <a href="https://medium.com/design-ibm/a-deep-dive-on-typescales-16c7b1473d83">check out this article</a></figcaption></figure>

<span id="c742"></span>

All this took a while to dial in. (In fact, like everything else this is something we’ve adjusted over time — but more on that later). Setting a foundation like this allows you to start building. Which brings me to my next piece of advice.

<span id="88e7"></span>

## Build things as you need them

<span id="10ce"></span>

There are two other common mistakes I see teams make. (Meaning I’ve also made them in the past). This applies to things like high level guidelines as well, but it’s most prevalent when it comes to building actual components.

<span id="1015"></span>

One is, simply put — over complicating things. Trying to build out highly complex, highly flexible systems, anticipating any and every possible potential use case you can think of.

<span id="506f"></span>

This slows down your progress and makes your life (and the things you produce) needlessly complex. This doesn’t mean you shouldn’t plan ahead and make sure you’ve properly gathered requirements. But be smart with your time and resources.

<span id="0030"></span>

The second mistake is trying to shortcut this initial ramp up time but saying “Let’s just use and reskin <em>&lt;insert your favourite component library here&gt;</em>.” This doesn’t mean you can’t cherry pick patterns and elements from other systems when you see something that’s particularly well done.

<span id="8546"></span>

The thing to keep in mind is that if you’re adopting another design system <strong>wholesale</strong>, you’re also inheriting any technical debt and restrictions that come with it.This often just adds both design and engineering bloat to your product and increases the likelihood that you end up with something nobody really likes to use.

<span id="831e"></span>

You can largely sidestep both of these issues by just building things as you need them. This means you will only ever have things in your framework that <em>you actually use,</em> and you will always have real use-cases to test elements and rules with.

<span id="456e"></span>

A basic example of how we did this on TableKit is the introduction of different button treatments over time.

<div class="story-gallery" style="--gallery-columns:334fr 334fr 334fr">
<figure class="story-figure"><a href="/images/case-studies/tablekit/10.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/10.webp" alt="Tablekit: A lean design system — figure 10" width="334" height="946" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/tablekit/11.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/11.webp" alt="Tablekit: A lean design system — figure 11" width="334" height="946" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/tablekit/12.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/12.webp" alt="Tablekit: A lean design system — figure 12" width="334" height="946" loading="lazy" decoding="async" /></a></figure>
</div>

<figure class="story-figure wide"><a href="/images/case-studies/tablekit/13.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/13.webp" alt="The above months correspond roughly to when each variant was added as an official component to our system." width="1000" height="719" loading="lazy" decoding="async" /></a><figcaption>The above months correspond roughly to when each variant was added as an official component to our system.</figcaption></figure>

<span id="c2ef"></span>

Did I know we were probably gonna need a “danger treatment” for destructive actions at the outset? Yep — but we didn’t <em>actually</em> have a use for it till a few months in, so we didn’t build out that variant until then. Enhancements and fixes for TableKit happened naturally, as the work required to build new components was baked into the estimates and resourcing of ongoing product development.

<span id="3609"></span>

## Shared ownership

<span id="3a38"></span>

This way of trojan horsing the design system development into our day to day product work had another knock-on effect. It got all of our frontend developers familiar and invested in using and improving the system. Now credit where it’s due, I got lucky here. My team in general was fairly open to this project to begin with, but having an engineer counterpart who was also an evangelist for this effort also helped a lot.

<span id="c67f"></span>

If I had to pick one thing that could make or break the longterm success of a design system, it’s this. A system isn’t successful if you have a nicely structured Sketch of Figma file with some great looking specs, or a slick looking site to demo everything on.

<span id="3fb1"></span>

A system’s success is measured in the products you ship using it, and the time it saves you along the way. But for it to be successful, you need to have a shared sense of ownership and buy-in across the different parts of your team. So that people <em>want</em> to use it and are invested in seeing it grow. This also helps ensure that the tools and rules you build are uniquely suited to meet the needs of your team, and <em>that</em> is one of the biggest benefits of building your own solution.

<figure class="story-figure wide"><a href="/images/case-studies/tablekit/14.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/14.webp" alt="Each big spike here roughly corresponds to a new squad or product at the company starting to use TableKit, and starting to contribute new content and code." width="1000" height="484" loading="lazy" decoding="async" /></a><figcaption>Each big spike here roughly corresponds to a new squad or product at the company starting to use TableKit, and starting to contribute new content and code.</figcaption></figure>

<span id="4463"></span>

A good metric to track your success on this front is simply seeing how often the code and content of your design system gets updated.

<span id="0c5f"></span>

What can you do as a designer to help foster this sense of ownership across your company? Give people (whether it’s other designers or engineers) a voice in the process. At TableCheck we have a #tablekit channel on slack that anyone at the company can join and participate in.

<span id="e1ee"></span>

Every component and design that makes it into TableKit goes through this channel at some point for review. It’s not always perfect or easy, but this open process gives others on the team the opportunity to contribute, and once people see that their input is actually valued and can have an impact, they’ll be more likely to continue to participate in the process.

<span id="e675"></span>

## Embrace change

<span id="b8b7"></span>

“Strong opinions, loosely held” is a mantra often repeated on product teams. And I think it goes double here. While you want to avoid introducing foundational changes every two weeks, there should be <em>nothing</em> in your framework that couldn’t be changed if there was a good enough reason to support the decision.

<span id="1a47"></span>

“Let’s do it. Get it out there. See how it works, and if we need to come back and change it — we can” is phrase I say so often I should probably get it printed on a shirt. This philosophy of embracing change helps avoid indecision and mitigate the fear of failure. Because one of the few guarantees that I can make is you’re not gonna get everything right the first time. Once you remove the pressure of essentially having to be right all the time, it frees you and your team up to experiment more. But it also means not being overly attached to your ideas — and this is something I find people sometimes struggle with.

<span id="8042"></span>

It’s ok to be wrong, but it’s also important to be ready to see something you felt really strongly about or invested time in fail — and then be able to let go of that idea and see what you need to change.

<div class="story-gallery" style="--gallery-columns:334fr 334fr 334fr">
<figure class="story-figure"><a href="/images/case-studies/tablekit/15.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/15.webp" alt="Tablekit: A lean design system — figure 15" width="334" height="1024" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/tablekit/16.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/16.webp" alt="Tablekit: A lean design system — figure 16" width="334" height="1024" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/tablekit/17.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/17.webp" alt="Some early style tiles, exploring different font and colour combinations" width="334" height="1024" loading="lazy" decoding="async" /></a><figcaption>Some early style tiles, exploring different font and colour combinations</figcaption></figure>
</div>

<span id="0f4d"></span>

When we were first laying the foundation for TableKit, we went through an array of different font pairings until we arrived at the perfect combination.

<figure class="story-figure"><a href="/images/case-studies/tablekit/18.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/18.webp" alt="Tablekit: A lean design system — figure 18" width="700" height="146" loading="lazy" decoding="async" /></a></figure>

<span id="0f47"></span>

Source Sans Pro being the main font, used everywhere across our apps and websites. Poppins being the accent font, used primarily in marketing for things like headlines, and where we needed to add some additional visual flair.

<span id="b4ec"></span>

It was great.

<span id="3a26"></span>

Until we decided to change it about 4 months later.

<figure class="story-figure"><a href="/images/case-studies/tablekit/19.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/19.webp" alt="Tablekit: A lean design system — figure 19" width="700" height="151" loading="lazy" decoding="async" /></a></figure>

<span id="a496"></span>

While the initial combination worked well in the use cases we tried, we found the legibility really suffered for Source San at smaller font sizes, in more data dense displays. So we went back to the drawing board, experimented with a few options; eventually settling on Plex as our font family of choice.

<figure class="story-figure wide"><a href="/images/case-studies/tablekit/20.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/20.webp" alt="Highlighting some of the unique characteristics of this awesome font" width="1000" height="166" loading="lazy" decoding="async" /></a><figcaption>Highlighting some of the unique characteristics of this awesome font</figcaption></figure>

<span id="2050"></span>

It was highly legible at all sizes. It worked well for both marketing and product work. And it had a few other big pluses such as great internationalization support.

<span id="77f6"></span>

And we’ve continued to iterate on it over time, most recently swapping out the Bold font weight for a slightly lighter Semi Bold, and adding a condensed variant for headlines.

<figure class="story-figure wide"><a href="/images/case-studies/tablekit/21.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/21.webp" alt="Tablekit: A lean design system — figure 21" width="1000" height="195" loading="lazy" decoding="async" /></a></figure>

<span id="8f96"></span>

All these decisions were driven by new lessons we learned as we applied our rules, tools and guidelines to different parts of our products, and our needs evolved.

<span id="f6e8"></span>

## Don’t let perfect become the enemy of good

<span id="cf6f"></span>

One of the other reasons that we have such a high rate of updates on TableKit is because we’re constantly locking in small bits of progress and improvements.

<figure class="story-figure wide"><a href="/images/case-studies/tablekit/22.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/22.webp" alt="Tablekit: A lean design system — figure 22" width="1000" height="667" loading="lazy" decoding="async" /></a></figure>

<span id="350d"></span>

An example of this in practice can be seen on Tablekit’s demo site itself. [http://tablekit.tablecheck.com](http://tablekit.tablecheck.com/)

<span id="6202"></span>

Is it <em>amazing</em>? No. It’s missing content around design guidelines we’ve standardizes across our team, but haven’t solidified into a publicly available resource yet, and the structure is a bit of a mess. (Amongst other things). Clearly room for improvement.

<span id="da78"></span>

But our initial focus was to build the tools necessary for our product and engineering teams to streamline our delivery. This meant the site’s primary focus was to serve as a sandbox and point of technical reference. For that, the current site worked <em>well enough</em>. But now we’re reaching a point in our system’s maturity where this resource is starting to be used by non-engineers as well — so we need to improve. <em>This is a great problem to have.</em>

> If you’re not embarrassed by the first version of your product, you’re not moving fast enough. — Reid Hoffman (LinkedIn Founder)

<span id="697a"></span>

It’s a bit extra but I agree with the general premise. We have a responsibility to maintain a certain level of quality for everything we release, but at the same time design has really suffered from the Instagram-ification of this industry. Where everyone is trying to condense their work into a few highly polished, sexy screenshots, that don’t always accurately reflect the reality of what gets delivered. Which is a shame. So don’t worry if you work is less than perfect at first — the important thing is to keep making progress and keeping going. As long as your work is continuously improving your team’s output— that’s what matters.

<span id="729e"></span>

## Sensible defaults (that can be overriden)

<span id="fff4"></span>

I think one of the hardest things to get right in any design system is balancing flexibility and consistency. Make something too restrictive, and it becomes a pain to use because you end up fighting the tool itself half the time. Make something too flexible, and you risk losing the cohesion you’ve worked so hard to achieve.

<figure class="story-figure"><a href="/images/case-studies/tablekit/23.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/23.webp" alt="Tablekit: A lean design system — figure 23" width="700" height="915" loading="lazy" decoding="async" /></a></figure>

<span id="76e5"></span>

With TableKit, we tried to balance this with the following approach.

> Build in sensible defaults that can be easily overriden if required.

<span id="d5b1"></span>

You can see a simple example of this with how we’ve built our modal component. The padding around the edges of the content area is set at 16px by default. However, we’ve had some usecases where we needed to do something a bit different, with content going edge to edge for example. So we’ve made this a prop that can be turned off if needed, (rather than having to hack around it with CSS). Our aim is to provide sensible defaults and encourage our team to use these components as they are out of the box; but provide the ability to override certain properties in a controlled way, when we do need to bend our own rules.

<span id="f465"></span>

But you often don’t know what these properties are, until you come across some repeat use cases that require additional flexibility. Which takes us back to our previous points — starting simple and embracing change.

<span id="a6c3"></span>

## Closing thoughts

<span id="82a8"></span>

I always found working on design systems to be really rewarding. It’s one of the few projects where the impact of the work can benefit your customers <em>and</em> your team at the same time. Personally, I like to build <em>tools.</em> Things that help people succeed and be better at what they do. And a project like TableKit definitely ticks those boxes.

<span id="9e08"></span>

We’ve room for growth and things we still want to do. But considering how far we’ve come in the last 12 months, I’m proud of the progress we’ve made and can’t wait to see where things go in the next year.

<span id="d620"></span>

The following images are examples of sites, illustrations, products and side projects we’ve built using this system over the past year. While I helped kickstart this project and was the primary driver in terms of design work and direction, here’s the thing I’m most proud of. (Humble brag incoming).

<div class="story-gallery" style="--gallery-columns:302fr 699fr">
<figure class="story-figure"><a href="/images/case-studies/tablekit/24.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/24.webp" alt="Tablekit: A lean design system — figure 24" width="302" height="1632" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/tablekit/25.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/25.webp" alt="Tablekit: A lean design system — figure 25" width="699" height="1480" loading="lazy" decoding="async" /></a></figure>
</div>

<div class="story-gallery" style="--gallery-columns:683fr 318fr">
<figure class="story-figure"><a href="/images/case-studies/tablekit/26.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/26.webp" alt="Tablekit: A lean design system — figure 26" width="683" height="2290" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/tablekit/27.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/27.webp" alt="Tablekit: A lean design system — figure 27" width="318" height="1632" loading="lazy" decoding="async" /></a></figure>
</div>

<figure class="story-figure wide"><a href="/images/case-studies/tablekit/28.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/28.webp" alt="Tablekit: A lean design system — figure 28" width="2400" height="1792" loading="lazy" decoding="async" /></a></figure>

<div class="story-gallery" style="--gallery-columns:603fr 398fr">
<figure class="story-figure"><a href="/images/case-studies/tablekit/29.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/29.webp" alt="Tablekit: A lean design system — figure 29" width="603" height="1600" loading="lazy" decoding="async" /></a></figure>
<figure class="story-figure"><a href="/images/case-studies/tablekit/30.webp" aria-label="View full-size image"><img src="/images/case-studies/tablekit/30.webp" alt="Tablekit: A lean design system — figure 30" width="398" height="900" loading="lazy" decoding="async" /></a></figure>
</div>

<span id="e430"></span>

Of these images, only 2 of them were made by me directly. The rest are examples of work that others on my team (often engineers) have produced using our framework — looping me in for advice or reviews as they needed. I think the above is a testament to the skills of the people I work with. It’s also a good example of how a design system can help empower others on your team in their own work, and help scale design across an organization.

<span id="06fc"></span>

If you’re setting out to build your own solution, hopefully you’ve found the examples and advice in this article useful. If you have any questions, feedback or want to chat further, leave a comment or send me a message!
