//get url then split the url to the first ? to get search keyword name that user entered
let url=window.location.href;
let searchData=url.split('?');
//request products data using search keyword
var jsonObj;
var xhr= new XMLHttpRequest();
xhr.open("get",("/"+searchData[1]),true);
xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
        jsonObj=xhr.responseText;
        jsonObj=JSON.parse(jsonObj);
        createDiv(jsonObj);
    }
}
xhr.send();
/*create game card that will be added in album div*/
function createDiv(jsonObj){
    let masterAlbum= document.getElementById("album");
    for(let index in jsonObj){
        if(index>11){
            //display only 12 game
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