import Signin from './components/Signin';
import ChatApp from './components/ChatApp';
import ChatHeader from './components/ChatHeader';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import FriendWindow from './components/FriendWindow';
import AddFriend from './components/AddFriend';
import MessageData from './types/MessageData';
import UserData from './types/UserData';

customElements.define('add-friend', AddFriend);
customElements.define('sign-in', Signin);
customElements.define('chat-app', ChatApp);
customElements.define('chat-header', ChatHeader);
customElements.define('chat-window', ChatWindow);
customElements.define('chat-input', ChatInput);
customElements.define('friend-window', FriendWindow);

const signin = document.createElement('sign-in');

const addFriend = document.createElement('add-friend');

const chatApp = document.createElement('chat-app');

const chatHeader = document.createElement('chat-header') as ChatHeader;
chatHeader.style.gridArea = 'header';

const friendWindow = document.createElement('friend-window') as FriendWindow;
friendWindow.appendChild(addFriend);
friendWindow.style.gridArea = 'friends';

const chatWindow = document.createElement('chat-window') as ChatWindow;
chatWindow.style.gridArea = 'chat';

const chatInput = document.createElement('chat-input');
chatInput.style.gridArea = 'input';


chatApp.appendChild(chatHeader);
chatApp.appendChild(friendWindow);
chatApp.appendChild(chatWindow);
chatApp.appendChild(chatInput);

let userData: UserData = {};

signin.shadowRoot.addEventListener('signin', (e: Event) => {
  initUser((e as any).value);
  refreshApp();
});

addFriend.shadowRoot.addEventListener('add-friend', (e: Event) => {
  if (userData.friends.indexOf((e as any).value) > -1) {
    return;
  }
  userData.friends = [ ...userData.friends, (e as any).value ];
  localStorage.setItem(`userData-${userData.username}`, JSON.stringify(userData));
  friendWindow.data = userData.friends;
});

friendWindow.shadowRoot.addEventListener('change-room', (e) => {
  userData.activeRoom = [userData.username, (e as any).value]
    .sort((a, b) => a > b ? 1 : -1).join('-');
  localStorage.setItem(`userData-${userData.username}`, JSON.stringify(userData));
  setChatData();
  refreshApp();
});

chatInput.shadowRoot.addEventListener('send', (e: Event) => {
  const msg: MessageData = {
    from: userData.username,
    text: (e as any).value,
    timestamp: Date.now(),
    side: 'right',
  };

  chatWindow.addMessage(msg);
  localStorage.setItem(`room-${userData.activeRoom}`, JSON.stringify(chatWindow.data));
});

function refreshApp() {
  const app = document.querySelector('#app');
  app.innerHTML = '';
  if (userData.username) {
    app.appendChild(chatApp);

    return;
  }

  app.appendChild(signin);
}

function initUser(username: string) {
  const key = `userData-${username}`;
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  if (!data.username) {
    userData = {
      username,
      friends: [],
      activeRoom: undefined,
    };
    localStorage.setItem(key, JSON.stringify(userData));

    return;
  }

  userData = data;
  friendWindow.data = userData.friends;
  if (userData.activeRoom) {
    setChatData();
  }
}

function setChatData() {
  chatHeader.data = userData.activeRoom;
  let chat = JSON.parse(localStorage.getItem(`room-${userData.activeRoom}`)) || [];
  chat = chat.map((msg: MessageData) => ({ ...msg, side: msg.from === userData.username ? 'right' : 'left' }));
  chatWindow.data = chat;
}

refreshApp();
