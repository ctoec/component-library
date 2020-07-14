# CT OEC Component Library
This library provides a uniform collection of reusable UX components, static assets and functional units specific to the State of Connecticut's Office of Early Childhood.

## Setup

### Local
1. Install (if you haven't already) Visual Studio, [Node 12](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/lang/en/docs/install/).

1. Install all corresponding yarn dependencies, based on the static versions specified in `yarn.lock`:
    ```.sh
    yarn install --frozen-lockfile
    ```

## Deploy

### GitHub Pages
If you're looking for some live examples of the types of components maintained here, we have this Storybook deployed to GitHub Pages.

## To use this library

1. `yarn add @ctoec/component-library`
1. `import { ComponentOfYourChoice } from @ctoec/component-library`
