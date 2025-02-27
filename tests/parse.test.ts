import { parse } from '../src';

describe('Parse', () => {
  test('GIVEN a normal string THEN parse is as a string', () => {
    expect(parse('Hello world!')).toEqual([
      {
        type: 'text',
        content: 'Hello world',
      },
      {
        type: 'text',
        content: '!',
      },
    ]);
  });

  test('GIVEN a string with a twemoji THEN parse the twemoji', () => {
    expect(parse('Hello world! 👀')).toEqual([
      {
        type: 'text',
        content: 'Hello world',
      },
      {
        type: 'text',
        content: '! ',
      },
      {
        type: 'twemoji',
        name: '👀',
      },
    ]);
  });

  test('GIVEN a string with a emoji THEN parse the emoji', () => {
    expect(parse('Hello 🦄 <:configuration:933601260559544330> ')).toEqual([
      {
        type: 'text',
        content: 'Hello ',
      },
      {
        type: 'twemoji',
        name: '🦄',
      },
      {
        type: 'text',
        content: ' ',
      },
      {
        type: 'emoji',
        animated: false,
        name: 'configuration',
        id: '933601260559544330',
      },
      {
        type: 'text',
        content: ' ',
      },
    ]);
  });

  test('GIVEN a string with a user THEN parse the user', () => {
    expect(parse('Hello <@!123456789123456780> ')).toEqual([
      {
        type: 'text',
        content: 'Hello ',
      },
      {
        type: 'user',
        id: '123456789123456780',
      },
      {
        type: 'text',
        content: ' ',
      },
    ]);
  });

  test('GIVEN a string with a timestamp THEN parse the timestamp', () => {
    expect(parse('Hello it is currently <t:1664298780:R>')).toEqual([
      {
        type: 'text',
        content: 'Hello it is currently ',
      },
      {
        type: 'timestamp',
        timestamp: '1664298780',
        format: 'R',
      },
    ]);
  });

  test('GIVEN a string with a pre-epoch timestamp THEN parse the pre-epoch timestamp', () => {
    expect(parse('The 20th century started in <t:-2177452800:F>')).toEqual([
      {
        type: 'text',
        content: 'The 20th century started in ',
      },
      {
        type: 'timestamp',
        timestamp: '-2177452800',
        format: 'F',
      },
    ]);
  });

  test('GIVEN a string with a role THEN parse the role', () => {
    expect(parse('Hello <@&123456789123456780>')).toEqual([
      {
        type: 'text',
        content: 'Hello ',
      },
      {
        type: 'role',
        id: '123456789123456780',
      },
    ]);
  });

  test('GIVEN a string with a channel THEN parse the channel', () => {
    expect(parse('See <#123456789123456780>')).toEqual([
      {
        type: 'text',
        content: 'See ',
      },
      {
        type: 'channel',
        id: '123456789123456780',
      },
    ]);
  });

  test('GIVEN a string with a link THEN parse the link', () => {
    expect(parse('See https://google.com')).toEqual([
      {
        type: 'text',
        content: 'See ',
      },
      {
        type: 'url',
        target: 'https://google.com',
        content: [
          {
            type: 'text',
            content: 'https://google.com',
          },
        ],
      },
    ]);
  });

  test('GIVEN a string with a masked link without extended md support THEN do not parse as masked link', () => {
    expect(parse('See [google](https://google.com)')).toEqual([
      {
        type: 'text',
        content: 'See ',
      },
      {
        type: 'text',
        content: '[google',
      },
      {
        type: 'text',
        content: ']',
      },
      {
        type: 'text',
        content: '(',
      },
      {
        type: 'url',
        target: 'https://google.com',
        content: [
          {
            type: 'text',
            content: 'https://google.com',
          },
        ],
      },
      {
        type: 'text',
        content: ')',
      },
    ]);
  });

  test('GIVEN a string with a masked link with extended md support THEN parse as masked link', () => {
    expect(parse('See [google](https://google.com)', 'extended')).toEqual([
      {
        type: 'text',
        content: 'See ',
      },
      {
        type: 'link',
        title: undefined,
        target: 'https://google.com',
        content: [
          {
            type: 'text',
            content: 'google',
          },
        ],
      },
    ]);
  });

  test('GIVEN a string with an autolink THEN parse the autolink', () => {
    expect(parse('See <https://google.com>')).toEqual([
      {
        type: 'text',
        content: 'See ',
      },
      {
        type: 'autolink',
        target: 'https://google.com',
        content: [
          {
            type: 'text',
            content: 'https://google.com',
          },
        ],
      },
    ]);
  });

  test('GIVEN a string with a inlineCode THEN parse the inlineCode', () => {
    expect(parse('`Hello world!`')).toEqual([
      {
        type: 'inlineCode',
        content: 'Hello world!',
      },
    ]);
  });

  test('GIVEN a string with a blockquote THEN parse the blockquote', () => {
    expect(parse('> Hello world!')).toEqual([
      {
        type: 'blockQuote',
        content: [
          {
            type: 'text',
            content: 'Hello world',
          },
          {
            type: 'text',
            content: '!',
          },
        ],
      },
    ]);
  });

  test('GIVEN a string with a multiline blockquote THEN parse the multiline blockquote', () => {
    expect(parse('>>> Hello world!\nLine 2')).toEqual([
      {
        type: 'blockQuote',
        content: [
          {
            type: 'text',
            content: 'Hello world',
          },
          {
            type: 'text',
            content: '!',
          },
          {
            type: 'br',
          },
          {
            type: 'text',
            content: 'Line 2',
          },
        ],
      },
    ]);
  });

  test('GIVEN a string with a codeblock THEN parse the codeblock', () => {
    expect(parse('```js\nconst a = 1;\n```')).toEqual([
      {
        type: 'codeBlock',
        lang: 'js',
        inQuote: false,
        content: 'const a = 1;',
      },
    ]);
  });

  test('GIVEN a string with a codeblock without lang THEN parse the codeblock', () => {
    expect(parse('```\nconst a = 1;\n```')).toEqual([
      {
        type: 'codeBlock',
        lang: '',
        inQuote: false,
        content: 'const a = 1;',
      },
    ]);
  });

  test('GIVEN a string with em THEN parse the em', () => {
    expect(parse('*Hello world!*')).toEqual([
      {
        type: 'em',
        content: [
          {
            type: 'text',
            content: 'Hello world',
          },
          {
            type: 'text',
            content: '!',
          },
        ],
      },
    ]);
  });

  test('GIVEN a string with a spoiler THEN parse the spoiler', () => {
    expect(parse('Hello ||world||')).toEqual([
      {
        type: 'text',
        content: 'Hello ',
      },
      {
        type: 'spoiler',
        content: [
          {
            type: 'text',
            content: 'world',
          },
        ],
      },
    ]);
  });

  test('GIVEN a @everyone mention THEN parse the @everyone mention', () => {
    expect(parse('Hello @everyone')).toEqual([
      {
        type: 'text',
        content: 'Hello ',
      },
      {
        type: 'everyone',
      },
    ]);
  });

  test('GIVEN a @here mention THEN parse the @here mention', () => {
    expect(parse('Hello @here')).toEqual([
      {
        type: 'text',
        content: 'Hello ',
      },
      {
        type: 'here',
      },
    ]);
  });

  // i have no idea why this is a thing
  // src/rules/emoticon.ts
  // but ig ill have to add a test for it
  test('GIVEN string with ¯\\_(ツ)_/¯ THEN parse the ¯\\_(ツ)_/¯', () => {
    expect(parse('¯\\_(ツ)_/¯')).toEqual([
      {
        type: 'text',
        content: '¯\\_(ツ)_/¯',
      },
    ]);
  });

  test('GIVEN a header with 1-3 "#" signs THEN parse the header', () => {
    expect(parse('# Header')).toEqual([
      {
        type: 'heading',
        level: 1,
        content: [
          {
            type: 'text',
            content: 'Header',
          },
        ],
      },
    ]);
    expect(parse('## Header')).toEqual([
      {
        type: 'heading',
        level: 2,
        content: [
          {
            type: 'text',
            content: 'Header',
          },
        ],
      },
    ]);
    expect(parse('### Header')).toEqual([
      {
        type: 'heading',
        level: 3,
        content: [
          {
            type: 'text',
            content: 'Header',
          },
        ],
      },
    ]);
    expect(parse('#### Header')).toEqual([
      {
        type: 'text',
        content: '#',
      },
      {
        type: 'text',
        content: '#',
      },
      {
        type: 'text',
        content: '#',
      },
      {
        type: 'text',
        content: '# Header',
      },
    ]);
    expect(parse('This is # Not a header')).toEqual([
      {
        type: 'text',
        content: 'This is ',
      },
      {
        type: 'text',
        content: '# Not a header',
      },
    ]);
    expect(parse('This is \n# A header')).toEqual([
      {
        type: 'text',
        content: 'This is ',
      },
      {
        type: 'br',
      },
      {
        type: 'heading',
        level: 1,
        content: [
          {
            type: 'text',
            content: 'A header',
          },
        ],
      },
    ]);
  });

  test('GIVEN a header with "-#" signs THEN parse the subtext', () => {
    expect(parse('-# Subtext')).toEqual([
      {
        type: 'subtext',
        content: [
          {
            type: 'text',
            content: 'Subtext',
          },
        ],
      },
    ]);
    expect(parse('This is -# Not a subtext')).toEqual([
      {
        type: 'text',
        content: 'This is ',
      },
      {
        type: 'text',
        content: '-',
      },
      {
        type: 'text',
        content: '# Not a subtext',
      },
    ]);
    expect(parse('This is \n-# A subtext')).toEqual([
      {
        type: 'text',
        content: 'This is ',
      },
      {
        type: 'br',
      },
      {
        type: 'subtext',
        content: [
          {
            type: 'text',
            content: 'A subtext',
          },
        ],
      },
    ]);
  });

  test('GIVEN a blockquote with headers THEN parse the headers and quote', () => {
    expect(parse('> # Heading 1')).toEqual([
      {
        type: 'blockQuote',
        content: [
          {
            type: 'heading',
            level: 1,
            content: [
              {
                type: 'text',
                content: 'Heading 1',
              },
            ],
          },
        ],
      },
    ]);

    expect(parse('> ## Heading 2')).toEqual([
      {
        type: 'blockQuote',
        content: [
          {
            type: 'heading',
            level: 2,
            content: [
              {
                type: 'text',
                content: 'Heading 2',
              },
            ],
          },
        ],
      },
    ]);

    expect(parse('> ### Heading 3')).toEqual([
      {
        type: 'blockQuote',
        content: [
          {
            type: 'heading',
            level: 3,
            content: [
              {
                type: 'text',
                content: 'Heading 3',
              },
            ],
          },
        ],
      },
    ]);

    expect(parse('> -# Subtext')).toEqual([
      {
        type: 'blockQuote',
        content: [
          {
            type: 'subtext',
            content: [
              {
                type: 'text',
                content: 'Subtext',
              },
            ],
          },
        ],
      },
    ]);
  });

  test('GIVEN a list THEN parse the list', () => {
    expect(parse('1. Hello\n2. World')).toEqual([
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          [
            {
              type: 'text',
              content: 'Hello',
            },
          ],
          [
            {
              type: 'text',
              content: 'World',
            },
          ],
        ],
      },
    ]);

    expect(parse('* Hello\n  World')).toEqual([
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          [
            {
              type: 'text',
              content: 'Hello\n  World',
            },
          ],
        ],
      },
    ]);

    expect(parse('* Weird Multiline\n  Stuff\n    \n    Yay')).toEqual([
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          [
            {
              type: 'text',
              content: 'Hello\n  World',
            },
          ],
        ],
      },
    ]);
  })
});
