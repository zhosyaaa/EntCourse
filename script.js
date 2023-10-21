var jsonData = [
    {
        "category": "ҰБТ",
        "title": "Биология-Химия",
        "date": "Қаңтар 15, 2024",
        "image": "https://d19m59y37dris4.cloudfront.net/directory/2-0-2/img/photo/photo-1512917774080-9991f1c4c750.jpg",
        "description": "Болашақ медицина мамандарына арналған курс."
    },
    {
        "category": "ҰБТ",
        "title": "Информатика-Математика",
        "date": "Қаңтар 15, 2024",
        "image": "https://d19m59y37dris4.cloudfront.net/directory/2-0-2/img/photo/photo-1522771739844-6a9f6d5f14af.jpg",
        "description": "Болашақ IT мамандарына арналған курс."
    },
    {
        "category": "ҰБТ",
        "title": "Математика-Физика",
        "date": "Қаңтар 15, 2024",
        "image": "https://d19m59y37dris4.cloudfront.net/directory/2-0-2/img/photo/photo-1482463084673-98272196658a.jpg",
        "description": "Болашақ техникалық мамандарына арналған курс."
    },
    {
        "category": "ҰБТ",
        "title": "Математика-География",
        "date": "Қаңтар 15, 2024",
        "image": "https://d19m59y37dris4.cloudfront.net/directory/2-0-2/img/photo/photo-1522771739844-6a9f6d5f14af.jpg",
        "description": "Болашақ бизнес мамандарына арналған курс."
    },
    {
        "category": "НИШ",
        "title": "Логика",
        "date": "Қаңтар 15, 2024",
        "image": "https://d19m59y37dris4.cloudfront.net/directory/2-0-2/img/photo/photo-1522771739844-6a9f6d5f14af.jpg",
        "description": "Болашақ НИШ оқушыларына арналған курс."
    },
];

function createBlogCard(data) {
    var cardHtml = `
        <div class="col-lg-4 col-sm-6 mb-4 hover-animate">
            <div class="card shadow border-0 h-100">
                <a href="post.html"><img class="img-fluid card-img-top" src="${data.image}" alt="${data.title}"></a>
                <div class="card-body">
                    <a class="text-uppercase text-muted text-sm letter-spacing-2" href="#">${data.category}</a>
                    <h5 class="my-2"><a class="text-dark" href="post.html">${data.title}</a></h5>
                    <p class="text-gray-500 text-sm my-3"><i class="far fa-clock me-2"></i>${data.date}</p>
                    <p class="my-2 text-muted text-sm">${data.description}</p>
                    <a class="btn btn-link ps-0" href="post.html">Толығырақ<i class="fa fa-long-arrow-alt-right ms-2"></i></a>
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
