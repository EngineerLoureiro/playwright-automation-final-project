# 🧪 Playwright Final Project – README (but not the usual one)

## TL;DR

- Final project for [@brunomachadors](https://github.com/brunomachadors) Playwright intro course
- Structured automated tests for a store application using **Page Object Model (POM)**
- Learned great practices like `test.step()`, centralized constants, and GitHub issue organization
- Playwright is powerful and currently one of the industry’s go-to testing frameworks
- Not updating this repo further, time to apply learnings to bigger personal projects 🚀

---

> **Spoiler alert:**  
> This is **not** your typical README full of installation guides, CLI commands, environment setup, and strong warnings like _“delete node_modules at your own risk”_.  
> This is a simple Playwright project, if you're looking for that info, you can ask ChatGPT (it loves that stuff) or just ask me directly 😄  
> The purpose here is to **document the journey** and capture some **key takeaways**, a sort of time-capsule artifact so that i can laugh in the future, hi future Ivo 👋.

---

## 🎓 About the Course & Project

This project was created as the **final assignment** for the **Introductory Playwright course led by [@brunomachadors](https://github.com/brunomachadors)**.
The objective was to **design and structure automated tests for a store application**, applying best practices learned throughout the course, particularly the **Page Object Model (POM)** pattern.

A huge thank you to **Bruno** 👏  
His teaching style, the noticeable dedication behind the scenes to deliver quality material, and his **very cool GitHub** made this course extremely valuable and enjoyable.

This course allowed me to:

- Practice Playwright fundamentals in a structured way
- Become genuinely curious about digging deeper into Playwright
- Understand why Playwright is currently **one of the industry’s go-to frameworks for web testing**
- Improve my GitHub organization habits (issues, documentation, structure, etc.)

---

## 🚀 Key Takeaways

### 🧱 The Power of the Page Object Model (POM)

POM separates UI interaction logic from the tests themselves.  
Instead of mixing selectors, actions, and assertions directly in the test files, we define **Page Classes** that expose reusable methods, for example:

```js
await CartPage.verifyEmptyCartMessage();
await CartPage.verifyCartItems();
await StorePage.navigateToInventoryTab();
await StorePage.navigateToCartTab();
```

This makes tests:

- Clean and readable
- Easier to maintain
- Modular and scalable

I really enjoyed this pattern and look forward to applying it to more projects.

---

### ✏️ `test.step()` is amazing

Writing steps inside tests helps document the journey clearly and improves readability:

```js
await test.step('Add product to cart', async () => { ... });

```

### 🏷️ `data-testid` – Use with caution

- `data-testid` is great for stable elements
- ❌ but dangerous for items that change dynamically, where selectors might break easily

---

## 🗂️ Good Practices Learned

- POM structure
- Clear naming & modularization
- Centralized constants & sources of truth in separate files
- Meaningful test flow documentation using `test.step()`
- Better GitHub habits, even using issues for organization in personal projects

---

## 💡 Final Reflection

There’s still plenty to test, edge cases, deeper flows, advanced integrations, **but I won’t be updating this repository further**.  
Instead, I want to take everything I learned and apply it fresh in new projects that I’m more personally invested in.

**New chapter ahead 🚀**

Thanks for reading — and **happy testing!** 🧪❤️
