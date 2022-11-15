CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    url VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    likes INTEGER DEFAULT(0)
);

insert into blogs (author, url, title) values ('Sami Mäkinen', 'bloginen.com', 'Koodia kummastelemassa');
insert into blogs (author, url, title) values ('Teppo Vuorinen', 'koodaillen.org', 'Bugi, mikä ihana tekosyy');