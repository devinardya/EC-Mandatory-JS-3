// =================
// GLOBAL VARIABLES 

let submitBtn = document.querySelector(".submitBtn");
let startPage = document.querySelector("#startpage");
let loading = document.querySelector("#loading");

let currentPage;
let currentSubBreedPage;
let userInput;
let dataInfo;
let coverImages = 5;
let breedPage = false;
let subBreedFound = true;
let result;
let listData;

let urlImg = "https://dog.ceo/api/breeds/image/random/" + coverImages;
let urlList = "https://dog.ceo/api/breeds/list/all";
let customUrl;


// =================
// API functions
// function to grab the data from Dog API
function getData(url) {
    return axios.get(url)
        .then(function (response) {
            dataInfo = response.data.message;
            console.log(dataInfo);
            return (dataInfo);
        })
}

// callback to get the functions works in order
function frontPage() {
    startPage.style.display = "flex";
    getData(urlImg)
        .then(renderImage)
        .then(() => {
            getData(urlList)
        
                //.then(renderInfo)
                .then(data => renderInfo(data));
                
        })
        .catch(() =>{
            let alert = document.querySelector("#alert");
            alert.style.display = "block";
            
        })

   
}

// =================
// DOM elements

// creating different elements for the HTML
// == REFRESH BUTTON

function createRefreshButton() {

    let refreshBtn = document.createElement("button");
    refreshBtn.className = "refreshPage";
    let btnSpan = document.createElement("span");
    let iRefresh = document.createElement("i");
    iRefresh.className = "material-icons refresh";
    iRefresh.textContent = "refresh";
    refreshBtn.appendChild(iRefresh);
    refreshBtn.appendChild(btnSpan);
    btnSpan.textContent = "REFRESH";

    return refreshBtn;
}

//== BACK BUTTON
function createBackButton() {
    let backBtn = document.createElement("button");
    backBtn.className = "backBtn";
    let btnSpan = document.createElement("span");
    let iBack = document.createElement("i");
    iBack.className = "material-icons back";
    iBack.textContent = "arrow_back";
    backBtn.appendChild(iBack);
    backBtn.appendChild(btnSpan);
    btnSpan.textContent = "BACK";

    return backBtn;
}

// == SUBMIT BUTTON
function createSubmitButton() {
    let subButton = document.createElement("button");
    subButton.className = "submitBtn";
    subButton.textContent = "SUBMIT";
    let subIcon = document.createElement("i");
    subIcon.className = "material-icons submit";
    subIcon.textContent = "chevron_right";
    subButton.appendChild(subIcon);

    return subButton;
}

// == DIV CLASS IMAGES
function createImagesDiv() {
    let imageDiv = document.createElement("div");
    imageDiv.className = "images";

    return imageDiv;
}

// == DIV CLASS IMAGE
function createSingleImageDiv(imageSource) {
    let singleImageDiv = document.createElement("div");
    let eachImg = document.createElement("img");
    singleImageDiv.className = "image";
    eachImg.src = imageSource;
    singleImageDiv.appendChild(eachImg);

    return singleImageDiv;
}

// DIV CLASS LISTS
function createListDiv(h2Label) {
    let textDiv = document.createElement("div");
    textDiv.className = "lists";
    let h2 = document.createElement("h2");
    h2.textContent = h2Label;
    textDiv.appendChild(h2);

    return textDiv;
}

// SELECT BAR
function createSelectBar(selectID, data, subBreedFound) {

    let select = document.createElement("select");
    select.id = selectID;

    if (subBreedFound === false) {
        for (let eachData in data) {
            select.innerHTML += '<option value="' + eachData + '">' + eachData + '</option>';
        }
    }

    if (subBreedFound === true) {
        console.log(data)
        for (let k = 0; k < data.length; k++) {
            select.innerHTML += '<option value="' + data[k] + '">' + data[k] + '</option>';
        }
    }

    return select;

}

