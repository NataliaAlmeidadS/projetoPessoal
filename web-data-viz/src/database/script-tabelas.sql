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
nome varchar(45)
);

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

CREATE TABLE quiz (
    idQuiz INT PRIMARY KEY AUTO_INCREMENT,
    qntdAcertos INT,
    qntdErros INT,
    fkUsuario INT,
    dtQuiz timestamp,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

SELECT 
    u.idUsuario,
    u.nome,
    SUM(q.qntdAcertos) AS totalAcertos,
    SUM(q.qntdErros) AS totalErros
FROM 
    usuario u
LEFT JOIN 
    quiz q
ON 
    u.idUsuario = q.fkUsuario
GROUP BY 
    u.idUsuario, u.nome
ORDER BY 
    u.nome;	

select * from livro;
select * from usuario;
select * from votacao;
select * from quiz;

 SELECT 
 livro.nome as 'Livro Escolhido',
 count(idVotacao) as 'Livro Vencedor'
 FROM votacao 
 JOIN livro
 ON fkLivro = idLivro
 group by  livro.nome;

SELECT 
    usuario.idUsuario AS idUser,
    votacao.fkLivro, 
    votacao.dataHora
FROM 
    votacao
JOIN 
    usuario ON votacao.fkUsuario = usuario.idUsuario
WHERE 
    usuario.idUsuario = (SELECT MAX(idUsuario) FROM usuario) 
ORDER BY 
    votacao.dataHora DESC;


--  SELECT count(idVotacao) AS totalVotos FROM votacao;
  select count(u.nome) as qtd from usuario u left join votacao v on u.idUsuario = v.fkUsuario where u.idUsuario;
  
  select count(u.nome) as qtd from usuario u left join votacao v on u.idUsuario = v.fkUsuario where u.idUsuario = 4;

insert into usuario values 
(default, 'natalia', 'souza', '11958706277','natalia@souza.com', 'Na1234.5', 'Na1234.5');
    
    SELECT 
    livro.nome AS nomeLivro,
    usuario.idUsuario AS idUser,
    COUNT(votacao.fkLivro) AS qtdVotos,
    MAX(votacao.dataHora) AS ultimaVotacao
FROM 
    votacao
JOIN 
    usuario ON votacao.fkUsuario = usuario.idUsuario
JOIN 
    livro ON votacao.fkLivro = livro.idLivro
WHERE 
    usuario.idUsuario = 4 -- Considera o idUsuario específico
GROUP BY 
    livro.nome, usuario.idUsuario
ORDER BY 
    qtdVotos DESC;
    
SELECT * FROM quiz;

SELECT 
    usuario.idUsuario AS idUser,
    votacao.fkLivro, 
    votacao.dataHora
FROM 
    votacao
JOIN 
    usuario ON votacao.fkUsuario = usuario.idUsuario
WHERE 
    usuario.idUsuario = (SELECT MAX(idUsuario) FROM usuario) 
ORDER BY 
    votacao.dataHora DESC;
    
SELECT 
		COUNT(*) AS totalVotos
        FROM 
            votacao
        JOIN 
            usuario ON votacao.fkUsuario = usuario.idUsuario
        WHERE 
            usuario.idUsuario = 1;
    
SELECT 
    idQuiz,
    qntdAcertos,
    qntdErros,
    DATE_FORMAT(dtQuiz, '%d/%m/%Y') AS dataQuiz
FROM quiz
ORDER BY dtQuiz DESC;

select * from quiz;

