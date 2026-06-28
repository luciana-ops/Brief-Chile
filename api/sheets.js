export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const GAS_URL = 'https://script.google.com/macros/s/AKfycbxL5wzu6xLD2mOvxTZSa-08kX59oFbGC8Z4UkmzdsCHrp5rb9kTtOPZ7roGQJLYongp/exec';

  try {
    if (req.method === 'GET') {
      const params = new URLSearchParams(req.query);
      const r = await fetch(`${GAS_URL}?${params.toString()}`);
      const d = await r.json();
      return res.status(200).json(d);
    } else {
      const r = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(req.body)
      });
      const d = await r.json();
      return res.status(200).json(d);
    }
  } catch(err) {
    return res.status(500).json({ error: err.message });
  }
}
