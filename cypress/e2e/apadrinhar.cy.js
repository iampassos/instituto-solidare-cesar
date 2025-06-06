Cypress.Commands.add('deletePadrinhos', () => {
  cy.exec('python delete_padrinhos.py', { failOnNonZeroExit: false }).then((result) => {
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

Cypress.Commands.add('falha', () => {
  // cy.visit('http://127.0.0.1:8000/padrinho/meus-apadrinhados/');
  cy.get('.menu-buttons', { timeout: 100000 }).should('exist');
  cy.get(':nth-child(2) > :nth-child(2) > a').click();
});

Cypress.Commands.add('loginAdmin', () => {
  cy.visit('http://127.0.0.1:8000/');
  cy.getCookie('csrftoken').should('exist');
  cy.get('.adm-btn').click();
  cy.get('#id_username').type('admin');
  cy.get('#id_password').type('admin123');
  cy.get('form > button').click();
  cy.url().should('include', '/adm/home/');
});

Cypress.Commands.add('cadastrarApadrinhado', () => {
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

Cypress.Commands.add('sucesso', () => {
  // cy.visit('http://127.0.0.1:8000/padrinho/escolher-apadrinhado/');
  cy.get('.menu-buttons', { timeout: 10000 }).should('exist');
  cy.get(':nth-child(2) > :nth-child(2) > a').click();
  cy.get(':nth-child(1) > .apadrinhado-button > .afiliar-btn').click();
  cy.get("[onclick=\"finalizarPagamento('PIX')\"]").click();
  cy.get('.menu-buttons', { timeout: 10000 }).should('exist');
  cy.get('.menu-buttons > :nth-child(1) > :nth-child(2) > a').click();
  // cy.visit('http://127.0.0.1:8000/padrinho/meus-apadrinhados/');
});

describe('login e cadastro de padrinhos', () => {
  before(() => {
    cy.deletePadrinhos(); 
    cy.cadastro();
  });


  it('Cenario 1: falha ao apadrinhar, devido a não ter apadrinhados disponiveis', () => {
    cy.login();
    cy.falha();
  });

  it('Cenario 2: sucesso do apadrinhamento', () => {
    // cy.loginAdmin();
    // cy.cadastrarApadrinhado();
    cy.createApadrinhado();
    cy.login();
    cy.sucesso();
  });
})