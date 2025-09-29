// Netlify Function: send-telegram
// Sends contact form submission to a Telegram channel or chat.
// Requires environment variables:
//   TELEGRAM_BOT_TOKEN  (e.g. 123456789:ABC...)
//   TELEGRAM_CHAT_ID    (channel or group/chat id; for channel use @channelusername or numeric id)
// Optional:
//   TELEGRAM_THREAD_ID  (for forum topics / threads)

export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, TELEGRAM_THREAD_ID } = process.env
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return new Response(JSON.stringify({ error: 'Missing Telegram env vars' }), { status: 500 })
  }

  let payload
  try {
    payload = await req.json()
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 })
  }

  const { name = '', email = '', messenger = '', message = '' } = payload || {}
  const time = new Date().toISOString()

  const lines = [
    '📩 New Lead',
    `🕒 ${time}`,
    name && `👤 Name: ${name}`,
    email && `✉️ Email: ${email}`,
    messenger && `💬 Messenger: ${messenger}`,
    message && '\n' + message,
  ].filter(Boolean)

  const text = lines.join('\n')

  const tgUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
  const body = {
    chat_id: TELEGRAM_CHAT_ID,
    text,
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
  }
  if (TELEGRAM_THREAD_ID) body.message_thread_id = Number(TELEGRAM_THREAD_ID)

  try {
    const resp = await fetch(tgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = await resp.json()
    if (!resp.ok || !data.ok) {
      return new Response(JSON.stringify({ error: 'Telegram API error', details: data }), { status: 502 })
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Network error', details: err.message }), { status: 500 })
  }
}
