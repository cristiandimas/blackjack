(() => {
  "use strict";
  let deck = [];
  const types = ["C", "D", "H", "S"];
  const especiales = ["A", "J", "Q", "K"];

  let puntosJugador = 0;
  let puntosComputadora = 0;

  const btnPedir = document.querySelector("#btnPedir");
  const btnNuevo = document.querySelector("#btnNuevo");
  const btnDetener = document.querySelector("#btnDetener");
  const puntosHTML = document.querySelectorAll("small");
  const divCartasJugador = document.querySelector("#jugador-cartas");
  const divCartasComputadora = document.querySelector("#computadora-cartas");

  const iniciarJuego = () => {
    deck = createDeck();
  };

  /**
   * La función `createDeck` crea una baraja de cartas combinando diferentes tipos y valores, baraja la
   * baraja aleatoriamente y registra la baraja resultante.
   */
  const createDeck = () => {
    let deck = [];
    for (let type of types) {
      for (let i = 2; i <= 10; i++) {
        deck.push(`${i}${type}`);
      }
    }
    for (let type of types) {
      for (let especial of especiales) {
        deck.push(`${especial}${type}`);
      }
    }

    return deck.sort(() => Math.random() - 0.5);
  };

  /**
   * La función `pedirCarta` extrae una carta de la matriz `mazo` y la devuelve, arrojando un error si el
   * `mazo` está vacío.
   * @returns La función `pedirCarta` está devolviendo la tarjeta que se extrae de la matriz `deck`.
   */
  const pedirCarta = () => (deck.length === 0) ? ( alert("No hay cartas en el deck")) : deck.pop()
    
  

  //pedirCarta();
  /**
   * La función `valorCarta` toma una cadena que representa un naipe y devuelve su valor numérico.
   * @param carta - El parámetro "carta" representa un naipe.
   * @returns La función `valorCarta` devuelve el valor numérico de un naipe.
   */
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };
  

  const turnoComputadora = (puntosMinimos) => {
    do {
      const carta = pedirCarta();
      puntosComputadora = puntosComputadora + valorCarta(carta);
      puntosHTML[1].innerText = puntosComputadora;
      const imgCarta = document.createElement("img");
      imgCarta.src = `assets/carts/${carta}.png`;
      imgCarta.classList.add("carta");
      divCartasComputadora.append(imgCarta);
      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
    setTimeout(() => {
      puntosComputadora === puntosMinimos
        ? alert("Nadie Gana")
        : puntosMinimos > 21
        ? alert("Computadora Gana")
        : puntosComputadora > 21
        ? alert("Jugador gana")
        : puntosComputadora > puntosMinimos && puntosComputadora <= 21
        ? alert("Computadora gana")
        : alert("ok");
    }, 200);
  };

  //Eventos

  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/carts/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugador.append(imgCarta);

     if (puntosJugador > 21) {
       btnPedir.disabled = true;
       btnDetener.disabled = true;
       turnoComputadora(puntosJugador);
     } else if (puntosJugador === 21) {
       btnPedir.disabled = true;
       btnDetener.disabled = true;
       turnoComputadora(puntosJugador);
     }
    setTimeout(() => {
      window.location.reload();
     }, 5000);
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  });

  btnNuevo.addEventListener("click", () => {
    window.location.reload();
  });
  iniciarJuego()
})();

