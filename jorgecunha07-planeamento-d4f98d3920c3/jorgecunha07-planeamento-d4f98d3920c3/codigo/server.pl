% server.pl
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/json)).
:- use_module(library(http/http_json)).
:- dynamic running_port/1.

% graphs(a, a1, 5, 5).
% graphs(a, a2, 5, 5).
% graphs(b, b1, 5, 5).

start_server(Port) :-
    http_server(http_dispatch, [port(Port)]),
    asserta(running_port(Port)).

% Stop a specific server with the given Port
stop_server(Port) :-
    retract(running_port(Port)),
    http_stop_server(Port, []).



:- http_handler('/planning/create', create_graph, [prefix]).
create_graph(Request) :-
    cors_enable(Request, [methods([get])]),
    http_parameters(Request, [edificio(Edificio, []), piso(Piso, []), coluna(Coluna, []), linha(Linha, [])]),
    atom_number(Coluna, ColunaNum),
    atom_number(Linha, LinhaNum),
    graphs(Edificio, Piso, ColunaNum, LinhaNum),
    reply_json(_{message: "Operação concluída com sucesso"}).




:- http_handler('/planning/path', aStarHandler, [prefix]).
% Modify the aStarHandler predicate to correctly parse the inicio and fim parameters
aStarHandler(Request) :-
    cors_enable(Request, [methods([get])]),
    http_parameters(Request, [inicio(InicioAtom, []), fim(FimAtom, [])]),

    % Convert the atoms into Prolog terms
    term_string(Inicio, InicioAtom),
    term_string(Fim, FimAtom),

    once(aStar(Inicio, Fim, Path, Cost)),  % Use the parsed terms in the aStar call
    jsonify_path_cost(Path, Cost, JSONObject),  % Convert the path and cost into JSON
    reply_json(JSONObject).


% Predicado para converter caminho e custo em JSON
jsonify_path_cost(Path, Cost, JSONObject) :-
    maplist(jsonify_cell, Path, JsonPath),  % Converta cada célula em JSON
    JSONObject = json([path=JsonPath, cost=Cost]).

% Predicado para converter uma célula em JSON
jsonify_cell(cel(Building, Floor, Col, Lin), JSONCell) :-
    JSONCell = json([building=Building, floor=Floor, col=Col, lin=Lin]).


    % aStar(cel(a,a1,1,2),cel(a,a1,3,3),Path,Cost).











% adicionar_tarefa_completa(a, cel(a,a1,3,2), cel(a,a1,2,3))

:- http_handler('/planning/createTask', adicionar_tarefa_completass, [prefix]).
adicionar_tarefa_completass(Request) :-
    cors_enable(Request, [methods([post])]),
    http_parameters(Request, [taskName(TaskName, []), inicio(InicioAtom, []), fim(FimAtom, [])]),
    % Convert the atoms into Prolog terms
    term_string(Inicio, InicioAtom),
    term_string(Fim, FimAtom),
    adicionar_tarefa_completa(TaskName, Inicio, Fim),
    reply_json(_{message: "Operação concluída com sucesso"}).

:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).


:- http_handler('/planning/caminhotarefas', taskOrganizer, [prefix]).

taskOrganizer(Request) :-
    cors_enable(Request, [methods([post])]),

    % Read the JSON body
    catch(
        http_read_json_dict(Request, JSONData, []),
        Error,
        (   format('Error reading JSON: ~w~n', [Error]), fail)
    ),

    % Check for the 'lista' key and ensure it's a string
    (   get_dict(lista, JSONData, ListaString),
        string(ListaString)
    ->  % Process the 'lista' string
        split_string(ListaString, ",", " ", ListaSplit),
        maplist(atom_string, Lista, ListaSplit),

        % Call your custom method here
        once(gerar_e_calcular_minimo_custo(Lista, MinSequence, MinCost)),

        % Respond with the calculated minimum sequence and cost
        reply_json(_{message: "Calculations completed", minSequence: MinSequence, minCost: MinCost})
    ;   % If 'lista' is missing or not a string, respond with an error
        reply_json_dict(_{error: "'lista' parameter missing or not a valid string"}, [status(400)])
    ).




%gerar_e_calcular_minimo_custo([tarefaG,tarefaT,tarefaZ,tarefaX,tarefaL,tarefaP,tarefaR], MinSequence, MinCost),