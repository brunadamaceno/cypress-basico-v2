/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });
  it("Verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
  it("Preenche todos os campos obrigatórios e envia o formulário", () => {
    cy.get("#firstName").type("Bruna Isabela");
    cy.get("#lastName").type("Damaceno");
    cy.get("#email").type("brunadamaceno@gmail.com");
    cy.get("#open-text-area").type("Desejo fazer uma aula teste.");
    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");
  });

  it("Preenche todos os campos obrigatórios e envia o formulário - exercício extra 1 -Delay", () => {
    const longText =
      "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.";
    cy.get("#firstName").type("Bruna Isabela");
    cy.get("#lastName").type("Damaceno");
    cy.get("#email").type("brunadamaceno@gmail.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");
  });

  it("Exibe mensagem de erro ao submeter o formulário com um e-mail inválido", () => {
    const longText =
      "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.";
    cy.get("#firstName").type("Bruna Isabela");
    cy.get("#lastName").type("Damaceno");
    cy.get("#email").type("brunadamacenogmail.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("Campo telefone permanece vazio quando informado um valor não númérico", () => {
    cy.get("#phone").type("abcdefg ").should("have.value", "");
  });

  it("Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Bruna Isabela");
    cy.get("#lastName").type("Damaceno");
    cy.get("#email").type("brunadamaceno@gmail.com");
    cy.get("#phone-checkbox").check().should("be.checked");
    cy.get("#open-text-area").type("Desejo fazer uma aula teste.");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("Preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Bruna")
      .should("have.value", "Bruna")
      .clear()
      .should("have.value", "");

    cy.get("#lastName")
      .type("Damaceno")
      .should("have.value", "Damaceno")
      .clear()
      .should("have.value", "");

    cy.get("#email")
      .type("bruna@gmail.com")
      .should("have.value", "bruna@gmail.com")
      .clear()
      .should("have.value", "");

    cy.get("#phone")
      .type("16997977181")
      .should("have.value", "16997977181")
      .clear()
      .should("have.value", "");

    cy.get("#open-text-area")
      .type("Desejo fazer uma aula teste")
      .should("have.value", "Desejo fazer uma aula teste")
      .clear()
      .should("have.value", "");
  });

  it("Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.", () => {
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("Envia o formulário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.contains("button", "Enviar").click();
  });

  it("Envia o formulário com sucesso usando um comando customizado 2", () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.contains("button", "Enviar").click();
  });

  it("Selecione um produto (Youtube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });
  it("Seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("Seleciona um produto (Blog) por seu índice ", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it("Marca o tipo de atendimento igual Feedback ", () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });

  it("Marca tipo de atendimento", () => {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(function ($radio) {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });

  it("Marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("Seleciona um arquivo da pasta fixtures", () => {
    cy.get('input[type="file"]')
      .selectFile("cypress/fixtures/example.json")
      .then((input) => {
        console.log();
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("Seleciona um arquivo da pasta fixtures simulando um drag-drop", () => {
    cy.get('input[type="file"]')
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .then((input) => {
        console.log();
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile");
    cy.get('input[type="file"]')
      .selectFile("@sampleFile")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("Verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it("Acessa a página da política de privacidade removendo o target e então clicanco no link", () => {
    cy.get("#privacy a").invoke("removeAttr", "target").click();
    cy.contains("Talking About Testing").should("be.visible");
  });
});
