export type Publicacion = {
  id: number;
  autor: string;
  contenido: string;
  likes: number;
};

export let publicaciones: Publicacion[] = [
  { id: 1, autor: "juan123", contenido: "Mi primera publicación", likes: 3 },
  { id: 2, autor: "ana456", contenido: "Hola a todos!", likes: 1 }
];

export const agregarPublicacion = (pub: Publicacion) => {
  publicaciones.push(pub);
};

export const incrementarLike = (id: number) => {
  const pub = publicaciones.find(p => p.id === id);
  if (pub) pub.likes += 1;
};