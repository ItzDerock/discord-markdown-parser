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
});
