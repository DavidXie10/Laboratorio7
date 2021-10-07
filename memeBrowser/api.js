const MEME_WORDS_INPUT = "search"
const MEME_DATA_PLACE = "data"
const BASE_URL = 'https://api.imgflip.com/get_memes'

class Meme{
    constructor(id, name, url){
        this.id = id;
        this.name = name;
        this.url = url;
    }
}

async function main(){
    document.getElementById(MEME_WORDS_INPUT).addEventListener("keyup", search);

    const memesData = await getAllMemes()

    if(memesData !== null){
        data = createMemes(memesData.data.memes)
        names = getMemesNames(data)
        localStorage.setItem("names", JSON.stringify(names));
        fillAutocomplete(names)
        displayData(data)
    }
}

async function getAllMemes (){
    let memesData = null
    
    try {
        const response = await fetch(BASE_URL)
        memesData = await response.json()
    } catch (error) {
        console.log(`Algo ha fallado: ${error.message}`)
    }

    return memesData;
}

function createMemes(memesData){
    parsedData = []

    memesData.forEach((post) => {
        parsedData.push(new Meme(post.id, post.name, post.url));
    });
    
    return parsedData;
}

function getMemesNames(data){
    names = []

    data.forEach((meme) => {
        names.push(meme.name);
    });

    return names;
}

function fillAutocomplete(names){
    $(document).ready(function() {
        $("#" + MEME_WORDS_INPUT).autocomplete({
            source: names
        });
    });
}

function search(){
    let text = document.getElementById(MEME_WORDS_INPUT).value;
    data.forEach((post) => {
        if (text == "")
            hide(post.id)
        else if (match(post.name, text))
            show(post.id)
        else
            hide(post.id)
    });
}

function displayData(data){
    let display = "";

    data.forEach((post) => {
        display += `
        <ul class = "${post.id}" style="display: none">
        <li><strong>Meme name:</strong> ${post.name} </li> <br/>
        <img src = "${post.url}" class = "${post.id}" style="display: none"></img>
        </ul>
        `;
    });

    document.getElementById(MEME_DATA_PLACE).innerHTML = display;
}

function match(word, substring){
    console.log(word, substring);
    console.log(word.includes(substring));
    return word.includes(substring);
}

function hide(elementId){
    Array.from(document.getElementsByClassName(elementId)).forEach((element) => {
        element.style.display = "none";
    });
}

function show(elementId){
    Array.from(document.getElementsByClassName(elementId)).forEach((element) => {
        element.style.display = "block";
    });
}

main()