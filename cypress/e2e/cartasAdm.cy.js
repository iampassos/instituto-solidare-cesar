Cypress.Commands.add('deletePadrinhos', () => {
  cy.exec('python delete_padrinhos.py', { failOnNonZeroExit: false }).then((result) => {
    console.log(result.stdout);
    if (result.stderr) {
      console.error(result.stderr);
    }
  });
});

Cypress.Commands.add('deleteCartas', () => {
  cy.exec('python delete_cartas.py', { failOnNonZeroExit: false }).then((result) => {
    console.log(result.stdout);
    if (result.stderr) {
      console.error(result.stderr);
    }
  });
});

Cypress.Commands.add('deleteSuperusers', () => {
  cy.exec('python delete_superusers.py', { failOnNonZeroExit: false }).then((result) => {
    console.log(result.stdout);
    if (result.stderr) {
      console.error(result.stderr);
    }
  });
});

Cypress.Commands.add('createSuperuser', () => {
  cy.exec('python create_superuser.py', { failOnNonZeroExit: false }).then((result) => {
    console.log(result.stdout);
    if (result.stderr) {
      console.error(result.stderr);
    }
  });
});

Cypress.Commands.add('createApadrinhado', () => {
  cy.exec('python create_apadrinhado.py', { failOnNonZeroExit: false }).then((result) => {
    console.log(result.stdout);
    if (result.stderr) {
      console.error(result.stderr);
    }
  });
});

Cypress.Commands.add('cadastro', () => {
  cy.visit('http://127.0.0.1:8000/');
  cy.get('.login-btn').click();
  cy.get('.register-link').click();
  cy.get('.btn-continue').click();
  cy.get('.btn-continue').click();
  cy.get('.btn-continue').click();
  cy.get('.btn-continue').click();
  cy.get('.btn-continue').click();
  cy.get('.btn-continue').click();
  cy.get('#username').type('teste');
  cy.get('#email').type('teste@example.com');
  cy.get('#password').type('123');
  cy.get('#password_confirm').type('123');
  cy.get('.btn-login').click();
  cy.get('#nome_completo').type('teste testavel');
  cy.get('#endereco').type('rua teste');
  cy.get('#pais').type('Brasil');
  cy.get('#cidade').type('Recife');
  cy.get('#numero_rua').type('00');
  cy.get('#complemento_rua').type('aaaaaaaaaa');
  cy.get('#telefone').type('99999999999');
  cy.get('#data_nascimento').type('1111-11-11');
  cy.get('.btn-login').click();
});

Cypress.Commands.add('login', () => {
  cy.visit('http://127.0.0.1:8000/');
  cy.get('.login-btn').click();
  cy.get('#username').type('teste');
  cy.get('#password').type('123')
  cy.get('.btn-login').click();
});

Cypress.Commands.add('loginAdmin', () => {
  cy.visit('http://127.0.0.1:8000/');
  cy.getCookie('csrftoken').should('exist');
  cy.get('.adm-btn').click();
  cy.get('#id_username').type('admin');
  cy.get('#id_password').type('admin123');
  cy.get('form > button').click();
});

Cypress.Commands.add('falha', () => {
  cy.get('[href="/adm/gerenciar-cartas/"]').click();
  cy.get('#botao').click();
  cy.get(':nth-child(2) > a > div').click();
  cy.get('button').click();
});

Cypress.Commands.add('criarApadrinhado', () => {
  cy.visit('http://127.0.0.1:8000/adm/home/');
  cy.get('[href="/adm/gerenciar-afilhados/"]').click();
  cy.get('[href="/afilhados/novo/"]').click();
  cy.get('#nome').type('teste');
  cy.get('#data_nascimento').type('1111-11-11');
  cy.get('#endereco').type('rua de teste');
  cy.get('#genero').select('Masculino');
  cy.get('#info').type('aaaaaaaaaaaaaaaaaaa');
  cy.get('button').click();
});

Cypress.Commands.add('escolherApadrinhado', () => {
  // cy.visit('http://127.0.0.1:8000/padrinho/escolher-apadrinhado/');
  cy.get('.menu-buttons', { timeout: 10000 }).should('exist');
  cy.get(':nth-child(2) > :nth-child(2) > a').click();
  cy.get(':nth-child(1) > .apadrinhado-button > .afiliar-btn').click();
  cy.get("[onclick=\"finalizarPagamento('PIX')\"]").click();
  cy.get('.menu-buttons', { timeout: 10000 }).should('exist');
  cy.get('.menu-buttons > :nth-child(1) > :nth-child(2) > a').click();
  // cy.visit('http://127.0.0.1:8000/padrinho/meus-apadrinhados/');
});

Cypress.Commands.add('criarPostagem', () => {
  cy.get('.menu-buttons').click();
  cy.get(':nth-child(1) > :nth-child(3) > a').click();
  cy.get(':nth-child(2) > a > div').click();
  cy.get('[type="text"]').type('teste');
  cy.get('textarea').type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  cy.get('select').select('teste');
  // cy.selecionarApadrinhado('teste');
  cy.get('button').click();
});

Cypress.Commands.add('sucesso', () => {
  cy.get('[href="/adm/gerenciar-cartas/"]').click();
  cy.get('#botao').click();
  cy.get(':nth-child(2) > a > div').click();
  cy.get('[type="text"]').type('teste');
  cy.get('textarea').type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  cy.get('select').select('teste');
  // cy.selecionarApadrinhado('teste');
  cy.get('button').click();
});



describe('gerenciar cartas', () => {
  before(() => {
    cy.deletePadrinhos(); 
    cy.deleteCartas(); 
    cy.deleteSuperusers();
    cy.createSuperuser();
    cy.cadastro();
  });

  it('Cenario 1: o adm consegue enviar uma resposta para o padrinho respectivo', () => {
    // cy.loginAdmin();
    // cy.criarApadrinhado();
    cy.createApadrinhado();
    cy.login();
    cy.escolherApadrinhado();
    cy.criarPostagem();
    cy.loginAdmin();
    cy.sucesso();
  });
  
  it('Cenario 2: falha no envio por erro de formatação', () => {
    cy.login();
    cy.criarPostagem();
    cy.loginAdmin();
    cy.falha();
  });
})