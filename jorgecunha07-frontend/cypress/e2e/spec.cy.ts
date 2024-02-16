describe('Home Page Modules Test', () => {
  it('Verifies the presence of User Request and Login modules on the home page', () => {
    cy.visit('/')
    // Verifica se o módulo "User Request" está presente
    cy.contains('h3', 'User Request')
    cy.contains('p', 'Create an User Request.')
    // Verifica se o módulo "Login" está presente
    cy.contains('h3', 'Login')
    cy.contains('p', 'Access your existing account.')
  })
})

describe('Navigation Functionality Test', () => {
  it('Checks navigation functionality for User Request and Login modules', () => {
    cy.visit('/')
    // Verifica e clica no módulo "User Request"
    cy.get('.module-card').contains('User Request').click()
    // Verifica se a navegação para a página de solicitação de usuário ocorre
    cy.url().should('include', '/register')

    // Retorna para a página inicial
    cy.visit('/')
    // Verifica e clica no módulo "Login"
    cy.get('.module-card').contains('Login').click()
    // Verifica se a navegação para a página de login ocorre
    cy.url().should('include', '/login')
  })
})

describe('User Request Form Test', () => {
  it('Fills and submits the user request form', () => {
    cy.visit('/register')
    // Preenche o formulário
    cy.get('input[name="firstName"]').type('Carlos')
    cy.get('input[name="lastName"]').type('Castro')
    cy.get('input[name="email"]').type('ccastro@isep.ipp.pt')
    cy.get('input[name="password"]').type('1234')
    cy.get('input[name="userNif"]').type('122244433')
    cy.get('input[name="userNumber"]').type('+351912345678')
    cy.get('#consentCheckbox').click()

    // Envia o formulário
    cy.get('form').submit()
  })
})

describe('Registration Feedback Test Success', () => {
  it('Checks for success or error messages after form submission', () => {
    cy.visit('/register')

    cy.get('input[name="firstName"]').type('Joao')
    cy.get('input[name="lastName"]').type('Soares')
    cy.get('input[name="email"]').type('jsoares@isep.ipp.pt')
    cy.get('input[name="password"]').type('1234')
    cy.get('input[name="userNif"]').type('111444888')
    cy.get('input[name="userNumber"]').type('+351912456567')
    cy.get('#consentCheckbox').click()

    // Envia o formulário
    cy.get('form').submit()

    // Verifica a mensagem de sucesso
    cy.get('.success-message').should('contain', 'Registration Successful')
  })
})

describe('Registration Feedback Test Success 2', () => {
  it('Checks for success or error messages after form submission', () => {
    cy.visit('/register')

    cy.get('input[name="firstName"]').type('Sara')
    cy.get('input[name="lastName"]').type('Couto')
    cy.get('input[name="email"]').type('scout@isep.ipp.pt')
    cy.get('input[name="password"]').type('1234')
    cy.get('input[name="userNif"]').type('111555444')
    cy.get('input[name="userNumber"]').type('+351265418975')
    cy.get('#consentCheckbox').click()

    // Envia o formulário
    cy.get('form').submit()

    // Verifica a mensagem de sucesso
    cy.get('.success-message').should('contain', 'Registration Successful')
  })
})

describe('Registration Feedback Test Success 3', () => {
  it('Checks for success or error messages after form submission', () => {
    cy.visit('/register')

    cy.get('input[name="firstName"]').type('Rafael')
    cy.get('input[name="lastName"]').type('Norte')
    cy.get('input[name="email"]').type('rafaelnorte@isep.ipp.pt')
    cy.get('input[name="password"]').type('1234')
    cy.get('input[name="userNif"]').type('154785965')
    cy.get('input[name="userNumber"]').type('+351222666532')
    cy.get('#consentCheckbox').click()

    // Envia o formulário
    cy.get('form').submit()

    // Verifica a mensagem de sucesso
    cy.get('.success-message').should('contain', 'Registration Successful')
  })
})

describe('Registration Feedback Test Fail', () => {
  it('Checks for success or error messages after form submission', () => {
    cy.visit('/register')

    cy.get('input[name="firstName"]').type('Carlos')
    cy.get('input[name="lastName"]').type('Castro')
    cy.get('input[name="email"]').type('ccastro@isep.ipp.pt')
    cy.get('input[name="password"]').type('1234')
    cy.get('input[name="userNif"]').type('122244433')
    cy.get('input[name="userNumber"]').type('912345678')
    cy.get('#consentCheckbox').click()

    // Envia o formulário
    cy.get('form').submit()

    // ou, alternativamente, verifica a mensagem de erro
    cy.get('.error-message').should('contain', 'Registration Failed')
  })
})


// Login como admin
describe('Login Page Test', () => {
  it('Fills and submits the login form', () => {
    cy.visit('/login')

    // Preenche o formulário de login
    cy.get('input[name=email]').type('jsoares@isep.ipp.pt')
    cy.get('input[name=password]').type('1234')

    // Envia o formulário
    cy.get('.submit-button').click()
  })
})

describe('Login Error Test', () => {
  it('Checks for error messages after failed login attempts', () => {
    cy.visit('/login')

    // Preenche o formulário com credenciais incorretas
    cy.get('input[name=email]').type('wrong@example.com')
    cy.get('input[name=password]').type('wrongpassword')

    // Envia o formulário
    cy.get('.submit-button').click()

    // Verifica se o popup de erro é exibido
    cy.get('.popup-overlay').should('be.visible')
    cy.get('.popup-body').should('contain', 'Invalid credentials, please try again.')
  })
})

