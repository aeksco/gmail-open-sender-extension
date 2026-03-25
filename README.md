# gmail-open-sender-extension

[![PR's Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/aeksco/gmail-open-sender-extension.svg?style=social)](https://twitter.com/intent/tweet?text=https://github.com/aeksco/gmail-open-sender-extension)
[![Twitter Follow](https://img.shields.io/twitter/follow/aeksco.svg?style=social)](https://twitter.com/aeksco)

:envelope: Quickly organize or delete lots of emails from specific senders & domains.

Adds a buttons to Gmail's message view to open all messages from a sender or their domain in Gmail's search:

![Extension UI](https://raw.githubusercontent.com/aeksco/gmail-open-sender-extension/refs/heads/main/docs/demo.png)

**Getting Started**

Run the following commands to install dependencies and start developing

```
pnpm install
pnpm run dev
```

**Scripts**

-   `pnpm run dev` - run `webpack` in `watch` mode
-   `pnpm run build` - builds the production-ready unpacked extension
-   `pnpm run lint` - runs EsLint
-   `pnpm run prettify` - runs Prettier

**Notes**

-   Includes ESLint configured to work with TypeScript and Prettier.

**Built with**

-   [React](https://reactjs.org)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Jest](https://jestjs.io)
-   [Eslint](https://eslint.org/)
-   [Prettier](https://prettier.io/)
-   [Webpack](https://webpack.js.org/)
-   [Babel](https://babeljs.io/)
-   [webextension-polyfill](https://github.com/mozilla/webextension-polyfill)
