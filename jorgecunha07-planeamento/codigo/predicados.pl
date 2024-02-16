:-dynamic m/5.
:-dynamic pisos/2.
:-dynamic ligacel/3.
:-dynamic elevador/2.

%Criar Matriz com todos os valores a 0.
cria_matriz(Building, Floor) :-
    retractall(m(_,_,_,_,_)),
    retractall(ligacel(_,_)),
    write('Numero de Colunas: '), read(NCol), nl,
    write('Numero de Linhas: '), read(NLin), nl, asserta(nlin(NLin)),
    cria_matriz_0(Building, Floor, NCol, NLin), graphs(Building,Floor,NCol, NLin), retract(nlin(_)).

cria_matriz_0(Building, Floor, 1, 1) :- !, 
    asserta(m(Building, Floor, 1, 1, 0)).

cria_matriz_0(Building, Floor, NCol, 1) :- !, 
    asserta(m(Building, Floor, NCol, 1, 0)), 
    NCol1 is NCol - 1, nlin(NLin), cria_matriz_0(Building, Floor, NCol1, NLin).

cria_matriz_0(Building, Floor, NCol, NLin) :- 
    asserta(m(Building, Floor, NCol, NLin, 0)), 
    NLin1 is NLin - 1, cria_matriz_0(Building, Floor, NCol, NLin1).


%criar Grafo diagonais todos os lados e diagonais.
graphs(Building,Floor,_,0):-!,create_passageway_connections(Building, Floor),create_elevator_connections(Building).
graphs(Building,Floor,Col,Lin):-graphs_aux(Building,Floor,Col,Lin),Lin1 is Lin-1,graphs(Building,Floor,Col,Lin1).
graphs_aux(_,_,0,_):-!.
graphs_aux(Building,Floor,Col,Lin):-m(Building,Floor,Col,Lin,0),!,
ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
    ((m(Building,Floor,ColS,Lin,0),
    assertz(ligacel(cel(Building,Floor,Col,Lin),cel(Building,Floor,ColS,Lin),1));true)),% para a direita

    ((m(Building,Floor,ColA,Lin,0),
    assertz(ligacel(cel(Building,Floor,Col,Lin),cel(Building,Floor,ColA,Lin),1));true)),% para a esquerda

    ((m(Building,Floor,Col,LinS,0),
    assertz(ligacel(cel(Building,Floor,Col,Lin),cel(Building,Floor,Col,LinS),1));true)),% para a cima

    ((m(Building,Floor,Col,LinA,0),
    assertz(ligacel(cel(Building,Floor,Col,Lin),cel(Building,Floor,Col,LinA),1));true)),% para a baixo
    
    ((((m(Building,Floor,ColA,Lin,0),m(Building,Floor,ColA,LinS,0));(m(Building,Floor,Col,LinS,0),m(Building,Floor,ColA,LinS,0))),
    assertz(ligacel(cel(Building,Floor,Col,Lin),cel(Building,Floor,ColA,LinS),1.4));true)), %diagonal esquerda cima

    ((((m(Building,Floor,ColA,Lin,0),m(Building,Floor,ColA,LinA,0));(m(Building,Floor,Col,LinA,0),m(Building,Floor,ColA,LinA,0))),
    assertz(ligacel(cel(Building,Floor,Col,Lin),cel(Building,Floor,ColA,LinA),1.4));true)), %diagonal esquerda baixo

    ((((m(Building,Floor,ColS,Lin,0),m(Building,Floor,ColS,LinS,0));(m(Building,Floor,Col,LinS,0),m(Building,Floor,ColS,LinS,0))),
    assertz(ligacel(cel(Building,Floor,Col,Lin),cel(Building,Floor,ColS,LinS),1.4));true)), %diagonal direita cima

    ((((m(Building,Floor,ColS,Lin,0),m(Building,Floor,ColS,LinA,0));(m(Building,Floor,Col,LinA,0),m(Building,Floor,ColS,LinA,0))),
    assertz(ligacel(cel(Building,Floor,Col,Lin),cel(Building,Floor,ColS,LinA),1.4));true)), %diagonal direita baixo

    Col1 is Col-1,
    graphs_aux(Building,Floor,Col1,Lin).%Criar Passagem entre pisos e Criar o elevador para utilizar.
    graphs_aux(Building,Floor,Col,Lin):-Col1 is Col-1,graphs_aux(Building,Floor,Col1,Lin).

escrever_grafo :-
    tell('grafo_pesos.txt'),  
    % abre o ficheiro 'grafo_pesos.txt' para escrita
    findall(_, (ligacel(A, B, C), writeq(A-B-C), nl), _),
    told.  
    % fecha o ficheiro


create_passageway_connections(Building, Floor):-
    findall(passageway(Building, OtherBuilding, Floor, OtherFloor, cel(ColA,LinA), cel(ColB,LinB)), 
            passageway(Building, OtherBuilding, Floor, OtherFloor, cel(ColA,LinA), cel(ColB,LinB)), 
            Passageways),
    process_passageways(Passageways).


