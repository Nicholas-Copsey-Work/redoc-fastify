import type { FastifyReply, FastifyRequest } from 'fastify';
import fs from 'fs/promises';

export interface IOptions {
    title: string
    spec_url: string
    file_path?: string
    nonce?: string,
    redocOptions?: object
}

const RedocFastify = ({
    title = 'ReDoc',
    spec_url = "http://petstore.swagger.io/v2/swagger.json",
    file_path = spec_url
}: IOptions = { title: 'ReDoc', spec_url: "http://petstore.swagger.io/v2/swagger.json"}) => {
    const opts: IOptions = { title, spec_url, file_path };
    const formattedHTML = formatHTML(opts);
    return {
        docsEndpoint: (request: FastifyRequest, response: FastifyReply) => {
            response.header('Content-Type', 'text/html');
            response.send(formattedHTML);
        },
        openAPIEndpoint: async (request: FastifyRequest, response: FastifyReply) => {
            try {
                new URL(file_path)
                // This is an internet url, not a file path. Return a 301 to that url.
                response.status(301).send(file_path);
            } catch(e) {
                // This is a file path on the local system, fetch the file and serve the response.
                try {
                    const file = await fs.readFile(file_path, { encoding: 'utf8' });
                    response.send(JSON.parse(file));
                } catch(e) {
                    response.status(404).send({ message: "Not found." });
                }
            }
        }
    }
}

const formatHTML = ({ title, spec_url, nonce = '', redocOptions = {}}: IOptions) => {
    return htmlTemplate
        .replace('[[title]]', title)
        .replace('[[nonce]]', nonce)
        .replace('[[spec-url]]', spec_url)
        .replace('[[options]]', JSON.stringify(redocOptions))
}

const htmlTemplate = `<!DOCTYPE html>
<html>
  <head>
    <title>[[title]]</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet" />
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="redoc-container"></div>
    <script nonce='[[nonce]]' src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"> </script>
  </body>
  <script>
    Redoc.init(
      "[[spec-url]]",
      [[options]],
      document.getElementById("redoc-container")
    );
  </script>
</html>`;

export default RedocFastify;