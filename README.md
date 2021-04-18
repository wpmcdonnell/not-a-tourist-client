# Not A Tourist

### Important Links
-	Back-End-Repo: https://github.com/wpMcDonnell/not-a-tourist-api

-	Deployed API: https://not-a-tourist-api.herokuapp.com

-	Deployed Client: https://wpmcdonnell.github.io/not-a-tourist-client/

### Not A Tourist
"Not A Tourist" is a site where users can select a city or start threads in the general section in the form of posts. Once created, original creators of posts can update or delete their posts. All users may then comment on available posts. Ideally, users will post lists and information regaring travel to a particular city of choice.

### Set up Guide / Installation

1. Download template
2. Unzip and rename the directory (`unzip ~/Downloads/not-a-tourist-client.zip`)
3. Move into the new project and `git init`.
4. Replace `not-a-toruist-client` in package.json with your projects name.
5. Replace the `"homepage"` field in `package.json` with your (public) Github account name and repository name.
6. Install dependencies with `npm install`.
7. `git add` and `git commit` changes.
8. Run the server with `npm start`.

### Planning
First I created a wireframe and users stories to physically conceputalize how I wanted the app and layout to look. I also created a ERD to conceptualize how the app would talk to this API. In building the API, I built a resource "posts"and "users" which user's, aka owners, could CRUD. I built the resource using a mongoose Schema and then using express routes. Eventually I built 4 other "post" resource, each city having their own. Eventually I added a "comments" schema which reference the User and was given a field of postOwner which was feed the params.id of the post a user was currently viewing.

### User Stories
* As a user, I want to be able to sign up, sign in, change my password, and sign-out
* As a user, I want to be able to select a city thread board (GET)
* As a user, I want to be able to start a thread (POST)
* As a user, I want to be able to edit my own threads / POSTS and comments (PATCH)
* As a user, I want other users to be able to comment on my threads
* As a user, I want to be able to comment on other user's threads (POST)
* As a user, I want to be able to delete my threads (DELETE)
* As a user, I want to be able to get all my posts and pictures (GET) (STRETCH)
* As a user, I want to be able to upload and post an image -- fashion picture for city -- (POST) (STRETCH)
* As a user, I want to be able to comment on other people's pictures (POST) (STRETCH)
* As a user, I want to delete my own picture (DELETE) (STRETCH)


### Technologies Used
-	HTML5
-	SCSS
-	React
-	JSX
-	Heroku
-	Express
-	Node.js

### Unsolved Problems
* I would like to add more styling

#### Screen Shot

![Screen Shot](./public/ssnat.png)

#### ERD

![ERD](./public/ERD.png)

#### Wireframe

![Wireframe](./public/Wireframe.png)
