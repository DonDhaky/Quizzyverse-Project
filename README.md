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
        <li><a href="#api">API</a></li>
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


<!-- Built With -->
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


<!-- API -->
## API

For this project, we used different free API such as :

. Champion Quiz
To get all [the champions](https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion.json)

To get detail information of [the Champion selection](https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion/Aatrox.json)

To get [the pictures](https://ddragon.leagueoflegends.com/cdn/14.11.1/img/passive/Anivia_P.png) 


. Flags Quiz
To get [the flag](http://restcountries.com/v3.1/all)


. Capitals Quiz
To get [the quiz custom](https://opentdb.com/api_config.php)

To get [the capital](https://api.worldbank.org/ )


. Cocktail Quiz
To get [The Cocktail DB](https://www.thecocktaildb.com/api.php)

### API Endpoints

Here an example of how we did it.

**Search Cocktails by First Letter:**
   - URL: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`
   - Description: This endpoint returns a list of cocktails that start with the letter 'a'.


### Usage

- We use the `search.php?f=a` endpoint to fetch a predefined set of cocktails that are used in our quizzes.
- The `random.php` endpoint is used to fetch a random cocktail to add an element of surprise and variety to the quiz questions.

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

Welcome to Quizzyverse! Follow these steps to start playing quizzes and enjoy learning while having fun.

**Getting Started**

  1. Login/Register:
    .If you already have an account, click on the "Login" button and enter your credentials.
    .If you are new, click on the "Register" button and create a new account using your email and password and complet the form.
  
  2. Profile Setup:
     After logging in, you can set up your profile by adding a username and a country.
  
**Playing Quizzes**

  1. Select a Quiz:
      On the homepage, you will see a variety of quizzes. Click on a quiz that interests you.
  2. Start the Quiz:
     Click on the "Start Quiz" button to begin.
  3. Answer Questions:
     Each quiz consists of multiple questions. Read each question carefully and enter the answer you believe is correct in the input.
     After typing the answer, click "Answer" or type enter to proceed to the next question.
  4. Submit Quiz:
     Once you have answered all questions, click on the "Submit Quiz" button to finish.
     
**Scoring and Ranking**

  1. View Score:
     After submitting the quiz, your score will be displayed in a pop up page. The score is based on the number of correct answers.
  2. Earn XP:
     For each quiz completed, you will earn 50 XP points if all answers are correct. XP helps you rank up in the leaderboard.
  3. Check Leaderboard:
     Visit the "Admin" section to see your rank compared to other players. Higher XP means a higher rank! You can also check              your XP on the left corner of the navbar in the home page.
     
**Creating Quizzes**

  1. Access Quiz Creator:
     If you want to create your own quiz, go to the "Create Quiz" section from the admin on the navbar.
  2. Add Questions:
     Fill in the quiz details such as title, description, and add your questions with a picture if disired.
  3. Publish Quiz:
     Once you have added all questions, click on "Publish" to make your quiz available to other players.
     
**Premium Features**

  1. Daily Quiz Limit:
     Free users can play up to 4 quizzes per day. The limit resets at midnight.
  2. Upgrade to Premium:
     For unlimited quiz attempts, consider upgrading to a premium account. Click on "Upgrade to Premium" and follow the payment           process via
     Stripe.
  3. Enjoy Unlimited Access:
     Premium users can enjoy unlimited quizzes and additional features without any restrictions.
     Additional Tips
  4. Responsive Design:
     Quizzyverse is fully responsive, so you can play quizzes on any device, whether it's a desktop, tablet, or smartphone.
  5. Stay Updated:
     Follow us to stay updated with new quizzes and features for more information or support, refer to the Documentation or contact       our support team.

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
The goal of this project is to use all the tools learned during the course and apply them in a single site, Quizzyverse. The site should allow users to select a quiz of their choice, play it, and receive a score at the end. A ranking system is also planned. The major feature of this site is the independent management of each quiz. The team aims to have at least 4 quizzes available on the site.

### Specifics
- Limit of 4 quizzes per day, resetting at midnight.
- Premium accounts allow unlimited quizzes per day and you can create your own quiz.
- XP is awarded for each quiz submission, equivalent to 50 XP per quiz if all answers are correct.

See the [open issues](https://github.com/EpitechCodingAcademyPromo2024/C-COD-260-PAR-2-2-ecp-marc-alexandre.lepinard/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[NextAuth]: https://img.shields.io/npm/v/next-auth?color=green&label=next-auth
[NextAuth-url]: https://next-auth.js.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Express.js]: https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white
[Express.js-url]: https://expressjs.com/
[MySQL]: https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Bcrypt]: https://img.shields.io/badge/bcrypt-888888?style=for-the-badge&logo=bcrypt&logoColor=white
[Bcrypt-url]: https://www.npmjs.com/package/bcrypt
[Dotenv]: https://img.shields.io/badge/dotenv-563D7C?style=for-the-badge&logo=dotenv&logoColor=white
[Dotenv-url]: https://www.npmjs.com/package/dotenv
[NodeFetch]: https://img.shields.io/badge/node--fetch-000000?style=for-the-badge&logo=node-fetch&logoColor=white
[NodeFetch-url]: https://www.npmjs.com/package/node-fetch
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[ESLint]: https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white
[ESLint-url]: https://eslint.org/










