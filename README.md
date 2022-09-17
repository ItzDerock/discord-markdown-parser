# `discord-markdown-parser`
A node.js markdown implementation based on the [simple-markdown](https://github.com/Khan/simple-markdown) library, which is the same technology [discord use](https://discord.com/blog/how-discord-renders-rich-messages-on-the-android-app).

Designed to be used for [discord-html-transcripts](https://github.com/ItzDerock/discord-html-transcripts)

`discord-markdown-parser` will parse any given string into an [AST tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree) and supports:
- links
- block quotes
- inline quotes
- code blocks
- inline code
- italics (em)
- spoilers
- bold
- strikethrough
- underline
- channel mentions
- user mentions
- role mentions
- @everyone
- @here
- emojis
& more

## Usage
```js
import { parse } from 'discord-markdown-parser';
// or const { parse } = require('discord-markdown-parser');

// input is a string
const input = "test **markdown** with `cool` *stuff*";

// specify what type of markdown this is
// this can be 'normal' or 'extended' (default = normal)
// extended should be used if the input is from a webhook message or embed description.
const type  = "normal";

// will return an AST tree
const parsed = parse(input, type);
```

## Extending
```js
// you can import the default rules using
import { rules } from 'discord-markdown-parser';

// and you can add your own rules
const newRules = {
    ...rules,
    customRule: {
        ...
    } // see simple-markdown documentation for details
};

// import simpleMarkdown
import SimpleMarkdown from 'simple-markdown';

// and create the parser
const parser = SimpleMarkdown.parserFor(newRules);
```