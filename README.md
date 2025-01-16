<h1 align="center"><a href="https://github.com/weijuer/vite-vue-starter" target="_blank">Vite 6.x
+ Vue 3.x  Starter</a></h1>

<p align="center">
  <a href="https://nodejs.org/en/about/releases/">
    <img src="https://img.shields.io/node/v/vite.svg" alt="node compatility" />
  </a>
  <a href="https://cn.vitejs.dev" rel="nofollow">
    <img src="https://img.shields.io/badge/vite-6.0.5-3963bc.svg" alt="vite" style="max-width:100%;" />
  </a>
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-3.3.9-brightgreen.svg" alt="vue" />
  </a>
  <a href="https://github.com/vuejs/router">
    <img src="https://img.shields.io/badge/vue--router-4.2.5-brightgreen.svg" alt="vue-router" />
  </a>
  <a href="https://github.com/vuejs/pinia">
    <img src="https://img.shields.io/badge/pinia-2.1.7-brightgreen.svg" alt="pinia" />
  </a>
  <a href="https://doc.starimmortal.com">
    <img alt="author" src="https://img.shields.io/badge/author-Weijuer-blue.svg" />
  </a>
  <a href="https://github.com/ElanYoung/vite-vue-js-starter-template/blob/master/LICENSE">
    <img alt="LICENSE" src="https://img.shields.io/github/license/ElanYoung/vite-vue-js-starter-template.svg" />
  </a>
</p>

<p align='center'>
  <b>Vite6</b> + <b>Vue3</b> + <b>JavaScript</b> + <b>Vue Router</b> + <b>Pinia</b> + <b>Less</b> + <b>Axios</b> + <b>ESLint + Prettier</b>
</p>

<p align='center'>
  <a href="https://weijuer.github.io/vite-vue-starter">Live Demo</a>
</p>

<p align="center">
  <span>English | <a href="./README.zh-CN.md">简体中文</a></span>
</p>

## Features

+ ⚡️ [Vite 6](https://github.com/vitejs/vite) - born with fastness
+ 🖖 [Vue 3](https://github.com/vuejs/core) - Composition API and `<script setup>`
+ 🚦 [Vue Router](https://github.com/vuejs/router) - The official router for Vue.js.
+ 📦 [Pinia](https://github.com/vuejs/pinia) - Intuitive, type safe and flexible Store for Vue
+ 🎨 [Less](https://github.com/less/less.js) - It's CSS, with just a little more
+ 📥 [APIs auto importing](https://github.com/antfu/unplugin-auto-import) - Use Composition API and others directly
+ 😃 [Icons auto install](https://github.com/unplugin/unplugin-icons) - Access thousands of icons as components on-demand universally.
+ 🔗 [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
+ 🧰 [Husky](https://typicode.github.io/husky/#/) + [Lint-Staged](https://github.com/okonet/lint-staged) - Git Hook Tools
+ 🛡️ [EditorConfig](http://editorconfig.org) + [ESLint](http://eslint.org) + [Prettier](https://prettier.io) + [Stylelint](https://stylelint.io) - Code Standards
+ 🔨 [Commitizen](https://cz-git.qbb.sh/zh) + [Commitlint](https://commitlint.js.org) - Submit Standards

## Coding Style

+ Use Composition API with [`<script setup>` SFC syntax](https://github.com/vuejs/rfcs/pull/227)
+ [ESLint](https://eslint.org)
+ [Prettier](https://prettier.io)

## Development Tools

+ [pnpm](https://pnpm.io/) - fast, disk space efficient package manager
+ [Visual Stuido Code Extensions](./.vscode/extensions.json)
  + [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite) - Fire up Vite server automatically
  + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 `<script setup>` IDE support
  + [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - A solution for unifying code formats
  + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Find and fix problems in your JavaScript code
  + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - An opinionated code formatter

## Try it now!

> Vite6 Vue3 Starter Template requires Node >= 18.00

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/weijuer/vite-vue-starter/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

```bash
# [optional] if you are using Windows, you need to close the end-of-line conversion
git config --global core.autocrlf input

# clone repository
git clone https://github.com/weijuer/vite-vue-starter.git

# open folder vite-vue-starter
cd vite-vue-starter

# install packages
pnpm i
```

## Checklist

When you use this template, try follow the checklist to update your info properly

- [ ] Change the author name in `LICENSE`
- [ ] Change the title in `App.vue`
- [ ] Change the hostname in `vite.config.js`
- [ ] Change the favicon in `public`
- [ ] Clean up the READMEs and remove routes

## Usage

### Development

> Just run and visit http://localhost:5173

```bash
## install dependencies
pnpm i

## set up
pnpm dev
```

### Build

```bash
## build
pnpm build
```

## License

[MIT @2024 Weijuer](http://opensource.org/licenses/MIT)
