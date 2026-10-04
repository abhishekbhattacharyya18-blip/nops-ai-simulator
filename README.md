const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const analyzeBtn = document.getElementById('analyzeBtn');
const resetBtn = document.getElementById('resetBtn');
const fileInput = document.getElementById('fileInput');
const depthVal = document.getElementById('depthVal');
const soundVal = document.getElementById('soundVal');
const propVal = document.getElementById('propVal');
const terrainVal = document.getElementById('terrainVal');
const sampleFileName = document.getElementById('sampleFileName');
const chartCanvas = document.getElementById('bathymetryChart');
const ctx = chartCanvas.getContext('2d');

function appendMessage(role, text) {
  const el = document.createElement('div');
  el.className = `message ${role}`;
  el.textContent = text;
  chatMessages.appendChild(el);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setLoading(isLoading) {
  sendBtn.disabled = isLoading;
  sendBtn.textContent = isLoading ? 'Sending...' : 'Send';
}

async function callChatApi(message) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  if (!response.ok) {
    throw new Error('Chat API failed.');
  }

  return response.json();
}

async function handleSend(messageText) {
  if (!messageText.trim()) return;

  appendMessage('user', messageText.trim());
  userInput.value = '';
  setLoading(true);

  try {
    const data = await callChatApi(messageText.trim());
    appendMessage('model', data.text);
  } catch (error) {
    appendMessage('model', 'The mock assistant could not respond. Please try again.');
  } finally {
    setLoading(false);
  }
}

sendBtn.addEventListener('click', () => handleSend(userInput.value));
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    handleSend(userInput.value);
  }
});

function drawBathymetry(samples) {
  const width = chartCanvas.width;
  const height = chartCanvas.height;
  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = 'rgba(89, 212, 255, 0.4)';
  ctx.lineWidth = 1;

  for (let y = 0; y <= 4; y += 1) {
    const cy = (height / 4) * y;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(width, cy);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.moveTo(0, height - 20);
  for (const point of samples) {
    const x = point.x * (width - 20) + 10;
    const y = height - 20 - ((point.depth - 40) / 220) * (height - 40);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(width - 10, height - 20);
  ctx.fillStyle = 'rgba(89, 212, 255, 0.12)';
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0, height - 20);
  for (const point of samples) {
    const x = point.x * (width - 20) + 10;
    const y = height - 20 - ((point.depth - 40) / 220) * (height - 40);
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = '#59d4ff';
  ctx.lineWidth = 2.4;
  ctx.stroke();
}

async function handleAnalyze() {
  const filename = 'mock_bathymetry.tif';
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName: filename })
  });

  const data = await res.json();
  const { summary, samples } = data.profile;

  depthVal.textContent = `${summary.meanDepth} m`;
  soundVal.textContent = '1487 m/s';
  propVal.textContent = 'Ray trace active';
  terrainVal.textContent = 'Shelf ridge';
  sampleFileName.textContent = filename;
  drawBathymetry(samples);

  appendMessage('model', `${data.message} ${data.insight}`);
}

resetBtn.addEventListener('click', () => {
  chatMessages.innerHTML = '';
  userInput.value = '';
  appendMessage('model', 'Session reset. The mock system is ready for a new acoustic scenario.');
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files?.[0];
  if (!file) return;
  sampleFileName.textContent = file.name || 'mock_bathymetry.tif';
  appendMessage('model', `Mock upload received for ${file.name}. The system is treating this as a procedural terrain input in demo mode. This is not a real TIFF parse.`);
});

(async function bootstrap() {
  appendMessage('model', 'NOPS AI assistant ready. Ask about the current .tif terrain or deploy a demo analysis.');
  const profile = await (await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName: 'mock_bathymetry.tif' })
  })).json();

  const { summary, samples } = profile.profile;
  depthVal.textContent = `${summary.meanDepth} m`;
  soundVal.textContent = '1487 m/s';
  propVal.textContent = 'Stable';
  terrainVal.textContent = 'Ridge';
  drawBathymetry(samples);

  appendMessage('user', 'how is this software utilising the .TIF file that i am providing');
  const initialResponse = await callChatApi('how is this software utilising the .TIF file that i am providing');
  appendMessage('model', initialResponse.text);
})();

analyzeBtn.addEventListener('click', handleAnalyze);
