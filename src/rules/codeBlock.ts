import SimpleMarkdown from 'simple-markdown';
import { extend } from '../utils/extend';

export const codeBlock = extend({
    match: SimpleMarkdown.inlineRegex(/^```(([a-z0-9-]+?)\n+)?\n*([^]+?)\n*```/i),

    parse: function(capture, parse, state) {
        return {
            lang: (capture[2] || '').trim(),
            content: capture[3] || '',
            inQuote: state.inQuote || false
        };
    },

}, SimpleMarkdown.defaultRules.codeBlock);