describe('Deny a User', () => {
  it('Goes to deny a specific user', () => {
    cy.visit('/login')

    // Preenche o formulário de login
    cy.get('input[name=email]').type('mborja@isep.ipp.pt')
    cy.get('input[name=password]').type('1234')

    // Envia o formulário
    cy.get('.submit-button').click()

    cy.contains('h3', 'Admin Information').click()

    // Aguarda a navegação para a página de seleção de informações do Admin
    cy.url().should('include', '/AdminInformation')
    cy.contains('button', 'Approve Users').click()

    // Agora, você está na página 'User Approval Requests'
    cy.url().should('include', '/ApproveUsers')

    // Encontrar o usuário específico e clicar em 'Deny'
    cy.contains('div.user-details', 'Joao Soares') // Nome do usuário
      .should('contain', 'jsoares@isep.ipp.pt') // Email do usuário
      .within(() => {
        cy.get('.btn-submit.deny').click() // Clicar no botão de negar
      })

    // Verificar se a mensagem de sucesso ou de erro é exibida
    cy.get('.alert.alert-success').should('contain', 'User request denied successfully!')
  })
})

describe('Create a User', () => {
  it('Goes to create a user', () => {
    cy.visit('/login')

    // Preenche o formulário de login
    cy.get('input[name=email]').type('mborja@isep.ipp.pt')
    cy.get('input[name=password]').type('1234')

    // Envia o formulário
    cy.get('.submit-button').click()

    cy.contains('h3', 'Admin Information').click()

    // Aguarda a navegação para a página de seleção de informações do Admin
    cy.url().should('include', '/AdminInformation')
    cy.contains('button', 'Create Users').click()

    // Agora, você está na página 'User Approval Requests'
    cy.url().should('include', '/CreateUsers')

    // Preenche o formulário de criação de usuário
    cy.get('#firstName').type('Cesar')
    cy.get('#lastName').type('Quim')
    cy.get('#email').type('cquim@isep.ipp.pt')
    cy.get('#password').type('1234')

    // Seleciona uma função do dropdown
    cy.get('#role').select('Utente')

    // Clica no botão para criar o usuário
    cy.get('.btn-submit').contains('Create User').click()

    // Verifica se a mensagem de sucesso é exibida
    cy.get('.alert.alert-success').should('contain', 'User created successfully!')

  })
})

describe('Create Building', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login');
    cy.get('#email').type('mborja@isep.ipp.pt');
    cy.get('#password').type('1234');
    cy.get('.submit-button').click();
    cy.url().should('include', '/modules'); // Garante que a URL da página de módulos está correta após o login
  });

  it('Allows user to create a new building', () => {
    // Navegação até a página de criação do edifício
    navigateToBuildingCreation();

    // Preenche os detalhes do edifício
    fillBuildingDetails('A', 'A', 'The building A', '25', '25');

    // Submete o formulário e verifica a mensagem de sucesso
    cy.get('.btn-submit').click();
    cy.get('.alert-success').should('contain', 'Building created successfully');
  });

  it('Should show an error message when trying to create a building with empty fields', () => {
    // Navegação até a página de criação do edifício
    navigateToBuildingCreation();

    // Tenta submeter o formulário sem preencher os campos
    cy.get('.btn-submit').click();
    cy.get('.alert-danger').should('contain', 'All fields are required');
  });

  it('Should show an error message for invalid input data', () => {
    navigateToBuildingCreation();
    fillBuildingDetails('B001', 'Building B001', 'Invalid building data', '-5', '-5');
    cy.get('.btn-submit').click();
    cy.get('.alert-danger').should('contain', 'All fields are required!');
  });

  it('Should handle long text inputs without performance issues', () => {
    navigateToBuildingCreation();
    fillBuildingDetails('B003', 'Very Long Building Name', 'A very long description that goes on and on', '100', '100');
    cy.get('.btn-submit').click();
    cy.get('.alert-success').should('contain', 'Building created successfully');
  });

  it('Should comply with business rules for building dimensions', () => {
    navigateToBuildingCreation();
    fillBuildingDetails('B004', 'Business Rule Test', 'Testing dimensions', '0', '0');
    cy.get('.btn-submit').click();
    cy.get('.alert-danger').should('contain', 'All fields are required!');
  });
});

describe('Create Building 2', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login');
    cy.get('#email').type('mborja@isep.ipp.pt');
    cy.get('#password').type('1234');
    cy.get('.submit-button').click();
    cy.url().should('include', '/modules'); // Garante que a URL da página de módulos está correta após o login
  });

  it('Allows user to create a new building', () => {
    // Navegação até a página de criação do edifício
    navigateToBuildingCreation();

    // Preenche os detalhes do edifício
    fillBuildingDetails('B', 'B', 'The building B', '25', '25');

    // Submete o formulário e verifica a mensagem de sucesso
    cy.get('.btn-submit').click();
    cy.get('.alert-success').should('contain', 'Building created successfully');
  });

});

function navigateToBuildingCreation() {
  cy.get('.module-card').contains('Campus Management').should('be.visible').click();
  cy.url().should('include', '/gestaodocampus');
  cy.contains('Building').click();
  cy.url().should('include', '/gestaodocampus/buildings');
  cy.contains('Create Building').click();
}

function fillBuildingDetails(code: string, name: string, description: string, width: string, length: string) {
  cy.get('#buildingCode').type(code);
  cy.get('#buildingName').type(name);
  cy.get('#buildingDescription').type(description);
  cy.get('#width').type(width);
  cy.get('#length').type(length);
}

