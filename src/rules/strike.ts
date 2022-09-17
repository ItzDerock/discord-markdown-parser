import SimpleMarkdown from 'simple-markdown';
import { extend } from "../utils/extend";

export const strikethrough = extend({
    match: SimpleMarkdown.inlineRegex(/^~~([\s\S]+?)~~(?!_)/)
}, SimpleMarkdown.defaultRules.del);