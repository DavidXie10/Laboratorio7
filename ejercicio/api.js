
const COUNTRY_NAME_INPUT = "search"
const UNIVERSITY_DATA_PLACE = 'data'
const BASE_URL = 'http://universities.hipolabs.com/search'

async function main(){
    document.getElementById(COUNTRY_NAME_INPUT).addEventListener("keyup", search);

    const universitiesData = await getAllUniversitiesByCountry("United States")

    if(universitiesData !== null){
        data = parseDataFromJson(universitiesData)
        displayData(data)
    }
}

async function getAllUniversitiesByCountry (countryName){
    let universitiesData = null
    const universityURL = `${BASE_URL}?country=${countryName}`
    
    try {
        const response = await fetch(universityURL)
        universitiesData = await response.json()
    } catch (error) {
        console.log(`Algo ha fallado: ${error.message}`)
    }

    return universitiesData;
}

function parseDataFromJson(universitiesData){
    parsedData = []
    
    for(let index = 0; index < universitiesData.length; ++index){
        let actualUniversitie = universitiesData[index]
        parsedData.push({ 
            "id": index,
            "name": actualUniversitie.name,
            "country": actualUniversitie.country,
            "alphaCode": actualUniversitie.alpha_two_code,
            "mainWebPage": actualUniversitie.web_pages[0]
        });
    }
    
    return parsedData
}

function displayData(data){
    let display = "";

    data.forEach((post) => {
        display += `
        <ul id = "${post.id}">
        <li><strong>University name:</strong> ${post.name} </li>
        <li><strong>Country:</strong> ${post.country} </li>
        <li><strong>Alpha two code: </strong>${post.alphaCode}</li>
        <li><strong>Main web page: </strong><a href="${post.mainWebPage}">${post.mainWebPage}</a></li>
        </ul>
        `;
    });

    document.getElementById(UNIVERSITY_DATA_PLACE).innerHTML = display;
}

function search(){
    let text = document.getElementById(COUNTRY_NAME_INPUT).value;
    data.forEach((post) => {
        if (match(post.name, text) || text == "")
            show(post.id)
        else
            hide(post.id)
    });
}

function match(word, substring){
    console.log(word, substring);
    console.log(word.includes(substring));
    return word.includes(substring);
}

function hide(elementId){
    document.getElementById(elementId).style.display = "none";
}

function show(elementId){
    document.getElementById(elementId).style.display = "block";
}

main()