describe('Edit Building', () => {
  beforeEach(() => {
    // O código de login é repetido em cada teste. Considere mover para um comando personalizado se ainda não o fez.
    cy.visit('/login')
    cy.get('#email').type('mborja@isep.ipp.pt')
    cy.get('#password').type('1234')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Certifique-se de que o usuário está logado e na página de módulos
  })

  it('Allows user to edit an existing building', () => {
    // Clique na opção "Campus Management" após estar visível
    cy.get('.module-card').contains('Campus Management').should('be.visible').click()
    // Verifica se a navegação para "Campus Management" foi bem-sucedida
    cy.url().should('include', '/gestaodocampus')
    // Depois de estar na página "Campus Management", clique no cartão "Building"
    cy.contains('Building').click()
    cy.url().should('include', 'gestaodocampus/buildings')
    // Navegue para a página de edição do edifício
    cy.contains('Edit Building').click() // Substitua pelo texto exato usado no botão ou link para editar

    // Escolha o edifício a ser editado a partir do dropdown
    cy.get('#buildingCode').select('B002')

    // Preencha os novos detalhes do edifício
    cy.get('#buildingName').clear().type('Building B002')
    cy.get('#buildingDescription').clear().type('Updated description for B002')
    cy.get('#width').clear().type('8') // Novo valor para a largura
    cy.get('#length').clear().type('8') // Novo valor para o comprimento

    // Submeta o formulário de atualização
    cy.get('.btn-submit').click()

    // Verifique se a mensagem de sucesso é exibida
    cy.get('.alert-success').should('contain', 'Building updated successfully')
  })

  it('Should show an error message when no building code is selected', () => {
    navigateToBuildingEdition();
    cy.get('.btn-submit').click();
    cy.get('.alert-danger').should('contain', 'No building code selected');
  });

})

function navigateToBuildingEdition() {
  cy.get('.module-card').contains('Campus Management').click();
  cy.url().should('include', '/gestaodocampus');
  cy.contains('Building').click();
  cy.url().should('include', '/gestaodocampus/buildings');
  cy.contains('Edit Building').click();
}

describe('List Buildings', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#email').type('mborja@isep.ipp.pt')
    cy.get('#password').type('1234')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Certifique-se de que o usuário está logado e na página de módulos
  })

  it('Allows user to list existing buildings', () => {
    // Clique na opção "Campus Management" após estar visível
    cy.get('.module-card').contains('Campus Management').should('be.visible').click()
    // Verifica se a navegação para "Campus Management" foi bem-sucedida
    cy.url().should('include', '/gestaodocampus')
    // Depois de estar na página "Campus Management", clique no cartão "Building"
    cy.contains('Building').click()
    cy.url().should('include', 'gestaodocampus/buildings')
    // Navegue para a página de edição do edifício
    cy.contains('View All Buildings').click() // Substitua pelo texto exato usado no botão ou link para editar

    // Clique no botão para carregar e ordenar os edifícios
    cy.contains('Load and Sort Buildings by Name').click()

    // Verifica se os edifícios estão sendo listados
    cy.get('.results-container').within(() => {
      cy.get('.result-item').should('have.length.at.least', 1) // Verifica se pelo menos um edifício está listado
      // Para verificar detalhes específicos de um edifício, você pode fazer:
      cy.contains('Building B002').should('exist')
      // E para verificar mais detalhes, como o código:
      cy.contains('Code: B002').should('exist')
    })
  })
})

describe('Find Buildings By Parameter', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#email').type('mborja@isep.ipp.pt')
    cy.get('#password').type('1234')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Certifique-se de que o usuário está logado e na página de módulos
  })

  it('Allows user to find buildings by parameter', () => {
    // Clique na opção "Campus Management" após estar visível
    cy.get('.module-card').contains('Campus Management').should('be.visible').click()
    // Verifica se a navegação para "Campus Management" foi bem-sucedida
    cy.url().should('include', '/gestaodocampus')
    // Depois de estar na página "Campus Management", clique no cartão "Building"
    cy.contains('Building').click()
    cy.url().should('include', 'gestaodocampus/buildings')
    // Navegue para a página de edição do edifício
    cy.contains('Find Building by Parameter').click() // Substitua pelo texto exato usado no botão ou link para editar

    // Preencha os campos de número mínimo e máximo de andares
    cy.get('input[placeholder="Min Floors"]').clear().type('0')
    cy.get('input[placeholder="Max Floors"]').clear().type('5')

    // Clique no botão de pesquisa
    cy.get('.btn-primary').contains('Search').click()

    // Verifica se os resultados são exibidos
    cy.get('.results-container').should('exist')
  })

  it('Shows no results for an unrealistic floor range', () => {
    navigateToFindBuildingsByParameterPage();
    cy.get('input[placeholder="Min Floors"]').clear().type('20');
    cy.get('input[placeholder="Max Floors"]').clear().type('30');
    cy.get('.btn-primary').contains('Search').click();
    // Verifica se não há resultados
    cy.get('.results-container').should('not.exist');
  });

  it('Loads and sorts buildings correctly', () => {
    navigateToFindBuildingsByParameterPage();
    cy.get('.btn-primary').contains('Search').click();
    // Verifica se os edifícios são carregados
    cy.get('.results-container').should('exist');
    // Adicione verificações para a ordem dos edifícios, se necessário
  });
})

function navigateToFindBuildingsByParameterPage() {
  cy.get('.module-card').contains('Campus Management').click();
  cy.url().should('include', '/gestaodocampus');
  cy.contains('Building').click();
  cy.url().should('include', '/gestaodocampus/buildings');
  cy.contains('Find Building by Parameter').click();
}

describe('Module Navigation After Login 2', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login')
    cy.get('#email').type('mborja@isep.ipp.pt')
    cy.get('#password').type('1234')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Garante que a URL da página de módulos está correta após o login
  })

  it('Navigates to the Fleet Management module after login', () => {
    // Aguarda até que a opção "Campus Management" esteja visível e clique nela
    cy.get('.module-card').contains('Fleet Management').should('be.visible').click()
    // Verifica se a navegação até o módulo "Campus Management" foi bem-sucedida
    cy.url().should('include', '/fleet')
  })
})

