import SimpleMarkdown from 'simple-markdown';
import { extend } from '../utils/extend';
import { HeadingRegex } from '../utils/regex';

export const heading = extend(
  {
    match: function (source, state) {
      if (state.prevCapture === null || state.prevCapture[0] === '\n') {
        return HeadingRegex.exec(source);
      }
      return null;
    },
  },
  SimpleMarkdown.defaultRules.heading
);
