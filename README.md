# `discord-markdown-parser`
A node.js markdown implementation based on the [simple-markdown](https://github.com/Khan/simple-markdown) library, which is the same technology [discord use](https://discord.com/blog/how-discord-renders-rich-messages-on-the-android-app).

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
- 