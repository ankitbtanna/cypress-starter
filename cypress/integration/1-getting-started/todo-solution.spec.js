/// <reference types="cypress" />
describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/todo');
    });

    it('displays two todo items by default', () => {
        cy.get('.todo-list li').should('have.length', 2);
        cy.get('.todo-list li').first().should('have.text', 'Pay electric bill');
        cy.get('.todo-list li').last().should('have.text', 'Walk the dog');
    });

    it('can add new todo items', () => {
        const newItem = 'Feed the cat';
        
        cy.get('[data-test="new-todo"]').type(`${newItem}{enter}`);
        
        cy.get('.todo-list li').should('have.length', 3);
        cy.get('.todo-list li').eq(2).should('have.text', newItem);
    });

    it('can check off item as completed', () => {
        cy.contains('Pay electric bill').parent().find('input[type="checkbox"]').click();
        cy.get('.todo-list li').first().should('have.class', 'completed')
        cy.contains('Pay electric bill').parents('li').should('have.class', 'completed');
    });

    context.only('with a checked task', () => {
        beforeEach(() => {
            cy.contains('Pay electric bill').parent().find('input[type="checkbox"]').check();
        });

        it('can filter for uncompleted tasks', () => {
            cy.contains('Active').click();

            cy.get('.todo-list li').first().should('have.text', 'Walk the dog');
            cy.get('.todo-list li').should('have.length', 1);
            cy.contains('Pay electric bill').should('not.exist');
        });

        it('can filter for completed tasks', () => {
            cy.contains('Completed').click();

            cy.get('.todo-list li').first().should('have.text', 'Pay electric bill');
            cy.get('.todo-list li').should('have.length', 1);
            cy.contains('Walk the dog').should('not.exist');
        });

        it('can delete all completed tasks', () => {
            cy.contains('Clear completed').click();

            cy.get('.todo-list li').should('have.length', 1);
            cy.contains('Pay electric bill').should('not.exist');
            cy.contains('Walk the dog').should('exist');
        });
    });
});