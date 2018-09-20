# hu-task

## Prerequesites

You'll need

- [Node](https://nodejs.org)
- [Yarn](https://yarnpkg.com/en/docs/install)

## Install

Clone the repo:

```sh
git clone https://github.com/Dermah/hu-task.git
cd hu-task
```

Then add dependencies:

```sh
yarn
```

## Run

Ensure there is an input file at `./src/fixtures/input.json`. Then run:

```sh
yarn start
```

The processed file will be written to `./output.json`

## Test

Run tests:

```sh
yarn test
```

Or run tests with file watching:

```sh
yarn test --watch
```
