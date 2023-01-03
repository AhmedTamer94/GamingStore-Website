var jsonObj;
var xhr= new XMLHttpRequest();
xhr.open("get","/ATAGameStore/gamesData",true);
xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
        jsonObj=xhr.responseText;
        jsonObj=JSON.parse(jsonObj);
        setSlider(jsonObj);
        addGmaesToHomePage(jsonObj);        

    }
}
xhr.send();
/*create game card that will be added in album div*/
function addGmaesToHomePage(jsonObj){
    let masterAlbum= document.getElementById("album");
    for(let index in jsonObj){
        //display only 12 game
        if(index>11){
            break;
        }
        else{
    let divCol=document.createElement("div");
    divCol.setAttribute("class","col");
                /******************************/
    let  divCardShadow=document.createElement("div") ; 
    divCardShadow.setAttribute("class","card shadow-sm bg-dark");
    /***************************************/
    let imgLink=document.createElement("a");
    imgLink.href="http://localhost:3000/ATAGameStore/product/"+jsonObj[index]._id+"/"+jsonObj[index].gameName;
                /******************************/
    let imgCard=document.createElement("img");
    imgCard.setAttribute("class","mx-auto d-block img-fluid rounded");
    imgCard.src=jsonObj[index].gameImg;
    imgCard.alt=jsonObj[index].gameName;
                /******************************/
    let divCardBody=document.createElement("div");
    divCardBody.setAttribute("class","card-body");
                    /******************************/
    let textLink= document.createElement("a");
    textLink.href=imgLink.href;
    textLink.setAttribute("class","nav-link");
                /******************************/
    let paragraphCardText=document.createElement("p");
    paragraphCardText.setAttribute("class","card-text text-center text-light");
    paragraphCardText.innerHTML=jsonObj[index].gameName;
                /******************************/
    let divFlex=document.createElement("div");
    divFlex.setAttribute("class","d-flex justify-content-between align-items-center");
                /******************************/
    textLink.appendChild(paragraphCardText);
    divCardBody.appendChild(textLink);
    divCardBody.appendChild(divFlex);
    imgLink.appendChild(imgCard);
    divCol.appendChild(imgLink);
    divCol.appendChild(divCardBody);
    divCol.appendChild(divCardShadow);
    masterAlbum.appendChild(divCol);

        }
    }
}
/******************************set slider */
function setSlider(jsonObj){
    let slider=document.getElementById("sliderInner");
    let sliderButtons=document.getElementById("sliderButtons");
    for(index in jsonObj){
        if(index>3){
            //set only the first 4 game images
            break;
        }
        else{
        let btn=document.createElement("button");
        btn.type="button";
        btn.setAttribute("data-bs-target","#myCarousel");
        btn.setAttribute("data-bs-slide-to",index);
        btn.setAttribute("aria-label",jsonObj[index].gameName);
        sliderButtons.appendChild(btn);
        let aLink=document.createElement("a");
        aLink.target="_blank";
        aLink.href="http://localhost:3000/ATAGameStore/product/"+jsonObj[index]._id+"/"+jsonObj[index].gameName;
        let imgLink=document.createElement("img");
        imgLink.src=jsonObj[index].gameImg;
        imgLink.alt=jsonObj[index].gameName;
        imgLink.setAttribute("class","mx-auto d-block img-fluid");
        let divInner=document.createElement("div");
        if(index==0){
            divInner.setAttribute("class","carousel-item active");
            btn.setAttribute("class","active");
            btn.setAttribute("aria-current","true");
        }
        else{
            divInner.setAttribute("class","carousel-item");
        }
        divInner.setAttribute("data-bs-interval",3000);
        aLink.appendChild(imgLink);
        divInner.appendChild(aLink);
        slider.appendChild(divInner);

        }
    }

}



