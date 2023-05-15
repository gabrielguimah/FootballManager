export interface JogadorEscalado {
  id: number;
  nome: string;
  camisaNumero: number;
}

export interface Escalacao {
  ata1: JogadorEscalado;
  ata2: JogadorEscalado;
  ata3: JogadorEscalado;
  mei1: JogadorEscalado;
  mei2: JogadorEscalado;
  mei3: JogadorEscalado;
  lat1: JogadorEscalado;
  lat2: JogadorEscalado;
  zag1: JogadorEscalado;
  zag2: JogadorEscalado;
  gol: JogadorEscalado;
}
