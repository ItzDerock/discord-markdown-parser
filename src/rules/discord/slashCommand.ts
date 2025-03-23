import SimpleMarkdown, { type ParserRule } from '@khanacademy/simple-markdown';
import { SlashCommandRegex } from '../../utils/regex';

export const slashCommand: ParserRule = {
  order: SimpleMarkdown.defaultRules.strong.order,
  match: (source) => SlashCommandRegex.exec(source),
  parse: function (capture) {
    // Commands can come in three variants:
    // 1. /command
    // 2. /command subcommand
    // 3. /command subcommand-group subcommand
    const commandParts = capture[1].split(' ');

    const returnValue = {
      fullName: capture[1],
      name: commandParts[0],
      subcommand: null as string | null,
      subcommandGroup: null as string | null,
      id: capture[2],
    };

    // length of 2 means no subcommand group
    if (commandParts.length == 2) {
      returnValue.subcommand = commandParts[1];
    }

    if (commandParts.length === 3) {
      returnValue.subcommandGroup = commandParts[1];
      returnValue.subcommand = commandParts[2];
    }

    return returnValue;
  },
};
