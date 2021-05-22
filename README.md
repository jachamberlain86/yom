<p align="center">
<img width="1000" alt="YOM recipe upload screens" src="https://github.com/jachamberlain86/content-assets/blob/3c75f423322ff55938311058b1af846c151c8d06/YOM-title.png">
</p>

<code><img alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge"></code>
<code><img alt="CSS3" src="https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white&style=for-the-badge"></code>
<code><img alt="React Native" src="https://img.shields.io/badge/-React%20Native-61DAFB?logo=react&logoColor=white&style=for-the-badge"></code>
<code><img alt="Expo" src="https://img.shields.io/badge/-Expo-000020?logo=expo&logoColor=white&style=for-the-badge"></code>
<code><img alt="Redux Toolkit" src="https://img.shields.io/badge/-Redux%20Toolkit-764ABC?logo=redux&logoColor=white&style=for-the-badge"></code>
<code><img alt="Firebase" src="https://img.shields.io/badge/-Firebase-FFCA28?logo=firebase&logoColor=black&style=for-the-badge"></code>
<code><img alt="Google Cloud" src="https://img.shields.io/badge/-Google%20Cloud-4285F4?logo=google-cloud&logoColor=white&style=for-the-badge"></code>


# YOM: One app - all your recipes.

<a href="https://www.youtube.com/watch?v=D4SWx5pM1wk&t=4s">
       <p align="center">
<img width="700" alt="YOM video" src="https://github.com/jachamberlain86/content-assets/blob/47b669f3a78119e5748f71c12cfe4a23ffa35fb1/YOM-poster.png">
</p>
</a>

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

To set YOM up locally and install dependencies from the CLI, navigate to /client and execute:
```
npm i
```

Add a .env file at the root of /client following the structure provided in .env.example in /client. Register with [Google Firebase](https://console.firebase.google.com/u/0/), [Google Cloud Vision API](https://console.cloud.google.com/marketplace/product/google/vision.googleapis.com?q=search&referrer=search), and [Rapid API](https://rapidapi.com/spoonacular/api/recipe-food-nutrition) to receive the necessary credentials.

To start using YOM through Expo from the CLI, navigate to /client and execute:
```
expo start -c
```

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
