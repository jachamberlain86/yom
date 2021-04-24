const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY
const X_RAPIDAPI_HOST = process.env.X_RAPIDAPI_HOST

export async function getRecipeFromLink (url) {
  try {
    const response = await window.fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract?url=${url}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': X_RAPIDAPI_KEY,
        'x-rapidapi-host': X_RAPIDAPI_HOST
      }
    })
    const parsedResponse = await response.json()
    return parsedResponse
  } catch (err) {
    console.error(err)
  }
}

export async function parseIngredients (ingredients, servingSize) {
  const body = { ingredientList: ingredients, servings: servingSize }
  const formBody = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&')
  try {
    const response = await window.fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/parseIngredients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'x-rapidapi-key': X_RAPIDAPI_KEY,
        'x-rapidapi-host': X_RAPIDAPI_HOST
      },
      body: formBody
    })
    const parsedResponse = await response.json()
    return parsedResponse
  } catch (err) {
    console.error(err)
  }
}
