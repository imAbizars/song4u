export default function handler(req, res) {
  const id = req.query.id
  res.json(store[id] || null)
}