describe('Create Floor', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#email').type('mborja@isep.ipp.pt')
    cy.get('#password').type('1234')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules')
  })

  it('Allows user to create a floor', () => {
    cy.wait(5000)
    cy.get('.module-card').contains('Campus Management').should('be.visible').click();
    cy.url().should('include', '/gestaodocampus');
    cy.contains('Floor').click();
    cy.url().should('include', '/gestaodocampus/floors');
    cy.contains('Create Floor').click();
    // Navega até a página de criação de piso
    cy.url().should('include', '/gestaodocampus/floors/CreateFloor');

    // Seleciona um edifício do dropdown
    cy.get('#buildingFinderId').select('B002')

    // Preenche o número do piso
    cy.get('#floorNumber').clear().type('1');

    // Preenche a descrição do piso
    cy.get('#floorDescription').type('First floor with labs and offices');

    // Preenche as dimensões do piso
    cy.get('#width').clear().type('5');
    cy.get('#length').clear().type('5');

    // (Opcional) Carrega um mapa do piso se necessário
    // cy.get('#addFloorMap').check();
    // cy.get('#floorMap').attachFile('path/to/floorMap.png'); // Você precisará de um plugin ou comando personalizado para anexar arquivos

    // Envia o formulário
    cy.get('form').submit();

    // Verifica se a mensagem de sucesso é exibida
    cy.get('.alert-success').should('contain', 'Floor created successfully!');
  });
})

describe('Create New Floor For Different Building', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#email').type('mborja@isep.ipp.pt')
    cy.get('#password').type('1234')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules')
  })

  //Primeiro criamos um segundo floor para o building B003
  it('Allows user to create a floor for a different building (B003)', () => {
    cy.wait(3000)
    cy.get('.module-card').contains('Campus Management').should('be.visible').click();
    cy.url().should('include', '/gestaodocampus');
    cy.contains('Floor').click();
    cy.url().should('include', '/gestaodocampus/floors');
    cy.contains('Create Floor').click();
    // Navega até a página de criação de piso
    cy.url().should('include', '/gestaodocampus/floors/CreateFloor');

    // Seleciona um edifício do dropdown
    cy.get('#buildingFinderId').select('A')

    // Preenche o número do piso
    cy.get('#floorNumber').clear().type('1');

    // Preenche a descrição do piso
    cy.get('#floorDescription').type('Second floor with labs');

    // Preenche as dimensões do piso
    cy.get('#width').clear().type('20');
    cy.get('#length').clear().type('20');

    // Envia o formulário
    cy.get('form').submit();

    // Verifica se a mensagem de sucesso é exibida
    cy.get('.alert-success').should('contain', 'Floor created successfully!');
  });
})

describe('Create New Floor For Building B003', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#email').type('mborja@isep.ipp.pt')
    cy.get('#password').type('1234')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules')
  })

  // Criamos um segundo floor para o building B003, para ter um elevador
  it('Allows user to create a floor for a different building (B003)', () => {
    cy.wait(3000)
    cy.get('.module-card').contains('Campus Management').should('be.visible').click();
    cy.url().should('include', '/gestaodocampus');
    cy.contains('Floor').click();
    cy.url().should('include', '/gestaodocampus/floors');
    cy.contains('Create Floor').click();
    // Navega até a página de criação de piso
    cy.url().should('include', '/gestaodocampus/floors/CreateFloor');

    // Seleciona um edifício do dropdown
    cy.get('#buildingFinderId').select('B003')

    // Preenche o número do piso
    cy.get('#floorNumber').clear().type('1');

    // Preenche a descrição do piso
    cy.get('#floorDescription').type('First floor');

    // Preenche as dimensões do piso
    cy.get('#width').clear().type('21');
    cy.get('#length').clear().type('21');

    // Envia o formulário
    cy.get('form').submit();

    // Verifica se a mensagem de sucesso é exibida
    cy.get('.alert-success').should('contain', 'Floor created successfully!');
  });
})

describe('Update Floor', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#email').type('mborja@isep.ipp.pt')
    cy.get('#password').type('1234')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules')
  })

  it('Allows user to update a floor', () => {
    cy.get('.module-card').contains('Campus Management').should('be.visible').click();
    cy.url().should('include', '/gestaodocampus');
    cy.contains('Floor').click();
    cy.url().should('include', '/gestaodocampus/floors');
    cy.contains('Update Floor').click();
    // Navega até a página de criação de piso
    cy.url().should('include', '/gestaodocampus/floors/UpdateFloor');

    // Seleciona um edifício do dropdown
    cy.get('#buildingSelector').select('B002');

    // Espera até que o segundo dropdown esteja pronto para interação e seleciona um andar
    cy.get('#floorSelector').select('1'); // Substitua '1' pelo número do andar que deseja selecionar

    // Atualiza a descrição do andar
    cy.get('#floorDescription').clear().type('Updated description for the first floor');

    cy.get('#width').clear().type('5');
    cy.get('#length').clear().type('5');

    // (Opcional) Atualiza o mapa do andar se necessário
    // cy.get('#addFloorMap').check();
    // cy.get('#floorMap').attachFile('path/to/updatedFloorMap.png'); // Você precisará de um plugin ou comando personalizado para anexar arquivos

    // Envia o formulário
    cy.get('form').submit();

    // Verifica se a mensagem de sucesso é exibida
    cy.get('.alert-success').should('contain', 'Floor created successfully!');
  });
})

describe('List Floors By Building', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#email').type('mborja@isep.ipp.pt')
    cy.get('#password').type('Mario123')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules')
  })

  it('Allows user to get floors by building', () => {
    cy.get('.module-card').contains('Campus Management').should('be.visible').click();
    cy.url().should('include', '/gestaodocampus');
    cy.contains('Floor').click();
    cy.url().should('include', '/gestaodocampus/floors');
    cy.contains('Get Floors For Building').click();
    // Navega até a página de listagem de andares por edifício
    cy.url().should('include', '/gestaodocampus/floors/FloorByBuilding');

    // Seleciona um edifício do dropdown
    cy.get('#building').select('B002'); // Assume-se que 'B002' é um valor válido dentro do dropdown

    // Verifica se os números dos andares são exibidos corretamente
    cy.get('.form-group').contains('Floor Numbers:').should('be.visible');

    // Verifica se a lista de andares não está vazia
    //cy.get('#floors').find('div').should('have.length.at.least', 1);

  });
})

