import MessageData from '../types/MessageData';

export default class MessageItem extends HTMLElement {
  private _data!: MessageData;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.render(true);
  }

  public set data(value: MessageData) {
    this._data = value;
    
    this.render();
  }

  public get data(): MessageData {
    return this._data || {};
  }

  render(initial: boolean = false) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('message-item', `message-item--${this.data.side}`);

    const message = document.createElement('div');
    message.classList.add('message');
    message.innerHTML = this.data.text ? this.data.text : '';

    wrapper.appendChild(message);

    const style = document.createElement('style');
    style.innerHTML = `.message-item {
      display: inline-grid;
      width: 100%;
    }
    .message-item--right .message {
      place-self: end;
    }
    .message-item--left .message {
      place-self: start;
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
