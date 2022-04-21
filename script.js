const strArea = document.querySelector(`form`);

console.log(strArea);

function reveal(meal) {
    const recipeSelect = document.querySelectorAll(`#recipe *`);
    recipeSelect.forEach(element => {
        element.remove();
    });

    const recipe = document.querySelector(`#recipe`);
    
    const title = document.createElement(`h1`);
    title.innerText = meal.strMeal;
    recipe.append(title);
    
    const image = document.createElement(`img`);
    image.src = `${meal.strMealThumb}`;
    recipe.append(image);

    const area = document.createElement(`h3`);
    area.innerText = `REGION: ${meal.strArea}`;
    recipe.append(area);

    const type = document.createElement(`h3`);
    type.innerText = `TYPE: ${meal.strCategory}`;
    recipe.append(type);

    const ingredients = document.createElement(`ul`);
    ingredients.innerText = `Ingredients:`;
    recipe.append(ingredients);

    let check = true;
    let count = 1;
    const sect = document.createElement(`section`);
    recipe.append(sect);
    while (check) {
        const item = document.createElement(`li`);
        let urlIng = meal[`strIngredient${count}`];
        let urlAmt = meal[`strMeasure${count}`];
        let text = `${urlAmt}: ${urlIng}`;
        item.innerText = text
        if (urlIng === "" || count === 21 || urlIng === null) {
            check = false;
        } else {
            sect.append(item);
            count++;
        }
    }

    const instruct = document.createElement(`h3`);
    instruct.innerText = `Instructions:`;
    const direct = document.createElement(`p`);
    direct.innerText = meal.strInstructions;
    recipe.append(instruct, direct);
    
}

async function getAPI(area) {
    try {
        const region = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=" + area);
        console.log(`Request successful`);
        const list = await axios.get(region.url);
        console.log(list);
        const id = list.data.meals[[Math.floor(Math.random() * (list.data.meals.length))]].idMeal;
        console.log(id);
        const itemValue = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const item = itemValue.data.meals[0];
        console.log(item);
        reveal(item);
        
    } catch (err) {
        console.log(`Request failed`);
        console.log(err);
    }
}

strArea.addEventListener(`submit`, region => {
    region.preventDefault();
    area = strArea.elements[0].value;
    getAPI(area);
});