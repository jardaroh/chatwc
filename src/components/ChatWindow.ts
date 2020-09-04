import MessageData from "../types/MessageData";
import MessageItem from './MessageItem';

customElements.define('message-item', MessageItem);

export default class ChatWindow extends HTMLElement {
  private _data: MessageData[] = [];

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.render(true);
  }

  public set data(value: MessageData[]) {
    this._data = value;
    this.render();
  }

  public get data(): MessageData[] {
    return this._data || [];
  }

  public addMessage(value: MessageData) {
    this._data.push(value);
    this.render();
  }

  render(initial: boolean = false) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('chat-window');

    const chatLog = document.createElement('div');
    chatLog.classList.add('chat-window__chat-log');

    this.data.forEach((msg) => {
      const el = document.createElement('message-item') as MessageItem;
      el.data = msg;
      chatLog.appendChild(el);
    });

    wrapper.appendChild(chatLog);

    const style = document.createElement('style');
    style.innerHTML = `.chat-window {
      overflow-x: hidden;
      overflow-y: scroll;
      height: 100%;
      position: relative;
    }
    .chat-window__chat-log {
      box-sizing: border-box;
      padding: 10px;
      display: grid;
      grid-template-columns: 1fr;
      position: absolute;
      width: 100%;
    }`;

    if (initial) {
      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(wrapper);

      return;
    }

    this.shadowRoot.replaceChild(style, this.shadowRoot.querySelector('style'));
    this.shadowRoot.replaceChild(wrapper, this.shadowRoot.querySelector('div'));
  }
}
