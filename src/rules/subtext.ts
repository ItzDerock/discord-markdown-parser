import SimpleMarkdown, { type ParserRule } from '@khanacademy/simple-markdown';
import { SubtextRegex } from '../utils/regex';

export const subtext: ParserRule = {
  order: 0,
  match: function (source, state) {
    if (state.prevCapture === null || state.prevCapture[0] === '\n') {
      return SubtextRegex.exec(source);
    }
    return null;
  },
  parse: function (capture, parse, state) {
    return {
      content: parse(capture[1], state),
    };
  },
};