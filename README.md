<p align="center">
  <a href="https://webapp23-group5.web.app/"><img src="public/logo.svg?raw=true" width="120" title="hover text"></a>
  <br>
  Visit the <b>Firebase 🔥 demo</b> by tapping on the logo.
</p>

# **{App name}**: {Short slogan}

{An explanation of the purpose of the app}

## Business description

{A one-page description of the organization and its business activities.}

## Information management tasks

*As an app user, I would like to...*

| #   | Title                             | Description                                                                                      |
| --- | --------------------------------- | ------------------------------------------------------------------------------------------------ |
| 1   | Show dashboard                    | Including key data for today like consumed vs. burned calories, current BMI and Waist-Hip-ratio. |
| 2   | Create / Update / Delete goal     | For a certain measurement and a due date.                                                        |
| 3   | Show goals                        | As a list showing for each goal how much is the current difference.                              |
| 4   | Create scale measurement          | Including date, time, weight, body fat and an optional comment.                                  |
| 5   | Create tape measurement           | Including date, time, height, hip, waist and an optional comment.                                |
| 6   | Create vitals measurement         | Including date, time, temperature, heart rate, blood pressure and an optional comment.           |
| 7   | Show measurements                 | As table and time graph for each measurement category (scale / tape / vitals).                   |
| 8   | Update measurement                | Regardless of measurement type.                                                                  |
| 9   | Delete measurement                | Regardless of measurement type.                                                                  |
| 10  | Create / Update / Delete calories | Including date, time and consumed calories.                                                      |
| 11  | Show calories                     | As table and time vs consumed calories graph.                                                    |
| 12  | Create / Update / Delete activity | Including start and end date and time, category and an optional comment.                         |
| 13  | Show activities                   | As table and time vs burned calories graph.                                                      |
| 14  | Show profile                      | Including name, birth date, and gender.                                                          |
| 15  | Update profile                    | Including name, birth date, and gender.                                                          |


## Domain information model
![UML class diagram](uml/model.png?raw=true)


## Team members
- @[{username}](https://github.com/{username}): Client
- @[gmedina-de](https://github.com/gmedina-de): Developer


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Deploy to Firebase
After committing and pushing to GitHub, 
a build and deploy action will be triggered for the `dist` folder, 
so no manual `npm run build && firebase deploy` at the local machine is being required.
