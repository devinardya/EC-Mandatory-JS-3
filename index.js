let submitBtn = document.querySelector(".submitBtn");
let startPage = document.querySelector("#startpage");


let currentPage;
let currentSubBreedPage;
let userInput;
let dataInfo;
let coverImages = 5;
let breedPage = false;
let subBreedFound = true;

let urlImg = "https://dog.ceo/api/breeds/image/random/" + coverImages;
let urlList = "https://dog.ceo/api/breeds/list/all";
let customUrl;


// function to grab the data from API
function getData(url) {
    return axios.get(url)
        .then(function (response) {
            dataInfo = response.data.message;
            console.log(dataInfo);
            return (dataInfo);
        })
}

function frontPage() {
    getData(urlImg)
        .then(renderImage)
        .then(() => {
            getData(urlList)
            //.then(renderInfo)
            .then(data => renderInfo(data));
        })

    startPage.style.display = "flex";
}


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

function createImagesDiv() {
    let imageDiv = document.createElement("div");
    imageDiv.className = "images";

    return imageDiv;
}

function createSingleImageDiv(imageSource){
    let singleImageDiv = document.createElement("div");
    let eachImg = document.createElement("img");
    singleImageDiv.className = "image";
    eachImg.src = imageSource;
    singleImageDiv.appendChild(eachImg);

    return singleImageDiv;
}

function createListDiv(h2Label) {
    let textDiv = document.createElement("div");
    textDiv.className = "lists";
    let h2 = document.createElement("h2");
    h2.textContent = h2Label;
    textDiv.appendChild(h2);

    return textDiv;
}

function createSelectBar(selectID, data, subBreedFound){

    let select = document.createElement("select");
    select.id = selectID;

    if (subBreedFound === false){
        for (let eachData in data) {
            select.innerHTML += '<option value="' + eachData + '">' + eachData + '</option>';
    
        }
    }
   
    if (subBreedFound === true){
        console.log('test')
        console.log(data)
        for (let k = 0; k < data.length; k++) {
            select.innerHTML += '<option value="' + data[k] + '">' + data[k] + '</option>';
        }
    }

    return select;

}

// rendering front page - both the images and text
function renderImage(data) {

    let images = createImagesDiv();
    startPage.appendChild(images);

    for (let i = 0; i < coverImages; i++) {

        let singleImageDiv = createSingleImageDiv(data[i]);
        images.appendChild(singleImageDiv);
    }

}


function renderInfo(datas) {

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
        console.log(userInput);
    }
}


function customDogPage() {
    if (breedPage === false) {
        customUrl = "https://dog.ceo/api/breed/" + currentPage + "/images/random/3";
        getData(customUrl)
            //.then(renderBreedPageImage) 
            .then(data => renderImages(data, "#breed-page"))
            //.then(customSubBreedPage);
            .then(() => {
                customUrl = "https://dog.ceo/api/breed/" + currentPage + "/list";
                getData(customUrl)
                    .then(data => renderLists(data, "#breed-page"));
            })
    }
    if (breedPage === true) {

        customUrl = "https://dog.ceo/api/breed/" + currentPage + "/" + currentSubBreedPage + "/images/random/3";
        getData(customUrl)
            //.then(renderSubBreedPage);
            .then(data => renderImages(data, "#subbreed-page"))
            .then(data => renderLists(data, "#subbreed-page"))
    }
}

function reloadPageWithHash() {

    if (breedPage === false) {
        window.location.hash = currentPage;
    }

    if (breedPage === true) {
        window.location.hash = currentPage+"-"+currentSubBreedPage;
    }

}

function renderImages(dataImage, breedId){
    
    let indivPage = document.querySelector(breedId);

    if (breedId === "#breed-page"){
            const title = document.querySelector("title");
            title.textContent = "World of Dogs - " + currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
        
            startPage.style.display = "none";
            //let indivPage = document.querySelector("#breed-page");
            indivPage.style.display = "flex";
        
    }

    if (breedId === "#subbreed-page"){

            let breedPage = document.querySelector("#breed-page");
            breedPage.style.display = "none";
            indivPage.style.display = "flex";

    }

    let imagesDiv = createImagesDiv(); 
    indivPage.appendChild(imagesDiv)

    for (let j = 0; j < dataImage.length; j++) {

        let singleImageDiv = createSingleImageDiv(dataImage[j]);
        imagesDiv.appendChild(singleImageDiv);
     }

}




//rendering the text area, if there's a sub-breed, then render the option to choose

