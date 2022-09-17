import SimpleMarkdown from 'simple-markdown';

export const emoticon: SimpleMarkdown.ParserRule = {
    order: SimpleMarkdown.defaultRules.text.order,
    match: source => /^(¯\\_\(ツ\)_\/¯)/.exec(source),
    parse: function(capture) {
        return {
            type: 'text',
            content: capture[1]
        };
    }
}