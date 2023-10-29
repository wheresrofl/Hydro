import { Command } from "../../structures/Command";
import {  GuildMember, Permissions, MessageEmbed } from "discord.js";

export default new Command({
    name: "ban",
    description: "Ban a user",
    userPermissions: [Permissions.FLAGS.BAN_MEMBERS],
    options: [
        {
            name: "user",
            description: "User to ban",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "reason why you are banning this guy",
            type: "STRING",
            required: false
        }
    ],
    run: async ({ interaction }) => {
        const userOption = interaction.options.getMember("user") as GuildMember;
        const banReason = interaction.options.getString("reason");
        
        let dmSuccess = false
        
        try {
            const dmEmbed = new MessageEmbed()
                .setColor("#fff")
                .setTitle("Banned")
                .setDescription(`You have been banned from ${interaction.guild.name}`)
                .setFields(
                    { name: "moderator", value: `<@${interaction.user.id}>`, inline: true },
                    { name: "reason", value: banReason, inline: true }
                )
            await userOption.send({
                embeds: [dmEmbed]
            })
            
            await userOption.ban({ reason: banReason })
            await interaction.editReply(`Successfully banned ${userOption.user.tag}.`);
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