// =================
// RENDERING DATA

// rendering front page's images
function renderImage(data) {

    let images = createImagesDiv();
    startPage.appendChild(images);

    for (let i = 0; i < coverImages; i++) {
        let singleImageDiv = createSingleImageDiv(data[i]);
        images.appendChild(singleImageDiv);
    }

}

// rendering front page's text
function renderInfo(datas) {
    console.log(datas);

    let lists = createListDiv("Select a breed!");
    startPage.appendChild(lists);

    let select = createSelectBar("select", datas, false);
    lists.appendChild(select);

    let submitBtn = createSubmitButton();
    lists.appendChild(submitBtn);
    submitBtn.addEventListener("click", mySubmitBtn);

    let refreshBtn = createRefreshButton();
    lists.appendChild(refreshBtn);
    refreshBtn.addEventListener("click", refreshPage);

}

// function to keep track on the order of function to do after the submit button is clicked
function mySubmitBtn() {
    chooseBreed();
    customDogPage();
    reloadPageWithHash();
}

// function for getting the Selector value
// of both breed and sub-breed selection
function chooseBreed() {

    // first selection, do the breed list
    if (breedPage === false) {
        let select = document.querySelector('#select');
        currentPage = select.value;
        console.log(currentPage);
    }

    // second selection, do the sub-breed list
    if (breedPage === true) {
        let subSelect = document.querySelector("#select-subbreed");
        currentSubBreedPage = subSelect.value;
        console.log(currentSubBreedPage);
    }
}

// function for getting the Selector value
// of both breed and sub-breed selection

function waitLoading(page){
    return new Promise((resolve, reject) =>{
        resolve(
          setTimeout(() => {
           // console.log(data);
              loading.style.display = "none";
              renderImages(result, page);
              renderLists(listData, page);
             
          }, 750)
        )
      })
}

function customDogPage() {

    if (breedPage === false) {
        customUrl = "https://dog.ceo/api/breed/" + currentPage + "/images/random/3";
        getData(customUrl)
            .then((value) =>{
                //console.log(value);
                result = value;
                startPage.style.display = "none";
                loading.style.display = "block";
                document.querySelector("#subbreed-page").style.display = "none";
            })
            .then(() => {
                customUrl = "https://dog.ceo/api/breed/" + currentPage + "/list";
                getData(customUrl)
                   // .then(data => waitLoading(data, "#breed-page"));
                   .then((data) =>{
                       listData = data;
                   })
                   .then(() =>{
                       waitLoading("#breed-page")
                   })
            })
            .catch(() =>{
                let alert = document.querySelector("#alert");
                alert.style.display = "block";
                
            })
            
    }
    if (breedPage === true) {

        customUrl = "https://dog.ceo/api/breed/" + currentPage + "/" + currentSubBreedPage + "/images/random/3";
        getData(customUrl)
            //.then(renderSubBreedPage);

            .then((value) =>{
                //console.log(value);
                result = value;
                startPage.style.display = "none";
                document.querySelector("#breed-page").style.display = "none";
                document.querySelector("#subbreed-page").style.display = "none";
                loading.style.display = "block";
            })
            .then(() =>{
                //waitLoading(result, "#subbreed-page");
                waitLoading("#subbreed-page");
            })
            /*
            .then(data => renderImages(data, "#subbreed-page"))
            .then(data => renderLists(data, "#subbreed-page"))*/
            .catch(() =>{
                let alert = document.querySelector("#alert");
                alert.style.display = "block";
                
            })
    }
}

// Assigning URL for the breed page and sub-breed page
function reloadPageWithHash() {
    //breed-page
    if (breedPage === false) {
        window.location.hash = currentPage;
    }
    //sub-breed page
    if (breedPage === true) {
        window.location.hash = currentPage + "-" + currentSubBreedPage;
    }

}

