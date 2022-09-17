import SimpleMarkdown from 'simple-markdown';

export const spoiler: SimpleMarkdown.ParserRule = {
    order: 0,
    match: source => /^\|\|([\s\S]+?)\|\|/.exec(source),
    parse: function(capture, parse, state) {
        return {
            content: parse(capture[1], state)
        };
    }
}