# Reflaunt Admin

* [Requirement](#requirement)
* [Installation](#installation)
* [Run Development Server](#development)
* [Run Development Server Using Dockker](#development-docker)
* [Build Project](#build)
* [Generate Component](#generate-component)

<a name="requirement"></a>

## Requirement

Make sure all dependencies have been installed before moving on

* [Nodejs](https://nodejs.org/en/) >= 8.0.x
* [npm](https://www.npmjs.com/) >= 5.0.x
* [Yarn](https://yarnpkg.com/) >= 0.27.5

<a name="installation"></a>

## Installation

#### Clone repository

```
git clone git@bitbucket.org:gaolinch/reflaunt-admin.git
```

#### Install packgages

```shell
yarn install
```

#### Configuration

make `src/environments/environment.ts` file is a copy of `src/environments/environment.example.ts` and update it with your information

<a name="development"></a>

## Run Development Server

By execute the following command, your app will be bootstraped and listen on port 4200

```shell
yarn devstart
```

You can custom application port by run `ng serve` command

```
ng serve --host 0.0.0.0 --env=local --port 4200
```

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

<a name="development-docker"></a>

### Use with docker

If you are runing docker on your machine, you just need to build docker container based on `docker-compose.yaml`

> Make sure you already added `src/environments/environment.ts`

```
docker-compose up --build
```

If it going well you can see your app on [http://localhost:4200](http://localhost:4200)

<a name="build"></a>

## Build

Run `yarn build_prod` to build the project for production. The build artifacts will be stored in the `dist/` directory.

<a name="generate-component"></a>

## generate st-component
npm run generate-component -- --name yourcomponentname

dependency need to be added are listed in the files below:
component/main.component.ts

for now it only generates files, but did not add the dependency, will improve it later
