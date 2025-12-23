import SimpleMarkdown, { type ParserRule } from '../../simple-markdown';
import { EveryoneRegex } from '../../utils/regex';

export const everyone: ParserRule = {
  order: SimpleMarkdown.defaultRules.strong.order,
  match: (source) => EveryoneRegex.exec(source),
  parse: function () {
    return {};
  },
};
