# Example

This project exists to illustrate how to use this library, and to test it locally.

1. Run `yarn build` inside the parent directory
1. Run `yarn` inside this directory
1. Use docker-compose to start this application. You may run it locally, but will likely run into an error about hooks, which is caused by [multiple copies of React existing in the same directory](https://github.com/facebook/react/issues/13991).
