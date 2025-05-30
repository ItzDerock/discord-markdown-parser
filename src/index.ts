import SimpleMarkdown, { type ParserRule } from '@khanacademy/simple-markdown';

// import all the rules
import { guildNavigation } from './rules/discord/guildNavigation';
import { slashCommand } from './rules/discord/slashCommand';
import { everyone } from './rules/discord/everyone';
import { twemoji } from './rules/discord/twemoji';
import { channel } from './rules/discord/channel';
import { timestamp } from './rules/discord/time';
import { blockQuote } from './rules/blockQuote';
import { strikethrough } from './rules/strike';
import { codeBlock } from './rules/codeBlock';
import { emoji } from './rules/discord/emoji';
import { role } from './rules/discord/role';
import { autolink } from './rules/autolink';
import { here } from './rules/discord/here';
import { emoticon } from './rules/emoticon';
import { user } from './rules/discord/user';
import { spoiler } from './rules/spoiler';
import { heading } from './rules/heading';
import { subtext } from './rules/subtext';
import { text } from './rules/text';
import { url } from './rules/url';
import { em } from './rules/em';
import { br } from './rules/br';

// rules normal users can use
export const rules: Record<string, ParserRule> = {
  blockQuote,
  codeBlock,
  newline: SimpleMarkdown.defaultRules.newline,
  escape: SimpleMarkdown.defaultRules.escape,
  autolink,
  url,
  em,
  strong: SimpleMarkdown.defaultRules.strong,
  underline: SimpleMarkdown.defaultRules.u,
  strikethrough,
  inlineCode: SimpleMarkdown.defaultRules.inlineCode,
  text,
  emoticon,
  br,
  spoiler,
  heading,
  subtext,

  // discord specific
  user,
  channel,
  role,
  emoji,
  everyone,
  here,
  twemoji,
  timestamp,
  slashCommand,
  guildNavigation,
};

// for use in webhooks, embeds, etc
export const rulesExtended: Record<string, ParserRule> = {
  ...rules,
  link: SimpleMarkdown.defaultRules.link,
};

// build the parser
const parser = SimpleMarkdown.parserFor(rules);
const parserExtended = SimpleMarkdown.parserFor(rulesExtended);

// parse function
export function parse(input: string, type: 'normal' | 'extended' = 'normal') {
  if (type === 'normal') return parser(input, { inline: true });
  else return parserExtended(input, { inline: true });
}

export default parse;

// some types
export type RuleTypes = keyof typeof rules;
export type RuleTypesExtended = keyof typeof rulesExtended;
