const lista = document.querySelector('ul');

const superHerois = ['Geleia', 'Nicks', 'Marshmellow', 'Murta'];

for(let i = 0; i < superHerois.length; i++){
const heroi = superHerois[i];

const item = document.createElement('li');

item.textContent = heroi;

lista.appendChild(item);
}

