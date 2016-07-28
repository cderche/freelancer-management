# Freelancer Management app
Let freelancers connect to your app to manage their jobs.

## Version 0.1

### Functionality
- User can sign up
  - User can complete form
  - User receives email
  - Admin receives email
- User can sign in
  - If the user is verified
  - Redirects to dashboard (unimplemented)
- User can sign out

### Routes
Method  | Route     | Note
------  | -----     | ----
GET     | /         | Redirect to /signin or show dashboard
GET     | /signup   | User signup page (long form)
GET     | /signin   | User sign in page (email/password)

### Libraries
- [expressjs](https://expressjs.com/)
- [passportjs](http://passportjs.org/)
