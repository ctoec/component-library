# Example

This project exists to illustrate how to use this library, and to test it locally.

To use docker compose:

`docker-compose up`

To run the example app locally:

0. If you have preexisting node_modules folders here and are getting weird errors, you may want to `rm -rf node_modules && rm -rf example/node_modules`
1. Run `yarn && yarn build` inside the parent folder
1. Run `yarn` inside the example folder (`yarn --cwd example` from the root folder)
1. From the root of the component library, `npm link example/node_modules/react && npm link example/node_modules/react-dom`. (This step is essential to avoid an error resulting from [multiple copies of React existing in the same directory](https://github.com/facebook/react/issues/13991).)
1. Run `yarn upgrade @ctoec/component-library` inside the example folder (`yarn --cwd example upgrade @ctoec/component-library` from the root folder)
1. Run `yarn start` inside the example folder (`yarn --cwd example start` from the root folder)