describe('Create Passageway', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#email').type('mborja@isep.ipp.pt')
    cy.get('#password').type('Mario123')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules')
  })

  //Criar a passageway
  it('Allows user to create a passageway', () => {
    cy.wait(1200)
    cy.get('.module-card').contains('Campus Management').should('be.visible').click();
    cy.url().should('include', '/gestaodocampus');
    cy.contains('Passageway').click();
    cy.url().should('include', '/gestaodocampus/passageways');
    cy.contains('Create Passageway').click();
    // Navega até a página de criação de passageway
    cy.url().should('include', '/gestaodocampus/passageways/createPassageway');

    // Preenche o formulário
    cy.get('#buildingACode').type('B002');
    cy.get('#buildingBCode').type('B003');
    cy.get('#floorA').type('1');
    cy.get('#floorB').type('2');
    cy.get('#locationAX').type('5');
    cy.get('#locationAY').type('5');
    cy.get('#locationBX').type('10');
    cy.get('#locationBY').type('10');

    // Submete o formulário
    cy.get('form').submit();

    // Verifica se a mensagem de sucesso é exibida
    cy.get('.alert-success').should('contain', 'Passageway created successfully!'); // Esta mensagem deve corresponder à mensagem real de sucesso que a aplicação exibe
  });

  it('Checks if error message is displayed properly', () => {
    cy.wait(2000)
    cy.get('.module-card').contains('Campus Management').should('be.visible').click();
    cy.url().should('include', '/gestaodocampus');
    cy.contains('Passageway').click();
    cy.url().should('include', '/gestaodocampus/passageways');
    cy.contains('Create Passageway').click();
    // Navega até a página de criação de passageway
    cy.url().should('include', '/gestaodocampus/passageways/createPassageway');
    cy.get('#buildingACode').clear();
    cy.get('form').submit();
    cy.get('.alert-danger').should('contain', 'All fields are required!');
  })
})

describe('Edit Passageway', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#email').type('mborja@isep.ipp.pt')
    cy.get('#password').type('1234')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules')
  })

  //Editar a passageway
  it('Allows user to edit a passageway', () => {
    cy.wait(1500)
    cy.get('.module-card').contains('Campus Management').should('be.visible').click();
    cy.url().should('include', '/gestaodocampus');
    cy.contains('Passageway').click();
    cy.url().should('include', '/gestaodocampus/passageways');
    cy.contains('Edit Passageway').click();
    // Navega até a página de criação de passageway
    cy.url().should('include', '/gestaodocampus/passageways/editPassageway');

    // Preenche o formulário com novos valores
    cy.get('#buildingACode').clear().type('B002');
    cy.get('#buildingBCode').clear().type('B003');
    cy.get('#floorA').clear().type('1');
    cy.get('#floorB').clear().type('2');
    cy.get('#locationAX').clear().type('2');
    cy.get('#locationAY').clear().type('2');
    cy.get('#locationBX').clear().type('25');
    cy.get('#locationBY').clear().type('30');

    // Submete o formulário
    cy.get('form').submit();

    // Verifica se a mensagem de sucesso é exibida
    cy.get('.alert-success').should('contain', 'Passageway updated successfully');

  })
})

describe('List Passageway between two buildings', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#email').type('mborja@isep.ipp.pt')
    cy.get('#password').type('1234')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules')
  })

  //Listar passageway
  it('Allows user to list passageways between two buildings', () => {
    cy.get('.module-card').contains('Campus Management').should('be.visible').click();
    cy.url().should('include', '/gestaodocampus');
    cy.contains('Passageway').click();
    cy.url().should('include', '/gestaodocampus/passageways');
    cy.contains('List Passageways Between Two Buildings').click();
    // Navega até a página de listagem de passageways
    cy.url().should('include', '/gestaodocampus/passageways/getAllPassagewaysBetweenBuildings');

    // Preenche o formulário com códigos dos edifícios
    cy.get('#buildingACode').type('B002');
    cy.get('#buildingBCode').type('B003');

    // Submete o formulário
    cy.get('form').submit();

  })
})

describe('Create Elevator', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#email').type('mborja@isep.ipp.pt')
    cy.get('#password').type('1234')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules')
  })

  //Criar elevador
  it('Allows user to create an elevator', () => {
    cy.wait(1500)
    cy.get('.module-card').contains('Campus Management').should('be.visible').click();
    cy.url().should('include', '/gestaodocampus');
    cy.contains('Elevator').click();
    cy.url().should('include', '/gestaodocampus/elevators');
    cy.contains('Create Elevator').click();
    // Navega até a página de criação de elevator
    cy.url().should('include', '/gestaodocampus/elevators/CreateElevator');

    // Seleciona um prédio
    cy.get('#building').select('B003');

    // Marca os andares desejados
    cy.get('input[type="checkbox"]').check(['1', '2']);

    // Insere as coordenadas de localização do elevador
    cy.get('#elevatorLocationX').clear().type('29');
    cy.get('#elevatorLocationY').clear().type('16');

    // Submete o formulário
    cy.get('.btn-submit').click();

    // Verifica se a mensagem de sucesso é exibida
    cy.get('.success-message').should('contain', 'Elevator created successfully!');

  })
})

