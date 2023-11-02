import { Command } from "../../structures/Command";
import { GuildMember, Permissions, MessageEmbed } from "discord.js";

export default new Command({
    name: "kick",
    description: "Kicks a user",
    userPermissions: [Permissions.FLAGS.KICK_MEMBERS],
    options: [
        {
            name: "user",
            description: "User to kick",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "reason why you are kicking this guy",
            type: "STRING",
            required: false
        }
    ],
    run: async ({ interaction }) => {
        const userOption = interaction.options.getMember("user") as GuildMember;
        const kickReason = interaction.options.getString("reason");

        let dmSuccess = false

        try {
            const dmEmbed = new MessageEmbed()
                .setColor("#fff")
                .setTitle("Kicked")
                .setDescription(`You have been kicked from ${interaction.guild.name}`)
                .setFields(
                    { name: "moderator", value: `<@${interaction.user.id}>`, inline: true },
                    { name: "reason", value: kickReason, inline: true }
                    )
            await userOption.send({
                embeds: [dmEmbed]
            })

            await userOption.kick()
            await interaction.editReply(`Successfully kicked ${userOption.user.tag}.`);
        } catch (error) {
            console.error(error);
            const errorReplyOptions = {
                content: "An error occurred while trying to ban the user.",
                ephemeral: true, 
            };
            await interaction.followUp(errorReplyOptions);
        }
    },
});
