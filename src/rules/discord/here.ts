import SimpleMarkdown from 'simple-markdown';

export const here: SimpleMarkdown.ParserRule = {
    order: SimpleMarkdown.defaultRules.strong.order,
    match: source => /^@here/.exec(source),
    parse: function() {
        return { };
    },
};