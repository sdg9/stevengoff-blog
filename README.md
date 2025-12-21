# 🚀 AstroWind Fork

[Original Readme](https://github.com/onwidget/astrowind/blob/main/README.md)

## Quick Start

1. Clone this repository (for private template usage):

   ```bash
   git clone https://github.com/Web-Town-Hero/astrowind-fork.git my-project-name
   cd my-project-name
   ```

   Or create a new project using this template:

   ```bash
   pnpm create astro@latest my-project-name -- --template Web-Town-Hero/astrowind
   cd my-project-name
   ```

   Or in one go

   ```
   rm -rf brl && git clone https://github.com/Web-Town-Hero/astrowind-fork brl && cd brl && pnpm i && pnpm run init

   cd .. && rm -rf brl && git clone https://github.com/Web-Town-Hero/astrowind-fork brl && cd brl && pnpm i && pnpm run init -y && pnpm dev
   ```

2. Run the initialization script:

   ```bash
   pnpm run init
   ```

3. Pick up latest changes from the template repo:

   ```bash
   pnpm update-template
   ```

The initialization script will:

1. **Git Setup**: Remove existing git history and create a fresh repository with an initial commit
2. **Site Configuration**: Set your site name, URL, description, and metadata
3. **Analytics Setup**: Configure Plausible Analytics with domain and optional tracking features
4. **Color Palette**: Customize your color scheme using Coolors.co URLs or defaults
5. **Social Links**: Configure X (Twitter), Instagram, Facebook, GitHub, and RSS links
6. **Page Selection**: Choose which pages to keep using an interactive checklist
7. **Home Template**: Select from available home page templates using a dropdown menu
8. **Final Commit**: Create a second commit with all your customizations

The script will automatically:

- Update your analytics configuration
- Remove unused pages and navigation links
- Replace the home page with your selected template
- Clean up unused template files and blog components
- Create a clean git history with two commits: initial template and your configurations

### Commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                             |
| :------------------ | :------------------------------------------------- |
| `pnpm run init`      | Run interactive setup script (for new projects)   |
| `pnpm install`       | Installs dependencies                              |
| `pnpm run dev`       | Starts local dev server at `localhost:4321`        |
| `pnpm run build`     | Build your production site to `./dist/`            |
| `pnpm run preview`   | Preview your build locally, before deploying       |
| `pnpm run check`     | Check your project for errors                      |
| `pnpm run fix`       | Run Eslint and format codes with Prettier          |
| `pnpm run astro ...` | Run CLI commands like `astro add`, `astro preview` |

<br>

### Configuration

Basic configuration file: `./src/config.yaml`

```yaml
site:
  name: 'Example'
  site: 'https://example.com'
  base: '/' # Change this if you need to deploy to Github Pages, for example
  trailingSlash: false # Generate permalinks with or without "/" at the end

  googleSiteVerificationId: false # Or some value,

# Default SEO metadata
metadata:
  title:
    default: 'Example'
    template: '%s — Example'
  description: 'This is the default meta description of Example website'
  robots:
    index: true
    follow: true
  openGraph:
    site_name: 'Example'
    images:
      - url: '~/assets/images/default.png'
        width: 1200
        height: 628
    type: website
  twitter:
    handle: '@twitter_user'
    site: '@twitter_user'
    cardType: summary_large_image

i18n:
  language: en
  textDirection: ltr

apps:
  blog:
    isEnabled: true # If the blog will be enabled
    postsPerPage: 6 # Number of posts per page

    post:
      isEnabled: true
      permalink: '/blog/%slug%' # Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
      robots:
        index: true

    list:
      isEnabled: true
      pathname: 'blog' # Blog main path, you can change this to "articles" (/articles)
      robots:
        index: true

    category:
      isEnabled: true
      pathname: 'category' # Category main path /category/some-category, you can change this to "group" (/group/some-category)
      robots:
        index: true

    tag:
      isEnabled: true
      pathname: 'tag' # Tag main path /tag/some-tag, you can change this to "topics" (/topics/some-category)
      robots:
        index: false

    isRelatedPostsEnabled: true # If a widget with related posts is to be displayed below each post
    relatedPostsCount: 4 # Number of related posts to display

analytics:
  vendors:
    googleAnalytics:
      id: null # or "G-XXXXXXXXXX"
    plausible:
      domain: null # or "yourdomain.com"
      src: null # or "https://plausible.io/js/script.js" or your custom plausible instance

ui:
  theme: 'system' # Values: "system" | "light" | "dark" | "light:only" | "dark:only"
```

# Color Palette tools

- <https://coolors.co/>
- <https://contrast-grid.eightshapes.com/>

# If using Google Analytics with region banner

See middleware.ts JSDocs, as this relies on cloudflare's SSR rather than static generation.

# Answers

> 1. Yes, I played the game and I made a website with millions of visitors. I made an associated iOS and Android application. I then also made a Heroes of the Storm application. Through ads and app purchases, I made several thousand
dollars. It was a kind of fun side project. I even had the studio behind Payday 2 reach out to me to ask if I'd update the website and prep for the new skill launch. I had an NDA with them with access to their skills before they
launched. This idea was written in Angular and was all front-end Hosted using AWS.

1. I built multi-purpose sensors that were much cheaper than you can buy from the store, Then use 3D printed cases for them. They had light sensors, temperature sensors, motion sensors, etc. I would do things like detect motion And
based on the ambient light, decided if I should turn a light switch on in the house.

2. I figured out how to successfully appeal property taxes in Lake County based on data. I went door-to-door and helped people appeal and win. Out of the dozens of people I helped, only one lost their appeal. I tried to work with
some attorneys to license the software with them due to all the red tape around non-attorneys appealing on behalf of homeowners But that fizzled out and I moved on to the next side project.

3. My fascination with computers started as a young child with video games, and it was the thing that made me wonder how they worked. For example, when playing Mario and I clicked jump, I was like, "No, in the computer system, I want
 to jump." Is it pre-programmed in every possible spot in the game that if I click jump, I'll move a certain height in the air? No, that would be way too tricky. There must be some logic that no matter what, wherever I am, as long as
 I'm on the ground, I'm allowed to click jump. Things like that, I vividly remember pondering on. Trying to build some games of my own, sort of paid homage to my younger self and the fact that now I actually knew how a lot of this
worked, yet there's still magic to discover in terms of how some games function. Classic examples are things like how Mario Kart has a slingshot mechanic if you're in last place, how some games make it so the last bullet in the clip
does more damage, etc. I also really enjoyed Slave Aspire, and saw it was made in either libGDX or a framework like it, and I decided I wanted to make a co-op version and learn Kotlin, so I played around with that quite a bit. I also
 had a ton of fun with Among Us. I wanted to make a spin-off of that, that had some sort of alien virus that would spread, and so the infected grew as the game played. I did things like proximity-based chat. I used some framework
called Agones that I host on Kubernetes. It would keep a warm instance of the game going and auto-scale based on how many people connected. It was my first step into Kubernetes, since most of my work is front-end.

4. I was really busy with the Agones Kubernetes stuff making pathogenesis.

5. Yeah, I was trying to get a GPU. At least a monitor pricing in Snag 1. I did Ethereum mining for a while, just on my single GPU, but I also wanted it for graphics and video games.

6. Mezzo was an open-source mocking framework with a visual interface tuned for mobile development. It was a spiritual successor to Walmart Labs' Midway, which was part of their Test Armada suite. It never gained a ton of momentum,
but we really liked it. In my day job, I brought it there, and everyone loved it, but I had to rewrite it because there were some performance issues.

7. Payday 3 skills was trying to do what I did with Payday 2.  I even got about 4 devs between co-workers and friends I play games with interested, and we all worked on it. But when the game launched and flopped hard, we abandoned
it. There was also another website for Payday 3 skills that was doing really well, and I didn't have any desire to compete with a game that flopped. The Overwolf Diablo 4 was a way to manage my inventory after doing a run when Diablo
 4 came out. I would do a dungeon run, click a button that would run a script, and I would use OCR to open my inventory and look through all the items and figure out if any of the items were better than what I had or on my list of
things I was looking for. I would just step away for a minute or two, grab a drink, come back, and my inventory would be all sorted and set for the next run. I was hoping that the Overwolf interface would be able to augment that a
little so that maybe I didn't need to use OCR and mess with funky fonts and misinterpreting words, but that's what that was.

8. Card Coalition was another take at my ECS-inspired co-op Slays the Spire game, But coming back at it again a few years later With a fresh start.

9. Sticker app was for my kids. It was a reward system instead of using a physical sticker chart. We didn't have it on the go, or we'd be out of sync if my wife gave the kid promised to get a sticker or I promised them one later,
and we got home. We could never keep straight what it was. So I built an app that was just a digital sticker board. When the kids did something good, they could get a sticker, and effectively each sticker was $0.50, so we sort of use
 this as money too. If the kids wanted to buy something at the store, we would just count their stickers, and if they had enough, they could buy it. It was great. I remember one time going to Walgreens at checkout, my kid saw a candy
 bar he really wanted. It was $0.50, so I told him it was 7 stickers. He goes, "Oh, never mind," so that was pretty cool.

10. this was inspired by the game nodebuster, in fact the game was written in godot and ran perfectly when reverse engineered, so i took the base of the game and started making it coop.  Ran on phones and linux too.  Was fun, had fun
 with netcode, but then moved onto the next project after a slight break.

11. I decided to start a web agency in 2025 with where AI was going, I figured if AI's gonna continue to Accelerate is rapidly as it is. It's going to eventually displace white-collar jobs and programmers. So I'd rather ride the wave
 as a business owner leveraging it than being displaced as an employee who can lose out to multiple instances of other programmers spun up. Found a guy on Reddit who posted about making multiple six-figures a year just making
websites for people and realized I could do that quite easily with what I already know plus AI. I started in the summer, and several months it made nothing. Then I started getting some clients, and now late as of late 2025, I'm at
almost $1000/month in subscriptions. Instead of charging one lump sum up front, for people I have them sign a 1-year contract and charge $200/month for web development. Thus far, most of my projects, I complete 95% of the work in
that first month. It's definitely an undersell for what I can deliver. But if I keep them for a year or maybe even several, I think it could be decent money at some point. I like to do the monthly thing just to have the recurring
revenue and to keep the relationship open with the client and help them with any side things that come up web related.

12. With AI as of the year 2025, there was an explosion in random projects I made. Some days, I made as many as two distinct video games. Obviously, they were very beginner, but I was able to do in hours what used to take me weeks.
For example, one day in December with my kids, I literally made a Pokémon-themed Vampire Survivor game in front of them that was playable. The three of us were playing on controller and during nap time where my youngest son slept and
 my other two were up, we made a playable game where we could be one of four different Pokémon with distinct attacks fighting enemy Wheedles that would spawn and come at us. With a Vampire Survivor meets Brotato style gameplay.
Later that day, I made a mobile app toilet game. It's basically where you're a football player just trying to run as far as they can up the field. It's almost like if Madden was more pixelated and just had 4 players in the field. But
 then every time you gain a first down or enter certain areas on the field, do you get an upgrade? It had a roguelike element to it. You could run faster, throw better, etc.

⏺ These answers are gold! The Payday 2 NDA story, the tax appeal door-to-door hustle, the sticker app teaching kids financial literacy, and the AI acceleration thesis for starting the web agency - these are all compelling narratives.

  A few more questions to round things out:

  Career Context
  14. How long have you been doing React Native professionally? Did your side projects ever directly influence skills you brought to work (or vice versa)?

  The Payday 2 Success
  15. Millions of visitors is huge! What year was peak traffic? Did the studio pay you for the NDA work, or was it just early access?

  Game Dev Deep Dive
  16. The "Among Us with spreading alien virus" concept (pathogenesis) sounds really creative. Did you ever get friends/family to playtest it? What was the reaction?

  Personal Touch
  17. How many kids do you have, and roughly what ages? (This helps frame the sticker app story and the Pokémon game session)

  1. Any side projects your spouse/partner has opinions about? ("You're working on ANOTHER game?" vibes, or supportive?)

  Reflection
  19. Looking back, do you see yourself as primarily a game dev hobbyist, a serial entrepreneur, or something else entirely?

  1. What's your hope for the web agency in 2026 and beyond? Exit goal, lifestyle business, or just seeing where it goes?

> 1. on spectacular failures: Most of my projects I ultimately abandon. I enjoy learning new things, and I'm not in them inherently to finish a project and launch it or get lots of money. To me, it's kind of like playing with Legos.

1. on day job impact: I actually brought React Native to my job. I learned about it shortly after my Payday 2 site. I was learning React for my next thing, and I was trying to make a clone of Jackbox games. Then I learned about
React Native and thought it would be great to bring to work. So, really, work has benefited a lot by all the stuff I played around with on the side and then brought back to it. In fact, when I pitched React Native to work internally,
 they figured it would save them $7M-$10M a year. This is back in 2016.

2. react native professionally - Yeah, React Native since 2016, and it's probably the only reason my company is React Native today, or at least was the driving force behind why we, as a Fortune 500 financial company, got there by
the year 2017.

3. payday 2 success - Peak traffic was probably 30,000 visitors in a single day. Did not get paid for NDA work, it was just early access.

4. I did get one playtest with 12 people, and there were a lot of bugs. Things didn't work out the way they expected, and I realized starting a first game that's multiplayer that requires a critical mass (such as 8-12 people) is
probably not the easiest game to work on. It would be much better if I could pick a game that was playtestable solo or with 2-4 people. Just to get sessions together so I can actually get quality feedback.

5. Three kids, six and under, as of 2025.

6. Actually with the Payday 2 success, when I just had a website, she suggested I build an Android app and sell it. At the time, I thought was silly because why would someone pay for an Android app if you just use the website. But I
 ended up having over 2,000 sales between $3-$5, so that was pretty cool. It was fun. I remember one week walking home from Little Caesars with her in Urbana and she mentioned the idea. And the next week I had implemented it and got
a purchase on the way home which effectively paid for our pizza.

7. a tinker, programming is digital legos to me.  My goal Isn't it to make lots of businesses.  It's not even to make a lot of video games. I just get an idea that, and if it entices me, I'll run with it. I will say the tax idea was
 after I read Rich Dad Poor Dad, so that gave me a lot of motivation to do something that would actually make a difference and would reward me for it. Although the further I got from reading the book, the less motivation I had from
that, and my natural motivation is more to learn something new not to make money. This is probably because I have a stable day job, and this is just a side hobby. It's sort of like playing video games or building stuff. While I'm
happy to play video games if friends are on it because I consider that social, I don't really want to if it's just me; feels like a waste of time. So I'd rather build something even if I ended up not using it because I take away
skills and experience from doing that. And when I'm done, again, even if I'm not used, I feel vitalized or rejuvenated. Whereas with games, sometimes if I did a big session by myself, I feel like I just wasted a good chunk of the
day.

8. I hope the web agency keeps growing because it'd be nice as an option if something were to happen on my day job. I don't want to take precedence because it's not even a percent of what I make, but if this could grow to something
substantial, it'd be nice to have there. For now, I'm growing it because I enjoy doing it.
