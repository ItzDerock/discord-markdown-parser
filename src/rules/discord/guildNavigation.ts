import SimpleMarkdown, { type ParserRule } from '@khanacademy/simple-markdown';
import { GuildNavigationRegex } from '../../utils/regex';

export const guildNavigation: ParserRule = {
  order: SimpleMarkdown.defaultRules.strong.order,
  match: (source) => GuildNavigationRegex.exec(source),
  parse: function (capture) {
    // linked-roles navigation type adds an optional role ID
    const navigation = capture[2] ?? capture[3];

    if (navigation === 'linked-roles') {
      // the start of the roleId is padded with a colon,
      // so we need to remove it
      const roleId = capture[4]?.slice(1) ?? null;

      return {
        id: capture[1],
        navigation,
        roleId,
      };
    } else {
      return {
        id: capture[1],
        navigation,
      };
    }
  },
};
