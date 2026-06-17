* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Microsoft YaHei", "PingFang SC", Arial, sans-serif;
  background:
    radial-gradient(circle at top left, rgba(255, 231, 112, 0.45), transparent 30%),
    radial-gradient(circle at bottom right, rgba(83, 184, 255, 0.4), transparent 35%),
    linear-gradient(135deg, #eaf6ff, #fff7d6);
  color: #263238;
  min-height: 100vh;
  padding: 24px;
}

.game-wrapper {
  max-width: 1100px;
  margin: 0 auto;
}

.game-header {
  text-align: center;
  padding: 28px 20px;
  background: linear-gradient(135deg, #1e88e5, #42a5f5);
  color: white;
  border-radius: 24px;
  box-shadow: 0 10px 25px rgba(30, 136, 229, 0.25);
  margin-bottom: 24px;
  border: 4px solid #ffffff;
}

.game-header h1 {
  font-size: 42px;
  letter-spacing: 4px;
  margin-bottom: 10px;
  text-shadow: 2px 3px 0 rgba(0, 0, 0, 0.15);
}

.game-header p {
  font-size: 16px;
  opacity: 0.95;
}

.game-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.panel {
  background: rgba(255, 255, 255, 0.92);
  border: 3px solid #263238;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 6px 6px 0 #263238;
}

.panel h2 {
  margin-bottom: 14px;
  color: #1565c0;
  font-size: 22px;
}

.hero-panel {
  grid-column: span 2;
  display: flex;
  align-items: center;
  gap: 24px;
  background: linear-gradient(135deg, #ffffff, #e3f2fd);
}

.baby-avatar {
  width: 150px;
  height: 180px;
  position: relative;
  flex-shrink: 0;
}

.baby-head {
  width: 120px;
  height: 120px;
  background: #ffd7b5;
  border: 4px solid #263238;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 15px;
  box-shadow: inset -10px -10px 0 rgba(0, 0, 0, 0.05);
}

.baby-head::before {
  content: "";
  width: 28px;
  height: 18px;
  border-top: 5px solid #263238;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  left: 42px;
  transform: rotate(-20deg);
}

.baby-eye {
  width: 13px;
  height: 18px;
  background: #263238;
  border-radius: 50%;
  position: absolute;
  top: 48px;
}

.baby-eye.left {
  left: 33px;
}

.baby-eye.right {
  right: 33px;
}

.baby-mouth {
  width: 36px;
  height: 16px;
  border-bottom: 5px solid #263238;
  border-radius: 0 0 50px 50px;
  position: absolute;
  bottom: 30px;
  left: 40px;
}

.baby-body {
  width: 105px;
  height: 86px;
  background: #ffecb3;
  border: 4px solid #263238;
  border-radius: 35px 35px 24px 24px;
  position: absolute;
  bottom: 0;
  left: 22px;
}

.hero-info h2 {
  font-size: 26px;
  color: #e65100;
}

.hero-info p {
  line-height: 1.8;
  font-size: 16px;
}

.growth-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff3cd;
  border: 3px solid #263238;
  border-radius: 14px;
  padding: 12px 16px;
  margin-bottom: 14px;
}

.growth-box span {
  font-weight: bold;
}

.growth-box strong {
  font-size: 30px;
  color: #e65100;
}

.stat-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-item {
  display: grid;
  grid-template-columns: 1fr 45px 78px;
  gap: 10px;
  align-items: center;
  background: #f7fbff;
  border: 2px solid #90caf9;
  border-radius: 14px;
  padding: 12px;
}

.stat-item strong {
  font-size: 15px;
}

.stat-item p {
  font-size: 12px;
  color: #546e7a;
  margin-top: 3px;
}

.stat-item span {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #1565c0;
}

button {
  border: none;
  background: #ffca28;
  color: #263238;
  font-weight: bold;
  border-radius: 12px;
  padding: 10px 12px;
  cursor: pointer;
  border: 2px solid #263238;
  box-shadow: 3px 3px 0 #263238;
  transition: all 0.12s ease;
}

button:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 #263238;
  background: #ffd54f;
}

button:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 #263238;
}

