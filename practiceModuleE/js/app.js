// map marker

let markers = document.querySelectorAll(".marker");
let attractionCard = document.querySelectorAll(".attractionCard");

markers.forEach((marker,index) => {
    marker.addEventListener("mouseover", () => {
        attractionCard[index].classList.add("focus");
    });
    marker.addEventListener("mouseout", () => {
        attractionCard[index].classList.remove("focus");
    });
});



// Read loud 
document.getElementById("readLoud").addEventListener("click", (e) => {
    e.preventDefault();

    const speech = new SpeechSynthesisUtterance("Contact: 0992903087");
    speech.lang = "fr-FR";
    window.speechSynthesis.speak(speech);
})


// Video 

const video = document.querySelector('video');

if(video)
{
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.play();
            }else{
                entry.target.pause();
            }
        });
    },
    {
        threshold: 0.5
    });

    observer.observe(video);

    document.addEventListener("visibilitychange", () => {
        if(document.visibilityState === "hidden")
        {
            video.pause();
        }else{
            video.play();
        }
    });
}


// Coupon Event 

function couponEvent()
{
    const result = document.getElementById("result");
    const drawBtn = document.getElementById("drawBtn");
    const restart = document.getElementById("restart");

    drawBtn.onclick = () => 
    {
        const rand = Math.floor(Math.random() * 3) + 1;
        const prizes = {
            1: "10% discount Coupon",
            2: "No Coupon",
            3: "100% Coupon Discount!"
        };

        result.textContent = prizes[rand];
        result.className = "active";

        drawBtn.disabled = true;
        restart.disabled = false;
        restart.classList.add("highlight");
        drawBtn.classList.add("highlight");
    }


    restart.onclick = () => {
        result.textContent = "";
        result.className = "";

        drawBtn.disabled = false;
        restart.disbled = true;
        restart.classList.remove("highlight");
        restart.classList.remove("highlight");
    };

}


// let cto = document.querySelector("#cto");
// let mask = document.querySelector("#cto #mask");

// cto.addEventListener("mousemove", handleMouseMove);

// function handleMouseMove(e){
//     const rec = this.getBoundingClientRect();
//     const mouse_x = e.clientX-rec.left-rec.width / 2;
//     const mouse_y = e.clientY-rec.top-rec.height / 2;
//     let angle = Math.atan2(mouse_y,mouse_x) * (180 / Math.PI);
//     angle = (angle + 360) % 360;

//     this.style.setProperty("--start", angle + 60);

//     const x = parseInt((e.clientX - rec.left) / rec.width * 100);
//     const y = parseInt((e.clientY - rec.top) / rec.height * 100);
//     console.log(x);
//     console.log(y);
//     mask.style.setProperty("--mouse-x", x + "%");
//     mask.style.setProperty("--mouse-y", y + "%");

// }


couponEvent();
