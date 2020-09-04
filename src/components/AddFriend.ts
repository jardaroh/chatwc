export default class AddFriend extends HTMLElement {
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
    this.button.innerText = 'Add';
    this.button.addEventListener('click', this.emit);

    this.attachShadow({ mode: 'open' });
    this.render(true);
  }

  private emit() {
    const e = new Event('add-friend');
    (e as any).value = this.input.value;

    this.shadowRoot.dispatchEvent(e);
    this.input.value = '';
  }

  render(initial: boolean = false) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('add-friend');
    wrapper.appendChild(this.input);
    wrapper.appendChild(this.button);

    const style = document.createElement('style');
    style.innerText = `.add-friend {
      display: grid;
      grid-template-columns: auto 64px;
      grid-template-rows 64px;
      height: 100%;
    }
    .add-friend > * {
      place-self: stretch;
      box-sizing: border-box;
      border: none;
    }
    .add-friend input {
      box-sizing: border-box;
      padding: 10px;
      border-bottom: 1px solid #000;
    }
    .add-friend button {
      background: #000;
      color: #fff;
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
