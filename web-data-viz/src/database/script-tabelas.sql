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

CREATE TABLE livro (
idLivro int primary key auto_increment,
nome varchar(45));

SELECT * FROM livro;

CREATE TABLE votacao (
idVotacao int auto_increment,
fkUsuario int,
fkLivro int,
primary key (idVotacao, fkUsuario, fkLivro),
foreign key (fkUsuario) 
references usuario(idUsuario),
foreign key (fkLivro)
references livro(idLivro),
dataHora DATETIME DEFAULT CURRENT_TIMESTAMP
);




INSERT INTO livro(nome) VALUES
('Livro1'),
('Livro2'),
('Livro3'),
('Livro4');


select * from livro;
select * from usuario;
select * from votacao;




insert into usuario values 
(default, 'natalia', 'souza', '11958706277','natalia@souza.com', 'Na1234.5', 'Na1234.5');