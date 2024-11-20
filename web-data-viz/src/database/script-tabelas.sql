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

 SELECT 
 livro.nome as 'Livro Escolhido',
 count(idVotacao) as 'Livro Vencedor'
 FROM votacao 
 JOIN livro
 ON fkLivro = idLivro
 group by  livro.nome;


--  SELECT count(idVotacao) AS totalVotos FROM votacao;
   


  select count(u.nome) as qtd from usuario u left join votacao v on u.idUsuario = v.fkUsuario where u.idUsuario;

insert into usuario values 
(default, 'natalia', 'souza', '11958706277','natalia@souza.com', 'Na1234.5', 'Na1234.5');