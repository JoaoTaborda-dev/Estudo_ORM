# Estudo_ORM

Teste ok - O cliente não gostaria que registros importantes do sistema, como as Pessoas, sejam apagados definitivamente do banco de dados.

Teste ok - Para deixar a interface mais limpa, o cliente gostaria que na lista de Pessoas, por padrão, fossem exibidos somente os usuários ativos.

#--OBS: eu tinha feito colocando um where na querie para que fosse retornado somente as pessoas com o campo ativo igual true, durante a aula foi passado a teoria de escopo tornando possivel assim que pessoas que não estivessem ativas não se encaixem na pesquisas feitas.

Teste ok - Foram percebidas algumas falhas de validação dos formulários por parte do front-end, o que resultou em dados de email inválidos no banco. É desejável que essa validação não seja responsabilidade exclusiva do front.

#--OBS: Eu já tinha implementado validação de emial, porém de maneira rasa, somente verificando se o campo email estava sendo enviado como string, durante a aula foi ensina a validação por atributo implementada no sequelize, deixando a validação melhor do que eu tinha montado. Fazendo a validação do emial funcionar corretamente.

É importante poder consultar todas as matrículas confirmadas referentes a estudante X de forma rápida.

O cliente gostaria de poder consultar as turmas abertas por intervalo de data, para não receber informações desnecessárias (como turmas antigas).

O cliente quer poder consultar as matrículas por turma e saber quais delas estão lotadas, para organizar melhor as matrículas.

O cliente gostaria que, uma vez que o cadastro de um estudante fosse desativado, todas as matrículas relativas a este estudante automaticamente passassem a constar como “canceladas”.
