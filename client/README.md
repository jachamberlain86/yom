# YOM
## the digital recipe scrapbook

YOM allows you to save all your favourite recipes in one place. Import a recipe from a blog using a link. Upload an image from a recipe book. Type out your own creations.

Simply run npm i from within /client and then run expo start -c in the command line to compile the project. Behaviour and styling across devices can vary so be sure to test in web, iOS, and Android.

Using Spoonacular and Google Cloud Vision APIs, YOM formats recipes in a consistent and easy to manage format. Users can apply custom tags, add notes and ratings. They can completely rewrite a recipe if they want to. Users can also specify whether they prefer UK (metric) or US (imperial) measures and YOM will handle all the unit conversions.

YOM is built in React Native and uses Expo. This development build should work on web, iOS, and Android. It requires a .env file in the root of the client folder. You'll need to create a Firebase project on Google Firebase and include the project config settings in the .env (API key, auth domain, project ID, storage bucket, messaging sender ID, app ID, measurement ID). You'll also need to enable Google Cloud Vision in your Google Cloud console and register for an API key. The .env also takes a API key and host details for Spoonacular obtained through RapidAPI.

Users register an accout with just their name, email, and password. Their account authorisation is handled by Google Firebase and storage is managed by Firebase Firestore. Related files are found in /components/auth/...

With an account created users can navigate from their dashboard through YOM's three main tabs; the Recipe Book, Meal Planner, and Shopping List. Only Recipe Book has been developed at this stage. The hamburger icon opens up a side menu with quick access to adding a recipe, the home screen, user account details, and to log out. Currently users are only able to view account details and not edit them. Related files are found in /components/main/...

In their Recipe Books users can browse previously added recipes. A long press reveals a few recipe details, while tapping takes them through to the selected recipe. Saved recipes aren't currently editable nor can they be deleted. Search and filter functionality is also yet to be implemented. Recipe items have a simple interface that focuses on key information. Under the Add Tab are screens to upload a url, take a photo or select one from the gallery, or to enter a recipe manually. Currently, added ingredients, steps, and tags cannot be removed or edited. Recipe parsing has a roughly 80-90% success rate, though unexpected data is not handled. The Add Image functionality needs to by hooked up to the Edit New Recipe screen. Logic to format text parsed from images also needs to be completed. The camera functionality is only applicable to users on mobile phones, the Add Image screen needs some conditional rendering based on the user's device. Related files are found in /components/recipes/...

Logic for connecting to Spoonacular can be found in /api/client.js. Mock data for parsed recipes and ingredients can also be found here. Logic for Firebase and Google Cloud is held within the components it is used in.

/controllers/recipe.js takes care of formatting recipes and ingredients. There are currently only a few controls for edge cases and handling errors. iOS was throwing errors if a TextInput was passed a number, so both timeMinutes and servingSize are both converted to strings.

/db/firebase.js takes care of the initial connection to Firebase.

/app/store.js and /features/... hold all currently implemented Redux Toolkit logic.

/navigation/... contains all components and logic for React Navigation.

/styles/app.jsx contains (almost) all CSS styling settings for components across the app. The CSS needs refactoring as classNames do not always reflect the components they are used in.

Users can also opt to add new recipes by