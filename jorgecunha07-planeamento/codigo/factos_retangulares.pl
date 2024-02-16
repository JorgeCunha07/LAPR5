%ligas
liga(g,e).


%ligaPisos
pisos(g,[g1]).
pisos(e,[e1]).

%elevador
elevador(g,[g1,g2],cel(0,0)).

%passageway
passageway(g,e,g1,e1,cel(1,5),cel(3,5)).
passageway(e,g,e1,g1,cel(3,5),cel(1,5)).

%m(Edificio,piso,coluna,linha,valor)

%Building:g  piso:g1
%coluna :1,2,3
%linha 1:1,1,1
%linha 2:0,0,1
%linha 3:0,0,1
%linha 4:1,0,1
%linha 5:0,0,1
%linha 6:1,0,1
%linha 7:1,0,1
%linha 8:1,1,1
%linha 9:1,0,1

%Building:g  piso:1

m(g, g1, 1, 1, 0).
m(g, g1, 1, 2, 0).
m(g, g1, 1, 3, 0).

m(g, g1, 2, 1, 0).
m(g, g1, 2, 2, 0).
m(g, g1, 2, 3, 0).

m(g, g1, 3, 1, 0).
m(g, g1, 3, 2, 0).
m(g, g1, 3, 3, 0).

m(g, g1, 4, 1, 0).
m(g, g1, 4, 2, 0).
m(g, g1, 4, 3, 0).

m(g, g1, 5, 1, 0).
m(g, g1, 5, 2, 0).
m(g, g1, 5, 3, 0).

m(g, g1, 6, 1, 0).
m(g, g1, 6, 2, 0).
m(g, g1, 6, 3, 0).

m(g, g1, 7, 1, 0).
m(g, g1, 7, 2, 0).
m(g, g1, 7, 3, 0).

m(g, g1, 8, 1, 0).
m(g, g1, 8, 2, 0).
m(g, g1, 8, 3, 0).

m(g, g1, 9, 1, 0).
m(g, g1, 9, 2, 0).
m(g, g1, 9, 3, 0).





%Building:e  piso:e1
%coluna :1,2,3
%linha 1:1,0,1
%linha 2:0,0,0
%linha 3:1,0,1
%linha 4:1,0,0
%linha 5:1,0,0
%linha 6:1,0,1
%linha 7:0,0,0
%linha 8:0,1,1
%linha 9:0,0,1

%Building e piso 1

m(e, e1, 1, 1, 1).
m(e, e1, 1, 2, 0).
m(e, e1, 1, 3, 1).

m(e, e1, 2, 1, 0).
m(e, e1, 2, 2, 0).
m(e, e1, 2, 3, 0).

m(e, e1, 3, 1, 1).
m(e, e1, 3, 2, 0).
m(e, e1, 3, 3, 1).

m(e, e1, 4, 1, 1).
m(e, e1, 4, 2, 0).
m(e, e1, 4, 3, 0).

m(e, e1, 5, 1, 1).
m(e, e1, 5, 2, 0).
m(e, e1, 5, 3, 0).

m(e, e1, 6, 1, 1).
m(e, e1, 6, 2, 0).
m(e, e1, 6, 3, 1).

m(e, e1, 7, 1, 0).
m(e, e1, 7, 2, 0).
m(e, e1, 7, 3, 0).

m(e, e1, 8, 2, 1).
m(e, e1, 8, 3, 1).
m(e, e1, 9, 3, 1).