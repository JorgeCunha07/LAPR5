%ligas
liga(a,b).
liga(b,c).

%ligaPisos
pisos(a,[a1,a2]).
pisos(b,[b1]).
pisos(c,[c1]).

%passageway
passageway(a,b,a1,b1,cel(5,2),cel(2,5)).
passageway(b,c,b1,c1,cel(2,5),cel(5,2)).

%elevador
elevador(a,[a1,a2],cel(4,2)).

%m(Edificio,piso,coluna,linha,valor)

%Building:a  piso:a1
%coluna :1,2,3,4,5
%linha 1:1,1,1,1,1
%linha 2:1,0,0,0,0
%linha 3:1,0,1,0,1
%linha 4:1,0,0,0,1
%linha 5:1,1,1,1,1

%Building:a  piso:1
m(a, a1, 1, 1, 0).
m(a, a1, 1, 2, 0).
m(a, a1, 1, 3, 0).
m(a, a1, 1, 4, 0).
m(a, a1, 1, 5, 0).

m(a, a1, 2, 1, 0).
m(a, a1, 2, 2, 0).
m(a, a1, 2, 3, 0).
m(a, a1, 2, 4, 0).
m(a, a1, 2, 5, 0).

m(a, a1, 3, 1, 0).
m(a, a1, 3, 2, 0).
m(a, a1, 3, 3, 0).
m(a, a1, 3, 4, 0).
m(a, a1, 3, 5, 0).

m(a, a1, 4, 1, 0).
m(a, a1, 4, 2, 0).
m(a, a1, 4, 3, 0).
m(a, a1, 4, 4, 0).
m(a, a1, 4, 5, 0).

m(a, a1, 5, 1, 0).
m(a, a1, 5, 2, 0).
m(a, a1, 5, 3, 0).
m(a, a1, 5, 4, 0).
m(a, a1, 5, 5, 0).


%Building:a  piso:a2
%coluna :1,2,3,4,5
%linha 1:1,1,1,1,1
%linha 2:0,0,0,0,1
%linha 3:1,0,1,0,1
%linha 4:1,0,0,0,1
%linha 5:1,1,1,1,1

%Building A piso 2

m(a, a2, 1, 1, 1).
m(a, a2, 1, 2, 1).
m(a, a2, 1, 3, 1).
m(a, a2, 1, 4, 1).
m(a, a2, 1, 5, 1).

m(a, a2, 2, 1, 0).
m(a, a2, 2, 2, 0).
m(a, a2, 2, 3, 0).
m(a, a2, 2, 4, 0).
m(a, a2, 2, 5, 1).

m(a, a2, 3, 1, 1).
m(a, a2, 3, 2, 0).
m(a, a2, 3, 3, 1).
m(a, a2, 3, 4, 0).
m(a, a2, 3, 5, 1).

m(a, a2, 4, 1, 0).
m(a, a2, 4, 2, 0).
m(a, a2, 4, 3, 0).
m(a, a2, 4, 4, 0).
m(a, a2, 4, 5, 1).

m(a, a2, 5, 1, 0).
m(a, a2, 5, 2, 0).
m(a, a2, 5, 3, 1).
m(a, a2, 5, 4, 1).
m(a, a2, 5, 5, 1).


%Building B piso 1
%coluna :1,2,3,4,5
%linha 1:1,1,1,1,1
%linha 2:0,0,0,0,0
%linha 3:1,1,1,1,1
%linha 4:1,1,1,1,1
%linha 5:1,1,1,1,1

%Building B piso 1

m(b,b1,1,1,0).
m(b,b1,2,1,0).
m(b,b1,3,1,0).
m(b,b1,4,1,0).
m(b,b1,5,1,0).

m(b,b1,1,2,0).
m(b,b1,2,2,0).
m(b,b1,3,2,0).
m(b,b1,4,2,0).
m(b,b1,5,2,0).

m(b,b1,1,3,0).
m(b,b1,2,3,0).
m(b,b1,3,3,0).
m(b,b1,4,3,0).
m(b,b1,5,3,0).

m(b,b1,1,4,0).
m(b,b1,2,4,0).
m(b,b1,3,4,0).
m(b,b1,4,4,0).
m(b,b1,5,4,0).

m(b,b1,1,5,0).
m(b,b1,2,5,0).
m(b,b1,3,5,0).
m(b,b1,4,5,0).
m(b,b1,5,5,0).

%Building C piso 1
%coluna :1,2,3,4,5
%linha 1:1,1,1,1,1
%linha 2:0,0,0,0,0
%linha 3:1,1,1,1,1
%linha 4:1,1,1,1,1
%linha 5:1,1,1,1,1

%Building C piso 1
m(c,c1,1,1,0).
m(c,c1,2,1,0).
m(c,c1,3,1,0).
m(c,c1,4,1,1).
m(c,c1,5,1,0).

m(c,c1,1,2,0).
m(c,c1,2,2,0).
m(c,c1,3,2,1).
m(c,c1,4,2,0).
m(c,c1,5,2,0).

m(c,c1,1,3,0).
m(c,c1,2,3,0).
m(c,c1,3,3,0).
m(c,c1,4,3,0).
m(c,c1,5,3,0).

m(c,c1,1,4,0).
m(c,c1,2,4,0).
m(c,c1,3,4,0).
m(c,c1,4,4,0).
m(c,c1,5,4,1).

m(c,c1,1,5,1).
m(c,c1,2,5,1).
m(c,c1,3,5,1).
m(c,c1,4,5,1).
m(c,c1,5,5,1).


