import SimpleMarkdown, { type ParserRule } from '@khanacademy/simple-markdown';
import { HereRegex } from '../../utils/regex';

export const here: ParserRule = {
  order: SimpleMarkdown.defaultRules.strong.order,
  match: (source) => HereRegex.exec(source),
  parse: function () {
    return {};
  },
};
