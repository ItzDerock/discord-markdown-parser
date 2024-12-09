import SimpleMarkdown, { type ParserRule } from '@khanacademy/simple-markdown';
import { extend } from '../utils/extend';
import { BlockQuoteRegex } from '../utils/regex';

export const blockQuote: ParserRule = extend(
  {
    match: function (source, state, prevSource) {
      return !/^$|\n *$/.test(prevSource) || state.inQuote ? null : BlockQuoteRegex.exec(source);
    },

    parse: function (capture, parse, state) {
      const all = capture[0];
      const isBlock = Boolean(/^ *>>> ?/.exec(all));
      const removeSyntaxRegex = isBlock ? /^ *>>> ?/ : /^ *> ?/gm;
      const content = all.replace(removeSyntaxRegex, '');

      return {
        content: parse(content, Object.assign({}, state, { inQuote: true })),
        type: 'blockQuote',
      };
    },
  },
  SimpleMarkdown.defaultRules.blockQuote
);