process_passageways([]).  % nao ha mais passagens
process_passageways([passageway(BuildingA, BuildingB, FloorA, FloorB,cel(ColA,LinA), cel(ColB,LinB)) | Rest]):-
    assertz(ligacel(cel(BuildingA,FloorA,ColA,LinA),cel(BuildingB,FloorB,ColB,LinB),1)),  % Cria conexao entre as duas celulas
    assertz(ligacel(cel(BuildingB,FloorB,ColB,LinB),cel(BuildingA,FloorA,ColA,LinA),1)),  % Cria conexao entre as duas celulas
    % cria a conexao inversa
    process_passageways(Rest).  
    % Processa o resto das passagens
%?- create_passageway_connections(a,a1).

create_elevator_connections(Building):-
    findall(elevador(Building, Floors, cel(Col,Lin) ), elevador(Building, Floors, cel(Col,Lin) ), Elevators),
    process_elevators(Elevators).


process_elevators([]).  % Caso de base: não há mais elevadores a processar
process_elevators([elevador(Building, Floors, cel(Col,Lin)) | Rest]):-
    process_elevator_floors(Building, Floors, cel(Col,Lin)),
    process_elevators(Rest).


process_elevator_floors(_, [], _).  % Mais nenhum piso para processar
process_elevator_floors(Building, [Floor | OtherFloors], cel(Col, Lin)):-
    process_floor_connection(Building, Floor, OtherFloors, Col, Lin),
    process_elevator_floors(Building, OtherFloors, cel(Col, Lin)).


process_floor_connection(_, _, [], _,_).  % Não existe mais conexões para processar
process_floor_connection(Building, Floor, [OtherFloor | RemainingFloors], Col, Lin):-
    assertz(ligacel(cel(Building, Floor, Col, Lin), cel(Building, OtherFloor, Col, Lin), 1)),  % Cria conexao entre as duas celulas
    assertz(ligacel(cel(Building, OtherFloor, Col, Lin), cel(Building, Floor, Col, Lin), 1)),  % Cria conexao entre as duas celulas
    process_floor_connection(Building, Floor, RemainingFloors, Col, Lin).
% ?- create_elevator_connections(a).



%DFS Depth First Search
dfs(Orig, Dest, Cam, Cost):-
    get_time(Ti),
    dfs2(Orig, Dest, [Orig], Cam, 0, Cost),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao:'),write(T),nl.

dfs2(Dest, Dest, LA, Cam, Cost, Cost):-
    reverse(LA, Cam).

dfs2(Act, Dest, LA, Cam, AccCost, Cost):-
    ligacel(Act, X, C), % C é custo da ligação
    \+ member(X, LA),   % evita ciclos
    NewCost is AccCost + C, % Acumla o custo
    dfs2(X, Dest, [X|LA], Cam, NewCost, Cost).
%?- dfs(cel(a,a1,1,2),cel(a,a1,3,3),Path,Cost).




%ALL DFS Depth First Search
all_dfs(Orig, Dest, LCams, Costs):-
    get_time(Ti),
    findall(Cam-Cost, dfs(Orig, Dest, Cam, Cost), CamCostPairs),
    separate_cams_costs(CamCostPairs, LCams, Costs),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao:'),write(T),nl.

separate_cams_costs([], [], []).
separate_cams_costs([Cam-Cost | CamCostPairs], [Cam | LCams], [Cost | Costs]) :-
    separate_cams_costs(CamCostPairs, LCams, Costs).
%?- all_dfs(cel(a,a1,1,2),cel(a,a1,3,3),Path,Cost).


% Better DFS Depth First Search nao a melhor versão
semiBetter_dfs(Orig, Dest, BestCam, BestCost):-
    get_time(Ti),
    all_dfs(Orig, Dest, LCams, Costs),
    pair_lists(LCams, Costs, Paired),
    min_cost_path(Paired, BestCam, BestCost),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao:'),write(T),nl.

pair_lists([], [], []).
pair_lists([Cam|Cams], [Cost|Costs], [Cam-Cost|Paired]) :-
    pair_lists(Cams, Costs, Paired).

min_cost_path([Cam-Cost], Cam, Cost).
min_cost_path([Cam-Cost|CamCostPairs], BestCam, BestCost):-
    min_cost_path(CamCostPairs, Cam1, Cost1),
    (Cost < Cost1 -> (BestCam = Cam, BestCost = Cost); (BestCam = Cam1, BestCost = Cost1)).
%?- semiBetter_dfs(cel(a,a1,1,2),cel(a,a1,3,3),Path,Cost).


% Better DFS Depth First Search a melhor versão
better_dfs1(Orig,Dest,LCaminho_minlig,C):-
    get_time(Ti),
    (better_dfs11(Orig,Dest);true),
    retract(melhor_sol_dfs(LCaminho_minlig,C)),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao:'),write(T),nl.
 
better_dfs11(Orig,Dest):-
    asserta(melhor_sol_dfs(_,10000)),
    dfs(Orig,Dest,LCaminho,Custo),
    atualiza_melhor_dfs(LCaminho,Custo),
    fail.
 
atualiza_melhor_dfs(LCaminho,Custo):-

    melhor_sol_dfs(_,N),
    Custo<N,retract(melhor_sol_dfs(_,_)),
    asserta(melhor_sol_dfs(LCaminho,Custo)).
