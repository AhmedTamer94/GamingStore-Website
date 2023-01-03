//get url then split to get url product till the id
let url=window.location.href;
let productData=url.split('/');
let id=productData[5];
//request product data using id in url
var jsonObj;
var xhr= new XMLHttpRequest();
xhr.open("get",("/product/:"+id),true);
xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
        jsonObj=xhr.responseText;
        jsonObj=JSON.parse(jsonObj);
        createDiv(jsonObj);
    }
}
xhr.send();

function createDiv(jsonObj){
    setImage(jsonObj[0].gameImg);
    setVideoLink(jsonObj[0].gamePromo);
    setDescription(jsonObj[0].gameDescription);
    createRating(jsonObj[0].gameRating);
    setRequirements(jsonObj[0].gameRequirement);
    setPrice(jsonObj[0].gamePrice);

}
function setImage(name){
    document.getElementById("gameImage").src=name;
    document.getElementById("gameImage").alt=name;
}
function setVideoLink(link){
    document.getElementById("promo").src=link;
}
function setDescription(text){
    document.getElementById("description").innerHTML=text;
}
function createRating(data){
    let index=1;
    for(index;index<=data;index++){
        document.getElementById("star"+index).setAttribute("class","fa fa-star checked");
    }
}
function setPrice(price){
    document.getElementById("price").innerHTML="Price: "+price;
}
function setRequirements(data){
    let req=document.getElementById("requirements");
    let eachLine=data.split('\n');
    for(line of eachLine){
        let paragraph=document.createElement("p");
        paragraph.innerHTML=line;
        req.appendChild(paragraph);
    }
}
