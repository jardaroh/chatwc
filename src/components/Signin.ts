export default class Signin extends HTMLElement {
  private input: HTMLInputElement;
  private button: HTMLButtonElement;

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
    this.button.innerText = 'Submit';
    this.button.addEventListener('click', () => {
      this.emit();
    });
    this.attachShadow({ mode: 'open' });
    this.render(true);
  }

  private emit() {
    const e = new Event('signin');
    (e as any).value = this.input.value;
    this.shadowRoot.dispatchEvent(e);
    this.input.value = '';
  }

  render(initial: boolean = false) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('signin');

    const card = document.createElement('div');
    card.classList.add('signin__card');

    const message = document.createElement('div');
    message.classList.add('signin__message');
    message.innerText = 'Please choose a username';

    card.appendChild(message);
    card.appendChild(this.input);
    card.appendChild(this.button);

    wrapper.appendChild(card);

    const style = document.createElement('style');
    style.innerHTML = `.signin {
      width: 100%;
      height: 100%;
      display: grid;
    }
    .signin__card {
      place-self: center;
      display: grid;
      gap: 10px;
      grid-template-columns: max-content;
      grid-template-rows: repeat(3, max-content);
    }
    .signin__card * {
      place-self: center;
    }
    .signin__card input, .signin__card button {
      box-sizing: border-box;
      border: none;
      border-bottom: 1px solid #000;
      padding: 10px;
      text-align: center;
    }
    .signin__card button {
      background: #000;
      color: #fff;
      cursor: pointer;
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