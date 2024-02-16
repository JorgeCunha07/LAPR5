%:-consult('factos.pl').
:-consult('factos_retangulares.pl').
:-consult('predicados.pl').
:-consult('tarefas_BF.pl').
:-consult('genetica.pl').
:-consult('server.pl').


starter:-
graphs(a,a1,5,5),
adicionar_tarefa_completa(a, cel(a,a1,3,2), cel(a,a1,2,3)),
adicionar_tarefa_completa(b, cel(a,a1,2,2), cel(a,a1,2,4)),
adicionar_tarefa_completa(c, cel(a,a1,1,1), cel(a,a1,2,5)),
adicionar_tarefa_completa(d, cel(a,a1,1,5), cel(a,a1,2,5)),
adicionar_tarefa_completa(e, cel(a,a1,3,3), cel(a,a1,4,4)),
escrever_grafo,
tarefas_txt,
permutacoes.


starter_retangular:-
graphs(g,g1,9,3),
adicionar_tarefa_completa(tarefaG, cel(g,g1,2,2), cel(g,g1,7,2)),
adicionar_tarefa_completa(tarefaT, cel(g,g1,2,2), cel(g,g1,6,2)),
adicionar_tarefa_completa(tarefaZ, cel(g,g1,2,2), cel(g,g1,5,2)),
adicionar_tarefa_completa(tarefaX, cel(g,g1,2,2), cel(g,g1,3,3)),
adicionar_tarefa_completa(tarefaL, cel(g,g1,6,2), cel(g,g1,2,3)),
adicionar_tarefa_completa(tarefaP, cel(g,g1,7,2), cel(g,g1,2,2)),
adicionar_tarefa_completa(tarefaR, cel(g,g1,8,3), cel(g,g1,5,3)),
adicionar_tarefa_completa(tarefaJ, cel(g,g1,2,3), cel(g,g1,6,1)),
escrever_grafo,
tarefas_txt,
permutacoes_retangulares.


permutacoes:-
gerar_permutacoes([a,b,c,d,e], ListaDeListasModificadas),
permutacoes_txt.
% ?- gerar_e_calcular_minimo_custo([a,b,c,d,e] MinSequence, MinCost).

permutacoes_retangulares:-
gerar_permutacoes([tarefaG,tarefaT,tarefaZ,tarefaX,tarefaL,tarefaP,tarefaR], ListaDeListasModificadas),
permutacoes_txt.

% ?- gerar_e_calcular_minimo_custo([tarefaG,tarefaT,tarefaZ,tarefaX,tarefaL,tarefaP,tarefaR] MinSequence, MinCost).


testar:-
starter,
permutacoes,
gerar_e_calcular_minimo_custo([a,b,c,d,e], MinSequence, MinCost),
  write('Lista ->'),  write(MinSequence),
  write(', Custo ->'),  write(MinCost).


testar_retangular:-
starter_retangular,
permutacoes_retangulares,
 statistics(walltime, [StartTime|_]),  % Inicia a contagem do tempo
gerar_e_calcular_minimo_custo([tarefaG,tarefaT,tarefaZ,tarefaX,tarefaL,tarefaP,tarefaR], MinSequence, MinCost),
  statistics(walltime, [EndTime|_]),  % Finaliza a contagem do tempo
      TimeTaken is EndTime - StartTime,  % Calcula o tempo total
      write('Lista ->'),  write(MinSequence),
      write(', Custo ->'),  write(MinCost),
      write(', Tempo de execucao: '), write(TimeTaken), write(' ms').  % Exibe o tempo





