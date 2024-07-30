# db-NoLimits88

The server-side web application of the AquaTrack project provides key functionalities 
for user management and security. The backend includes the following features:

- **User Registration, Login, and Logout**: Users can create an account, log in, 
and log out of the system. These processes are secured and support the generation of access 
and refresh tokens, ensuring secure interaction with the web application.

- **Routes for Operations**: Separate routes are created for each of these
  functions, handling requests for registration, authentication, and logout.

- **Data Storage**: Upon successful completion of operations, user data is
  stored in a MongoDB database, ensuring reliable storage and access to
  information.

- **Error Handling and Data Validation**: In case of incorrect data, field
  validation is implemented to prevent erroneous or unsafe input. Errors are
  handled appropriately, providing users with clear and useful error messages.

This system ensures robust user account management and data protection, creating
a secure environment for working with the AquaTrack application.

## Backend Commands

1. **npm run lint**: Performs linting (code checking for adherence to standards
   and potential errors) on all JavaScript files in the src folder and its
   subdirectories using ESLint.

2. **npm run start**: Starts the application using Node.js and specifies
   index.js in the src folder as the entry point.

3. **npm run dev**: Starts the application using Nodemon, which automatically
   restarts the server when changes are made to index.js (or other files in
   src), making it convenient for development.

4. **npm run build**: Executes the build-docs command to compile the
   documentation. This is a helper command that triggers another command (in
   this case, build-docs).

5. **npm run build-docs**: Uses the Redocly tool to create and bundle API
   documentation in JSON format, and saves it to the swagger.json file in the
   docs folder.

6. **npm run preview-docs**: Opens a preview of the API documentation created
   with Redocly. This allows for a visual review of the documentation before it
   is published.

[Link Swagger](https://aquatrack-backend-bmxm.onrender.com/api-docs/)

## API

[AquaTrack application](https://project-nolimits88.netlify.app/)