// Rendering the "images" class on DOM
function renderImages(dataImage, breedId) {

    let indivPage = document.querySelector(breedId);

    indivPage.style.display = "flex";
    const title = document.querySelector("title");
    title.textContent = "World of Dogs - " + currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

    if (breedId === "#breed-page") {
        let subbreedPage = document.querySelector("#subbreed-page");
        subbreedPage.innerHTML = "";
        subbreedPage.style.display = "none";
        startPage.style.display = "none";
    }

    if (breedId === "#subbreed-page") {
        title.textContent += " - " + currentSubBreedPage.charAt(0).toUpperCase() + currentSubBreedPage.slice(1);
        let breedPage = document.querySelector("#breed-page");
        breedPage.style.display = "none";
        breedPage.innerHTML = "";
    }

    let imagesDiv = createImagesDiv();
    indivPage.appendChild(imagesDiv)

    for (let j = 0; j < dataImage.length; j++) {

        let singleImageDiv = createSingleImageDiv(dataImage[j]);
        imagesDiv.appendChild(singleImageDiv);
    }

}

// Rendering the "lists" class on DOM
function renderLists(dataList, breedId) {

    let indivPage = document.querySelector(breedId);
    let lists;

    if (breedId === "#breed-page") {

        lists = createListDiv(currentPage.toUpperCase());
        indivPage.appendChild(lists);

        if (dataList.length > 0) {
            let labelH3 = document.createElement("h3");
            labelH3.textContent = "Choose the Sub-Breed";
            lists.appendChild(labelH3);

            let selectBox = createSelectBar("select-subbreed", dataList, true);
            lists.appendChild(selectBox);

            let submitBtn = createSubmitButton();
            lists.appendChild(submitBtn);
            submitBtn.addEventListener("click", mySubmitBtn);

        }

        breedPage = true;
    }

    if (breedId === "#subbreed-page") {
        lists = createListDiv(currentPage.toUpperCase() + " - " + currentSubBreedPage.toUpperCase());
        indivPage.appendChild(lists);

    }

    let belowButtons = document.createElement("div");
    belowButtons.className = "below-buttons";
    lists.appendChild(belowButtons);

    let backBtn = createBackButton();
    belowButtons.appendChild(backBtn);
    backBtn.addEventListener("click", goBackPage);

    let refreshBtn = createRefreshButton();
    belowButtons.appendChild(refreshBtn);
    refreshBtn.addEventListener("click", refreshPage);
}

// Function to go back to the previous level 

function goBackPage() {
    currentPage = window.location.hash;
    let currentUrlSplit = currentPage.split("-");
    console.log(currentUrlSplit);
    // if it's a sub-breed
    if (currentUrlSplit.length > 1) {
        currentPage = currentUrlSplit[0].substring(1);
        console.log(currentPage);
        breedPage = false;
        window.location.hash = currentPage;
        customDogPage();
    } else { // if it's a breed
        frontPage();
        window.location = "";
    }
}

// Function to refresh the current active page
function refreshPage() {

    window.location.reload();

}

// Function to get the current breed & sub-breed name
function getBreedNames(currentUrl) {
    let currentUrlSplit = currentUrl.split("-");
    //console.log(currentUrlSplit);
    // if it's a sub-breed
    if (currentUrlSplit.length > 1) {
        currentPage = currentUrlSplit[0];
        currentSubBreedPage = currentUrlSplit[1];
        breedPage = true;
    } else { // if it's a breed
        currentPage = currentUrlSplit[0];
    }
    //console.log(currentUrlSplit[0].substring(1));
}

// Function to render which page that is active based on the page url
function refreshSpecPage() {
    currentPage = window.location.hash;
    console.log(currentPage);
    if (currentPage) {
        currentPage = currentPage.substring(1);
        getBreedNames(currentPage);
        reloadPageWithHash()
        customDogPage();
    } else {
        frontPage();
    }
}

refreshSpecPage();