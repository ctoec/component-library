echo "***** Installing component library dependencies *****"
yarn --cwd .. && yarn --cwd .. build
echo "***** Building component library *****"
yarn --cwd .. build
echo "***** Installing example app dependencies *****"
yarn
echo "***** Linking react and react-dom to component library versions *****"
cd .. && npm link example/node_modules/react && npm link example/node_modules/react-dom && cd example
echo "***** Upgrading component library version in example app *****"
yarn upgrade @ctoec/component-library
echo "***** Starting example app *****"
yarn start