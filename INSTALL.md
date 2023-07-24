# Installation

This project was generated using [Nx](https://nx.dev). You will need to ensure you have installed [Nx](https://nx.dev), [npm](https://www.npmjs.com/) and [NodeJS](https://nodejs.org/) globally.

## Architecture

ZipCaptions is a client-side applicaation built using [Angular](https://angular.io), [Tailwind CSS](https://tailwindcss.com/), [DaisyUI](https://daisyui.com/) components, [Angular Animations](https://github.com/filipows/angular-animations) library, [Hero Icons](https://heroicons.com/). Translations are provided using the functionality from the [ngx-translate](https://github.com/ngx-translate/core) library.

## Setup

Clone the repository and navigate into the cloned folder. From the root of the repo, run `npm install` to download all required packages.

## Development Server

To run the development server on your local machine, use the command `nx serve client` to build and serve the application. Then, in your web browser, navigate to `http://localhost:4200` to view the app running on your local machine.

## Docker or Docker Compose

If you prefer to use docker to build and run the application, this is easily done. From the root directory of this project, you can use the following command with docker and docker compose:

*Build the application*
`docker compose build ./`

*Run the container*
`docker compose up`

## Adding to the Application

All modules, components, and services are generated using the Nx CLI, or the VS Code Nx extension. Any new additions should be organized according to the existing folder structure, and adhere to the following guidelines:

### NGRX
The application manages state using [NGRX](https://ngrx.io). Each "feature" (e.g. settings, recognition) has its own state, effects, reducers, and actions. Adding a feature will require a new feature state as well as all supporting NGRX requirements.

### Core Components
Core components are used to provide general app-level UI/UX. For example, the welcome splash screen, the header, and the footer are all core components. These live in the `components` folder found within the `app` folder. 

#### Look and Feel
Core components should adhere to the best practices for [DaisyUI Components](https://daisyui.com/components/). Any vector icons that are required should be found within the [HeroIcons](https://heroicons.com/) library, and added to the shared-ui library `vectors.ts` file, following the same format as other examples included in the file.

All classes and styles should also adhere to both TailwindCSS and DaisyUI class names. Direct colour bindings are discourages, DaisyUI includes pseudo-classes that reference theme values, which are user-selected (e.g. `bg-base-100`, `btn-primary`, etc).

Animations are provided by the Angular Animations package. Custom animations should be avoided, it is preferred to use predefined animations from the included library to ensure consistency and maintainability.

### Modules
Each module contains all required files for implementation of an existing feature within the app. These are built with lazy-loading routes, so that the application will only load the files if/when required. Modules implement their own NGRX feature state, and respect any user settings to enable/disable features. Be sure to verify that the routes defined appear and work as expected when using the application.

## Forks
You are welcome to fork this repository for your own uses. You must adhere to the license as described in [LICENSE](./LICENSE), as well as all licenses from all 3rd party libraries, defined in [3rdpartylicenses.txt](./docs/3rdpartylicenses.txt). If you are creating a fork for reasons other than submitting a pull request, we would love to hear from you! Submit an issue to let us know what we're missing!

## Pull Requests
Please fork the repository, make your changes, and submit a pull request describing the changes made, as well as a rationale for why they are necessary/useful. Pull requests will be reviewed as soon as possible, clear actionable changes will be requests if required, and once all is approved, the PR will be merged into the main project and deployed.

## Donations
Donations are not expected, but are more than welcome! We accept monetary support through [buymeacoffee](https://www.buymeacoffee.com/zipcaptions). Any contributions are put toward offsetting the operating costs (such as they are), or implementing new features. We operate without any formal financial backers or sponsorhips, and have no corporate backers in any form. This is an entirely community-supported endeavour.