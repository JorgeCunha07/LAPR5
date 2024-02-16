:-consult('criacao_Tarefas.pl').
:- dynamic permutacoes/1.

% Predicado para calcular o custo total das tarefas
calcular_custo_lista_tarefa(ListaTarefas, CustoTotal) :-
    calculo_custo_caminho_tarefas(ListaTarefas, 0, CustoTotal).

% Predicado auxiliar para calcular o custo de uma única tarefa
calcular_custo_unica_tarefa(Tarefa, CustoTarefaTotal) :-
    tarefa_existentes(Tarefa, CustoTarefa),
    destino_tarefa(Tarefa, Destino),
    origem_tarefa(Tarefa, Origem),
    entre_tarefas(Origem, Destino, CustoDeslocamento),
    CustoTarefaTotal is CustoTarefa + CustoDeslocamento.

% Caso base: lista vazia
calculo_custo_caminho_tarefas([], Acumulado, Acumulado).

% Caso para uma única tarefa na lista
calculo_custo_caminho_tarefas([Tarefa], Acumulado, CustoFinal) :-
    calcular_custo_unica_tarefa(Tarefa, CustoTarefa),
    CustoFinal is Acumulado + CustoTarefa.

% Caso para duas ou mais tarefas na lista
calculo_custo_caminho_tarefas([TarefaInicial, TarefaIntermedia | Resto], Acumulado, CustoFinal) :-
    calcular_custo_unica_tarefa(TarefaInicial, CustoTarefa1),
    destino_tarefa(TarefaInicial, Destino1),
    origem_tarefa(TarefaIntermedia, Origem2),
    entre_tarefas(Origem2, Destino1, CustoEntreTarefas),
    NovoAcumulado is Acumulado + CustoTarefa1 + CustoEntreTarefas,
    calculo_custo_caminho_tarefas([TarefaIntermedia | Resto], NovoAcumulado, CustoFinal).




% Gera uma permutação da lista fornecida.
% Lista é a lista original a ser permutada, e Permutacao é uma das permutações possíveis.
rearranjar_lista([], []).  % Caso base: a permutação de uma lista vazia é uma lista vazia.
rearranjar_lista(Lista, [X|Resto]) :-
    modificacai_lista(X, Lista, NovaLista),   % Seleciona um elemento X da Lista e obtém o resto da lista sem X.
    rearranjar_lista(NovaLista, Resto).  % Gera permutações recursivamente para o resto da lista.




% modificacai_lista(Elemento, Lista, ListaModificada)
% Seleciona um elemento da lista, removendo-o da mesma, e retorna a lista modificada.
% Elemento é o elemento a ser removido, Lista é a lista original, e ListaModificada é a lista após a remoção de Elemento.
modificacai_lista(X, [X|Resto], Resto).  % Caso em que X é o primeiro elemento da lista, retorna o resto da lista.
modificacai_lista(X, [Y|Resto], [Y|Lista]) :-
    modificacai_lista(X, Resto, Lista).  % Caso recursivo: procura por X no resto da lista e mantém o primeiro elemento Y.

% rearranjar_lista([a,b,c,d,e], Permutation).




% Gera todas as permutações possíveis para a lista de tarefas fornecida.
% ListaTarefas é a lista original a ser permutada, e ListaDeListasModificadas é a lista de todas as permutações possíveis.

gerar_permutacoes(ListaTarefas, ListaDeListasModificadas) :-
    findall(Permutacao, rearranjar_lista(ListaTarefas, Permutacao), ListaDeListasModificadas),  % Usa findall para coletar todas as permutações de ListaTarefas.
    assertz(permutacoes(ListaDeListasModificadas)).  % Armazena a lista de permutações na base de dados dinâmica.
% gerar_permutacoes([a,b,c,d,e], ListaDeListasModificadas)

% Predicate to find the sequence with the minimum cost
calcular_minimo_custo_permutacoes([], MinSequence, MinCost, MinSequence, MinCost).
calcular_minimo_custo_permutacoes([Sequence | Rest], CurrentMinSequence, CurrentMinCost, MinSequence, MinCost) :-
    calcular_custo_lista_tarefa(Sequence, Cost),
    (Cost < CurrentMinCost ->
        NewMinSequence = Sequence,
        NewMinCost = Cost;
        NewMinSequence = CurrentMinSequence,
        NewMinCost = CurrentMinCost
    ),
    calcular_minimo_custo_permutacoes(Rest, NewMinSequence, NewMinCost, MinSequence, MinCost).

% Predicate to start the process
calcular_custo_lista_tarefa_inicial([], _, _) :- writeln('Lista de sequencias vazia.').
calcular_custo_lista_tarefa_inicial([FirstSequence | RestSequences], MinSequence, MinCost) :-
    calcular_custo_lista_tarefa(FirstSequence, FirstCost),
    calcular_minimo_custo_permutacoes(RestSequences, FirstSequence, FirstCost, MinSequence, MinCost).
% ?- calcular_custo_lista_tarefa_inicial([[a,b,c,d,e], [b,c,d,a,e], [a,b,c,e,d]], MinSequence, MinCost).
%calcular_custo_lista_tarefa_inicial([[a]], MinSequence, MinCost).



entre_tarefas(PontoOrigem, PontoDestino, Custo):-
  aStar(PontoOrigem, PontoDestino,_,Custo).


% gerar_e_calcular_minimo_custo(ListaTarefas, Lista, MenorCusto)
% Gera todas as permutações da ListaTarefas e encontra a permutação com o menor custo.
gerar_e_calcular_minimo_custo(ListaTarefas, Lista, MenorCusto) :-
    gerar_permutacoes(ListaTarefas, Permutacoes),
    calcular_custo_lista_tarefa_inicial(Permutacoes, Lista, MenorCusto).


% ?- gerar_e_calcular_minimo_custo([tarefaG,tarefaT,tarefaZ,tarefaX] MinSequence, MinCost).



tarefas_txt:-
  tell('tarefas_existentes.txt'),
  write('Tarefas_Existentes:'),nl,
  tarefa_existentes(TarefaNome, TarefaCusto),
  write(TarefaNome-TarefaCusto),
  nl, fail; told.

permutacoes_txt:-
  tell('lista_permutacoes.txt'),
  write('Permutacoes:'),nl,
  permutacoes(LISTAS), write(LISTAS),
  nl, fail; told.


