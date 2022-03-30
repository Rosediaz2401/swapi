
const imagesContainer = document.querySelector('#images-container'); //donde van las imagenes
const search = document.querySelector('#search') // input
const list = document.querySelector('#list') //ul
const prevBtn = document.querySelector('#prev-btn') // btn preview
const nextBtn = document.querySelector('#next-btn')
const url= ('https://swapi.dev/api/people/') // url de swapi
let contador = 1 // para agregar pagina siguiente ?page para jalar la otra lista de personajes
let personajesBusqueda = []; 

search.addEventListener("keyup", (event) => {
    list.innerHTML = "";
    imagesContainer.innerHTML = "";
    let searching = personajesBusqueda.filter(({ name }) =>
    name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
  );
  searching.forEach(element =>imagesContainer.innerHTML+= loadCard(element.name,element.gender,element.birth_year))
  moreInfoButton()

//console.log(event.target.value)
if(event.target.value === ""){
    imagesContainer.innerHTML = "";
    fetchStarWars(url)
}
});

 prevBtn.addEventListener('click', () => {
    imagesContainer.innerHTML = ""
    contador -=1 //pagina empieza en 1
   fetchStarWars (url + "?page=" + contador)
})   
nextBtn.addEventListener('click', () => {
        imagesContainer.innerHTML = ""
        contador +=1 //siguiente pagina 2
       fetchStarWars (url + "?page=" + contador)
})   

function moreInfoButton (){
    const moreButton = Array.from(document.querySelectorAll('.btn-dark'))
    const gender = Array.from(document.querySelectorAll('.gender'))
    moreButton.forEach(item => item.addEventListener('click', () => {
        item.classList.toggle('my-active')
        if(item.classList.contains('my-active')){
            item.innerText = 'less'
            item.previousElementSibling.style.display="block"
        } else{
            item.innerText = 'more'
            item.previousElementSibling.style.display="none"
        }
    }))

}
 
function fetchStarWars (url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        const stCard = data.results
        personajesBusqueda = data.results
        //console.log(personajesBusqueda)
        stCard.forEach(element => {
        imagesContainer.innerHTML+= loadCard(element.name,element.gender,element.birth_year)
        });
    moreInfoButton()
    })
    checkPrevBtn() 
    checkNextBtn()
}

fetchStarWars(url)

function checkPrevBtn (){
    if(contador === 1){
        prevBtn.style.display ="none"
        }else if ( contador > 1){
         prevBtn.style.display="inline-block"
    }
}
function checkNextBtn (){
    if(contador === 9){
        nextBtn.style.display ="none"
    }
}
function loadCard(name,gender,birth_year){
    return ` 
    <div class="card" style="width: 18rem;">
        <img src="img/img_5dce4fc50973f.webp" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <div style="display:none" class="gender">
            <h5 class="card-title"> Gender: ${gender}</h5>
            <h5 class="card-title"> Birth-Year: ${birth_year}</h5>
            </div>
            <button type="button" id="more-btn" class="btn btn-dark">More</button>
        </div>
    </div>`
}

// agregar evento a elementos creados de forma dinamica en js
/*document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'next-btn'){
        imagesContainer.innerHTML = ""
        contador +=1
        fetchStarWars(url + "?page=" + contador)    
    }

    if(e.target && e.target.id === 'prev-btn' && contador >=1){
        imagesContainer.innerHTML = ""
        contador -=1
        fetchStarWars(url + '?page=' + contador)
    }
 });
 */
