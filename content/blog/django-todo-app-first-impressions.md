---
title: "Django To-Do App First Impressions: Module 1 at AI Dev Tools Zoomcamp"
slug: "django-todo-app-first-impressions"
excerpt: "Building my first Django app with zero prior experience, using AI tools to scaffold a working TODO app in 10 minutes, experimenting with custom interfaces, and learning by reverse-engineering the generated code."
readTime: "2 min read"
published: true
tags: ["AI Tools", "Django", "Learning", "Development", "Web Development"]
publishedAt: "2025-11-28"
image: "/images/blog/to-do.png"
---

I [decided to join AI DevTools Zoomcamp](/blog/do-i-use-ai) and was genuinely curious what I'd be able to build.

In the first module of the course, we build a TODO app using the Django framework.

Side note:
I knew *nothing* about Django before starting the course.

For someone who doesn't come from a classic software engineering background, AI tools are a huge unlock. They don't magically make you a senior developer overnight, but they *do* lower the barrier so you can build real projects, see how things work under the hood, and learn by doing.

Insane, but: It took about 10 minutes for Cursor to scaffold a working Django TODO app. I followed the homework instructions, asked the AI to build the project, and watched it piece everything together.
<figure>
  <img src="/images/blog/simple-to-do-app.png" alt="Simple To-Do App" />
  <figcaption>Simple To-Do App</figcaption>
</figure>

While the model was generating code, I tried to reverse-engineer what it was doing:

- Django app structure
- Component connections
- File responsibilities

That alone was a great learning experience.

<figure>
  <img src="/images/blog/girly-version-to-do-view.png" alt="Girly Version To-Do View" />
  <figcaption>Girly Version To-Do View</figcaption>
</figure>


Then I started experimenting a bit more and created a girly-pixelated version (pushed to the extreme 😂🌸) with a calendar view and repeated tasks.

<figure>
  <img src="/images/blog/girly-version-task-view.png" alt="Girly Version Task View" />
  <figcaption>Girly Version Task View</figcaption>
</figure>

<figure>
  <img src="/images/blog/girly-version-calendar-view.png" alt="Girly Version Calendar View" />
  <figcaption>Girly Version Calendar View</figcaption>
</figure>

It definitely needs work (the font is unreadable and repeating events don't actually repeat yet). But it was a fun way to explore how far I could push the interface with AI assistance.

Overall, I had a lot of fun with this module!

Not sure if I "built" it or "watched it build itself," but both felt equally fascinating.

> You can find the code for the simple version on my [GitHub](https://github.com/kavaivaleri/ai-dev-tools-zoomcamp-2025/tree/main/01-todo).
