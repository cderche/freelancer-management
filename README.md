# Freelancer Management app
Let freelancers connect to your app to manage their jobs.

## Version 0.1

### Technology
- Built to run on Heroku
- Uses clusters to utilise multiple cores
- Uses workers to support background tasks

### Functionality
- User can sign up
  - User can complete form
  - User receives email
  - Admin receives email
- User can sign in
  - If the user is verified
  - Redirects to dashboard (unimplemented)
- User can sign out
- User can see their profile

### Routes
Method  | Route     | Note
------  | -----     | ----
GET     | /         | Redirect to /signin or show dashboard
GET     | /signup   | User signup page (long form)
GET     | /signin   | User sign in page (email/password)
GET     | /signout  | Logs the user out
GET     | /profile  | User profile page
POST    | /signin   | Authenticates the user
POST    | /signup   | Registers the user


### Libraries
- [expressjs](https://expressjs.com/)
- [passportjs](http://passportjs.org/)
- [kue](https://github.com/Automattic/kue)
- [foreman](http://ddollar.github.io/foreman/)
- [Grunt](grunt), [Heroku Article](https://devcenter.heroku.com/articles/node-with-grunt)
- [Bundler](bundler)
- [Sass](sass)

REMOVE ME
