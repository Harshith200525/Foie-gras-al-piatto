function getRandomData(){
    fetch("https://www.themealdb.com/api/json/v1/1/random.php").then((res) => res.json()).then((data) => {
        const meal = data.meals[0];
        const html = ` <img src="${meal.strMealThumb}" alt="">
        <h3>${meal.strMeal}</h3>`;

        document.getElementById('random-meal-card').innerHTML = html;
        document.getElementById('meal-modal').innerHTML += `
        <div id="managing-something">
        <div class="card">
                ${html}
            </div>
        <div id="ingredients">
        <h3>Ingredients</h3>
            <ul>
                <li>${meal.strIngredient1}</li>
                <li>${meal.strIngredient2}</li>
                <li>${meal.strIngredient3}</li>
                <li>${meal.strIngredient4}</li>
                <li>${meal.strIngredient5}</li>
            </ul>
        </div>
        <button id="closeBtn" onclick="closeBtn()">Close</button> 
        </div>     
        `
    })
}

getRandomData()

let searchValue = document.getElementById("search-input")
let searchedDataContainer = document.getElementById("search-cards-holder")
let searchBtn = document.getElementById("searchBtn")
let mealModal = document.getElementById("meal-modal")
let randomMealCard = document.getElementById("random-meal-card")


searchBtn.onclick = () => {
    document.getElementById("searched-section").style.display = "block"
    document.getElementById("search-item").innerText = `Search results: ${searchValue.value}`
    displayMeals(searchValue.value)
}

function displayMeals(category){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((res) => res.json())
    .then((data) => stagingData(data))
}

function stagingData(inputData){
    searchedDataContainer.innerHTML = ""
    if(inputData.meals){
        inputData.meals.forEach(meal => {
            searchedDataContainer.innerHTML += `
                <div class="card">
                    <img src="${meal.strMealThumb}" alt="">
                    <h3>${meal.strMeal}</h3>
                </div>
            `
        });
    }else{
        searchedDataContainer.innerHTML += `<p>No meals found</p>`
    }
}

randomMealCard.onclick = () => {
    mealModal.style.display = "block"
}

function closeBtn(){
    mealModal.style.display = "none"
}