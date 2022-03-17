import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import { BaseDiscordCommand } from '../types'
import getUser from '../utils/getUser'
import notFoundEmbed from '../utils/notFoundEmbed'

export default class OsuProfileCommand implements BaseDiscordCommand {
  data = new SlashCommandBuilder()
    .setName('osu')
    .setDescription('Display your osu! profile (via osusig)')
    .addStringOption((option) =>
      option.setName('username')
        .setDescription('Your osu! username')
    )

  IMAGE_ENDPOINT = (id: string | number): string =>
    `https://lemmmy.pw/osusig/sig.php?colour=pink&uname=${id}&pp=1&darktriangles&onlineindicator=undefined&xpbar&xpbarhex`

  async run (interaction: CommandInteraction): Promise<void> {
    const username = interaction.options.getString('username')

    const user = await getUser({
      username,
      discordId: interaction.user.id
    })

    if (!user) {
      return interaction.reply({ embeds: [notFoundEmbed] })
    }

    return interaction.reply(this.IMAGE_ENDPOINT(user.id))
  }
}
