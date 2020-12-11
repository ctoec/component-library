# CT OEC Component Library

This library provides a uniform collection of reusable UX components, static assets and functional units specific to the State of Connecticut's Office of Early Childhood.

## Setup

### Local

1. Install (if you haven't already) Visual Studio, [Node 12](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/lang/en/docs/install/).

1. Install all corresponding yarn dependencies, based on the static versions specified in `yarn.lock`:
   ```.sh
   yarn install --frozen-lockfile
   ```
1. Build and run the storybook (on port 9009 by default)

```
    yarn storybook
```

## Examples

If you're looking for some specific UX examples, we have a Storybook site deployed to [GitHub Pages](https://pages.github.com/), showcasing all of the components within this library.

You can check it out live at http://ctoec.github.io/component-library/.

You can also see all of these components in action in the [data collection project](https://github.com/ctoec/data-collection).

### Deploying Storybook

These Storybook deployments are handled with the `storybook-deployer` package, using the `gh-pages` branch of this repository as the site's source. Additionally, all commits to our core `base` branch will trigger an associated GitHub Action that automatically updates our Storybook site. So it'll be kept up to date with the latest state of our library at all times!

Regardless, if there's ever a need for the site to be updated _manually_, the following command should be run from project root:

```.sh
yarn run deploy-storybook
```

## To use this library

1. `yarn add @ctoec/component-library`
1. Import the stylesheets in your application with `import '@ctoec/component-library/dist/assets/styles/index.scss'`
1. `import { ComponentOfYourChoice } from @ctoec/component-library`

## Publishing

1. Increment version in `package.json`
1. `npm publish` (If this is the first time, you will need to authenticate yourself by running `npm login`)
