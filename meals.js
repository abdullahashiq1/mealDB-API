const loadmealDb= (searchFoods) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFoods}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))
}

const displayMeals = (foods) =>{
    const container = document.getElementById('food-container');
    container.innerText = '';

    // show all after 6 cards 
    if(foods.length > 6) {
        console.log('Show ALl')
    }else{
        console.log('six lenght')
    }

    foods.forEach(food =>{
        // console.log(food);
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
                        <button type="button" class="text-warning fw-bold mt-3 mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
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

const showlAll = () =>{
    
}

loadmealDb('fish')