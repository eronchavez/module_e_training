// Map hover

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

