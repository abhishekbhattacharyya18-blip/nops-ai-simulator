* {
  box-sizing: border-box;
}

:root {
  --bg: #071320;
  --panel: #0d1f30;
  --panel-strong: #122b3f;
  --muted: #8aa6bf;
  --line: #1e3955;
  --cyan: #59d4ff;
  --cyan-strong: #1fbedf;
  --green: #6ee7a6;
  --amber: #ffd166;
  --red: #ff6978;
  --text: #ebf6ff;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: linear-gradient(135deg, #050d18 0%, #0a1726 50%, #08141d 100%);
  color: var(--text);
}

button,
input,
textarea {
  font: inherit;
}

.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 28px;
  background: rgba(7, 19, 32, 0.88);
  border-bottom: 1px solid var(--line);
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  color: var(--cyan);
  background: rgba(89, 212, 255, 0.12);
  border: 1px solid rgba(89, 212, 255, 0.3);
  font-size: 24px;
}

.topbar h1 {
  margin: 0;
  font-size: 1.1rem;
  letter-spacing: 0.04em;
}

.topbar p {
  margin: 2px 0 0;
  color: var(--muted);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.ghost-btn,
.primary-btn {
  border: 1px solid rgba(89, 212, 255, 0.28);
  background: rgba(89, 212, 255, 0.08);
  color: var(--text);
  border-radius: 10px;
  padding: 10px 14px;
  cursor: pointer;
  transition: 0.2s ease;
}

.primary-btn {
  background: linear-gradient(135deg, rgba(25, 166, 206, 0.3), rgba(89, 212, 255, 0.12));
}

.ghost-btn:hover,
.primary-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(89, 212, 255, 0.08);
}

.main-layout {
  display: grid;
  grid-template-columns: 1.4fr 0.9fr;
  gap: 20px;
  padding: 20px;
  flex: 1;
}

.dashboard-panel,
.chat-panel {
  background: rgba(13, 31, 48, 0.88);
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
}

.dashboard-panel {
  padding: 20px;
}

.chat-panel {
  display: flex;
  flex-direction: column;
  min-height: 680px;
}

.panel-header,
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.panel-header h2 {
  margin: 0;
  font-size: 1.2rem;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.stat-card {
  background: rgba(18, 43, 63, 0.8);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 14px 12px;
}

.label {
  display: block;
  color: var(--muted);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.stat-card strong {
  display: block;
  margin-top: 8px;
  font-size: 1.18rem;
}

.chart-panel {
  margin-top: 20px;
  background: rgba(8, 18, 28, 0.8);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 12px 14px 8px;
}

.chart-header {
  color: var(--muted);
  font-size: 0.8rem;
  margin-bottom: 10px;
}

#bathymetryChart {
  width: 100%;
  height: 260px;
  border-radius: 10px;
  background: radial-gradient(circle at top, rgba(89, 212, 255, 0.06), rgba(0, 0, 0, 0.2));
}

.upload-box {
  margin-top: 18px;
  background: rgba(14, 35, 52, 0.8);
  border: 1px dashed rgba(89, 212, 255, 0.3);
  border-radius: 14px;
  padding: 16px;
}

.file-label {
  display: inline-block;
  margin-bottom: 8px;
  font-weight: 600;
}

.upload-box small {
  display: block;
  margin-top: 8px;
  color: var(--muted);
}

.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px 18px 12px;
  overflow-y: auto;
  flex: 1;
}

.message {
  max-width: 88%;
  padding: 12px 14px;
  border-radius: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  font-size: 0.95rem;
}

.message.user {
  align-self: flex-end;
  background: rgba(89, 212, 255, 0.14);
  border: 1px solid rgba(89, 212, 255, 0.28);
}

.message.model {
  align-self: flex-start;
  background: rgba(32, 47, 63, 0.8);
  border: 1px solid rgba(147, 197, 253, 0.15);
}

.composer {
  border-top: 1px solid var(--line);
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

textarea {
  width: 100%;
  resize: none;
  background: rgba(10, 18, 27, 0.9);
  border: 1px solid var(--line);
  color: var(--text);
  border-radius: 12px;
  padding: 12px 14px;
}

.wide {
  width: 100%;
}

@media (max-width: 980px) {
  .main-layout {
    grid-template-columns: 1fr;
  }

  .stat-grid {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
  }
}
