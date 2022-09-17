import SimpleMarkdown from 'simple-markdown';
import { extend } from "../utils/extend";

export const text = extend({
    match: source => /^[\s\S]+?(?=[^0-9A-Za-z\s\u00c0-\uffff-]|\n\n|\n|\w+:\S|$)/.exec(source),
}, SimpleMarkdown.defaultRules.text);