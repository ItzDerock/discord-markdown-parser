import SimpleMarkdown, { ParserRule } from '@khanacademy/simple-markdown';
import { TimestampRegex } from '../../utils/regex';

export const timestamp: ParserRule = {
  order: SimpleMarkdown.defaultRules.strong.order,
  match: (source) => TimestampRegex.exec(source),
  parse: function (capture) {
    return {
      timestamp: capture[1],
      format: capture[2],
    };
  },
};
