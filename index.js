// Air France | PTFS — Welcome Bot

const http = require("http");
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => res.end("Bot is running")).listen(PORT, () => {
  console.log(`🌐 Dummy server listening on port ${PORT}`);
});

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

const TOKEN = process.env.DISCORD_TOKEN;
const WELCOME_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID;

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  try {
    const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
    if (!channel) {
      console.error("❌ Welcome channel not found. Check WELCOME_CHANNEL_ID.");
      return;
    }

    const memberCount = member.guild.memberCount;

    const banner = new AttachmentBuilder("./Capture d'écran 2026-09-08 165923.png", {
      name: "welcome-banner.png",
    });

    const embed = new EmbedBuilder()
      .setColor(0x002157)
      .setTitle("Welcome aboard Air France | PTFS ✈️")
      .setDescription(
        `Hey ${member}, welcome to the server!\n\n` +
          `Check out the rules and info to get started.\n\n` +
          `Have a great flight! 🛫`
      )
      .setImage("attachment://welcome-banner.png")
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `Member #${memberCount}` })
      .setTimestamp();

    await channel.send({ embeds: [embed], files: [banner] });
  } catch (err) {
    console.error("❌ Error sending welcome message:", err);
  }
});

client.login(TOKEN);
