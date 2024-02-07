# Loop Cinemas

A fully responsive (mock) website developed for Loop Cinemas, as part of my Fullstack Development course at RMIT University.

## Design

Figma designs for this project can be viewed [here](https://www.figma.com/file/Nd896Y0zvD5Bb8KZeIi1gF/Loop-Cinemas?type=design&node-id=26824%3A854&mode=design&t=vOra8PHJpo9ry8Ib-1).

Database ERD can be viewed [here](https://lucid.app/lucidchart/f959b459-b95b-4a6c-aa49-a18a2c24dbef/edit?viewport_loc=-1215%2C-313%2C3262%2C1646%2C0_0&invitationId=inv_14e96f73-f382-4cfc-b47c-6129d1fed782) (requires login).

## Features

### React - Frontend

-   Scrollable carousels for displaying movies.
    -   'Now Showing' movies ordered by highest rating.
-   Search movies by title.
-   Page generated for each movie using static movie data.
-   Logged-in users can post reviews on movie pages.
    -   Limit one review per movie.
    -   Limit one review per 12 hours.
    -   Reviews can be deleted (resets timer).
    -   Review can be edited unlimited times.
-   Collapsable sidebar for mobile/tablet devices.
-   Profile management features.
    -   Update profile information.
    -   Update password.
    -   Delete account.
    -   View bookings.

### Node.js + Express.js - Middle Layer

-   Sequelize ORM used to communicate with MySQL cloud database.
-   Password salted and hashed before storing in database.
-   JWT based authentication for user session management.
    -   User receives access token and refresh token upon logging in.
    -   Access token automatically refreshed in background after expiring.
    -   Refresh token invalidated upon logging out.
    -   Refresh token used for persistent login (up to one week before expiring).

### MySQL Database + AWS S3 - Backend

-   Cloud hosted MySQL database.
-   AWS S3 bucket used to store images.
