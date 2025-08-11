# Inspirations

This package is inspired by the [redoc-express](https://github.com/AungMyoKyaw/redoc-express) package, and is intended to allow developers who are familiar with that package in [express](https://github.com/expressjs/express) to seemlessly use this package with minimal alterations in [Fastify](https://github.com/fastify/fastify).

Much of the implementaion are cloned from redoc-express, just modified for fastify.

# Usage

```ts
import RedocFastify, { IOptions } from 'redoc-fastify';
import Fastify from 'fastify';

async function main(...) {
    const app = Fastify(); // See [fastify documentation](https://fastify.dev/docs/latest/) for more detail.
    const opts: IOptions = {
        title: 'Foo',
        spec_url: '/openapi.json',
        file_path: './path/to/openapi.json'
    };
    const { docsEndpoint, openAPIEndpoint } = RedocFastify(opts);

    app.get('/', docsEndpoint);
    app.get(`${opts.spec_url}`. openAPIEnpoint); /* Use if you are hosting the documentation on the same server,
                                                    otherwise this may be omitted. */

    ...
}
```

# Development

## Install

```bash
$ npm i
```

## Build

```bash
$ npm run build-tests
$ npm run tests
```

## Test

```bash
$ npm run build-tests
$ npm run tests
```

Go to `http://localhost:3000/` to see changes