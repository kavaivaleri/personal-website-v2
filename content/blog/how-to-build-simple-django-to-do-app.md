---
title: "How to Build a Simple Django To-Do App"
slug: "how-to-build-simple-django-to-do-app"
excerpt: "In this tutorial, I'll show you how to build a simple Django to-do app from scratch. We'll cover the key aspects of Django apps and your first steps to get a simple but working app on the example of a to-do app."
readTime: "2 min read"
published: true
tags: ["Django", "Learning", "Development", "Web Development"]
image: "/images/blog/laptop.png"
publishedAt: "2025-11-28"
---

In one of my recent posts, I shared my first impressions about building a simple Django to-do app using AI tools.

Based on the things I've learned through this process, I've decided to write a tutorial that will serve as an intro to Django for beginners and cover the key aspects of Django apps and your first steps to get a simple but working app on the example of a to-do app.

## Install Django

There can be multiple ways to install Django, but I'll use the official way to install it using `pip`.

```bash
pip install django
```

You can verify installation by running:
```bash
python -m django --version
```

## Create a new Django project

```bash
django-admin startproject myproject
```

## Create Django project
## Create Django app for TODOs
## Create TODO model with fields (title, description, due_date, is_resolved)
## Create and run migrations
## Register TODO model in admin for CRUD operations
## Create views and URLs for create, edit, delete, and mark as resolved
## Create templates for the TODO interface