class ChatInput extends HTMLElement {
  private input!: HTMLInputElement;
  private button!: HTMLButtonElement;

  constructor() {
    super();

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key !== 'Enter') {
        return;
      }
      this.emit();
    });

    this.button = document.createElement('button');
    this.button.innerHTML = 'send';

    this.button.addEventListener('click', () => {
      this.emit();
    })

    this.attachShadow({ mode: 'open' });
    this.render(true);
  }

  private emit() {
    const e = new Event('send');
    (e as any).value = this.input.value;
    this.shadowRoot.dispatchEvent(e);
    this.input.value = '';
  }

  render(initial: boolean = false) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('chat-input');
    
    const style = document.createElement('style');
    style.innerHTML = `.chat-input {
      display: grid;
      grid-template-columns: auto 64px;
      width: 100%;
      height: 100%;
      place-content: stretch;
    }
    .chat-input input {
      box-sizing: border-box;
      border: none;
      border-top: 1px solid #000;
      padding: 10px;
      background: none;
    }
    .chat-input button {
      border: none;
      background: #000;
      color: #fff;
      cursor: pointer;
    }`;

    wrapper.appendChild(this.input);
    wrapper.appendChild(this.button);

    if (initial) {
      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(wrapper);

      return;
    }

    this.shadowRoot.replaceChild(style, document.querySelector('style'));
    this.shadowRoot.replaceChild(wrapper, document.querySelector('div'));
  }
}

export default ChatInput;
