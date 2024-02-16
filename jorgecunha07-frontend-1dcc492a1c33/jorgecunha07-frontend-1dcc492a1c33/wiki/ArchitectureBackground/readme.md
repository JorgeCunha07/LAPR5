## Background da Arquitetura
## Introdução

O projeto delineado visa desenvolver módulos para gestão de campus e gestão de frota, integrando funcionalidades diversas que vão desde a criação e edição de edifícios e pisos até à gestão de robôs em uma frota.
A arquitetura deste sistema necessita ser robusta e modular para suportar a vasta gama de requisitos e funcionalidades requeridas.

## Influências e Restrições Significativas

A arquitetura do sistema é influenciada por vários fatores, incluindo a necessidade de modularidade para separar as funcionalidades de gestão de campus e gestão de frota,
a necessidade de integração entre os módulos, e as restrições impostas pelos requisitos de desempenho e segurança.

## Abordagens Arquitetônicas Principais

# Algumas abordagens arquitetônicas principais incluem:
# Cliente-Servidor:

Esta abordagem facilita a comunicação e integração entre os diversos módulos e funcionalidades do sistema.

# Microserviços:

A arquitetura de microserviços pode ser adotada para garantir que cada funcionalidade ou módulo do sistema seja independente e escalável.

# API RESTful:

Facilita a integração entre os módulos e permite uma comunicação eficaz entre o cliente e o servidor.

## Background do Problema
# Visão Geral do Sistema

O sistema é projetado para gerir infraestruturas de campus e operações de frota de robôs, proporcionando uma gestão eficiente e otimizada dos recursos e infraestruturas disponíveis.

# Contexto

O sistema desempenha um papel crucial na gestão eficaz dos recursos, tanto humanos quanto materiais, para garantir operações suaves e eficientes.
A arquitetura do software desempenha um papel fundamental na realização eficaz destes objetivos.

# Requisitos Impulsionadores

Os requisitos funcionais detalhados abrangem uma vasta gama de funcionalidades, desde a criação e edição de edifícios e pisos até à gestão e planeamento de operações de frota de robôs.
Os atributos de qualidade, como segurança e desempenho, são também de alta prioridade.

## Background da Solução
## Abordagens Arquitetônicas

# Baseado nos requisitos não funcionais e restrições de design, as seguintes abordagens/padrões/estilos foram adotados:

## Client-Server:

Os módulos MDR, MDV, e Planeamento atuam como servidores para outras aplicações clientes, facilitando a comunicação e integração entre módulos.

## Web Application:

A aplicação web do tipo Single Page Application (SPA) facilita a interação do usuário com o sistema.

## SOA:
As APIs proporcionam a integração necessária entre os módulos, garantindo que a informação seja compartilhada de forma eficaz e segura.
N-Tier e Layered Architecture (Onion Architecture): Estas abordagens garantem a modularidade e escalabilidade do sistema, além de facilitar a manutenção e extensão futura para aplicações móveis.

## Resultados da Análise
As análises qualitativas das abordagens e estilos adotados sugerem que a arquitetura proposta é robusta e capaz de atender às funcionalidades desejadas, além de proporcionar alta manutenibilidade, evolutabilidade e testabilidade do software.

## Mapeamento de Requisitos para Arquitetura
Esta seção será desenvolvida posteriormente para fornecer um mapeamento detalhado de como cada requisito é atendido pela arquitetura proposta.

## Contexto
O projeto visa desenvolver um sistema modular que permita a gestão eficaz de um campus universitário e uma frota de robôs. Este sistema deve permitir a gestão de edifícios, pisos, passagens entre edifícios, elevadores, e também a gestão de uma frota de robôs, permitindo adicionar, editar, e inibir robôs, além de visualizar e pesquisar todos os robôs na frota. A arquitetura de software deve facilitar a integração entre os diferentes módulos e funcionalidades, garantindo eficiência operacional e conformidade com os requisitos definidos.

## Requisitos Funcionais

# Gestão de Edifícios e Pisos:

O sistema deve permitir a criação, edição, e listagem de edifícios e pisos, além de listar edifícios com um número mínimo e máximo de pisos.

# Gestão de Passagens e Elevadores:

Deve permitir a criação, edição e listagem de passagens entre edifícios e elevadores em edifícios.

# Gestão de Frota de Robôs:

O sistema deve permitir a adição, edição e inibição de robôs na frota, além de permitir a visualização e pesquisa de todos os robôs na frota.

## Funcionalidade

# Acesso Seguro:

O sistema deve garantir que cada módulo só possa acessar os dados relevantes para suas operações.
# Integridade da Informação:

Deve ser implementada uma verificação da integridade da informação acessada pelos sistemas.
# Proteção de Dados:

É imperativo garantir a privacidade e a proteção dos dados em conformidade com o RGPD.

## Usabilidade
Acesso a Módulos: A aplicação deve permitir acesso fácil a todos os módulos do sistema, facilitando a navegação entre master data, planeamento, visualização, e gestão de RGPD.


Administração de Usuários: A administração de usuários deve ser eficaz, mesmo que seja feita diretamente na base de dados no contexto do projeto atual.

Baseado nos requisitos não funcionais e restrições de design, serão adotadas as seguintes abordagens/padrões/estilos:

Client-Server, porque cada um dos "módulos" MDR, MDV, Planeamento são aplicações servidoras de outras aplicações clientes (e.g. MDR é servidor de MDV e UI, MDV é servidor de Planeamento e UI, e Planeamento é servidor de UI);
Web Application, em que o frontend é desempenhado por uma SPA (Single Page Application), e que o backend é desempenhado pelos módulos MDR, MDV e Planeamento;
SOA, porque os servidores (cf. anterior) deverão disponibilizar API, e particularmemte API para serem usadas na web, disponibilizados serviços para os clientes respetivos. Serão adotados os nível 0, 1 e 2 do Modelo de Maturidade de Richardson aplicado a REST;
N-Tier, pois as várias aplicações devem ser implantadas em diferentes máquinas on premises e IaaS e PaaS (on cloud), de acordo com os requisitos não funcionais;
Layered architecture, mais especificamente Onion Architecture, por razões académicas.


## Restrições de Interface

Acesso a Módulos via SPA: A SPA deve facilitar o acesso a todos os módulos do sistema, proporcionando uma interface amigável e intuitiva.

Integração entre Módulos via API: Os módulos de Planeamento e Visualização devem ser capazes de consumir dados através da API do módulo master data, garantindo uma integração eficaz e um fluxo de dados consistente.


Estas seções são elaboradas com base na estrutura e nos requisitos fornecidos, proporcionando uma visão detalhada do contexto do projeto, dos requisitos funcionais, da funcionalidade, da usabilidade e das restrições de interface que influenciam a arquitetura do sistema.
