export interface Jogador {
  id: number;
  numeroCamisa: number;
  nome: string;
  posicao: string;
  idade: number;
  altura: number;
  jogos: number;
  gols: number;
  assistencias: number;
  desarmes: number;
  defesas: number;
  status: string;
  valor: number;
}

export interface JogadorCompra {
  id: number;
  numeroCamisa: number;
  nome: string;
  posicao: string;
  time: string;
  idade: number;
  altura: number;
  jogos: number;
  gols: number;
  assistencias: number;
  desarmes: number;
  defesas: number;
  status: string;
  valor: number;
}
