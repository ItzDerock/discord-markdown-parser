/**
 * Matches Discord channel mentions.
 * @example <#123456789012345678>
 *
 * The regex captures a 17-20 digit channel ID inside <#...> brackets.
 */
export const ChannelMentionRegex = /^<#(\d{17,20})>/;

/**
 * Matches custom emoji mentions.
 * @example <:smile:12345678901234567>
 *
 * The regex captures:
 * - Optional "a" for animated emojis
 * - Emoji name (2-32 characters)
 * - Emoji ID (17-21 digits)
 */
export const EmojiRegex = /^<(a)?:(\w{2,32}):(\d{17,21})>/;

/**
 * Matches Discord role mentions.
 * @example <@&123456789012345678>
 *
 * The regex captures a 17-20 digit role ID inside <@&...> brackets.
 */
export const RoleMentionRegex = /^<@&(\d{17,20})>/;

/**
 * Matches Discord user mentions.
 *
 * @example <@123456789012345678> or <@!123456789012345678>
 *
 * The regex captures a 17-20 digit user ID, optionally preceded by "!".
 */
export const UserMentionRegex = /^<@!?(\d{17,20})>/;

/**
 * Matches the @everyone mention.
 */
export const EveryoneRegex = /^@everyone/;

/**
 * Matches the @here mention.
 */
export const HereRegex = /^@here/;

/**
 * Matches block quotes in two formats:
 * 1. Single line: ">>> text"
 * 2. Multi-line: "> text\n> more text"
 *
 * @example >>> This is a block quote
 */
export const BlockQuoteRegex = /^( *>>> ([\s\S]*))|^( *> [^\n]*(\n *> [^\n]*)*\n?)/;

/**
 * Matches code blocks with optional language specification.
 *
 * @example ```javascript
 * const example = "code";
 * ```
 */
export const CodeBlockRegex = /^```(([a-z0-9_+\-.#]+?)\n+)?\n*([^]+?)\n*```/i;

/**
 * Matches the ¯\_(ツ)_/¯ emoticon.
 */
export const EmoticonRegex = /^(¯\\_\(ツ\)_\/¯)/;

/**
 * Matches spoiler text wrapped in double pipes.
 *
 * @example ||This is a spoiler||
 */
export const SpoilerRegex = /^\|\|([\s\S]+?)\|\|/;

/**
 * Matches strikethrough text wrapped in tildes.
 *
 * @example ~~This text is strikethrough~~
 */
export const StrikeThroughRegex = /^~~([\s\S]+?)~~(?!_)/;

/**
 * Matches plain text content in messages.
 *
 * This regex is designed to capture text up to certain delimiters
 * like punctuation, newlines, or specific patterns.
 */
export const TextRegex = /^[\s\S]+?(?=[^0-9A-Za-z\s]|\n\n|\n|\w+:\S|$)/;

/**
 * Matches Discord timestamp mentions.
 *
 * @example <t:123456> or <t:123456:t> for specific formats
 */
export const TimestampRegex = /^<t:(-?\d+)(?::(R|t|T|d|D|f|F))?>/;

/**
 * Matches markdown headings (H1-H3 level).
 *
 * @example # Heading
 * @example ## Subheading
 * @example ### Subsubheading
 */
export const HeadingRegex = /^(#{1,3}) +([^\n]+?)(\n|$)/;

/**
 * Matches subtext in markdown headings.
 *
 * @example -# Subtext
 */
export const SubtextRegex = /^-# +([^\n]+?)(\n|$)/;

/**
 * Matches for slash command mentions.
 *
 * @example </command:123456789012345678>
 *
 * Slash command names can be up to 32 characters long,
 * and the regex for the name was taken from the discord api documentation
 * Commands can also be nested up to 3 times (</command group subcommand:id>)
 */
export const SlashCommandRegex =
  /^<\/([-_'\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}(?: [-_'\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}){0,2})?:(\d{17,21})>$/u;

/**
 * Matches for guild navigation mentions.
 * The `linked-roles` type adds in another opptional :ROLE-ID field.
 *
 * @example <12345679012345678:customize>
 *
 * @see {@link https://discord.com/developers/docs/reference#message-formatting-guild-navigation-types} for available types
 */
export const GuildNavigationRegex = /^<(\d{17,20}):(?:(customize|browse|guide)|(linked-roles)(:\d{17,20})?)>/;
