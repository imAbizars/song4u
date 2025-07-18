export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q")

  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  const authRes = await fetch("https://accounts.spotify.com/api/token ", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })

  const { access_token } = await authRes.json()

  const searchRes = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      q
    )}&type=track&limit=3`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  )

  const data = await searchRes.json()

  return Response.json(data.tracks.items)
}