describe('Edit Elevator', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#email').type('mborja@isep.ipp.pt')
    cy.get('#password').type('1234')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules')
  })

  //Criar elevador
  it('Allows user to edit an elevator', () => {
    cy.wait(1500)
    cy.get('.module-card').contains('Campus Management').should('be.visible').click();
    cy.url().should('include', '/gestaodocampus');
    cy.contains('Elevator').click();
    cy.url().should('include', '/gestaodocampus/elevators');
    cy.contains('Edit Elevator').click();
    // Navega até a página de criação de elevator
    cy.url().should('include', '/gestaodocampus/elevators/EditElevator');

    // Seleciona um prédio
    cy.get('#building').select('B003');

    // Seleciona um elevador
    cy.get('#elevator').select('B003 1');

    cy.get('input[type="checkbox"]').check(['1']);

    // Clique no botão 'Update Elevator'
    cy.get('.btn-submit').click();

    // Verifique se a mensagem de sucesso é exibida (se houver)
    cy.get('.success-message').should('contain', 'Elevator updated successfully!');

  })
})

describe('View List of Elevators', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#email').type('mborja@isep.ipp.pt')
    cy.get('#password').type('1234')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules')
  })

  //Criar elevador
  it('Allows user to view list of elevators by building', () => {
    cy.wait(1500)
    cy.get('.module-card').contains('Campus Management').should('be.visible').click();
    cy.url().should('include', '/gestaodocampus');
    cy.contains('Elevator').click();
    cy.url().should('include', '/gestaodocampus/elevators');
    cy.contains('View Elevators for Building').click();
    // Navega até a página de listagem de elevators
    cy.url().should('include', '/gestaodocampus/elevators/ElevatorsByBuilding');

    // Seleciona um prédio
    cy.get('#building').select('B003');

    // Verifique se a lista de elevadores está visível
    cy.get('.form-group label[for="elevators"]').should('be.visible');

  })
})

describe('Create Room', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#email').type('mborja@isep.ipp.pt')
    cy.get('#password').type('1234')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules')
  })

  // Criar uma sala
  it('Allows user to create a room', () => {
    cy.wait(1500);
    cy.get('.module-card')
      .contains('Campus Management')
      .should('be.visible')
      .click();
    cy.url().should('include', '/gestaodocampus');
    cy.contains('Room').click();
    cy.url().should('include', '/gestaodocampus/rooms');
    cy.contains('Create Room').click();
    // Navega até a página de criação de room
    cy.url().should('include', '/gestaodocampus/rooms/CreateRoom');

    // Seleciona um prédio
    cy.get('#building').select('B003');

    // Seleciona um número de andar
    cy.get('#floorNumber').select('2');

    // Preencha informações da sala
    cy.get('#name').type('Anfiteatro 1');
    cy.get('#type').select('anfiteatro');
    cy.get('#description').type('Uma sala de reunião para discussões importantes.');
    cy.get('#locationX').type('8');
    cy.get('#locationY').type('8');

    // Clique no botão 'Create Room'
    cy.get('.btn-submit').click();

  });
})

describe('Navigation to Robot Type Creation Module', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login')
    cy.get('#email').type('mborja@isep.ipp.pt')
    cy.get('#password').type('1234')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Garante que a URL da página de módulos está correta após o login
  })

  it('Navigates to the Robot Type Creation module after login', () => {
    // Aguarda até que a opção "Campus Management" esteja visível e clique nela
    cy.get('.module-card').contains('Fleet Management').should('be.visible').click()
    // Verifica se a navegação até o módulo "Campus Management" foi bem-sucedida
    cy.url().should('include', '/fleet')
    cy.get('.module-card').contains('Robot Type').should('be.visible').click()
    cy.url().should('include', '/fleet/robot-types')
  })
})

/*describe('Creating Robot Type', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login')
    cy.get('#email').type('mario@isep.com')
    cy.get('#password').type('Mario123')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Garante que a URL da página de módulos está correta após o login
  })

  it('Navigates to the Robot Type Creation module after login', () => {
    // Aguarda até que a opção "Campus Management" esteja visível e clique nela
    cy.get('.module-card').contains('Fleet Management').should('be.visible').click()
    // Verifica se a navegação até o módulo "Campus Management" foi bem-sucedida
    cy.url().should('include', '/fleet')
    cy.get('.module-card').contains('Robot Type').should('be.visible').click()
    cy.url().should('include', '/fleet/robot-types')
    cy.get('.button-container').contains('Create robot type').should('be.visible').click()
    cy.url().should('include', 'fleet/robot-types/create')
  })

  it('Creates a new Robot Type', () => {
    cy.get('.module-card').contains('Fleet Management').should('be.visible').click()
    // Verifica se a navegação até o módulo "Campus Management" foi bem-sucedida
    cy.url().should('include', '/fleet')
    cy.get('.module-card').contains('Robot Type').should('be.visible').click()
    cy.url().should('include', '/fleet/robot-types')
    cy.get('.button-container').contains('Create robot type').should('be.visible').click()
    cy.url().should('include', 'fleet/robot-types/create')
    // Preenche o formulário para criar um novo tipo de robô
    cy.get('#robotTypeName').type('Example Robot Type');
    cy.get('#robotBrand').type('Example Brand');
    cy.get('#robotModel').type('Model X');

    // Envia o formulário
    cy.get('form').submit();

    // Verifica se a mensagem de sucesso é exibida
    cy.get('.alert-success').should('contain', 'RobotType created successfully!');
  });

  it('Fails to create Robot Type with missing required fields', () => {
    cy.get('.module-card').contains('Fleet Management').should('be.visible').click()
    // Verifica se a navegação até o módulo "Campus Management" foi bem-sucedida
    cy.url().should('include', '/fleet')
    cy.get('.module-card').contains('Robot Type').should('be.visible').click()
    cy.url().should('include', '/fleet/robot-types')
    cy.get('.button-container').contains('Create robot type').should('be.visible').click()
    cy.url().should('include', 'fleet/robot-types/create')

    // Tenta enviar o formulário sem preencher os campos
    cy.get('form').submit();

    // Verifica se a mensagem de erro é exibida
    cy.get('.alert-danger').should('contain', 'You missed a required field!');
  });*/

