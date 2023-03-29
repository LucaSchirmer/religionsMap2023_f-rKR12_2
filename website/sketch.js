"use strict"

// Burger Animation

const burger = document.querySelector(".burger");
const religionsOverview = document.querySelector(".religionsOverview");

burger.addEventListener("click", ()=>{
    burger.classList.toggle("toggleBurger");
    religionsOverview.classList.toggle("hiddenLegende");
});













//  Map
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

function colorDistance(r1, r2, g1, g2, b1, b2){
    console.log("red: ", sqrt((r1-r2) * (r1-r2)))
    console.log("green: ", sqrt((g1-g2) * (g1-g2)))
    console.log("blue: ", sqrt((b1-b2) * (b1-b2)))
    let value = (r1-r2) * (r1-r2) + (g1-g2) * (g1-g2) + (b1-b2) * (b1-b2)
    let d = sqrt(value);
    console.log("distance: ", d)
    return d;
}

const colorMap = new Map();

/** 
 * Abrahamic faiths
 * */ 

    // Islam
    colorMap.set("Sunni", [88, 173, 96]);
    colorMap.set("Shia", [179, 222, 106]);
    colorMap.set("Ibadi", [1, 88, 37]);

    // Judaism
    colorMap.set("Judentum", [88, 173, 96]);

    // Christianity 
    colorMap.set("Katholisch", [215, 94, 78]);
    colorMap.set("Evangelisch", [117, 173, 210]);
    colorMap.set("Orthodox",[128, 115, 171]);
    colorMap.set("Orientalisch Orthodox", [191, 127, 39]);
    colorMap.set("Mormonen", [169, 221, 181]);

/** 
 * Indian/Dhharmic faiths
 * */ 

    colorMap.set("Hinduismus", [252, 171, 80]);
    colorMap.set("Sikkismus", [179, 87, 8]);
    colorMap.set("Theravada Buddismus", [255, 108, 184]);
    colorMap.set("Mahayana Buddismus", [250, 128, 112]);
    colorMap.set("Vajrayana Buddismus", [251, 185, 220]);

/** 
 * Others
 * */  

    colorMap.set("Chinesische Religion", [254, 236, 111]);
    colorMap.set("Vietnamesische Volksreligion", [127, 128, 0]);
    colorMap.set("Schintoismus", [198, 191, 230]);
    colorMap.set("Shinismus", [128, 0, 0]);
    colorMap.set("Indigenous religions", [243, 235, 194]);

let bool = true;
async function setup(){
    createCanvas(floor(1952), floor(1072));
    pixelDensity(1);
    pixelArray = await getImg("../img.json");
    
    background(1);


    document.querySelector('#defaultCanvas0').addEventListener("click", () =>{
        let mX = mouseX;
        let mY = mouseY;
        console.log(mX, mY)

        let pixel = [];
        loadPixels();


        pixel.push((floor(mX) + floor(mY)  * 1952) * 4);
        pixel.push(pixels[pixel[0]]);
        pixel.push(pixels[pixel[0]+1]);
        pixel.push(pixels[pixel[0]+2]);
        pixel.push(pixels[pixel[0]+3]);
        console.log(pixel);

        let whiteCheck = colorDistance(pixel[1], pixel[2], pixel[1], pixel[3], pixel[2], pixel[3]);
        console.log(whiteCheck)

        // vllt WHITECHECK VERKLEINERN
        if(whiteCheck < 15){
            console.log("Clicked Color is WHITE")
            return;
        }
        
        let kleinsterWert = 255;
        let religion; 
        let count = 0;

        colorMap.forEach(color =>{
            let dis = colorDistance(color[0], pixel[1], color[1], pixel[2], color[2], pixel[3]);    

            if(dis < kleinsterWert){
                kleinsterWert = dis;
                religion = Array.from(colorMap)[count][0];
                console.log(kleinsterWert)
            }
            count++;
        });
        console.log(religion)
            
        let location = window.location.href;
        let url = new URL(location.replace("index.html", "info.html")); 

        url.searchParams.append("religion", religion)
        console.log(url)
        window.location = url;
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
