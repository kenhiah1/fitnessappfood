:root {
  --primary: #4ade80;
  --bg: #0f172a;
  --card: #1e293b;
  --text: #f8fafc;
  --muted: #94a3b8;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  overscroll-behavior: none;
}

.app-shell {
  display: flex;
  flex-direction: column;
  height: 100svh;
  padding-bottom: env(safe-area-inset-bottom);
}

/* HEADER */
header {
  padding: 22px 16px 18px;
  background: linear-gradient(180deg, #1e293b, #0f172a);
  box-shadow: 0 2px 10px rgba(0,0,0,.4);
  position: sticky;
  top: 0;
  z-index: 10;
}

header h1 {
  margin: 0;
  font-size: 22px;
}

.daily-stat {
  font-size: 14px;
  color: var(--muted);
  margin-top: 6px;
}

.progress-container {
  width: 100%;
  height: 8px;
  background: #334155;
  border-radius: 999px;
  margin-top: 10px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  width: 0%;
  background: var(--primary);
  transition: width .4s ease;
}

/* CAMERA */
.camera-viewport {
  height: 42vh;
  background: #000;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  overflow: hidden;
  box-shadow: inset 0 -40px 60px rgba(0,0,0,.55);
}

#video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ACTION */
.action-area {
  padding: 20px;
  text-align: center;
}

.main-fab {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--primary);
  border: none;
  font-size: 30px;
  box-shadow: 0 4px 15px rgba(74, 222, 128, 0.4);
  cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease;
}

.main-fab:active {
  transform: scale(.94);
  box-shadow: 0 2px 8px rgba(74, 222, 128, 0.35);
}

#status-text {
  margin-top: 10px;
  font-size: 14px;
  color: var(--muted);
}

/* RESULT CARD */
.result-card {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--card);
  border-radius: 24px 24px 0 0;
  padding: 20px;
  box-shadow: 0 -20px 40px rgba(0,0,0,.6);
  transform: translateY(110%);
  transition: transform .35s cubic-bezier(.4,0,.2,1);
}

.result-card:not(.hidden) {
  transform: translateY(0);
}

.card-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.btn-primary {
  background: var(--primary);
  color: #000;
  border: none;
  padding: 12px;
  border-radius: 12px;
  font-weight: bold;
  flex: 1;
}

.btn-secondary {
  background: transparent;
  color: var(--muted);
  border: 1px solid #475569;
  padding: 12px;
  border-radius: 12px;
  flex: 1;
}

/* HISTORY */
.history {
  padding: 16px;
  flex-grow: 1;
}

.log-item {
  display: flex;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #334155;
  font-size: 14px;
}
