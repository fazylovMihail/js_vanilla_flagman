import { createEl } from "../components.js";

export default function renderMessage({ title, desc, url }) {
  const messageEl = createEl('div', { className: 'message' });
  const messageContent = createEl('div', { className: 'message__content' });

  const messageIcon = createEl('img', { className: 'message__icon', src: url, width: 44, height: 44 });
  const messageTitle = createEl('h2', { className: 'message__title', text: title });
  const messageDesc = createEl('p', { className: 'message__desc', text: desc });
  const messageClose = createEl('button', { className: 'message__close' });
  const messageCloseImg = createEl('img', { className: 'message__close-icon', src: 'images/sprite/icon-close.svg', width: 24, height: 24 });

  messageClose.addEventListener('click', () => messageEl.remove());

  messageClose.append(messageCloseImg);
  messageContent.append(messageIcon, messageTitle, messageDesc, messageClose);
  messageEl.append(messageContent);

  return messageEl;
}