describe('Create a Transport Task', () => {
  it('Goes to create a user', () => {
    cy.visit('/login')

    // Preenche o formulário de login
    cy.get('input[name=email]').type('mborja@isep.ipp.pt')
    cy.get('input[name=password]').type('1234')

    // Envia o formulário
    cy.get('.submit-button').click()

    cy.contains('h3', 'Planning of Tasks').click()

    // Aguarda a navegação para a página de seleção de informações do Admin
    cy.url().should('include', '/task')
    cy.contains('h3', 'Transport Task').click()

    // Agora, você está na página 'User Approval Requests'
    cy.url().should('include', '/createTransportTask')

    // Preenche o formulário de criação da tarefa de transporte
    cy.get('input[name="name"]').type('Document Delivery')
    cy.get('input[name="description"]').type('Deliver the project documents to the engineering department.')

    cy.wait(6000)

    // Seleciona a localização de partida (Building e Floor)
    cy.get('#fromBuilding').select('A')
    cy.get('#fromFloorNumber').select('1')
    cy.get('input[name="fromX"]').type('3')
    cy.get('input[name="fromY"]').type('3')

    // Seleciona a localização de chegada (Building e Floor)
    cy.get('#toBuilding').select('B')
    cy.get('#toFloorNumber').select('1')
    cy.get('input[name="toX"]').type('2')
    cy.get('input[name="toY"]').type('2')

    // Preenche os detalhes de contato
    cy.get('input[name="contactStart"]').type('+351526352415')
    cy.get('input[name="contactEnd"]').type('+351965847852')

    // Define o usuário responsável pela tarefa
    cy.get('input[name="user"]').type('mborja@isep.ipp.pt')

    // Clica no botão para criar a tarefa de transporte
    cy.get('.btn-submit').contains('Create Task').click()

    // Verifica se a mensagem de sucesso é exibida
    cy.get('.alert.alert-success').should('contain', 'Transport Task created successfully!')
  })
})

describe('Module Navigation After Login 3', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login')
    cy.get('#email').type('mario@isep.com')
    cy.get('#password').type('Mario123')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Garante que a URL da página de módulos está correta após o login
  })

  it('Navigates to the Information module after login', () => {
    cy.get('.module-card').contains('Information').should('be.visible').click()
    // Verifica se a navegação até o módulo "Information" foi bem-sucedida
    cy.url().should('include', '/information')
  })
})

describe('Open About Us Tab from Information', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login')
    cy.get('#email').type('mario@isep.com')
    cy.get('#password').type('Mario123')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Garante que a URL da página de módulos está correta após o login
  })

  it('Navigates to the Information module (About Us) after login', () => {
    cy.get('.module-card').contains('Information').should('be.visible').click()
    // Verifica se a navegação até o módulo "Information" foi bem-sucedida
    cy.url().should('include', '/information')
    cy.get('page-selection-container button').contains('About Us').should('be.visible').click()
    cy.url().should('include', '/information/aboutus')
  })
})

describe('Open RGPD Report from Information', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login')
    cy.get('#email').type('mario@isep.com')
    cy.get('#password').type('Mario123')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Garante que a URL da página de módulos está correta após o login
  })

  it('Navigates to the Information module (About Us) after login', () => {
    cy.get('.module-card').contains('Information').should('be.visible').click()
    // Verifica se a navegação até o módulo "Information" foi bem-sucedida
    cy.url().should('include', '/information')
    cy.get('.module-card').contains('About Us').should('be.visible').click()
    cy.url().should('include', '/information/rgpd')
  })
})

describe('Open Privacy Policy from Information', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login')
    cy.get('#email').type('mario@isep.com')
    cy.get('#password').type('Mario123')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Garante que a URL da página de módulos está correta após o login
  })

  it('Navigates to the Information module (About Us) after login', () => {
    cy.get('.module-card').contains('Information').should('be.visible').click()
    // Verifica se a navegação até o módulo "Information" foi bem-sucedida
    cy.url().should('include', '/information')
    cy.get('.module-card').contains('Privacy Policy').should('be.visible').click()
    cy.url().should('include', '/information/privacypolicy')
  })
})

describe('Module Navigation After Login 4', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login')
    cy.get('#email').type('mario@isep.com')
    cy.get('#password').type('Mario123')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Garante que a URL da página de módulos está correta após o login
  })

  it('Navigates to the 3D Visualization module after login', () => {
    cy.get('.module-card').contains('Visualization 3D').should('be.visible').click()
    // Verifica se a navegação até o módulo "3D Visualization" foi bem-sucedida
    cy.url().should('include', '/3dvisualization')
  })
})

describe('Module Navigation After Login 5', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login')
    cy.get('#email').type('mario@isep.com')
    cy.get('#password').type('Mario123')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Garante que a URL da página de módulos está correta após o login
  })

  it('Navigates to the Administration of Systems module after login', () => {
    cy.get('.module-card').contains('Administration of Systems').should('be.visible').click()
    // Verifica se a navegação até o módulo "Administration of Systems" foi bem-sucedida
    cy.url().should('include', '/administrationsystem')
  })
})









/*
describe('Module Navigation After Login', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login')
    cy.get('#email').type('mborja@isep.ipp.pt')
    cy.get('#password').type('1234')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Garante que a URL da página de módulos está correta após o login
  })

  it('Navigates to the Campus Management module after login', () => {
    // Aguarda até que a opção "Campus Management" esteja visível e clique nela
    cy.get('.module-card').contains('Campus Management').should('be.visible').click()
    // Verifica se a navegação até o módulo "Campus Management" foi bem-sucedida
    cy.url().should('include', '/gestaodocampus')
  })
})






})*/

