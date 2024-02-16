:- dynamic tarefa_existentes/2.
:- dynamic origem_tarefa/2.
:- dynamic destino_tarefa/2.
:- dynamic lista_tarefas/1.


% Predicado para procurar todas as tarefas existentes em uma lista
buscar_todas_tarefas(ListaTarefas) :-
    findall(Nome, tarefa_existentes(Nome, _), ListaTarefas),
    assertz(lista_tarefas(ListaTarefas)).


% Remover os dados criados
limpar_dados :-
    retractall(tarefa_existentes(_,_)),
    retractall(origem_tarefa(_,_)),
    retractall(destino_tarefa(_,_)),
    retractall(lista_tarefas(_)).


%   Este predicado é utilizado para adicionar uma tarefa completa ao banco de dados dinâmico.
    adicionar_tarefa_completa(Nome, Origem, Destino) :-
    aStar(Origem,Destino,_,Custo),
    CustoFinal is round(Custo * 100000) / 100000,
    adicionar_tarefa(Nome, CustoFinal),
    origem_tarefa_criada(Nome, Origem),
    destino_tarefa_criada(Nome, Destino).


  
adicionar_tarefa(Nome, Custo) :-
      assertz(tarefa_existentes(Nome, Custo)).
   
origem_tarefa_criada(Nome,PontoOrigem):-
      assertz(origem_tarefa(Nome,PontoOrigem)).
   
   
destino_tarefa_criada(Nome,PontoOrigem):-
      assertz(destino_tarefa(Nome,PontoOrigem)).


