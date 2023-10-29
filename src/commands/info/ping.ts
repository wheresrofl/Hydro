import { Command } from "../../structures/Command";
import { client } from "../../main"

export default new Command({
    name: "ping",
    description: "replies with bot ping",
    run: async ({ interaction }) => {
        await interaction.followUp(`ping: ${client.ws.ping}ms`);
    }
});
