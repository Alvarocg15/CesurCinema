import { Time } from "@angular/common";
import { Pelicula } from "../../interface/pelicula.interface";
import { Sala } from "./sala.interface";

export interface Horarios{
  proyeccion_id: number;
  proyeccion_pelicula: Pelicula;
  proyeccion_sala: Sala;
  proyeccion_hora_comienzo: Time;
}
