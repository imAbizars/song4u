let store = {}

export default function handler(req, res) {
  const id = Math.random().toString(36).substring(2, 9)
  store[id] = req.body
  res.json({ id })
}
