<p align="center">
<img width="1000" alt="YOM recipe upload screens" src="https://github.com/jachamberlain86/content-assets/blob/3c75f423322ff55938311058b1af846c151c8d06/YOM-title.png">
</p>


# YOM: One app - all your recipes.
[Watch the video](https://www.youtube.com/watch?v=D4SWx5pM1wk&t=4s)

<video controls poster="https://github.com/jachamberlain86/content-assets/blob/30d42479369d017d02bf06fce630302dd8348f84/YOM-poster.png" alt="YOM overview video">
       <source src="https://github.com/jachamberlain86/content-assets/blob/3c75f423322ff55938311058b1af846c151c8d06/YOM-demo.mp4" type="video/mp4">
</video>

## The Meal

YOM stores all your favourite recipes in one place.

Take a photo, provide a link, or input them from memory. YOM will then process and save your recipes in a consistent format, trimming away excess information.
YOM garnishes recipes with features such as unit conversions, custom notes, tags, and ratings. With its simple, stripped back interface, YOM is not just easy to use, it provides your eyes with something to feast on.

YOM has been built for iOS and Android.

<p align="center">
<img width="700" alt="YOM recipe upload screens" src="https://github.com/jachamberlain86/content-assets/blob/30d42479369d017d02bf06fce630302dd8348f84/YOM-upload.png">
</p>

## The Ingredients

YOM was built in under a week using JavaScript, React Native, Expo, Redux Toolkit, Google Firebase and Firestore, and the Google Cloud Vision and Spoonacular APIs.
Although I had not used any of these technologies prior to starting development, I picked them based on their suitability for my project goals:

A mobile app, built at speed, with secure authentication and storage, and camera functionality with image to text capabalities.

<p align="center">
<img width="700" alt="YOM recipe list screen" src="https://github.com/jachamberlain86/content-assets/blob/30d42479369d017d02bf06fce630302dd8348f84/YOM-list.png">
</p>

## The Recipe

To set YOM up locally, run 'npm i' from /client.

Add a .env file at the root of /client following the structure provided in .env.example in /client. Register with [Google Firebase](https://console.firebase.google.com/u/0/), [Google Cloud Vision API](https://console.cloud.google.com/marketplace/product/google/vision.googleapis.com?q=search&referrer=search), and [Rapid API](https://rapidapi.com/spoonacular/api/recipe-food-nutrition) to receive the necessary credentials.

To start using YOM through Expo run 'expo start -c' from /client.
To run on a mobile device, download the Expo for either [iOS](https://apps.apple.com/us/app/expo-go/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) and scan the QR code that's provided in your browser once the project compiles.

<p align="center">
<img width="700" alt="YOM recipe and coming soon screens" src="https://github.com/jachamberlain86/content-assets/blob/30d42479369d017d02bf06fce630302dd8348f84/YOM-soon.png">
</p>

## To Do...

- Provide ability to edit and delete recipes once saved.
- Add search and filter functionality to recipe list.
- Provide useers with an ability to edit their account settings once created.
- Finish image to text flow - lines of text are currently only pulled from an image and then pushed to a form where a user can identify them. This needs connecting to the existing recipe form used to edit uploaded and manually inputted recipes.
- Extend YOM's planned functionality with a meal planner and shopping list generator.
- Add more thorough error handling and sanitisation for text inputs.
- Provide more robust error handling if recipe cannot be parsed from URL or image.
- Develop a web version that removes camera functionality and renders content more responsively.
