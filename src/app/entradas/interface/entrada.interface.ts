import { Horarios } from "../../pelicula/horarios/interface/horarios.interface";
import { Sala } from "../../pelicula/horarios/interface/sala.interface";
import { Pelicula } from "../../pelicula/interface/pelicula.interface";
import { Asiento } from "./asiento.interface";

export interface Entrada {
  entrada_id: number;
  entrada_user: number;
  entrada_pelicula: Pelicula;
  entrada_proyeccion: Horarios;
  entrad_sala: Sala;
  entrada_asiento: Asiento;
}
