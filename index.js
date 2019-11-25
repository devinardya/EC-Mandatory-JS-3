let images = document.querySelector(".images");
let lists = document.querySelector(".lists");
let select = document.querySelector('#select');
let submitBtn = document.querySelector(".submitBtn");
let dataInfo;
let coverImages = 5;
let urlImg = "https://dog.ceo/api/breeds/image/random/" + coverImages;
let urlList = "https://dog.ceo/api/breeds/list/all";

frontPage();

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
    /*console.log(info);
    let ulList = document.createElement("ul");
    lists.appendChild(ulList);
    for (let data in info){
        //let data = info[j];
        console.log(data);
        let listLi = document.createElement("li");
        let lista = document.createElement("a");
        lista.textContent = data;
        
        ulList.appendChild(listLi);
        listLi.appendChild(lista);
   }*/

    for (let data in info) {  
        select.innerHTML += '<option value="'+data+'">' + data+'</option>';

    }

    submitBtn.addEventListener("click", chooseBreed);


}

function chooseBreed(){

   let userInput = select.value;
   console.log(userInput);
}