import SimpleMarkdown, { type ParserRule } from '../../simple-markdown';
import { RoleMentionRegex } from '../../utils/regex';

export const role: ParserRule = {
  order: SimpleMarkdown.defaultRules.strong.order,
  match: (source) => RoleMentionRegex.exec(source),
  parse: function (capture) {
    return {
      id: capture[1],
    };
  },
};
