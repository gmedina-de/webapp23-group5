<p align="center">
  <a href="https://webapp23-?????.web.app/"><img src="public/logo.svg?raw=true" width="120" title="hover text"></a>
  <br>
  Visit the <b>Firebase 🔥 demo</b> by tapping on the logo.
</p>

# **Jani** *cares about you*
This responsive web app, codename *Jani*, provides a comprehensive solution for collecting, managing and analyzing health data. 
It enables users to better monitor their health, track their progress and receive positive incentives to achieve their health goals. 
The integration of gamification elements and personalized recommendations creates a motivating and engaging user experience.
The app provides a user-friendly interface that allows users to record, manage and analyze their health values and vital signs.

## Business description
We, as a small healthcare company, are willing to allow our customers to store their health data privately and access it from various devices such as mobile devices or desktops. 
The following features are consequently provided by this web app:
- **User registration and authentication**: users can create a personal account and securely log into the app to access their health data.
- **Data collection**: users can enter their health data manually or connect various devices such as Bluetooth scales or other compatible devices to the app to take measurements automatically. The data collected includes weight, heart rate, blood pressure, steps, etc.
- **Privacy and data security**: the app ensures that users' health data is stored privately and securely. Appropriate security measures are implemented to ensure the protection of sensitive information.
- **Data visualization**: the collected health data is presented in clear tables and graphs. Users can track their readings over time, identify trends, and monitor their progress toward achieving their health goals.
- **Health goals and gamification**: the app helps users set and track their health goals. Using rules-based gamification elements, users are motivated and rewarded when they reach certain milestones. For example, they can receive notifications when they reach a certain number of steps or achieve a certain weight loss.
- **Notifications and recommendations**: the app can send users personalized notifications based on their health scores and goals. For example, they can be encouraged to increase their activity if they have been inactive for too long, or they can receive recommendations on how to improve their health.
- **Centralized data management**: the web app acts as a centralized place to manage health data. Users have a comprehensive overview of their readings and can access their data anytime, anywhere.

## Information management tasks
*As an app user, I would like to...*
| #   | Title                             | Description                                                                                      |
| --- | --------------------------------- | ------------------------------------------------------------------------------------------------ |
| 1   | Show dashboard                    | Including data for today: consumed vs. burned calories, steps, current BMI and waist-hip ratio.  |
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
| 12  | Create / Update / Delete activity | Including start and end date and time, category, steps and an optional comment.                  |
| 13  | Show activities                   | As table and time vs burned calories graph.                                                      |
| 14  | Show profile                      | Including name, birth date, and gender.                                                          |
| 15  | Update profile                    | Including name, birth date, and gender.                                                          |

## Domain information model
![UML class diagram](uml/model.png?raw=true)

## Client
- @[uniChkhitunidze](https://github.com/uniChkhitunidze)
- @[gmedina-de](https://github.com/gmedina-de)
