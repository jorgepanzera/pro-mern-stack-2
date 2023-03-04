// modulo para extender el objeto global windows en Typescrit
// agregarle una propiedad ENV para poder usar en el front-end variables de entorno de dotenv
// https://bobbyhadz.com/blog/typescript-extend-window
// Si el IDE no lo reconoce, ver el link que hay una solucion

export {};

declare global {
  interface Window {
    ENV: any;
  }
}