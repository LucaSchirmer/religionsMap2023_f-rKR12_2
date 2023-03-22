"use strict"


const getData =  async file =>{
    const response = await fetch(file);
    const text = await response.text();
    return text;
}

window.onload = async () =>{
    try {
        let location = window.location.href;
        let url = new URL(location); 
        console.log(url)
        let religion = url.searchParams.get("religion"); 
        console.log(religion)   

        if(religion == ""){
            history.back();
        }else{
            let dataUrl = `${religion}/${religion}.txt`  ;

            // Content of Page
            let title = document.querySelector(".artHeadline");
            title.innerHTML = "";
            title.innerHTML = religion;
            document.title = religion;

            let text = document.querySelector(".infoBlock");
            text.innerHTML = "";
            text.innerHTML = await getData(dataUrl);

            let img = document.createElement("img");
            img.src = `${religion}/${religion}.jpg` || `${religion}/${religion}.png`;

        }



    } catch (error) {
        console.error(error);
    }
}

