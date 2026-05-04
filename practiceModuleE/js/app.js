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
            if(entry.isIntersecting)
            {
                entry.target.play();
            }else{
                entry.target.pause();
            }
        });
    },{
        threshold: 0.5
    });

    observer.observe(video);

    document.addEventListener("visibilitychange", ()=> {
        if(document.visibilityState === 'hidden')
        {
            video.pause();
        }else{
            video.play();
        }
    });
}
