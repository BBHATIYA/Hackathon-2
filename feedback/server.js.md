**Things that were done well**

-   Short and sweet haha
-   Code is modular. Nice job putting saveUser and getUser functions as separate utility functions.
-   Good job salting the user passwords!

**Things to improve**

-   Instead of having everything for your back end in one server file, it would've been better to create functions for the logic you have and import those functions into the server file. This is a very small app, so not a big deal here, but in general, better to have less logic in the main server file. The server file's main purpose is the broad picture of your app.
-   Same idea for db connection, best to keep the knex connection function in a separate file and import db where needed.
-   Although we have some sort of authentication, it isn't being used to protect any resources. What you have so far is good, but it's still incomplete. To have a full auth flow, there needs to be some functionality where the user can't do certain tasks unless they're authenticated.
