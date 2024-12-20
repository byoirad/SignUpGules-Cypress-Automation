import { el } from "./elements"

const SignupPage = {

    go: function () {
        cy.visit('/')
        cy.get(el.form).should('be.visible')
    },

    fillForm: function (user) {
        if (user.email) cy.get(el.inputEmail).type(user.email)
        if (user.password) cy.get(el.inputPassword).type(user.password)
        if (user.password2) cy.get(el.inputConfirmPassword).type(user.password2)
    },

    submitForm: function () {
        cy.get(el.signupButton).click()
    },

    errorMsgShouldBe: function (msg) {
        cy.contains(msg).should('have.attr', 'style', 'color: red;')
    },

    requiredMsgShouldBe: function (field, msg) {
        cy.get(`#signupForm #${field}`)
            .invoke('prop', 'validationMessage')
            .should('to.contains', msg)
    },

    successfulMessageShould: function () {
        cy.get(el.signupButton).click()
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Cadastro realizado com sucesso!')
        })
    },

    notSuccessfulMessageShould: function () {
        cy.get('button[qa-datatest="signup-button"]').click()
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.not.contain('Cadastro realizado com sucesso!')
        })
    },

    changeTheme: function () {
        cy.get(el.containerForm).should('have.css', 'background-color', 'rgb(255, 255, 255)')
        cy.get(el.toggleTheme).click()
        cy.get(el.containerForm).should('have.css', 'background-color', 'rgb(68, 68, 68)')
    },

    viewPassword: function () {
        cy.get(el.viewPasswordToggle).click()
        cy.get(el.inputPassword).should('have.attr', 'type', 'text')
    },

    viewConfirmPassword: function () {
        cy.get(el.viewConfirmToggle).click()
        cy.get(el.inputConfirmPassword).should('have.attr', 'type', 'text')
    },

    invalidEmailMsgShould: function () {
        cy.get(el.signupButton).click()
        cy.get(el.invalidEmailMessage)
            .should('have.text', 'Email inválido.')

    },

    siteShouldBe: function () {
        cy.get(el.logoType).should('have.attr', 'onclick', "window.location.href='https://sign-up-gules.vercel.app/")
    },

    siteCypressShould: function () {
        cy.get(el.cypressLogotype).should('have.attr', 'onclick', "window.location.href='https://www.cypress.io/'")
    }
}

export default SignupPage