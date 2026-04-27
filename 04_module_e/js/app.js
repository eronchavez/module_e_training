
//Map hover 
let markers = document.querySelectorAll(".marker");
let attractionCard = document.querySelectorAll(".attractionCard");


markers.forEach((markers,index) => {
    markers.addEventListener("mouseover", () => {
        attractionCard[index].classList.add("focus");
    });
    markers.addEventListener("mouseout", () => {
        attractionCard[index].classList.remove("focus");
    });
});

//Video
const observer = new IntersectionObserver((entries,observer) => {
    entries.forEach(entry=>{
        if(entry.isIntersecting)
        {

            entry.target.play();

        }
        else
        {
            entry.target.pause();
        }
    });
}, {
    threshold: 0.5
});
 
let video = document.querySelector("video");

observer.observe(video);

document.addEventListener("visibilitychange", () => {
    if( document.visibilityState === "hidden"){
        video.pause()
    }
    else
    {
        video.play();
    };
});

// Call To Action

let cto = document.querySelector("#cto");
let mask = document.querySelector("#cto #mask");

cto.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(e){
    const rec = this.getBoundingClientRect();
    const mouse_x = e.clientX-rec.left-rec.width / 2;
    const mouse_y = e.clientY-rec.top-rec.height / 2;
    let angle = Math.atan2(mouse_y,mouse_x) * (180 / Math.PI);
    angle = (angle + 360) % 360;

    this.style.setProperty("--start", angle + 60);

    const x = parseInt((e.clientX - rec.left) / rec.width * 100);
    const y = parseInt((e.clientY - rec.top) / rec.height * 100);
    console.log(x);
    console.log(y);
    mask.style.setProperty("--mouse-x", x + "%");
    mask.style.setProperty("--mouse-y", y + "%");

}

//  speak out loud
document.getElementById("readLoud").addEventListener('click', (e) => {
    e.preventDefault();
    const speech = new SpeechSynthesisUtterance("Contact: 04 72 10 30 30 Address: Marie de Lyon, 69205 Lyon cedex 01 ");
    speech.lang = "fr-FR";
    window.speechSynthesis.speak(speech);
});