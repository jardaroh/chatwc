import UserData from '../types/UserData';

class ChatApp extends HTMLElement {
  private _data!: UserData;
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.render(true);
  }

  public set data(value: UserData) {
    this._data = value;
  }

  public get data(): UserData {
    return this._data || {};
  }

  private render(initial: boolean = false) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('chat-app');
    const style = document.createElement('style');

    style.innerHTML = `.chat-app {
      display: grid;
      width: 100vw;
      height: 100vh;
      grid-template-columns: max-content auto;
      grid-template-rows: 64px auto 64px;
      grid-template-areas: "friends header" "friends chat" "input input";
    }`;
    const slot = document.createElement('slot');

    const headerSlot = document.createElement('slot');
    headerSlot.name = 'header';
    const friendSlot = document.createElement('slot');
    friendSlot.name = 'friends';
    const chatSlot = document.createElement('slot');
    chatSlot.name = 'chat';
    const inputSlot = document.createElement('slot');
    inputSlot.name = 'input';
    wrapper.appendChild(slot);
    wrapper.appendChild(headerSlot);
    wrapper.appendChild(friendSlot);
    wrapper.appendChild(chatSlot);
    wrapper.appendChild(inputSlot);

    if (initial) {
      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(wrapper);

      return;
    }

    this.shadowRoot.replaceChild(style, this.shadowRoot.querySelector('style'));
    this.shadowRoot.replaceChild(wrapper, this.shadowRoot.querySelector('div'));
  }
}

export default ChatApp;
