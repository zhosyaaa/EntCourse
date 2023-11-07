var jsonData = [
    {
        "category": "ҰБТ",
        "title": "Биология-Химия",
        "date": "Қаңтар 15, 2024",
        "image": "img/download.jpg",
        "description": "Болашақ медицина мамандарына арналған курс.",
        "price": 4900
    },
    {
        "category": "ҰБТ",
        "title": "Информатика-Математика",
        "date": "Қаңтар 15, 2024",
        "image": "img/download.jpg",
        "description": "Болашақ IT мамандарына арналған курс.",
        "price": 3000
    },
    {
        "category": "ҰБТ",
        "title": "Математика-Физика",
        "date": "Қаңтар 15, 2024",
        "image": "img/download.jpg",
        "description": "Болашақ техникалық мамандарына арналған курс.",
        "price": 8000
    },
    {
        "category": "ҰБТ",
        "title": "Математика-География",
        "date": "Қаңтар 15, 2024",
        "image": "img/download.jpg",
        "description": "Болашақ бизнес саласының мамандарына арналған курс.",
        "price": 10000
    },
    {
        "category": "ҰБТ",
        "title": "Математика-Физика",
        "date": "Қаңтар 15, 2024",
        "image": "img/download.jpg",
        "description": "Болашақ техникалық мамандарына арналған курс.",
        "price": 5000
    },
    {
        "category": "НИШ",
        "title": "Логика",
        "date": "Қаңтар 15, 2024",
        "image": "img/download.jpg",
        "description": "НИШ мектебіне түскісі келтіндерге.",
        "price": 9900
    }
];

var shoppingBasket = [];

function createBlogCard(data) {
    var cardHtml = `
        <div class="col-lg-4 col-sm-6 mb-4 hover-animate">
            <div class="card shadow border-0 h-100">
            <img class="img-fluid card-img-top" src="${data.image}" alt="${data.title}" onclick="openModal('${data.image}')">
            <div class="card-body">
                    <a class="text-uppercase text-muted text-sm letter-spacing-2" href="#">${data.category}</a>
                    <h5 class="my-2"><a class="text-dark" href="post.html">${data.title}</a></h5>
                    <p class="text-gray-500 text-sm my-3"><i class="far fa-clock me-2"></i>${data.date}</p>
                    <p class="my-2 text-muted text-sm">${data.description}</p>
                    <p class="my-2 text-muted text-sm">${data.price} теңге</p>
                    <button class="btn btn-primary buy-course" onclick="purchaseCourse('${data.title}', ${data.price})" data-course-title="${data.title}">Сатып алу</button>
                    </div>
            </div>
        </div>
    `;

    return cardHtml;
}

function addBlogCardsToPage(data) {
    var container = document.getElementById("blogContainer");
    var row = container.querySelector(".row");
    data.forEach(function(blogItem) {
        var cardHtml = createBlogCard(blogItem);
        row.innerHTML += cardHtml;
    });
}

addBlogCardsToPage(jsonData);

var cart = []; 

function purchaseCourse(courseName, price) {
    if (cart.includes(courseName)) {
        alert('Бұл курс сіздің себетіңізде бар.');
        return;
    }
    cart.push(courseName);
    const newItem = document.createElement("tr");
    newItem.innerHTML = `
        <th>${courseName}</th>
        <th>${price}</th>
        <th>
            <button class="btn btn-danger" onclick="deleteCourse('${courseName}')">Жою</button>
        </th>
    `;
    var cartElement = document.getElementById('cartItems');
    cartElement.appendChild(newItem);
    calculateTotalPrice();
}

function deleteCourse(courseName){
    const index = cart.indexOf(courseName);
    if (index !== -1) {
        cart.splice(index, 1);
        const cartElement = document.getElementById('cartItems');
    const cartItems = cartElement.getElementsByTagName('tr');
    
    for (let i = 0; i < cartItems.length; i++) {
        const itemName = cartItems[i].getElementsByTagName('th')[0].textContent;
        console.log(itemName)
        if (itemName === courseName) {
            cart.splice(i, 1);
            cartElement.removeChild(cartItems[i]);
            break;
        }
    }
    }
    

    calculateTotalPrice();
}
function calculateTotalPrice() {
    let cartElement = document.getElementById('cartItems');
    let totalPrice = 0;
  
    for (let courseElement of cartElement.querySelectorAll('tr')) {
        let priceText = courseElement.querySelector('th:nth-child(2)').textContent;
        let price = parseFloat(priceText);
        if (!isNaN(price) && price > 0) {
            totalPrice += price;
        }
    }
  
    totalPrice = totalPrice.toFixed(2);
    let totalText = 'Жалпы төлем: ' + totalPrice + ' теңге';
    document.getElementById('cartTotal').textContent = totalText;
  }

function checkout() {
    if (cart.length === 0) {
        alert('Сіздің себетіңіз бос. Төлемге кіріспес бұрын ыдыс-аяқ қосыңыз.');
        return;
    }
    window.location.href = 'https://kaspi.kz';
}
updateBlogCards();


// 
function openModal(imageSrc) {
    var modal = document.getElementById("imageModal");
    var modalImage = document.getElementById("modalImage");
    modalImage.style.maxWidth = "70%";
    modalImage.style.maxHeight = "70vh";  
    
    modal.style.display = "block";
    modalImage.src = imageSrc;
}

function closeModal() {
    var modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

// 
// Create a variable to hold the filtered courses
var filteredData = jsonData.slice(); // Copy the original data

document.getElementById("applyFilterButton").addEventListener("click", applyFilter);

function applyFilter() {
    const categoryFilter = document.getElementById("categoryFilter").value;
    const priceFilter = document.getElementById("priceFilter").value;

    filteredData = jsonData.filter(course => {
        if (categoryFilter !== "" && course.category !== categoryFilter) {
            return false;
        }

        if (priceFilter !== "") {
            const [minPrice, maxPrice] = priceFilter.split("-").map(Number);
            if (course.price < minPrice || course.price > maxPrice) {
                return false;
            }
        }

        return true;
    });

    var container = document.getElementById("blogContainer");
    var row = container.querySelector(".row");
    row.innerHTML = ""
    addBlogCardsToPage(filteredData);
}

// Initially, display all cards without any filter
addBlogCardsToPage(filteredData);
