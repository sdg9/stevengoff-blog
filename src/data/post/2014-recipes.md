---
publishDate: 2014-09-23T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Recipes, Grocery Lists, and Learning the Whole Stack'
excerpt: 'A homemade recipe app became a playground for Django REST Framework, AngularJS, food search, and a Firebase grocery list.'
image: ~/assets/images/posts/2014-recipes.webp
category: Project Archive
tags:
  - project-archive
  - python
  - django
  - angular
  - firebase
---

In 2014, a recipe application gave me a reason to work across an entire web stack: Python and Django REST Framework on the server, AngularJS in the browser, and deployment work around AWS Elastic Beanstalk.

The repository description calls it a demo. The commit history shows the kinds of practical details that can make a demo grow into a substantial learning project.

## From a recipe to a grocery trip

By September, I was working on ingredient validation, nutrition values that defaulted from portion size, and a useful message when a shared recipe could not be found. The setup notes also describe food search using Haystack and Whoosh.

Then came the grocery list. A September 22 commit references AngularFire's TodoMVC example; on September 23, I updated the grocery-list functionality to use Firebase and fixed its sorting. There were also adjustments to disable drag-and-drop on mobile.

Those are small changes with very recognizable motivations. A recipe is useful at home. A grocery list has to remain useful when you are on a phone, trying to turn the recipe into ingredients.

## Learning between the layers

The repository also records build scripts, deployment configuration, and fixes for authentication behavior under the web server. That work is less photogenic than a recipe screen, but it is part of learning to build an application that spans a browser, an API, and a hosted environment.

I would not use these commits to claim a particular audience or a successful commercial launch. They are enough to show a sustained project with real feature work—and another early example of building something ordinary to learn something new.

---

_From the Bitbucket archive. Written in September 2026 from private repository history and recollection; the date above marks project work, not original publication. Cover art is a conceptual illustration. Private source code is not reproduced._
