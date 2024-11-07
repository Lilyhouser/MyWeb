class MyGraph {
    constructor() {
        this.dramas = [];
    }
    addVertex(drama) {
        if(this.dramas.includes(drama)){
            return;
        }
        this.dramas.push(drama);
    }

    display(){
        for(let i in dramas){
            console.log(dramas[i])
        }
    }

    
    searchDrama(title){
        console.log(title);
        for (let i in this.dramas){
            if(this.dramas[i].title===title){
                return this.dramas[i];
            }
        }
    }

    addDrama(drama) {
        if(this.dramas.includes(drama)){
            return;
        }
        drama.addNeighbor(myGraph.dramas);
        drama.display();
        this.addVertex(drama); 
    
        let dramaContainer = document.querySelector('.drama-container');
        dramaContainer.innerHTML += `
            <div onclick="findDrama('${drama.title}')" class="drama" style="background-image: url(${drama.image});">
                <div class="drama-title">
                    <h3>Title: ${drama.title}</h3>
                    <p>Year: ${drama.year}</p>
                    <p>Genre: ${drama.type}</p>
                    <p>Rate: ${drama.rating}</p>
                    <p>Acting: ${drama.actor}</p>
                    <p>Types: ${drama.printCharacs()}</p>
                </div>
            </div>
        `;
    }
}

class Drama {
    constructor(title, year, type, rating, actor, image) {
        this.title = title;
        this.year = year;
        this.type = type;
        this.rating = rating;
        this.actor = actor;
        this.characs = [];
        this.neighbors = new Map();
        this.image = image;
    }

    addCharacs(array){
        for(let i in array){
            this.characs.push(array[i]);
        }
    }

    printCharacs(){
        return this.characs.join(', ');
    }

    display(){
        console.log(this.title, this.year, this.type, this.rating, this.actor);
        console.log(this.printCharacs());
        console.log(this.neighbors)
        console.log(this.image);
    }

    addNeighbor(dramas){
        for(let i in dramas){
            let count = 0;
            for(let c in dramas[i].characs){
                if(this.characs.includes(dramas[i].characs[c])){
                    count++;
                }
            }
            if(count > 0){
                this.neighbors.set(dramas[i], count);
                dramas[i].neighbors.set(this, count);
            }
        }
    }

    addNeighborForSearching(dramas){
        for(let i in dramas){
            let count = 0;
            for(let c in dramas[i].characs){
                if(this.characs.includes(dramas[i].characs[c])){
                    count++;
                }
            }
            if(count > 0){
                this.neighbors.set(dramas[i], count);
            }
        }
    }

    recommend(){
        const newMap = Array.from(this.neighbors).sort((a, b) => - (a[1] - b[1]));
        const sortedMap = new Map(newMap);
        console.log(sortedMap);  
        return sortedMap;      
    }
}


let myGraph = new MyGraph();

function showForm() {
    let inputForm = document.querySelector('.form_input');
    inputForm.style.display = 'flex';
    
    document.querySelector('.form_input').innerHTML += `
    <form class="form_input-container">
            <h2>Add New Drama</h2>
            <div class="form_input-line">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" required placeholder="Title of Drama">
            </div>
            <div class="form_input-line">
                <label for="year">Year</label>
                <input type="number" name="year" id="year" required placeholder="Year">
            </div>
            <div class="form_input-line">
                <label for="genre">Genre</label>
                <input type="text" name="genre" id="genre" required placeholder="Genre">
            </div>
            <div class="form_input-line">
                <label for="rating">Rating</label>
                <input type="text" name="rating" id="rating" required placeholder="Rating">
            </div>
            <div class="form_input-line">
                <label for="actor">Main actor/actress</label>
                <input type="text" name="actor" id="actor" required placeholder="Acting">
            </div>
            <div class="form_input-line">
                <label for="image">Image (link):</label>
                <input type="text" name="image" id="image" required placeholder="Image link">
            </div>
            <div class="sub_form">
                 <label for="romantic"><input class="check_box" type="checkbox" value="romantic">Romantic</label>
                 <label for="action"><input class="check_box" type="checkbox" value="action">Action</label>
                 <label for="science"><input class="check_box" type="checkbox" value="science">Science</label>
                 <label for="anime"><input class="check_box" type="checkbox" value="anime">Anime</label>
                 <label for="psychology"><input class="check_box" type="checkbox" value="psychology">Psychology</label>
                 <label for="criminal"><input class="check_box" type="checkbox" value="criminal">Criminal</label>
                 <label for="cartoon"><input class="check_box" type="checkbox" value="cartoon">Cartoon</label>
                 <label for="school"><input class="check_box" type="checkbox" value="school">School</label>
                 <label for="fantastic"><input class="check_box" type="checkbox" value="fantastic">Fantastic</label>
                 <label for="adventure"><input class="check_box" type="checkbox" value="adventure">Adventure</label>
                 <label for="famlily"><input class="check_box" type="checkbox" value="famlily">Family</label>
                 <label for="horor"><input class="check_box" type="checkbox" value="horor">Horor</label>
            </div>
            <div onclick="addDrama()" class="web-button">Add Drama</div>
            <div onclick="close1()" class="web-button">Close</div>
        </form>
    `
}

