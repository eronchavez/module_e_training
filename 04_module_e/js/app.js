
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


// Reviews Logic

let allReviews = [];
let currentReviewIndex = 0;

async function loadReviews()
{
    const reviewContainer = document.getElementById('review_slides'); //select id = review_slides

    //retrieve reviews from json file
    const res = await fetch("review.json");
    const data = await res.json();
    allReviews = data.reviews;

    allReviews.forEach(review => {
        const reviewCard = document.createElement("div"); //Create DIV
        reviewCard.classList.add("review_card"); // Add class to that DIV
        const filledStars = "⭐".repeat(review.rating); // Add stars based on review.rating(number)

        reviewCard.innerHTML =  `
            <p class="review_rating">
                ${filledStars}
            </p>
            <q class="review_content">${review.content}</q>
            <p class="review_author"> ${review.author}</p>
        `;

        reviewContainer.appendChild(reviewCard);
    });
}

function updateReviewSlider() {
    const cards = document.querySelectorAll("#review_slides .review_card");

    cards.forEach((card, index) => {
        card.classList.remove("is-left", "is-center", "is-right", "is-hidden");

        if(index === currentReviewIndex) {
            card.classList.add("is-center");
        } else if(index === currentReviewIndex - 1) {
            card.classList.add("is-left");
        } else if(index === currentReviewIndex + 1) {
            card.classList.add("is-right");
        } else {
            card.classList.add("is-hidden");
        }
    }); 

    const prevBtn = document.getElementById("reviewsPrevBtn");
    const nextBtn = document.getElementById("reviewsNextBtn");

    if(prevBtn && nextBtn) {
        prevBtn.disabled = currentReviewIndex === 0;
        nextBtn.disabled = currentReviewIndex === cards.length - 1;
    }

}

function bindReviewControls() {
    const prevBtn = document.getElementById("reviewsPrevBtn");
    const nextBtn = document.getElementById("reviewsNextBtn");

    if(!prevBtn || !nextBtn) {
        return;
    }

    prevBtn.addEventListener("click", () => {
        if(currentReviewIndex > 0) {
            currentReviewIndex -= 1;
            updateReviewSlider();
        }
    });

    nextBtn.addEventListener("click", () => {
        const cards = document.querySelectorAll('#review_slides .review_card');
        if(currentReviewIndex < cards.length - 1) {
            currentReviewIndex += 1;
            updateReviewSlider();
        }
    });
} 


// Coupon Game Event
function couponGame() {
  const result = document.getElementById("result");
  const draw = document.getElementById("draw-btn");
  const restart = document.getElementById("restart");

  draw.onclick = () => {
    // Generate a random number between 1 and 3
    const rand = Math.floor(Math.random() * 3) + 1;
    const prizes = { 
      1: "10% Discount Coupon!", 
      2: "No prize!", 
      3: "100% Discount Coupon!" 
    };

    // Update text and classes
    result.textContent = prizes[rand];
    result.className = "active";
    
    // Toggle button states
    draw.disabled = true;
    restart.disabled = false;
    restart.classList.add("highlight");
  };

  restart.onclick = () => {
    // Reset the UI
    result.textContent = "";
    result.className = "";
    
    draw.disabled = false;
    restart.disabled = true;
    restart.classList.remove("highlight");
  };
}

//Register the Service Worker
if("serviceWorker" in navigator)
{
    window.addEventListener("load", async () => {
        try
        {
            await navigator.serviceWorker.register("sw.js");
            console.log("Service worker registered");
        }catch(e)
        {
            console.error("SW registration failed", e);
        }
    });
}



(async function init(){
    await loadReviews();
    bindReviewControls();
    updateReviewSlider();
    couponGame();
})();


