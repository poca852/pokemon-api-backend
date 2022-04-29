CREATE TABLE Pokemons(
   id UUID PRIMARY KEY NOT NULL,
   nombre VARCHAR(255) UNIQUE NOT NULL,
   vida INTEGER,
   fuerza INTEGER,
   defensa INTEGER,
   velocidad INTEGER,
   altura INTEGER,
   peso INTEGER,
   img VARCHAR(255),
   createdAt TIMESTAMP,
   updatedAt TIMESTAMP
);

CREATE TABLE tipos(
   id UUID PRIMARY KEY NOT NULL,
   nombre VARCHAR(255) UNIQUE NOT NULL
   createdAt TIMESTAMP,
   updatedAt TIMESTAMP
);



