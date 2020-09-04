# Chat WebComponents
> small example of webcomponents used to create a tiny chat app with persistent chat in `localstorage`.

## Setup
clone the git repository `git clone`

recommend running `nvm use` (does not work with NVM for Windows) or `nvm use 12.18.3`

install dependencies `npm i`

## run development server
run dev server `npm run serve`

## build the app
run build process `npm run build`

## Using the app in browser
with dev server go to `http://localhost:8080` or open the `index.html`

if you ran `npx run build` open the `dist/index.html` file

type in your desired username, there is no authentication

add a friend in upper left corner, type any name

you can "login" as any of your 'friends' and see the conversation from the other side
but first you must reload the page

if you reload the page you must login again, chats are persistent within the storage
limitations of `localStorage`.
