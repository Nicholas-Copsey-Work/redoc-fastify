import fastify from 'fastify';
import RedocFastify from '../src/index.js';

const main = async () => {
    const exit = (err: any): never => {
        console.error(err);
        process.exit(1);
    }
    const port = 3000;
    const app = fastify();
    const opts = {
        title: 'My API',
        spec_url: '/openapi.json',
        file_path: './tests/openapi.json'
    }
    const { docsEndpoint, openAPIEndpoint } = RedocFastify(opts);
    app.get('/', docsEndpoint);
    app.get(`${opts.spec_url}`, openAPIEndpoint);

    app.listen({ port }, (err, addr) => {
        err ?   exit(err) :
                console.log("Listening on %s", addr);
    })
};

main();