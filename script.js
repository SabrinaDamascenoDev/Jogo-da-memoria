(function(){

	var tentativas = 0;
	var divTentativas = document.getElementById("tentativas");


	var contador1 = 0;

	var contador = document.querySelector("#pontosnum");

	var modal =document.querySelector("#modal");

	var pontos = 0;

	var imgpontos = document.querySelector("#pontosfoto");
	
	var images = [];

	var flippedCards = [];

	//embaralhar - começando
	for(var i = 0; i<20; i++){
		var img = {
			src: "img"+i+".png",
			id: i%10
		};
		images.push(img);
	}

	startGame();

	
	
	function startGame(){
		pontos = 0;

		
	
		flippedCards = [];
		images = randomSort(images);

		 

		var frontFaces = document.getElementsByClassName("front");
		var backFaces = document.getElementsByClassName("back");
		
		for(var i = 0; i < 20; i++){
			frontFaces[i].classList.remove("flipped", "pontos");
			backFaces[i].classList.remove("flipped", "pontos");
			
			var card = document.querySelector("#card" + i);

			
			//add evento clicar
			card.addEventListener("click",flipCard,false);

			frontFaces[i].style.background = "url('img/"+images[i].src+"')";
			frontFaces[i].setAttribute("id",images[i].id);
			console.log(frontFaces[i]);


		}
		contador.innerHTML	= "Pontuação: " + 0;
		divTentativas.innerHTML = "Jogadas: " + 0;

		modal.style.zIndex = -2;
		modal.removeEventListener("click",startGame, false);
		modal.style.display = 'none';

		
		
	}
	//embaralhar
	function randomSort(oldArray){
		var newArray = [];
		while(newArray.length !== oldArray.length){
			var i = Math.floor(Math.random()*oldArray.length);

			if(newArray.indexOf(oldArray[i]) < 0){
				newArray.push(oldArray[i]);
			}
		}
		return newArray;
	}

	// virar as cartas e comparar
	function flipCard(){
		if(flippedCards.length<2){
		var faces = this.getElementsByClassName("face");
		if(faces[0].classList.length>2){
			return;
		}
		
		
		faces[0].classList.toggle("flipped");
		faces[1].classList.toggle("flipped");

		flippedCards.push(this);
		if(flippedCards.length === 2){
			if (flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id) {
				flippedCards[0].childNodes[1].classList.toggle("pontos");
				flippedCards[0].childNodes[3].classList.toggle("pontos");
				flippedCards[1].childNodes[1].classList.toggle("pontos");
				flippedCards[1].childNodes[3].classList.toggle("pontos");
				contador1 += 100;
						contador.innerHTML	= "Pontuação: " + contador1;

				    tentativas = tentativas + 1;
					divTentativas.innerHTML = "Jogadas: " + tentativas;
					


				pontos++;
				
				flippedCards = [];	

				if(pontos === 10){
					gameOver();
				}
			}
		}

	}else{
		flippedCards[0].childNodes[1].classList.toggle("flipped");
		flippedCards[0].childNodes[3].classList.toggle("flipped");
		flippedCards[1].childNodes[1].classList.toggle("flipped");
		flippedCards[1].childNodes[3].classList.toggle("flipped");
		if(contador1 == 0){
			contador1 = 0;
		}else{
		contador1 -= 20;
		contador.innerHTML	= "Pontuação: " + contador1;
			}

		flippedCards = [];

			tentativas = tentativas + 1;
			divTentativas.innerHTML = "Jogadas: " + tentativas;
			

		
			
	}
	}
	//função para refresh
	
	function gameOver(){
		modal.style.zIndex = 10;
		modal.style.display = 'block';
		modal.addEventListener("click",startGame, false);
		
		
		tentativas = 0;
		contador1 = 0;
		
	

		
	}

	

}());
