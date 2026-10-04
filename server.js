const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));

function generateSyntheticBathymetry(fileName = 'demo_bathymetry.tif') {
  const samples = [];
  for (let i = 0; i < 24; i += 1) {
    const x = i / 23;
    const base = 180 + 70 * Math.sin((x + 0.2) * 5.3);
    const shelf = 15 * Math.cos((x + 0.7) * 2.1);
    const ridge = 30 * Math.exp(-((x - 0.65) ** 2) / 0.07);
    const depth = Math.max(40, base + shelf + ridge);
    samples.push({ x, depth: Number(depth.toFixed(1)) });
  }

  return {
    fileName,
    summary: {
      meanDepth: Number((samples.reduce((sum, s) => sum + s.depth, 0) / samples.length).toFixed(1)),
      maxDepth: Number(Math.max(...samples.map((s) => s.depth)).toFixed(1)),
      minDepth: Number(Math.min(...samples.map((s) => s.depth)).toFixed(1)),
      slope: 'moderate shelf-to-ridge transition',
      confidence: 'demo simulation'
    },
    samples
  };
}

function buildAssistantReply(message) {
  const lower = String(message || '').toLowerCase();
  const bathy = generateSyntheticBathymetry('mock_bathymetry.tif');

  let answer = [
    'This is a mocked bathymetry flow, designed to simulate how the software would interpret a .tif environmental input without requiring a real geospatial library in a restricted environment.',
    'The system generates a synthetic ocean-floor profile using deterministic mathematical functions, which makes it possible to demonstrate depth variation, sound-speed change, and acoustic ray behavior in a controlled demo.',
    'The data is not a real TIFF parse; it is a procedural profile used to emulate the structural features that matter for ASW forecasting, such as shelf break, ridges, and bottom reflections.'
  ].join(' ');

  if (lower.includes('tif') || lower.includes('bathymetry') || lower.includes('depth')) {
    answer += ` The current mock file profile reports an average depth of ${bathy.summary.meanDepth} m, with a max depth of ${bathy.summary.maxDepth} m and a minimum of ${bathy.summary.minDepth} m. This supports a demonstrative propagation model that would cause refraction and bottom bounce effects.`;
  }

  if (lower.includes('how') || lower.includes('utilising') || lower.includes('using')) {
    answer += ' In other words, the software treats the uploaded .tif as a conceptual environmental layer: it approximates terrain geometry, estimates depth variation, and feeds that into the ray-trace engine so the user can see how acoustic paths react to the seafloor.';
  }

  if (lower.includes('google') || lower.includes('cloud') || lower.includes('vertex')) {
    answer += ' In a production setup this would connect to Google Cloud Vertex AI or a secure backend proxy for real model inference, but this local simulation intentionally keeps everything offline and deterministic.';
  }

  return answer;
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'nops-ai-simulator' });
});

app.post('/api/chat', (req, res) => {
  const message = req.body?.message || '';
  const reply = buildAssistantReply(message);

  res.json({
    role: 'model',
    text: reply,
    timestamp: Date.now()
  });
});

app.post('/api/analyze', (req, res) => {
  const fileName = req.body?.fileName || 'mock_bathymetry.tif';
  const profile = generateSyntheticBathymetry(fileName);

  res.json({
    status: 'ok',
    message: `Analysis complete for ${fileName}. Synthetic bathymetry generated for simulation mode.`,
    profile,
    insight: 'This demo interprets the TIFF-like input as a procedural terrain surface used to visualize bottom interaction and propagation effects.'
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`NOPS AI simulator running at http://localhost:${PORT}`);
});
