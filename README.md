# CT OEC Component Library

This library provides a uniform collection of reusable UX components, static assets and functional units specific to the State of Connecticut's Office of Early Childhood.

## Setup
The following steps will allow you to quickly get set up for local development of these components.

1. Ensure you have the following libraries installed on your machine:
   - [Visual Studio](https://visualstudio.microsoft.com/)
   - [Node 12](https://nodejs.org/en/download/)
   - [Yarn](https://yarnpkg.com/lang/en/docs/install/)

1. Install all yarn packages.
   ```.sh
   yarn install --frozen-lockfile
   ```

1. (Optional) We have [Storybook](https://storybook.js.org/) configured for some easy viewing of these components.  If interested, you can build and run it locally (on port 9009, by default).
   ```
   yarn storybook
   ```

## Usage
Bringing this library into your application is a pretty straightforward process, no different from most other component libraries.

1. Install the package.

   ```
   yarn add @ctoec/component-library
   ```
1. Once installed, manually import the stylesheets.

   ```.css
   import '@ctoec/component-library/dist/assets/styles/index.scss'
   ```
1. That's it!  Now you can import any component as needed.
   ```
   import { ComponentOfYourChoice } from @ctoec/component-library;
   ```

## Examples

If you're looking for some specific UX examples, we have a Storybook site deployed to [GitHub Pages](https://pages.github.com/), showcasing all of the components within this library.

You can check it out live at http://ctoec.github.io/component-library/.

You can also see all of these components in action in the [data collection project](https://github.com/ctoec/data-collection).

## Deploy

Our Storybook deployments are handled with the `storybook-deployer` package, using the `gh-pages` branch of this repository as the site's source. Additionally, all commits to our core `base` branch will trigger an associated GitHub Action that automatically updates our Storybook site. So it'll be kept up to date with the latest state of our library at all times!

Regardless, if there's ever a need for the site to be updated _manually_, the following command should be run from project root:

   ```.sh
   yarn run deploy-storybook
   ```

## Publish
Publishing a new version of our library (which we do with virtually every substantive change made) is a super simple process.

1. Increment version in `package.json`
1. `npm publish` (If this is the first time, you will need to authenticate yourself by running `npm login`)

## Gotchas

This library uses USWDS for layout, component styles, and most icons. Due to a React bug affecting the way that SVG imports as react components from node modules into this library are handled in any application using this library, USWDS icons are copied into `src/assets/images/uswds`. To re-copy files from USWDS into that folder, run `cp -r node_modules/uswds/dist/img/* src/assets/images/uswds`.