create database projetoPessoal;

use projetoPessoal;

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(45),
sobrenome varchar(45),
telefone char(12),
email varchar(45),
senha varchar(45),
confirmarSenha varchar(45)
);



create table votacao (
idVoto int primary key auto_increment,
qntdVoto int,
comentarios varchar(45),
dtHora datetime
);

create table metricas (
idMetricas int primary key auto_increment,
fkUsuario int,
constraint fkUsuarioMetrica foreign key (fkUsuario) references usuario(idUsuario),
fkVotacao int,
constraint fkVotoMetrica foreign key (fkVotacao) references votacao(idVoto)
);

create table livro (
idLivro int primary key,
nomeLivro varchar(45)
);

ALTER TABLE metricas ADD COLUMN fkLivro INT, 
ADD CONSTRAINT fkLivroMetrica FOREIGN KEY (fkLivro) REFERENCES livro(idLivro);

select * from usuario where email;

select * from livro;
select * from usuario;
select * from votacao;
select * from metricas;

insert into usuario values 
(default, 'natalia', 'souza', '11958706277','natalia@souza.com', 'Na1234.5', 'Na1234.5');