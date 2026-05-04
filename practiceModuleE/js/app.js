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

// Coupon Game Event
function couponGame()
{
    //Target the elements from HTML
    const result = document.getElementById("result");
    const draw = document.getElementById("drawBtn");
    const restart = document.getElementById("restart");
    //When user click the draw btn
    draw.onclick = () => {
        const rand = Math.floor(Math.random() * 3) + 1;
        const prizes = {
            1: "10% Discount Coupon!",
            2: "No Prize!",
            3:"100% Discount Coupon"
        };

            
        result.textContent = prizes[rand];
        result.className = "active";

        draw.disabled = true;
        restart.disabled = false;
        restart.classList.add("highlight");
    };

    restart.onclick = () => {
        result.textContent = "";
        result.className = "";
        
        draw.disabled= false;
        restart.disabled= true;
        restart.classList.remove("highlight");
    };

}

couponGame();