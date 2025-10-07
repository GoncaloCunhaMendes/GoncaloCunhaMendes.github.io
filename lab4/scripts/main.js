
function mouseover() {
    const h1 = document.getElementById("mudaTexto");
    h1.innerText = "Ups ups 😜";
    h1.style.color = "red"; 
}


function mouseout() {
    const h1 = document.getElementById("mudaTexto");
    h1.innerText = "Bem-vindo à minha página maluca!";
    h1.style.color = "#1a73e8"; 
}



function pintaTexto(cor) {
    const h1 = document.getElementById("mudaTexto");
    h1.style.color = cor;
}


function mudaFundo(event) {
    event.preventDefault();  
    const cor = document.getElementById("colorInput").value.toLowerCase();
    document.body.style.backgroundColor = cor;  
    alert(`A cor ${cor} é bueda fixe meu!`);
}


let counter = 1;
function contador() {
    counter++;
    document.getElementById("count").textContent = counter;

}
