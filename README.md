<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/EpitechCodingAcademyPromo2024/C-COD-260-PAR-2-2-ecp-marc-alexandre.lepinard">
    <img src="/quizzyverse/public/Epitech.png" alt="Logo" height="auto" width="auto">
  </a>

  <h1 align="center">Quizzyverse</h1>

  <h2 align="center">
    Welcome to our final Coding Academy project: 'Quizzyverse'
  </h2>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>


## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

As part of our final project for the Coding Academy, we need to complete a project using technologies of our choice over the course of 3 weeks. The project will be carried out in a group of 4, and there will only be one group.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![Next][Next.js]][Next-url]
* [![NextAuth][NextAuth]][NextAuth-url]
* [![React][React.js]][React-url]
* [![Express][Express.js]][Express.js-url]
* [![MySQL][MySQL]][MySQL-url]
* [![Tailwind CSS][TailwindCSS]][TailwindCSS-url]
* [![Bcrypt][Bcrypt]][Bcrypt-url]
* [![Dotenv][Dotenv]][Dotenv-url]
* [![Node Fetch][NodeFetch]][NodeFetch-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![ESLint][ESLint]][ESLint-url]
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy of Quizzyverse up and running, follow these steps.

### Prerequisites

Ensure you have the following installed on your local machine:

* [Node.js](https://nodejs.org/) (version 14.x or higher recommended)
* [npm](https://www.npmjs.com/get-npm) (Node package manager)
* [MySQL](https://dev.mysql.com/downloads/mysql/)

Make sure your node & npm version is updated, if not update it:
* node
`npm i node@lts`
* npm
`npm install npm@latest -g`

### Installation

1. **Clone the repository stocked on Github**

  Check this doc if you don't know to do it : <a href='https://docs.github.com/en/repositories/creating-and-managing-      repositories/cloning-a-repository'>**Doc**</a>

  . In the terminal on your IDE:
     ```sh
    git clone `git@github.com:EpitechCodingAcademyPromo2024/C-COD-260-PAR-2-2-ecp-marc-alexandre.lepinard.git`
    ```
  . Navigate to the project directory:
    ```sh
    cd C-COD-260-PAR-2-2-ecp-marc-alexandre.lepinard
    ```
2. **Set up the MySQL database**

  . Open your MySQL client and create a new database called quizzyverse:
   ```sql
     CREATE DATABASE Quizzyverse;
   ```
  . Import the database schema from the database/schema.sql file:
   ```sh
    mysql -u your_username -p quizzyverse < database/schema.sql
   ```

3. **Configure environment variables**
   . Create a .env file in the backend directory and add the following variables:
   ```env
    API_KEY = XXXXXXXXXX
    API_ACCESS_TOKEN = XXXXXXXXXX

    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET= XXXXXXXXXX
    MYSQL_HOST=localhost
    MYSQL_USER= your_username
    MYSQL_PASSWORD= your_password
    MYSQL_DATABASE=Quizzyverse
    JWT_SECRET=your_jwt_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    ```

4. **nstall dependencies**
   . Install NPM packages
   ```sh
   npm install
   ```

5. **Run the development servers**
   You're ready to go ! Just start the project with the following command line:
   ```sh
   npm run dev
   ```

6.**Access the application**
  Open your browser and go to http://localhost:3000 to see the Quizzyverse application in action.


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

Examples of how to use Quizzyverse:

Login to get stated or register to get an account to play!
Select a quiz, answer the questions, and get a score.
Check the leaderboard to see your rank and XP.
Create your own quizzes if you are a premium user or just to play more.
_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

The roadmap outlines the planned features and improvements for Quizzyverse. This will help guide development and ensure that we meet our project goals within the 3-week timeframe.

### Phase 1: Initial Setup and Core Features
- [x] **Project Initialization**
  - Set up project structure with separate frontend and backend directories
  - Initialize Git repository and configure version control
- [x] **Authentication**
  - Implement user login and registration
  - Secure routes with JWT authentication
- [x] **Database Design**
  - Design and create MySQL database schema for users, quizzes, questions, and scores
- [x] **Quiz Functionality**
  - Develop quiz creation and management features for premium accounts
  - Implement quiz selection and gameplay for users
  - Calculate and display scores upon quiz completion
- [x] **Ranking System**
  - Implement XP system for ranking users based on quiz performance

### Phase 2: Enhanced User Experience and Additional Features
- [x] **Responsive Design**
  - Ensure the frontend is fully responsive using Tailwind CSS
- [x] **User Profile Management**
  - Allow users to view and edit their profiles
- [x] **Daily Quiz Limit**
  - Implement limitation of 4 quizzes per day with reset at 00:00
- [x] **Premium Account Integration**
  - Integrate Stripe payment system for upgrading to a premium account
  - Allow premium users to take unlimited quizzes daily
- [x] **Quiz Creator Tool**
  - Develop a user-friendly tool for creating and managing quizzes

### Phase 3: Testing, Optimization, and Deployment
- [x] **Testing**
  - Write unit tests and integration tests for both frontend and backend
  - Conduct user testing to gather feedback and identify issues
- [x] **Optimization**
  - Optimize frontend performance for faster load times
  - Improve backend performance for handling more concurrent users
- [x] **Documentation**
  - Document all API endpoints and their usage
  - Create user guides and developer setup instructions
- [ ] **Deployment**
  - Deploy the application to a cloud platform (e.g., Heroku, AWS, Vercel)
  - Set up CI/CD pipelines for automated testing and deployment

### Phase 4: Future Enhancements
- [ ] **Multilingual Support**
  - Add support for multiple languages to broaden the user base
- [ ] **Social Features**
  - Implement social sharing for quiz results
  - Add friend lists and user interactions
- [ ] **Advanced Analytics**
  - Provide detailed analytics and reports for users and quiz creators
- [ ] **Mobile Application**
  - Develop a mobile version of Quizzyverse for iOS and Android
- [ ] **Gamification**
  - Introduce badges, achievements, and other gamification elements

### Team
- Alexandre Lepinard
- Erick Thonon
- Mayeul Desbazeille
- Clémence Kieu

### Project Objective
The goal of this project is to use all the tools learned during the course and apply them in a single site, Quizzyverse. The site should allow users to select a quiz of their choice, play it, and receive a score at the end. A ranking system is also planned. The major feature of this site is the independent management of each quiz. The team aims to have 4 quizzes available on the site.

### Specifics
- Limit of 4 quizzes per day, resetting at midnight.
- Premium accounts allow unlimited quizzes per day and you can create your own quiz.
- XP is awarded for each quiz submission, equivalent to 50 XP per quiz if all answers are correct.

See the [open issues](https://github.com/EpitechCodingAcademyPromo2024/C-COD-260-PAR-2-2-ecp-marc-alexandre.lepinard/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