/*describe('Creating Robot', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login')
    cy.get('#email').type('mario@isep.com')
    cy.get('#password').type('Mario123')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Garante que a URL da página de módulos está correta após o login
  })

  it('Navigates to the Robot Creation module after login', () => {
    // Aguarda até que a opção "Fleet Management" esteja visível e clique nela
    cy.get('.module-card').contains('Fleet Management').should('be.visible').click();
    // Verifica se a navegação até o módulo "Robot" foi bem-sucedida
    cy.url().should('include', '/fleet');
    // cy.get('.module-card').contains('h3', 'Robot').should('be.visible').click();
    cy.get('.module-card').eq(1).click(); // Isso seleciona o segundo elemento .module-card
    cy.url().should('include', '/fleet/robot');
    cy.get('.button-container').contains('Create robot').should('be.visible').click();
    cy.url().should('include', '/fleet/robot/create');
  });

  it('Creates a new Robot', () => {
    // Aguarda até que a opção "Fleet Management" esteja visível e clique nela
    cy.get('.module-card').contains('Fleet Management').should('be.visible').click();
    // Verifica se a navegação até o módulo "Robot" foi bem-sucedida
    cy.url().should('include', '/fleet');
    cy.get('.module-card').eq(1).click(); // Isso seleciona o segundo elemento .module-card
    cy.url().should('include', '/fleet/robot');
    cy.get('.button-container').contains('Create robot').should('be.visible').click();
    cy.url().should('include', '/fleet/robot/create');

    // Preenche o formulário para criar um novo robô
    cy.get('#robotCode').type('UniqueRobotCode123');
    cy.get('#robotDescription').type('Example Robot Description');
    cy.get('#robotNickname').type('Robbie');
    cy.get('#robotSerialNumber').type('sn1');
    cy.get('#robotTypeName').type('Example Robot Type');

    // Envia o formulário
    cy.get('form').submit();

    // Verifica se a mensagem de sucesso é exibida
    cy.get('.alert-success').should('contain', 'Robot created successfully!'); // Ajuste esta mensagem conforme o esperado na aplicação
  });

})*/




// Planeamento de Tasks não Existe
/*describe('Module Navigation After Login 3', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login')
    cy.get('#email').type('mario@isep.com')
    cy.get('#password').type('Mario123')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Garante que a URL da página de módulos está correta após o login
  })

  it('Navigates to the Fleet Management module after login', () => {
    cy.get('.module-card').contains('Planning of Tasks').should('be.visible').click()
    // Verifica se a navegação até o módulo "Planeamento de Tarefas" foi bem-sucedida
    cy.url().should('include', '/planeamentodetarefas')
  })
})*/

/*describe('Module Navigation After Login 3', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login')
    cy.get('#email').type('mario@isep.com')
    cy.get('#password').type('Mario123')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Garante que a URL da página de módulos está correta após o login
  })

  it('Navigates to the Information module after login', () => {
    cy.get('.module-card').contains('Information').should('be.visible').click()
    // Verifica se a navegação até o módulo "Information" foi bem-sucedida
    cy.url().should('include', '/information')
  })
})

/*describe('Open About Us Tab from Information', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login')
    cy.get('#email').type('mario@isep.com')
    cy.get('#password').type('Mario123')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Garante que a URL da página de módulos está correta após o login
  })

  it('Navigates to the Information module (About Us) after login', () => {
    cy.get('.module-card').contains('Information').should('be.visible').click()
    // Verifica se a navegação até o módulo "Information" foi bem-sucedida
    cy.url().should('include', '/information')
    cy.get('page-selection-container button').contains('About Us').should('be.visible').click()
    cy.url().should('include', '/information/aboutus')
  })
})

describe('Open RGPD Report from Information', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login')
    cy.get('#email').type('mario@isep.com')
    cy.get('#password').type('Mario123')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Garante que a URL da página de módulos está correta após o login
  })

  it('Navigates to the Information module (About Us) after login', () => {
    cy.get('.module-card').contains('Information').should('be.visible').click()
    // Verifica se a navegação até o módulo "Information" foi bem-sucedida
    cy.url().should('include', '/information')
    cy.get('.module-card').contains('About Us').should('be.visible').click()
    cy.url().should('include', '/information/rgpd')
  })
})

describe('Open Privacy Policy from Information', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login')
    cy.get('#email').type('mario@isep.com')
    cy.get('#password').type('Mario123')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Garante que a URL da página de módulos está correta após o login
  })

  it('Navigates to the Information module (About Us) after login', () => {
    cy.get('.module-card').contains('Information').should('be.visible').click()
    // Verifica se a navegação até o módulo "Information" foi bem-sucedida
    cy.url().should('include', '/information')
    cy.get('.module-card').contains('Privacy Policy').should('be.visible').click()
    cy.url().should('include', '/information/privacypolicy')
  })
})

describe('Module Navigation After Login 4', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login')
    cy.get('#email').type('mario@isep.com')
    cy.get('#password').type('Mario123')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Garante que a URL da página de módulos está correta após o login
  })

  it('Navigates to the 3D Visualization module after login', () => {
    cy.get('.module-card').contains('Visualization 3D').should('be.visible').click()
    // Verifica se a navegação até o módulo "3D Visualization" foi bem-sucedida
    cy.url().should('include', '/3dvisualization')
  })
})

describe('Module Navigation After Login 5', () => {
  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('/login')
    cy.get('#email').type('mario@isep.com')
    cy.get('#password').type('Mario123')
    cy.get('.submit-button').click()
    cy.url().should('include', '/modules') // Garante que a URL da página de módulos está correta após o login
  })

  it('Navigates to the Administration of Systems module after login', () => {
    cy.get('.module-card').contains('Administration of Systems').should('be.visible').click()
    // Verifica se a navegação até o módulo "Administration of Systems" foi bem-sucedida
    cy.url().should('include', '/administrationsystem')
  })
})

 */
