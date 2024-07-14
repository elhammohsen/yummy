/// <reference types="../@types/jquery" />
// ^====================================|JQ Default Functions & Global Vars|==============================
let navWidth = $(".navbox").width();
let datarow = document.getElementById("datarow");

// &===========================================|JQ Functions for Navbar|=================================

// ^===========================================|JQ Functions for Navbar Test|=================================
function openSideNav() {
  $(".side-nav-menu").animate(
    {
      left: 0,
    },
    500
  );
  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 100
      );
  }
}
function closeSideNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
  $(".side-nav-menu").animate(
    {
      left: -boxWidth,
    },
    500
  );
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");
  $(".links li").animate(
    {
      top: 300,
    },
    500
  );
}
closeSideNav();
$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});
// ============================================|back|============================================ -->
$("#home").on("click", function () {
  getSample();
});
// !|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ---------------------------------------------------|2|------------------------------------------------
// !|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// &===========================================|JQ Functions for Entry Page|=============================
// *==================================|Get Welcome Sample|=============================
async function getSample() {
  $("#Search").addClass("d-none");
  $("#datarow").removeClass("d-none");
  $("#innerLoader").hide();
  $("#SearchResultBox").addClass("d-none");
  $(".back").addClass("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  let data = await response.json();
  console.log(data);
  displaySample(data.meals);
  $("#loader").fadeOut(300);
  return data.meals;
}
getSample();
// *==============================|Display Welcome Sample|=============================
function displaySample(data) {
  let cartona = ``;
  for (let i = 0; i < data.length; i++) {
    cartona += `
    <div class="col-md-3">
    <div class="result rounded-2 position-relative overflow-hidden" onclick="getMealInfo('${data[i].idMeal}')">
        <div class="overlay position-absolute bottom-0 end-0 start-0 p-1 d-flex align-items-center fs-2">
          ${data[i].strMeal}         
        </div>
        <img class="w-100 rounded-3" src=${data[i].strMealThumb} alt=${data[i].strMeal}>
    </div>
</div>
    `;
  }
  $("#datarow").html(cartona);
}
// !|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ---------------------------------------------------|3 Search|------------------------------------------------
// !|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// &===========================================|Search Section Display|=======================================
function showSearch() {
  $("#nameSearch").val("");
  $("#firstLetterSearch").val("");
  $("#Search").removeClass("d-none");
  $("#datarow").addClass("d-none");
  $("#innerLoader").hide();
  $("#SearchResultBox").removeClass("d-none");
  $("#SearchResultBox").html("");
  $(".back").addClass("d-none");
  // $("#fake").addClass("d-none");
}
// ?=================================|Search Functions|===============================
$("#nameSearch").on("input", function () {
  $("#innerLoader").fadeIn(300);
  $("body").css("overflow", "hidden");
  let SearchByName = $("#nameSearch").val();
  console.log(SearchByName);
  getSearchDataByName(SearchByName);
  $("#innerLoader").fadeOut(300);
});
$("#firstLetterSearch").on("input", function () {
  $("#innerLoader").fadeIn(300);
  let SearchByFirstL = $("#firstLetterSearch").val();
  console.log(SearchByFirstL);
  getSearchByFirstL(SearchByFirstL);
  $("#innerLoader").fadeOut(300);
});
async function getSearchDataByName(name) {
  $("#innerLoader").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let data = await response.json();
  console.log(data);
  if (data.meals) {
    // $("#innerLoader").fadeIn(300);
    displaySearchByName(data.meals);
    $("#innerLoader").fadeOut(300, function () {
      $("body").css("overflow", "auto");
    });
  } else {
    $("#innerLoader").fadeOut(300);
    $("#SearchResultBox").html(`
    <div class="d-flex justify-content-center align-items-center">
    <div class="alert alert-danger my-1 text-center p-5">
    No results found!
    </div>
    </div>    
    `);
  }
}
async function getSearchByFirstL(term) {
  $("#innerLoader").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  let data = await response.json();
  console.log(data);
  if (data.meals) {
    // $("#innerLoader").fadeIn(300);
    displaySearchByFL(data.meals);
    $("#innerLoader").fadeOut(300, function () {
      $("body").css("overflow", "auto");
    });
  } else {
    $("#innerLoader").fadeOut(300);
    $("#SearchResultBox").html(`
    <div class="d-flex justify-content-center align-items-center">
    <div class="alert alert-danger my-1 text-center p-5">
    No results found!
    </div>
    </div>    
    `);
  }
}
// ?=================================|Search Display Functions|===============================
function displaySearchByName(params) {
  // $("#fake").removeClass("d-none");
  let cartona = ``;
  for (let index = 0; index < params.length; index++) {
    cartona += `
    <div class="col-md-3">
                    <div class="result rounded-2 position-relative overflow-hidden" onclick="getMealInfo('${params[index].idMeal}')">
                        <div
                            class="overlay position-absolute bottom-0 end-0 start-0 p-1 fs-2 d-flex align-items-center">
                            ${params[index].strMeal}
                        </div>
                        <img class="w-100 rounded-3" src=${params[index].strMealThumb} alt="" />
                    </div>
                </div>
    `;
  }
  $("#SearchResultBox").html(cartona);
}
function displaySearchByFL(f) {
  // $("#fake").removeClass("d-none");
  let cartona = ``;
  for (let index = 0; index < f.length; index++) {
    cartona += `
    <div class="col-md-3">
                    <div class="result rounded-2 position-relative overflow-hidden" onclick="getMealInfo('${f[index].idMeal}')">
                        <div
                            class="overlay position-absolute bottom-0 end-0 start-0 p-1 fs-2 d-flex align-items-center">
                            ${f[index].strMeal}
                        </div>
                        <img class="w-100 rounded-3" src=${f[index].strMealThumb} alt="" />
                    </div>
                </div>
    `;
  }
  $("#SearchResultBox").html(cartona);
}
// !|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ---------------------------------------------------|4 Categories|------------------------------------------------
// !|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// &===========================================|Display Category Section|====================================
function showCategories() {
  $("#Search").addClass("d-none");
  $("#datarow").removeClass("d-none");
  $("#innerLoader").hide();
  $("#SearchResultBox").addClass("d-none");
  // $("#fake").removeClass("d-none");
  getCategories();
}
// &===========================================|Get All Categories|=============================
async function getCategories() {
  $("#Search").addClass("d-none");
  $("#datarow").removeClass("d-none");
  $("#innerLoader").hide();
  $("#SearchResultBox").addClass("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await response.json();
  console.log(data);
  displayCategories(data.categories);
  $("#loader").fadeOut(300);
}
// &===========================================|Display All Categories|=============================
function displayCategories(cats) {
  let cartona = ``;
  for (let i = 0; i < cats.length; i++) {
    cartona += `
    <div class="col-md-3">
    <div class="result rounded-2 position-relative overflow-hidden" onclick="getCategoryMeals('${
      cats[i].strCategory
    }')">
        <div class="overlay position-absolute bottom-0 end-0 start-0 p-1 text-center fs-2">
          ${cats[i].strCategory}
          <p class='fs-6'>${cats[i].strCategoryDescription
            .split(" ")
            .slice(0, 20)
            .join(" ")}</p>         
        </div>
        <img class="w-100 rounded-3" src=${cats[i].strCategoryThumb} alt="">
    </div>
</div>
    `;
  }
  $("#datarow").html(cartona);
}
// &===========================================|*Filter BY Category*|====================================
// *<<<<<<<<<<<<<>>>>>>>>>>>>>|Fetching Category Meals|<<<<<<<<<<<<<>>>>>>>>>>>>>
async function getCategoryMeals(cat) {
  $("#Search").addClass("d-none");
  $("#datarow").removeClass("d-none");
  $("#innerLoader").hide();
  $("#SearchResultBox").addClass("d-none");
  $("#loader").fadeIn();
  $("body").css("overflow", "hidden");
  $("#fake").removeClass("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
  );
  let data = await response.json();
  displaySample(data.meals);
  $("#loader").fadeOut(300, function () {
    $("body").css("overflow", "auto");
  });
}
// !|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ---------------------------------------------------|5 Area|------------------------------------------------
// !|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// &===========================================|Display Area Section|====================================
function showArea() {
  $("#Search").addClass("d-none");
  $("#datarow").removeClass("d-none");
  $("#innerLoader").hide();
  $("#SearchResultBox").addClass("d-none");
  getListAreas();
}
// *<<<<<<<<<<<<<>>>>>>>>>>>>>|Fetching All Areas|<<<<<<<<<<<<<>>>>>>>>>>>>>
async function getListAreas() {
  $("#Search").addClass("d-none");
  $("#datarow").removeClass("d-none");
  $("#innerLoader").hide();
  $("#SearchResultBox").addClass("d-none");
  $("#loader").fadeIn();
  $("body").css("overflow", "hidden");
  // $("#fake").removeClass("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  displayAreasList(response.meals);
  $("#loader").fadeOut(300, function () {
    $("body").css("overflow", "auto");
  });
}
// &===========================================|Display All Areas|====================================
function displayAreasList(area) {
  let cartona = ``;
  for (let i = 0; i < area.length; i++) {
    cartona += `
    <div class="col-md-3">
    <div class="result rounded-2 position-relative overflow-hidden text-center text-white" onclick="getAreaMeals('${area[i].strArea}')">
    <i class="fa-solid fa-map-location-dot fa-4x"></i>
    <h3>${area[i].strArea}</h3>
    </div>
</div>
    `;
  }
  $("#datarow").html(cartona);
}
// &===========================================|Filter Meals BY Area|====================================
async function getAreaMeals(Area) {
  $("#loader").fadeIn();
  $("body").css("overflow", "hidden");
  // $("#fake").removeClass("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`
  );
  let data = await response.json();
  displaySample(data.meals);
  $("#loader").fadeOut(300, function () {
    $("body").css("overflow", "auto");
  });
}
// !|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ---------------------------------------------------|6 Ingredients|------------------------------------
// !|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// &===========================================|Ingredients Display|=======================================
function showIngredients() {
  $("#Search").addClass("d-none");
  $("#datarow").removeClass("d-none");
  $("#innerLoader").hide();
  $("#SearchResultBox").addClass("d-none");
  // $("#fake").removeClass("d-none");
  listIngredients();
}
// *<<<<<<<<<<<<<>>>>>>>>>>>>>|Fetching All Ingredients|<<<<<<<<<<<<<>>>>>>>>>>>>>
async function listIngredients() {
  $("#Search").addClass("d-none");
  $("#datarow").removeClass("d-none");
  $("#innerLoader").hide();
  $("#SearchResultBox").addClass("d-none");
  $("#loader").fadeIn();
  $("body").css("overflow", "hidden");
  $("#fake").removeClass("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let data = await response.json();
  console.log(data);
  displayIngredientsList(data.meals);
  $("#loader").fadeOut(300, function () {
    $("body").css("overflow", "auto");
  });
}
// &===========================================|Display All Ingredients|====================================
function displayIngredientsList(ing) {
  let data1;
  let cartona = ``;
  for (let i = 0; i < ing.length; i++) {
    data1 = ing[i].strDescription;
    if (data1) {
      data1 = ing[i].strDescription.split(" ").slice(0, 20).join(" ");
    } else {
      data1 = "No Description found!";
    }
    cartona += `
    <div class="col-md-3 overflow-hidden">
    <div class="result rounded-2 position-relative overflow-hidden text-center text-white" onclick="getIngredientMeals('${ing[i].strIngredient}')">
    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
    <h3>${ing[i].strIngredient}</h3>
    <p>${data1}</p>    
    </div>
</div>
    `;
  }
  $("#datarow").html(cartona);
}
// &===========================================|Filter Meals BY Ingredient|====================================
async function getIngredientMeals(ing) {
  $("#loader").fadeIn();
  $("body").css("overflow", "hidden");
  // $("#fake").removeClass("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}
    `
  );
  let data = await response.json();
  displaySample(data.meals);
  $("#loader").fadeOut(300, function () {
    $("body").css("overflow", "auto");
  });
}
// !|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ---------------------------------------------------|7 Contact Us|------------------------------------
// !|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// &===========================================|Contact Us Vars|=======================================
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let rePasswordInputTouched = false;
// //^ **********************************|Inputs|*****************************
let nameInput;
let emailInput;
let phoneInput;
let ageInput;
let passwordInput;
let rePasswordInput;
let submitBtn;
// //? **********************************|Alerts|*****************************
let nameAlert;
let emailAlert;
let phoneAlert;
let ageAlert;
let passwordAlert;
let rePasswordAlert;
//~ *************************************|Functions|***********************************************
// &===========================================|Contact Us Display|=======================================
function showContact() {
  $("#Search").addClass("d-none");
  $("#datarow").removeClass("d-none");
  

  datarow.innerHTML = `
<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
<div class="container w-100 text-center">
    <div class="row g-4">
        <div class="col-md-6">
            <input oninput="inputsValidation()" id="nameInput" type="text" class="my-3 form-control" placeholder="Enter Your Name">
            <div id="nameAlert" class="alert alert-danger my-1 text-center d-none">Special characters and numbers not
                allowed</div>
            <input oninput="inputsValidation()" id="emailInput" type="email" class="my-3 form-control" placeholder="Enter Your Email">
            <div id="emailAlert" class="alert alert-danger my-1 text-center d-none">Email not valid *example@yyy.zzz
            </div>
            <input oninput="inputsValidation()" id="passwordInput" type="password" class="my-3 form-control"
                placeholder="Enter Your Password">
            <div id="passwordAlert" class="alert alert-danger my-1 text-center d-none">Enter valid password *Minimum eight
                characters, at
                least one
                letter and one number:*</div>
        </div>
        <div class="col-md-6">
            <input oninput="inputsValidation()" id="phoneInput" type="text" class="my-3 form-control" placeholder="Enter Your Phone">
            <div id="phoneAlert" class="alert alert-danger my-1 text-center d-none">Enter valid Phone Number</div>
            <input oninput="inputsValidation()" id="ageInput" type="number" class="my-3 form-control" placeholder="Enter Your Age">
            <div id="ageAlert" class="alert alert-danger my-1 text-center d-none">Enter valid age</div>
            <input oninput="inputsValidation()" id="rePasswordInput" type="password" class="my-3 form-control" placeholder="RePassword">
            <div id="rePasswordAlert" class="d-none alert alert-danger my-1 text-center">Password doesn't match.</div>
        </div>
    </div>
    <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
</div>
</div>`;
  // //? **********************************|Inputs for Document ID|*****************************
  submitBtn = document.getElementById("submitBtn");
  nameInput = document
    .getElementById("nameInput")
    .addEventListener("focus", () => {
      nameInputTouched = true;
    });
  emailInput = document
    .getElementById("emailInput")
    .addEventListener("focus", () => {
      emailInputTouched = true;
    });
  phoneInput = document
    .getElementById("phoneInput")
    .addEventListener("focus", () => {
      phoneInputTouched = true;
    });
  ageInput = document
    .getElementById("ageInput")
    .addEventListener("focus", () => {
      ageInputTouched = true;
    });
  passwordInput = document
    .getElementById("passwordInput")
    .addEventListener("focus", () => {
      passwordInputTouched = true;
    });
  rePasswordInput = document
    .getElementById("rePasswordInput")
    .addEventListener("focus", () => {
      rePasswordInputTouched = true;
    });
  // //? **********************************|Alerts for Document ID|*****************************
  nameAlert = document.getElementById("nameAlert");
  emailAlert = document.getElementById("emailAlert");
  phoneAlert = document.getElementById("phoneAlert");
  ageAlert = document.getElementById("ageAlert");
  passwordAlert = document.getElementById("passwordAlert");
  rePasswordAlert = document.getElementById("rePasswordAlert");
  // ******************************************************************************************************
  //^ ****************************************|Contact Us Validation|****************************************
  // ******************************************************************************************************
  //? ********************************|inputs|*****************************
  
}
//! *************************************|Validation Functions|***********************************************
function inputsValidation() {
  if (nameInputTouched) {
    nameValidation();
  }
  if (emailInputTouched) {
    emailValidation();
  }
  if (phoneInputTouched) {
    phoneValidation();
  }
  if (ageInputTouched) {
    ageValidation();
  }
  if (passwordInputTouched) {
    passwordValidation();
  }
  if (rePasswordInputTouched) {
    rePasswordValidation();
  }
  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    rePasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
    console.log("done");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}
function nameValidation() {
  var regex = /^[a-zA-Z]+$/;
  if (regex.test(document.getElementById("nameInput").value)) {
    document.getElementById("nameInput").classList.add("is-valid");
    document.getElementById("nameInput").classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
    return true;
  } else if (document.getElementById("nameInput").value.length == 0) {
    document.getElementById("nameInput").classList.remove("is-valid");
    document.getElementById("nameInput").classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
  } else {
    document.getElementById("nameInput").classList.add("is-invalid");
    document.getElementById("nameInput").classList.remove("is-valid");
    nameAlert.classList.remove("d-none");
    return false;
  }
}
function emailValidation() {
  var regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(document.getElementById("emailInput").value)) {
    document.getElementById("emailInput").classList.add("is-valid");
    document.getElementById("emailInput").classList.remove("is-invalid");
    emailAlert.classList.add("d-none");
    return true;
  } else if (document.getElementById("emailInput").value.length == 0) {
    document.getElementById("emailInput").classList.remove("is-valid");
    document.getElementById("emailInput").classList.remove("is-invalid");
    emailAlert.classList.add("d-none");
  } else {
    document.getElementById("emailInput").classList.add("is-invalid");
    document.getElementById("emailInput").classList.remove("is-valid");
    emailAlert.classList.remove("d-none");
    return false;
  }
}
function phoneValidation() {
  var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (regex.test(document.getElementById("phoneInput").value)) {
    document.getElementById("phoneInput").classList.add("is-valid");
    document.getElementById("phoneInput").classList.remove("is-invalid");
    phoneAlert.classList.add("d-none");
    return true;
  } else if (document.getElementById("phoneInput").value.length == 0) {
    document.getElementById("phoneInput").classList.remove("is-valid");
    document.getElementById("phoneInput").classList.remove("is-invalid");
    phoneAlert.classList.add("d-none");
  } else {
    document.getElementById("phoneInput").classList.add("is-invalid");
    document.getElementById("phoneInput").classList.remove("is-valid");
    phoneAlert.classList.remove("d-none");
    return false;
  }
}
function ageValidation() {
  var regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
  if (regex.test(document.getElementById("ageInput").value)) {
    document.getElementById("ageInput").classList.add("is-valid");
    document.getElementById("ageInput").classList.remove("is-invalid");
    ageAlert.classList.add("d-none");
    return true;
  } else if (document.getElementById("ageInput").value.length == 0) {
    document.getElementById("ageInput").classList.remove("is-valid");
    document.getElementById("ageInput").classList.remove("is-invalid");
    ageAlert.classList.add("d-none");
  } else {
    document.getElementById("ageInput").classList.add("is-invalid");
    document.getElementById("ageInput").classList.remove("is-valid");
    ageAlert.classList.remove("d-none");
    return false;
  }
}
function passwordValidation() {
  var regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/gi;
  if (regex.test(document.getElementById("passwordInput").value)) {
    document.getElementById("passwordInput").classList.add("is-valid");
    document.getElementById("passwordInput").classList.remove("is-invalid");
    passwordAlert.classList.add("d-none");
    return true;
  } else if (document.getElementById("passwordInput").value.length == 0) {
    document.getElementById("passwordInput").classList.remove("is-valid");
    document.getElementById("passwordInput").classList.remove("is-invalid");
    passwordAlert.classList.add("d-none");
  } else {
    document.getElementById("passwordInput").classList.add("is-invalid");
    document.getElementById("passwordInput").classList.remove("is-valid");
    passwordAlert.classList.remove("d-none");
    return false;
  }
}
function rePasswordValidation() {
  if (
    document.getElementById("rePasswordInput").value ===
      document.getElementById("passwordInput").value &&
    document.getElementById("rePasswordInput").value.length != 0
  ) {
    document.getElementById("rePasswordInput").classList.add("is-valid");
    document.getElementById("rePasswordInput").classList.remove("is-invalid");
    rePasswordAlert.classList.add("d-none");
    return true;
  } else if (document.getElementById("rePasswordInput").value.length == 0) {
    document.getElementById("rePasswordInput").classList.remove("is-valid");
    document.getElementById("rePasswordInput").classList.remove("is-invalid");
    rePasswordAlert.classList.add("d-none");
  } else {
    document.getElementById("rePasswordInput").classList.add("is-invalid");
    document.getElementById("rePasswordInput").classList.remove("is-valid");
    rePasswordAlert.classList.remove("d-none");
    return false;
  }
}
// !|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// &===========================================|Displaying Meal Info|====================================
// !|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// *<<<<<<<<<<<<<>>>>>>>>>>>>>|Fetching Meal Info|<<<<<<<<<<<<<>>>>>>>>>>>>>
async function getMealInfo(data) {
  $("#Search").addClass("d-none");
  $("#datarow").removeClass("d-none");
  $("#innerLoader").hide();
  $("#SearchResultBox").addClass("d-none");
  $("#loader").fadeIn();
  $("body").css("overflow", "hidden");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data}`
  );
  response = await response.json();
  displayMealInfo(response.meals[0]);
  $("#loader").fadeOut(300, function () {
    $("body").css("overflow", "auto");
  });
}
// *<<<<<<<<<<<<<>>>>>>>>>>>>>|Displaying Meal Info|<<<<<<<<<<<<<>>>>>>>>>>>>>
function displayMealInfo(data) {
  $(".back").removeClass("d-none");
  let Recipes = ``;
  for (let i = 1; i <= 20; i++) {
    if (data[`strIngredient${i}`]) {
      Recipes += `<li class="alert alert-info m-2 p-1">${
        data[`strMeasure${i}`]
      } ${data[`strIngredient${i}`]}</li>`;
    }
  }
  let tags = [];
  if (data.strTags) {
    tags = data.strTags.split(",");
  }
  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
      <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }
  let cartona = ``;
  cartona += `
    <div class="col-md-4">
    <div class="rounded-3 overflow-hidden">
        <img src=${data.strMealThumb} class="w-100 rounded-3" alt="">
        <div class="title mt-2 fs-2 text-white">
        ${data.strMeal}
        </div>
    </div>
</div>
<div class="col-md-8">
    <div class="instructions">
        <h3 class="text-white fs-2">Instructions</h3>
        <p class="text-white">${data.strInstructions}</p>
        <h4 class="fs-3 text-white">Area : ${data.strArea}</h4>
        <h4 class="fs-3 text-white">Category : ${data.strCategory}</h4>
        <h4 class="fs-3 text-white">Recipes :</h4>
        <ul class="list-unstyled d-flex flex-wrap">
            ${Recipes}
        </ul>
        <h4 class="fs-3 text-white">Tags :</h4>
        <ul class="list-unstyled d-flex flex-wrap g-3">${tagsStr}</ul>
        <div class="btns d-flex">
        <a target="_blank" href=${data.strSource} class="btn btn-success me-2">Source</a>
        <a target="_blank" href=${data.strYoutube} class="btn btn-danger">Youtube</a>
        </div>
    </div>
</div>
    `;
  $("#datarow").html(cartona);
}
$(".back").on("click", function () {
  $("#back").addClass("d-none");
  console.log("ok");
  getSample();
});