function renderLists(dataList, breedId) {

    let indivPage = document.querySelector(breedId);
    let lists;

    if(breedId === "#breed-page"){

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

    if (breedId === "#subbreed-page"){
        lists = createListDiv(currentPage.toUpperCase()+" - "+currentSubBreedPage.toUpperCase());
        indivPage.appendChild(lists);

    }

    let refreshBtn = createRefreshButton();
    lists.appendChild(refreshBtn);
    refreshBtn.addEventListener("click", refreshPage);
}

// to refresh the page
function refreshPage() {

    window.location.reload();

}

function grabBreed() {
    getData(urlList)
    .then(catchBreedName);
}

function catchBreedName(wholeData) {
    console.log("all list", wholeData);
    console.log(currentPage);

    // assume it is a breed
    // look for the breed
    for (let eachDog in wholeData) {
        //console.log(eachDog);   
        if (eachDog === currentPage) {
            //breedPage = false;
            console.log("it's a breed")
            break;
            // found a match, no need to do anything else
        }
    }

    // if breedPage is true, then it did not find a breed
    // then it must be a subbreed
    if (breedPage === false) {

        // console.log(wholeData.bulldog)
        
        for (let eachDog in wholeData) {

            // console.log(typeof eachDog)
            if (wholeData[eachDog].length > 0) {
                // console.log(eachDog, "have an array");
                // console.log(wholeData[eachDog])
                for (let l = 0; l < wholeData[eachDog].length; l++) {
                    if (wholeData[eachDog][l] === currentPage) {
                        console.log("theres a match!")
                        
                        currentSubBreedPage = currentPage;
                        console.log(currentSubBreedPage);
                        currentPage = getBreedName();
                        console.log("user input", currentPage)
                        console.log("user sub input", currentSubBreedPage)
                        breedPage = true;
                        break;
                    }
                }

            }
        }

    }
    customDogPage();
}

function getCurrentPage(currentUrl) {
    currentUrlSplit = currentUrl.split("-");
    let hash = "#"
    console.log(currentUrlSplit);
    
    if (currentUrlSplit.length > 1){
        console.log(hash+currentUrlSplit[1])
        return hash+currentUrlSplit[1];
    } else {
        console.log(currentUrlSplit[0])
        return currentUrlSplit[0];
    }
  };

  function getBreedName(){
    let currentUrl = window.location.hash; 
    currentUrlSplit = currentUrl.split("-");
    let actualBreed = currentUrlSplit[0].substring(1)
    console.log(currentUrlSplit[0].substring(1));
    
    return actualBreed;
    
  }


function refreshSpecPage() {
    currentPage = window.location.hash;
    console.log(currentPage);
    currentPage = getCurrentPage(currentPage);
    console.log(currentPage);
    if (currentPage) {
        currentPage = currentPage.substring(1);
        grabBreed();
      
    } else {
        frontPage();
    }

}

refreshSpecPage();

/*
// rendering breed page (images)
function renderBreedPageImage(dataImage) {

    const title = document.querySelector("title");
    title.textContent = "World of Dogs - " + currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

    startPage.style.display = "none";
    let indivPage = document.querySelector("#breed-page");
    indivPage.style.display = "flex";

    let imagesDiv = createImagesDiv(); 
    indivPage.appendChild(imagesDiv)

    for (let j = 0; j < dataImage.length; j++) {

        let singleImageDiv = createSingleImageDiv(dataImage[j]);
        imagesDiv.appendChild(singleImageDiv);

    }

}*/
/*
//getting data for the list of breed with sub-breed
function customSubBreedPage() {

    customUrl = "https://dog.ceo/api/breed/" + currentPage + "/list";
    getData(customUrl)
        .then(renderBreedPageList);

}*/

// render the sub-breed page(images & text)
/*
function renderSubBreedPage(dataImage) {

    let breedPage = document.querySelector("#breed-page");
    breedPage.style.display = "none";
    let subBreedPage = document.querySelector("#subbreed-page");
    subBreedPage.style.display = "flex";

    let images = createImagesDiv();
    subBreedPage.appendChild(images);

    let lists = createListDiv(currentPage.toUpperCase()+" - "+currentSubBreedPage.toUpperCase());
    subBreedPage.appendChild(lists);

    for (let j = 0; j < dataImage.length; j++) {

        let singleImageDiv = createSingleImageDiv(dataImage[j]);
        images.appendChild(singleImageDiv);
    }

    let refreshBtn = createRefreshButton();
    lists.appendChild(refreshBtn);
    refreshBtn.addEventListener("click", refreshPage);

}*/