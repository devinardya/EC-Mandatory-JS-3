
let submitBtn = document.querySelector(".submitBtn");
let startPage = document.querySelector("#startpage");
let userInput;
let dataInfo;
let coverImages = 5;

let urlImg = "https://dog.ceo/api/breeds/image/random/" + coverImages;
let urlList = "https://dog.ceo/api/breeds/list/all";
let customUrl;
    




function frontPage(){
    getData(urlImg)
    .then(renderImage)

    getData(urlList)
    .then(renderInfo)

    startPage.style.display = "flex";
}

function getData(url){
    return axios.get(url)
        .then(function(response){
            dataInfo = response.data.message;
            console.log(dataInfo);
            return(dataInfo);
        })
}



function renderImage(data){

    let images = document.querySelector(".images");


    for (let i=0; i < coverImages; i++){

        let imageDiv = document.createElement("div");
        let eachImg = document.createElement("img");
        imageDiv.className = "image";
        images.appendChild(imageDiv)
        
        eachImg.src = data[i];
        imageDiv.appendChild(eachImg);
    }
}

function createRefreshButton(){
    let refreshBtn =  document.createElement("button");
    refreshBtn.className = "refreshPage";
    let btnSpan = document.createElement("span");
    let iRefresh = document.createElement("i");
    iRefresh.className ="material-icons refresh";
    iRefresh.textContent = "refresh";
    refreshBtn.appendChild(iRefresh);
    refreshBtn.appendChild(btnSpan);
    btnSpan.textContent = "REFRESH";

    return refreshBtn;
}

function renderInfo(datas){
    let lists = document.querySelector(".lists");
    let select = document.querySelector('#select');
    let info = datas;

    for (let data in info) {  
        select.innerHTML += '<option value="'+data+'">' + data+'</option>';

    }

    submitBtn.addEventListener("click", mySubmitBtn);
    let refreshBtn = createRefreshButton();
    lists.appendChild(refreshBtn);
    refreshBtn.addEventListener("click", refreshPage);

}


function mySubmitBtn(){
    chooseBreed();
    reloadPageWithHash();
    customDogPage();
}

function chooseBreed(){

   userInput = select.value;
   console.log(userInput);

}

function reloadPageWithHash() {
    window.location.hash = userInput;
    
}

function customDogPage(){
    customUrl = "https://dog.ceo/api/breed/"+userInput+"/images/random/3";
    getData(customUrl)
    .then(renderBreedPage);

}

function renderBreedPage(dataImage){

    startPage.style.display = "none";
    let indivPage = document.querySelector("#individual-page");
    indivPage.style.display = "flex";
    let imagesDiv = document.createElement("div");
    imagesDiv.className = "indivImages";
    indivPage.appendChild(imagesDiv)
   
   

    for (let j=0; j < dataImage.length; j++){

        let imageDiv = document.createElement("div");
        let eachImg = document.createElement("img");

        imageDiv.className = "indivImage";
        imagesDiv.appendChild(imageDiv)
        
        eachImg.src = dataImage[j];
        imageDiv.appendChild(eachImg);
    }


    customUrl = "https://dog.ceo/api/breed/"+userInput+"/list";
    getData(customUrl)
    .then(renderSubBreedList);

}

function renderSubBreedList(dataList){

    let subBreedList = dataList;
    console.log(subBreedList);

    let indivPage = document.querySelector("#individual-page");
    let imagesText = document.createElement("div");
    imagesText.className = "indivLists";
    indivPage.appendChild(imagesText);
    imagesText.textContent = "";

    let eachH2 = document.createElement("h2");
    eachH2.textContent = userInput.toUpperCase();
    imagesText.appendChild(eachH2);

    if (subBreedList.length > 0){
        let labelH3 = document.createElement("h3");
        labelH3.textContent = "Choose the Sub-Breed";
        imagesText.appendChild(labelH3);

        let selectBox = document.createElement("select");
        selectBox.id = "select-subbreed";
        imagesText.appendChild(selectBox);
    
        for (let k= 0; k < subBreedList.length; k++) {  
            data = subBreedList[k];
            selectBox.innerHTML += '<option value="'+data+'">' + data+'</option>';
        }
    }

    let refreshBtn = createRefreshButton();
    imagesText.appendChild(refreshBtn);
    refreshBtn.addEventListener("click", refreshPage);
}

function customSubBreedPage(){
    customUrl = "https://dog.ceo/api/breed/"+userInput+"/list";
    getData(customUrl)
    .then(renderBreedPage);
}

function refreshPage(){

    window.location.reload();

}

function refreshSpecPage(){
    userInput = window.location.hash;
    if (userInput) {
        userInput = userInput.substring(1);
        customDogPage();
    
    } else {
      frontPage();
    } 
    
}

refreshSpecPage();








