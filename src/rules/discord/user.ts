import SimpleMarkdown, { type ParserRule } from '@khanacademy/simple-markdown';
import { UserMentionRegex } from '../../utils/regex';

export const user: ParserRule = {
  order: SimpleMarkdown.defaultRules.strong.order,
  match: (source) => UserMentionRegex.exec(source),
  parse: function (capture) {
    return {
      id: capture[1],
      type: 'user',
    };
  },
};
