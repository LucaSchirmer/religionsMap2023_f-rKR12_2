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

let bool = true;
async function setup(){
    createCanvas(floor(1952), floor(screenY / 1.25));
    pixelDensity(1);
    pixelArray = await getImg("../img.json");
    
    background(1);


    document.querySelector('#defaultCanvas0').addEventListener("click", c =>{
        let mX = mouseX;
        let mY = mouseY;

        let pixel = [];
        loadPixels();

        pixel.push((floor(mX) + floor(mY)  * width) * 4);
        pixel.push(pixels[pixel[0]]);
        pixel.push(pixels[pixel[0]+1]);
        pixel.push(pixels[pixel[0]+2]);
        pixel.push(pixels[pixel[0]+3]);
        
        
        console.log(pixel);

        switch (true){
            case pixel[1] < 110 && pixel[2] > 150 && pixel[3] < 110:

            console.log("GREEEN");
            break;
            case pixel[1] < 30 && pixel[2] > 80 && pixel[3] < 70:

            console.log("GREEEN");
            break;
        }

        console.log(mX, mY)
        let location = window.location.href;
        let url = new URL(location.replace("index.html", "info.html")); 

        let parameter = new URLSearchParams(url.search);
    

        parameter.append("searchh", "g");
        console.log(url)
    });

        loadPixels();
        if(pixelArray){
            console.log(pixelArray)
            for (let y = 0; y <  1072; y++){
                for (let x = 0; x < 1952; x++){
                    let index = (x + y  * width) * 4; 
                    pixels[index] = pixelArray.arrayOne[y][x][0];
                    pixels[index+1] = pixelArray.arrayOne[y][x][1];
                    pixels[index+2] = pixelArray.arrayOne[y][x][2];
                    pixels[index+3] = 255;
                }
            }

            bool = false;
        }
        updatePixels();
    
}


function draw(){

}