%?- better_dfs1(cel(a,a1,1,2),cel(a,a1,3,3),Path,Cost).

% BFS Breadth First Search
bfs(Orig, Dest, Cam, Cost):-
    get_time(Ti),
    bfs2(Dest, [([Orig], 0)], Cam, Cost),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao:'),write(T),nl.

bfs2(Dest, [([Dest|T], Cost)|_], Cam, Cost):-
    reverse([Dest|T], Cam).

bfs2(Dest, [(LA, AccCost)|Outros], Cam, FinalCost):-
    LA = [Act|_],
    findall(([X|LA], NewCost),
            (Dest \== Act, ligacel(Act, X, C), \+ member(X, LA), NewCost is AccCost + C),
            Novos),
    append(Outros, Novos, Todos),
    bfs2(Dest, Todos, Cam, FinalCost).
%?- bfs(cel(a,a1,1,2),cel(a,a1,3,3),Path,Cost).


aStar(Orig, Dest, Cam, Custo):-
    aStar2(Dest, [(_, 0, [Orig])], Cam, Custo).

aStar2(Dest, [(_, Custo, [Dest|T])|_], Cam, Custo):-
    reverse([Dest|T], Cam).

aStar2(Dest, [(_, Ca, LA)|Outros], Cam, CustoFinal):-
    LA = [Act|_],
    findall((CEX, CaX, [X|LA]),
        (Dest \== Act, 
         (ligacel(Act, X, CustoX); ligacel(X, Act, CustoX)),  % Bidirectional
         \+ member(X, LA),
         CaX is CustoX + Ca, 
         estimativa(X, Dest, EstX),
         CEX is CaX + EstX), 
        Novos),
    append(Outros, Novos, Todos),
    sort(Todos, TodosOrd),
    aStar2(Dest, TodosOrd, Cam, CustoFinal).

estimativa(cel(_, _, Col1, Lin1), cel(_, _, Col2, Lin2), Estimativa):-
    DX is Col2 - Col1,
    DY is Lin2 - Lin1,
    Estimativa is sqrt(DX^2 + DY^2).

%?- aStar(cel(a,a1,1,2),cel(a,a1,3,3),Path,Cost).

















% Não era necessario.

% Contar o numero de utilizacoes de elevador num path
% conta_elevadores(Path, Count)
% Path é uma lista de células (cel/4), Count é o número de vezes que um elevador é usado no caminho
conta_elevadores(Path, Count) :-
    conta_elevadores_aux(Path, 0, Count).

% conta_elevadores_aux(Path, TempCount, FinalCount)
% Path é a lista de células, TempCount é a contagem temporária, FinalCount é a contagem final
conta_elevadores_aux([], Count, Count). % Caso base: quando a lista está vazia, retorna a contagem atual

conta_elevadores_aux([_], Count, Count). % Caso base para um único elemento (final do caminho)

conta_elevadores_aux([cel(Bldg, Floor, _, _) | RestPath], TempCount, Count) :-
    RestPath = [cel(NextBldg, NextFloor, _, _) | _], % Pega o próximo item na lista
    (
        (Bldg == NextBldg, Floor \= NextFloor) % Se estiver no mesmo edifício, mas em pisos diferentes, é um elevador
        -> NewCount is TempCount + 1
        ; NewCount = TempCount
    ),
    conta_elevadores_aux(RestPath, NewCount, Count).


% conta_elevadores e conta_elevadores_aux são como definidos anteriormente

% menor_caminho_elevadores(ListaCaminhos, MenorCaminho)
% ListaCaminhos é uma lista de caminhos, MenorCaminho é o caminho com o menor número de utilização de elevadores
menor_caminho_elevadores(ListaCaminhos, MenorCaminho) :-
    conta_caminhos_elevadores(ListaCaminhos, CaminhosComContagem),
    sort(2, @=<, CaminhosComContagem, CaminhosOrdenados),
    CaminhosOrdenados = [MenorCaminho-_ | _].

% conta_caminhos_elevadores(Caminhos, CaminhosComContagem)
% Transforma uma lista de caminhos em uma lista de pares (Caminho, ContagemElevadores)
conta_caminhos_elevadores([], []).
conta_caminhos_elevadores([Caminho|RestoCaminhos], [Caminho-Contagem|RestoComContagem]) :-
    conta_elevadores(Caminho, Contagem),
    conta_caminhos_elevadores(RestoCaminhos, RestoComContagem).


%melhor caminho com menos elevadores

    best_path_dfs(Origin, Destination, BestPath) :-
    all_dfs(Origin, Destination, Paths, _),
    menor_caminho_elevadores(Paths, BestPath).


    best_path_bfs(Origin, Destination, BestPath) :-
    findall(Path, bfs(Origin, Destination, Path, _), Paths),
    menor_caminho_elevadores(Paths, BestPath).

    best_path_aStar(Origin, Destination, BestPath) :-
    findall(Path, aStar(Origin, Destination, Path, _), Paths),
    menor_caminho_elevadores(Paths, BestPath).



