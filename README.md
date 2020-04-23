## Github repository search
Demo can be found here: [https://iamklim.github.io/github-search](https://iamklim.github.io/github-search)

To start, please run:

### `npm install`
### `npm start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br>

## Features:
🚀 live search: you don't need to click on special buttons, search begins automatically with 500 ms delay after you release the button on keyboard<br>

📂 caching: your previous successful responses will be saved to avoid unnecessary network requests<br>

❌ cancellation: as soon as you hit a new button on keyboard, previous requests are canceled to search for a new word entered<br>

📖 pagination inspired by Google, with Previous / Next and First / Last buttons available<br>

🔎 fullscreen search field: press Enter after you finished typing to minimize and go to results, three symbols is minimum to begin search<br>

🎯 filtering by languages: you can filter results by primary language used in a repository: JavaScript, Python, C++ etc. Just click on language tag in fullscreen<br>

⏬ sorting: default sorting is by stars, also available by forks (choose in radio button)<br>

📱 optimized for tablets and mobile resolutions<br>

PS Please note that Gihub API has time rate and pagination limits