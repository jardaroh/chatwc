export default class ChatHeader extends HTMLElement { 
  private _data: string = '';

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.render(true);
  }

  public set data(value: string) {
    this._data = value;
    this.render();
  }

  public get data(): string {
    return this._data;
  }

  render(initial: boolean = false) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('chat-header');
    wrapper.innerText = this.data;

    const style = document.createElement('style');
    style.innerText = `.chat-header {
      box-sizing: border-box;
      padding: 10px;
      display: grid;
      grid-template-column: auto;
      height: 100%;
      align-content: center;
      border-bottom: 1px solid #000;
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