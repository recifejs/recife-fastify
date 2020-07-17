<img alt="RecifeJs" width="400" src="https://raw.githubusercontent.com/recifejs/recife/master/logo.png" />

[![npm version](https://img.shields.io/npm/v/recife-fastify?style=flat-square&logo=npm)](https://www.npmjs.com/package/recife-fastify) [![License: MIT](https://img.shields.io/github/license/recifejs/recife-fastify?style=flat-square)](https://github.com/recifejs/recife-fastify/blob/master/LICENSE) [![Node.js CI](https://img.shields.io/github/workflow/status/recifejs/recife-fastify/Node.js%20CI?style=flat-square&logo=github)](https://github.com/recifejs/recife-fastify/workflows/Node.js%20CI)

Recife Fastify is a integration of recifejs with [fastify](https://www.fastify.io/). For more details access the [documentation](https://recifejs.org/).

## Install

```bash
npm install recife-fastify
# or
yarn add recife-fastify
```

## Using in RecifeJs project

Open file `config/app.ts` and insert the value `fastify` in the property `httpFramework`:

```ts
import { AppConfig } from 'recife';

export const config: AppConfig = {
  // ...
  httpFramework: 'fastify'
  // ...
};
```

## License

Recife Fastify is open source software [licensed as MIT](https://github.com/recifejs/recife-fastify/blob/master/LICENSE).
