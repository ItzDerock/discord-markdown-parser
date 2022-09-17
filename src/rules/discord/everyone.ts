import SimpleMarkdown from 'simple-markdown';

export const everyone: SimpleMarkdown.ParserRule = {
    order: SimpleMarkdown.defaultRules.strong.order,
    match: source => /^@everyone/.exec(source),
    parse: function() {
        return { };
    },
};