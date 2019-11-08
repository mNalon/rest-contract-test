# rest-contract-tester
> Contract tester to REST APIs

## Overview

`rest-contract-tester` is a CLI lib designed to help you test the contract of your REST APIs endpoints. 

## Usage

Install:

```sh
npm i --save-dev rest-contract-tester
```

To see all available commands and options:

```sh
rest-contract-tester --help
```

Generate the setup file to test your REST API:

```sh
rest-contract-tester init 
```

A file like [this](./lib/assets/templates/setup.js) will be created (you can change the default output file URI using the `--setupUri` argument). Customize the file replacing the values by those who make sense to your REST API and run the test:

```sh
rest-contract-tester --setupUri <URI to the generated file described above>
```


## Development

### Setup

```sh
nvm install
```

```sh
npm install
```


### Testing

```sh
npm test
```



