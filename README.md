# CatMatch

A card matching game following [classic Memory Game rules](https://www.classicgamesandpuzzles.com/Memory.html).

## Game experience

You can see the overall user experience in the following screen capture:
![Game experience](https://raw.githubusercontent.com/aaronmcadam/cat-match/main/docs/screencap.gif)

## Jiji Design System

<img alt="Jiji the cat" src="http://www.cinemacats.com/wp-content/uploads/movies/kikisdeliveryservice14.jpg" height="150" />

Named after the cat in Kiki's Delivery Service, _Jiji_ is our design system.

This demonstrates how to build custom themes with Chakra UI, with the ability to implement our own components based on Chakra's.

## Figma designs

The Figma designs are on the Figma Community here: https://www.figma.com/community/file/1040260142972521288/CatMatch

## Storybooks

We use [Storybook](https://storybook.js.org/) to develop and document our documents.

### Jiji

`yarn storybook:jiji` will start Jiji's Storybook app:

<img alt="Jiji Storybook" src="https://raw.githubusercontent.com/aaronmcadam/cat-match/main/docs/jiji-storybook.jpg" height="500" />

### Game

`yarn storybook:game` will start the game's Storybook app:

<img alt="Game Storybook" src="https://raw.githubusercontent.com/aaronmcadam/cat-match/main/docs/game-storybook.jpg" height="500" />

---

## Getting started

### Starting the application server

Run `yarn start` to start up the server and view the application.

## Working on the application

Start development by running `yarn dev`, which will start the dev server and Cypress.

> We recommend using ["Cypress Driven Development"](https://egghead.io/lessons/cypress-use-cypress-driven-development-in-order-to-add-a-feature-to-a-react-app) to follow an [outside-in TDD workflow](https://www.codecademy.com/articles/tdd-outside-in).

### Running tests

By default, `yarn test` will only run tests for the app. To run every test in the project, run `yarn test:all`.

## Technologies

We use the following technologies:

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Nx](https://nx.dev/)
- [Storybook](https://storybook.js.org/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress](https://www.cypress.io/)
- [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro)
