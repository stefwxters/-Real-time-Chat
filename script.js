const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const chatBox = document.getElementById('chat-box');
const usernameInput = document.getElementById('username');

function saveMessage(msg) {
  const messages = JSON.parse(localStorage.getItem('messages') || '[]');
  messages.push(msg);
  localStorage.setItem('messages', JSON.stringify(messages));
}

function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('messages') || '[]');
  chatBox.innerHTML = '';
  messages.forEach(renderMessage);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function renderMessage({ user, text, timestamp }) {
  const msg = document.createElement('div');
  msg.classList.add('message');
  msg.innerHTML = `<strong>${user}</strong>: ${text} <small style="float:right;">${new Date(timestamp).toLocaleTimeString()}</small>`;
  chatBox.appendChild(msg);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const user = usernameInput.value.trim() || 'Anonymous';
  const text = input.value.trim();
  if (text === '') return;

  const message = { user, text, timestamp: Date.now() };
  saveMessage(message);
  renderMessage(message);
  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;
});

// Auto-load messages every second to simulate "real-time"
setInterval(loadMessages, 1000);

loadMessages();
