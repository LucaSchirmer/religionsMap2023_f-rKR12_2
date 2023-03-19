"use strict"

let pixelAnzahl = 0;
let pixelArray;

async function getImg(url){
    console.log("fetching");
    const response = await fetch(url,{
        method: "GET",
        cache: "force-cache"
    });
    return response.json();
}


async function setup(){
    createCanvas(floor(1952), floor(screenY / 1.25));
    pixelDensity(1);
    pixelArray = await getImg("../img.json");
    
    background(1);
    
}

let bool = true;
function draw(){
    do {
        loadPixels();
        if(pixelArray){
            console.log(pixelArray)
  
            for (let y = 0; y <  1072; y++){
                for (let x = 0; x < 1952; x++){
                    let index = (x + y  * width) * 4; 
                    console.log(index)
                    pixels[index] = pixelArray.arrayOne[y][x][0];
                    pixels[index+1] = pixelArray.arrayOne[y][x][1];
                    pixels[index+2] = pixelArray.arrayOne[y][x][2];
                    pixels[index+3] = 255;
                }
            }

            bool = false;
        }
        updatePixels();
    } while (bool);
    
        
}

   


document.querySelector('#defaultCanvas0').addEventListener("click", c =>{
    mX = MouseX;
    mY = MouseY;

    let url = new URL("${window.location}/info.html");


});