.map-panel {
  background: linear-gradient(135deg, #ffffff, #e8f5e9);
}

.tip {
  color: #546e7a;
  margin-bottom: 14px;
  line-height: 1.6;
}

.map-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.map-buttons button {
  padding: 16px 10px;
  background: #81d4fa;
}

.map-buttons button:nth-child(1) {
  background: #bbdefb;
}

.map-buttons button:nth-child(2) {
  background: #ffe082;
}

.map-buttons button:nth-child(3) {
  background: #c5e1a5;
}

.map-buttons button:nth-child(4) {
  background: #ffab91;
}

.map-buttons button:nth-child(5) {
  background: #ce93d8;
  grid-column: span 2;
}

.current-event-box {
  margin-top: 18px;
  background: #fffdf2;
  border: 3px solid #263238;
  border-radius: 16px;
  padding: 16px;
  box-shadow: inset 0 0 0 3px rgba(255, 202, 40, 0.35);
}

.current-event-box.danger {
  background: #fff1f1;
  border-color: #c62828;
  box-shadow: inset 0 0 0 3px rgba(239, 83, 80, 0.35);
}

.current-event-box.success {
  background: #f1fff3;
  border-color: #2e7d32;
  box-shadow: inset 0 0 0 3px rgba(102, 187, 106, 0.35);
}

.current-event-box.death {
  background: #2b0000;
  color: #fff3f3;
  border-color: #ff5252;
  box-shadow: inset 0 0 0 3px rgba(255, 82, 82, 0.5);
}

.current-event-top {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #546e7a;
}

.current-event-box.death .current-event-top {
  color: #ffcccb;
}

#currentEventTitle {
  color: #e65100;
  margin-bottom: 10px;
  font-size: 20px;
}

.current-event-box.death #currentEventTitle {
  color: #ff8a80;
}

#currentEventText {
  line-height: 1.7;
  margin-bottom: 12px;
}

.current-result {
  background: rgba(38, 50, 56, 0.08);
  border-radius: 12px;
  padding: 12px;
  line-height: 1.7;
  font-weight: bold;
}

.tool-panel ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tool-panel li {
  background: #f1f8e9;
  border: 2px solid #8bc34a;
  border-radius: 12px;
  padding: 10px 12px;
  font-weight: bold;
  line-height: 1.5;
}

.tool-panel li span {
  display: block;
  font-size: 12px;
  color: #455a64;
  font-weight: normal;
  margin-top: 4px;
}

.progress-panel {
  background: linear-gradient(135deg, #ffffff, #fff8e1);
}

.progress-bar {
  width: 100%;
  height: 28px;
  background: #eceff1;
  border: 3px solid #263238;
  border-radius: 999px;
  overflow: hidden;
  margin: 12px 0;
}

#progressFill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #66bb6a, #ffee58, #ff7043);
  transition: width 0.3s ease;
}

#progressText {
  font-weight: bold;
}

.event-panel {
  grid-column: span 2;
  background: #263238;
  color: #f5f5f5;
}

.event-panel h2 {
  color: #ffca28;
}

#eventLog {
  min-height: 130px;
  max-height: 230px;
  overflow-y: auto;
  background: #11191d;
  border-radius: 12px;
  padding: 16px;
  line-height: 1.8;
  white-space: pre-line;
  border: 2px solid #607d8b;
}

.ending-panel {
  display: none;
  grid-column: span 2;
  background: linear-gradient(135deg, #fff3e0, #ffe0b2);
  text-align: center;
}

.ending-panel h2 {
  color: #d84315;
  font-size: 30px;
}

.ending-panel p {
  font-size: 18px;
  line-height: 1.8;
  font-weight: bold;
}

.ending-panel.death-ending {
  background: linear-gradient(135deg, #2b0000, #5c1111);
  color: #fff3f3;
  border-color: #ff5252;
  box-shadow: 6px 6px 0 #1b0000;
}

.ending-panel.death-ending h2 {
  color: #ff8a80;
}

.reset-area {
  grid-column: span 2;
  text-align: center;
  margin-top: 8px;
}

.reset-button {
  background: #ef5350;
  color: white;
  font-size: 18px;
  padding: 14px 36px;
}

@media (max-width: 760px) {
  body {
    padding: 12px;
  }

  .game-header h1 {
    font-size: 30px;
  }

  .game-main {
    grid-template-columns: 1fr;
  }

  .hero-panel,
  .event-panel,
  .ending-panel,
  .reset-area {
    grid-column: span 1;
  }

  .hero-panel {
    flex-direction: column;
    text-align: center;
  }

  .stat-item {
    grid-template-columns: 1fr 38px 70px;
  }

  .map-buttons {
    grid-template-columns: 1fr;
  }

  .map-buttons button:nth-child(5) {
    grid-column: span 1;
  }

  .current-event-top {
    flex-direction: column;
  }
}
