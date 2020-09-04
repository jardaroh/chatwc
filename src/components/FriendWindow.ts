export default class FriendWindow extends HTMLElement {
  private _data: string[] = [];

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.render(true);
  }

  public set data(value: string[]) {
    value = value.sort((a, b) => a > b ? 1 : -1);

    this._data = value;
    this.render();
  }
  
  public get data(): string[] {
    return this._data;
  }

  private emit(e: MouseEvent) {
    const ev = new Event('change-room');
    (ev as any).value = (e.currentTarget as HTMLElement).innerText;

    this.shadowRoot.dispatchEvent(ev);
  }

  render(initial: boolean = false) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('friend-window');

    const slot = document.createElement('slot');

    const scrollArea = document.createElement('div');
    scrollArea.classList.add('friend-window__scroll-area');

    const scrollElement = document.createElement('div');
    scrollElement.classList.add('friend-window__scroll-element');

    this.data.forEach((username) => {
      const el = document.createElement('div');
      el.innerText = username;
      el.addEventListener('click', (e) => {
        this.emit(e);
      });
      scrollElement.appendChild(el);
    });

    scrollArea.appendChild(scrollElement);
    wrapper.appendChild(slot);
    wrapper.appendChild(scrollArea);

    const style = document.createElement('style');
    style.innerText = `.friend-window {
      height: 100%;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 64px auto;
    }
    .friend-window__scroll-area {
      overflow-x: hidden;
      overflow-y: scroll;
      height: 100%;
      position: relative;
    }
    .friend-window__scroll-element {
      box-sizing: border-box;
      padding: 10px;
      display: inline-grid;
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