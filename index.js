let images = document.querySelector(".images");
let lists = document.querySelector(".lists");
let select = document.querySelector('#select');
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

    for (let i=0; i < coverImages; i++){

        let imageDiv = document.createElement("div");
        let eachImg = document.createElement("img");
        imageDiv.className = "image";
        images.appendChild(imageDiv)
        
        eachImg.src = data[i];
        imageDiv.appendChild(eachImg);
    }
}

function renderInfo(datas){
    let info = datas;

    for (let data in info) {  
        select.innerHTML += '<option value="'+data+'">' + data+'</option>';

    }

    submitBtn.addEventListener("click", mySubmitBtn);
}


function mySubmitBtn(){
    chooseBreed();
    reloadPageWithHash();
    customDogPage()
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
    let imagesText = document.createElement("div");
    imagesText.className = "indivLists";
    indivPage.appendChild(imagesText)
    let eachH2 = document.createElement("h2");
    eachH2.textContent = userInput;
    imagesText.appendChild(eachH2);

    for (let j=0; j < dataImage.length; j++){

        let imageDiv = document.createElement("div");
        let eachImg = document.createElement("img");

        imageDiv.className = "indivImage";
        imagesDiv.appendChild(imageDiv)
        
        eachImg.src = dataImage[j];
        imageDiv.appendChild(eachImg);

    }

}

userInput = window.location.hash;
if (userInput) {
    userInput = userInput.substring(1);
    customDogPage();

} else {
  frontPage();
}

