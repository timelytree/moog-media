---
layout: post
title:  "classify - A ShowdownJS Extension"
date:   2017-03-30 14:20:05
---

Markdown is amazing for hassle-free, simple blogging. Although it's not exactly meant for templating or to output html that can be styled in a more complex manner, that doesn't mean there aren't use-cases that require a richer html output. For this to happen, there needs to be a way to more specifically identify markdown output (perhaps with a `<div>` that contains an identifying class?).

Enter [classify](https://github.com/timelytree/showdown-classify), an extension to [ShowdownJS](https://github.com/showdownjs) - a fantastic open-source, javascript-based markdown parser - that gives you the ability to wrap markdown text in a `<div>` with a class while still being able to process markdown inside the `<div>`.

## How to use

Begin by including classify inside your website's `<head>` tag, after showdown.js

```html
<script type="text/javascript" src="js/showdown.js"></script>
<script type="text/javascript" src="js/showdown-classify.js"></script>
```

## Enabling the extension

Once the extension is included, you can enable it when a new showdown Converter is initialized:

```javascript
var converter = new showdown.Converter({
  extensions: ['classify'],
  // optionA: true,
  // optionB: false
});
```

## Example use case

This extension introduces a new piece of syntax to markdown itself. Using this will allow you to wrap markdown input inside a `<div>` with an identifying class of your choosing. The markdown inside the new tags _will be rendered as well_.

The syntax looks like this:

```
[tasty--]
## Header
1. Toast some bread
2. Scrape fresh garlic onto bread
3. Dip into olive oil
[--tasty]
```

Example input:

```javascript
var converter = new showdown.Converter({extensions: ['classify']}),
    markdownInput = `

      [tasty--]
      ## Garlic Toast
      1. Toast some bread
      2. Scrape fresh garlic onto bread
      3. Dip into olive oil
      [--tasty]

    `,
    html = converter.makeHtml(markdownInput);
```

This should output:

```html
<div class="tasty">
  <h2>Garlic Toast</h2>
  <ol>
    <li>Toast some bread</li>
    <li>Scrape fresh garlic onto bread</li>
    <li>Dip into olive oil</li>
  </ol>
</div>
```

## Multiple and Hyphened Classes
To make things even more fun, you can add multiple or hyphened classes in your syntax.

Input as such:

```
[red green--]
[--red green]

OR

[blue teal-white--]
[--blue teal-white]
```

Will render as:

```html
<div class="red green"></div>
<p>OR</p>
<div class="blue teal-white"></div>
```

And that's it! You can now create `<div>`s with classes to wrap markdown input text
that still gets rendered correctly. Style away!
