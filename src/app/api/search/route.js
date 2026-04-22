export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q")

  const res = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&limit=5&country=ID`
  )

  const data = await res.json()

  // Mapping agar struktur mirip Spotify
  const tracks = data.results.map((item) => ({
    id: item.trackId,
    name: item.trackName,
    artists: [{ name: item.artistName }],
    album: {
      images: [{ url: item.artworkUrl100 }],
    },
    previewUrl: item.previewUrl,
  }))

  return Response.json(tracks)
}