function showForm2() {
    let inputForm = document.querySelector('.form_input');
    inputForm.style.display = 'flex';
    document.querySelector('.form_input').innerHTML+=
    `
    <form class="form_input-container">
            <h2>Find Drama</h2>
            <div class="sub_form">
                 <label for="romantic"><input class="check_box" type="checkbox" value="romantic">Romantic</label>
                 <label for="action"><input class="check_box" type="checkbox" value="action">Action</label>
                 <label for="science"><input class="check_box" type="checkbox" value="science">Science</label>
                 <label for="anime"><input class="check_box" type="checkbox" value="anime">Anime</label>
                 <label for="psychology"><input class="check_box" type="checkbox" value="psychology">Psychology</label>
                 <label for="criminal"><input class="check_box" type="checkbox" value="criminal">Criminal</label>
                 <label for="cartoon"><input class="check_box" type="checkbox" value="cartoon">Cartoon</label>
                 <label for="school"><input class="check_box" type="checkbox" value="school">School</label>
                 <label for="fantastic"><input class="check_box" type="checkbox" value="fantastic">Fantastic</label>
                 <label for="adventure"><input class="check_box" type="checkbox" value="adventure">Adventure</label>
                 <label for="famlily"><input class="check_box" type="checkbox" value="famlily">Family</label>
                 <label for="school"><input class="check_box" type="checkbox" value="school">School</label>
            </div>
            <div onclick="findDramaByButton()" class="web-button">Find Drama</div>
            <div onclick="close1()" class="web-button">Close</div>
        </form>
    `;
}

function findDrama(title){
    let findingDrama = myGraph.searchDrama(title);
    setFindingDrama(findingDrama);
    let map = findingDrama.recommend();
    console.log(map);
    setResults(map);
}

function setFindingDrama(drama){
    let findDrama = document.querySelector('.search-drama_searching');
    findDrama.innerHTML = `
        <div class="search-drama_searching-img" style="background-image: url(${drama.image});"></div>
        <div class="search-drama_searching-infor">
            <h3>Title: ${drama.title}</h3>
            <p>Year: ${drama.year}</p>
            <p>Genre: ${drama.type}</p>
            <p>Rate: ${drama.rating}</p>
            <p>Acting: ${drama.actor}</p>
            <p>Typing: ${drama.printCharacs()}</p>
        </div>
    `
}

function setResults(sortedMap){
    let results = document.querySelector('.search-drama_result');
    results.innerHTML = "";
    for(var [key, value] of sortedMap){
        console.log(key);
        results.innerHTML += `
            <div onclick="findDrama('${key.title}')" class="search-drama_result-item">
                <div class="search-drama_result-item-img" style="background-image: url('${key.image}');"></div>
                <div class="search-drama_result-item-infor">
                    <h3>Title: ${key.title}</h3>
                    <p>Rate: ${key.rating}</p>
                    <p>Acting: ${key.actor}</p>
                    <p>Typing: ${key.printCharacs()}</p>
                </div>
            </div>
        `;
    }
}

function addDrama() {
    
    const s = document.querySelectorAll('.form_input-line input');
    const title = s[0].value;
    const year = s[1].value;
    const type = s[2].value;
    const rating = s[3].value;
    const actor = s[4].value;
    const image = s[5].value;
    const drama = new Drama(title, year, type, rating, actor, image);

    let characs = document.getElementsByClassName('check_box');
    for(let i in characs){
        if(characs[i].checked){
            drama.characs.push(characs[i].value);
        }
    }
    
    drama.addNeighbor(myGraph.dramas);
    drama.display();
    myGraph.addVertex(drama); 

    let dramaContainer = document.querySelector('.drama-container');
    dramaContainer.innerHTML += `
        <div onclick="findDrama('${title}')" class="drama" style="background-image: url(${image});">
            <div class="drama-title">
                <h3>Title: ${title}</h3>
                <p>Year: ${year}</p>
                <p>Genre: ${type}</p>
                <p>Rate: ${rating}</p>
                <p>Acting: ${actor}</p>
                <p>Types: ${drama.printCharacs()}</p>
            </div>
        </div>
    `

    document.querySelector('.form_input').style.display = 'none';
    document.querySelector('.form_input-container').remove();
}


function findDramaByButton() {
    
    const drama = new Drama('title', 'year', 'type', 'rating', 'actor', 'image');

    let characs = document.getElementsByClassName('check_box');
    for(let i in characs){
        if(characs[i].checked){
            drama.characs.push(characs[i].value);
        }
    }
    
    drama.addNeighborForSearching(myGraph.dramas);
    // drama.display();

    let findDrama = document.querySelector('.search-drama_searching');
    findDrama.innerHTML = `
        <div class="search-drama_searching-img" style="background-image: url(../img/OIP.jpg);"></div>
        <div class="search-drama_searching-infor">
            <h3>You are searching for </h3>
            <p>Typing: ${drama.printCharacs()}</p>
        </div>
    `

    setResults(drama.recommend());
    document.querySelector('.form_input').style.display = 'none';
    document.querySelector('.form_input-container').remove();
}


function close1(){
    document.querySelector('.form_input').style.display = 'none';
    document.querySelector('.form_input-container').remove();
}

