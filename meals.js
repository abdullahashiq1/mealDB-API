const loadmealDb= (searchFoods) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFoods}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))
}

const displayMeals = (foods) =>{
    const container = document.getElementById('food-container');
    container.innerText = '';

    /*
    // show all after 6 cards 
    if(foods.length > 6) {
        console.log(foods.length)
    }else{
        console.log('six lenght')
    }

    let numToShow = Math.min(foods.length, 6);

    for(let i = 0; i < numToShow; i++){
        const food = foods[i];
        const div = createCard(food);
        container.appendChild(div);
    }

    if(foods.length > 6){
        const showAllButton = document.createElement('button');
        showAllButton.innerText = 'Show All';
        showAllButton.classList.add('showAll');
        showAllButton.addEventListener('click', showAll);
        container.appendChild(showAllButton);
    }
*/

    foods.forEach(food =>{
        console.log(food);
        const div = document.createElement('div');
        const sliceChr = food.strInstructions.length > 200 ? `${food.strInstructions.substring(0, 200)}...`: food.strInstructions; 
    
        div.innerHTML = `
        <div class="container">
            <div class="card mb-3 h-100" >
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${food.strMealThumb}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${food.strMeal}</h5>
                            <p class="card-text">${sliceChr}</p>
                        </div>
                        <button onclick="loadIndividual(${food.idMeal})" type="button" class="text-warning fw-bold mt-3 mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            View Details
                        </button>
                        
                    </div>
                </div>
            </div>
        </div> 
        `   
        container.appendChild(div);
    })
    
}

const searchMeals = ()=>{
    const inputId = document.getElementById('input-field').value;
    loadmealDb(inputId)
}

const loadIndividual = async(mealId) =>{
    try{
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
        const res = await fetch(url);
        const data = await res.json()
        displayIndividual(data.meals[0])
    }
    catch(error){
        console.log(error)
    }

}

const displayIndividual = meal =>{
    console.log(meal)
    document.getElementById('exampleModalLabel').innerText = meal.strMeal;
    const modalBody = document.getElementById('mealDetails');
    modalBody.innerHTML = `
        <img src="${meal.strMealThumb}" class="img-fluid">
        <p>Ingredients: ${meal.strIngredient1}, ${meal.strIngredient2} ${meal.strIngredient3}, ${meal.strIngredient4}, ${meal.strIngredient5}</p>
        <h5>${meal.strArea}</h5>
        <h5>${meal.strCategory}</h5>
        <a href="${meal.strYoutube}" target="_blank">See Details in Video</a>

    `
}
/*
const createCard = (food) =>{
    const div = document.createElement('div');
    div.innerText = food.strMeal;
    return div;
}

const showAll= () =>{
    console.log('Added function')
    const container = document.getElementById('food-container');
    container.innerHTML = '';
    loadmealDb('fish');
    
} 
*/
loadmealDb('fish')