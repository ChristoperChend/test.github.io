const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const categoryDropdown = document.getElementById("category-dropdown");
const calendarPopup = document.getElementById("calendar-popup");
const categoryButton = document.getElementById("category-button");
const clockPopup = document.getElementById("clock-popup");
const selectedButton = document.querySelector(".select-btn");
const items = document.querySelectorAll(".items");
const getCheck = document.getElementsByClassName("check-input");

selectedButton.addEventListener("click", () => {
    selectedButton.classList.toggle("open");
})

items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
    })
})

function addTask() {

    let taskName = inputBox.value;
    if (taskName.value === "") {
        alert("You must write something!");
        return;
    }
    var categories = [];

    for (let i = 0; i < getCheck.length; i++) {
        if (getCheck[i].checked) {
            categories.push(getCheck[i].nextElementSibling.innerText);
        }
    }

    if (categories.length === 0) {
        alert("Please select a category for the task");
        return;
    }

    let clock = clockPopup.value;
    let date = calendarPopup.value;
    if (clock === "" || date === "") {
        alert("Please select the date and time");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `<h2 class="label">Category</h2> ${categories.join(", ")}
                            <br><h2 class="label">Title</h2> ${taskName}
                            <br><h2 class="label">Deadline</h2> ${date}, ${clock}
                            <br>`;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    inputBox.value = "";
    getCheck.value = "";
    calendarPopup.value = "";
    clockPopup.value = "";
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
}, false);

function addNewCategory() {
    var newCategoryInput = document.getElementById("newcategory-dropdown");
    var newCategoryName = newCategoryInput.value.trim();

    if (newCategoryName !== "") {
        if (!categoryExists(newCategoryName)) {
            var categoryList = document.querySelector(".list-category");
            var newItem = document.createElement("li");
            newItem.className = "items";

            const newIcon = document.createElement("i");
            newIcon.className = "fa-solid fa-xmark";
            newIcon.style.color = "rgb(200, 200, 200)";

            const newSpan = document.createElement("span");
            newSpan.appendChild(newIcon);

            newItem.innerHTML = `
                <input type="checkbox" class="check-input">
                <label class="category-text">${newCategoryName}</label>
                <button class="delete-category">
                    <span>${newSpan.outerHTML}</span>
                </button> 
            `;

            categoryList.appendChild(newItem);

            var deleteCategoryButton = newItem.querySelector('.delete-category');
            deleteCategoryButton.addEventListener('click', function () {
                categoryList.removeChild(newItem);
            });

            updateFilterCheckboxes(newCategoryName);

            newCategoryInput.value = "";
            newCategoryInput.focus();
        } else {
            alert("Category already exists!");
        }
    }
}

function categoryExists(categoryName) {
    var categoryList = document.querySelectorAll(".list-category .items");
    for (var i = 0; i < categoryList.length; i++) {
        if (categoryList[i].innerText.trim() === categoryName) {
            return true;
        }
    }
    return false;
}

function updateFilterCheckboxes(newCategoryName) {
    var filterCheckboxesContainer = document.querySelector('.filter-checkboxes');

    var label = document.createElement('label');
    label.innerHTML = `
        <input type="checkbox" class="filter-checkbox" value="${newCategoryName}"> ${newCategoryName}
    `;

    filterCheckboxesContainer.appendChild(label);
}

function filterTasks() {
    var selectedCategories = getSelectedCategories();
    var tasks = document.querySelectorAll('#list-container li');

    tasks.forEach(task => {
        var taskCategories = task.querySelector('.label').nextSibling.textContent.split(',').map(category => category.trim());

        if (selectedCategories.length === 0 || hasAnyCommonElement(selectedCategories, taskCategories)) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

function getSelectedCategories() {
    var checkboxes = document.querySelectorAll('.filter-checkbox:checked');
    var selectedCategories = [];

    checkboxes.forEach(checkbox => {
        selectedCategories.push(checkbox.value);
    });

    return selectedCategories;
}

function hasAnyCommonElement(arr1, arr2) {
    return arr1.some(element => arr2.includes(element));
}