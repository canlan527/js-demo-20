const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealEl = document.getElementById("meals");
const resultHeadingEl = document.getElementById("result-heading");
const singleMealEl = document.getElementById("single-meal");

// 获取数据
function searchMeal(e) {
  e.preventDefault();
  // 清空singmeal
  singleMealEl.innerHTML = "";
  // 获得 search 输入框的值
  let term = search.value;

  // 判断是否为空
  if (term.trim() === "") {
    alert("请输入查询的食物内容");
  } else {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals === null) {
          resultHeadingEl.innerHTML = `<p>${term}没有查询到相关食谱，请重新输入！</p>`;
        } else {
          mealEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <div class="meal-info" data-mealId="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
            .join("");
        }
        resultHeadingEl.innerHTML = `<h2>${term}的查询结果为：</h2>`;
      });
    search.value = "";
  }
  // console.log(term);
}

function getRandomMeal() {
  mealEl.innerHTML = "";
  resultHeadingEl.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then(res => res.json()).then(data => {
    const meal = data.meals[0];
    addMealToDOM(meal);
  })
}

function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.meals[0])
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  // console.log(meal)
  mealEl.innerHTML = "";
  resultHeadingEl.innerHTML = "";
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  // console.log(meal);
  console.log(ingredients);
  if (ingredients.length > 0) {
    singleMealEl.innerHTML = `
      <h1>${meal.strMeal}</h1>
      <div class="single-img">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      </div>
      <div class="meal-tags">
      ${ meal.strTags && meal.strTags.split(',').map(tag => `<span class="tag">${tag}</span>`).join('') }
      </div>
      <div class="meal-area">
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>
      </div>
      <div class="meal-instruc">
        <h2>Instructions</h2>
        ${meal.strInstructions}
      </div>
      <div class="meal-strIngredient">
        <h3>ingredient</h3>
        ${ingredients.map(ele => `
          <span class="meal-ingredient">${ele}</span>
        `).join('')}
      </div>
    `;
  }
}
// 事件监听
submit.addEventListener("submit", searchMeal);
mealEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  // console.log(mealInfo);
  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-mealId");
    getMealById(mealId);
  }
});
random.addEventListener('click', getRandomMeal)