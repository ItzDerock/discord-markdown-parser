/**
 * A copy of SimpleMarkdown's list rule, but with slight modifications to the match function.
 * Only matches `*`, `-`, `1.` as list, as the original also matches `+` which Discord does not.
 * Breaks out of lists if there is more than one newline, i.e.:
 *  * hi
 *    this is part of the same item
 *  but not this
 *    nor is this (even if the above line was blank)
 */

import SimpleMarkdown, { type ParserRule } from '@khanacademy/simple-markdown';
import { extend } from '../utils/extend';

const LIST_BULLET = '(?:[*+-]|\\d+\\.)';

// recognize the start of a list item:
// leading space plus a bullet plus a space (`   * `)
const LIST_ITEM_PREFIX = '( *)(' + LIST_BULLET + ') +';
const LIST_ITEM_PREFIX_R = new RegExp('^' + LIST_ITEM_PREFIX);
// recognize an individual list item:
//  * hi
//    this is part of the same item
//
//    as is this, which is a new paragraph in the same item
//
//  * but this is not part of the same item
var LIST_ITEM_R = new RegExp(LIST_ITEM_PREFIX + '[^\\n]*(?:\\n' + '(?!\\1' + LIST_BULLET + ' )[^\\n]*)*(\n|$)', 'gm');
var BLOCK_END_R = /\n{2,}$/;
var INLINE_CODE_ESCAPE_BACKTICKS_R = /^ (?= *`)|(` *) $/g;
// recognize the end of a paragraph block inside a list item:
// two or more newlines at end end of the item
var LIST_BLOCK_END_R = BLOCK_END_R;
var LIST_ITEM_END_R = / *\n+$/;
// check whether a list item has paragraphs: if it does,
// we leave the newlines at the end
var LIST_R = new RegExp(
  '^( *)(' +
  LIST_BULLET +
  ') ' +
  '[\\s\\S]+?(?:\n{2,}(?! )' +
  '(?!\\1' +
  LIST_BULLET +
  ' )\\n*' +
  // the \\s*$ here is so that we can parse the inside of nested
  // lists, where our content might end before we receive two `\n`s
  '|\\s*\n*$)'
);

const LIST_LOOKBEHIND_R = /(?:^|\n)( *)$/;

export const list: ParserRule = extend(
  {
    match: (source, state) => {
      const prevCaptureStr = state.prevCapture == null ? '' : state.prevCapture[0];
      const isStartOfLineCapture = LIST_LOOKBEHIND_R.exec(prevCaptureStr);

      // state needed internally for the list rule parse function
      state.inline = state.prevCapture !== null && state.prevCapture.slice(-1)[0] !== '\n';
      const isListBlock = state._list || !state.inline;

      console.log(isStartOfLineCapture, isListBlock);

      if (isStartOfLineCapture && isListBlock) {
        source = isStartOfLineCapture[1] + source;
        return LIST_R.exec(source);
      } else {
        return null;
      }
    },
  },
  SimpleMarkdown.defaultRules.list
);
