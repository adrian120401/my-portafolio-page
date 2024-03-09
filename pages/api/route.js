export default async function startConversation(req, res) {
  const secret = process.env.BOT_SECRET;

  const response = await fetch(
    `https://directline.botframework.com/v3/directline/conversations`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
      },
    }
  ).then((res) => res.json());

  const streamUrl = response.streamUrl;

  const conversationId = response.conversationId;

  const token = response.token;

  return res.status(201).json({ streamUrl, conversationId, token });
}
