import SignupPage from "../support/folder/pages/signupPage"
import HomePage from "../support/folder/pages/signupPage"

describe('Dado que o usuário acessa a página de cadastro', function () {

    it('Então o sistema deve exibir a página de cadastro com sucesso.', function () {

        SignupPage.go()
    })

    context('Quando a senha não é preenchida corretamente', function () {

        const errorMessage = [
            { email: 'senhacurta-dario@gmail.com', password: '@Abc', password2: '@Abc', msg: 'Mínimo de 8 caracteres' },
            { email: 'senhaminuscula-dario@gmail.com', password: 'senh@teste', password2: 'senh@teste', msg: '1 letra maiúscula' },
            { email: 'senhaespecial-dario@gmail.com', password: 'Senhteste', password2: 'Senhteste', msg: '1 caractere especial' },
            { email: 'senhadiferente-dario@gmail.com', password: 'Senh@teste', password2: 'Senh@diferente', msg: 'As senhas devem ser iguais' },
        ]

        errorMessage.forEach(function (error) {

            it(`Então o sistema deve retornar: ${error.msg}`, function () {

                SignupPage.go()
                SignupPage.fillForm(error)
                SignupPage.submitForm()
                SignupPage.errorMsgShouldBe(error.msg)
            })
        })
    })

    context('Quando ele não preenche um campo obrigatório', function () {

        const requiredMessage = [
            { field: 'email', password: '@Abc', password2: '@Abc', msg: 'Preencha este campo.' },
            { email: 'senhaobrigatoria-dario@gmail.com', field: 'password', password2: 'senh@teste', msg: 'Preencha este campo.' },
            { email: 'confirmarsenha-dario@gmail.com', password: 'Senhteste', field: 'confirmPassword', msg: 'Preencha este campo.' },
        ]

        requiredMessage.forEach(function (required) {

            it(`Então o sistema deve retornar uma mensagem de obrigatoriedade para o campo: ${required.field}`, function () {

                SignupPage.go()
                SignupPage.fillForm(required)
                SignupPage.submitForm()
                SignupPage.requiredMsgShouldBe(required.field, required.msg)

            })
        })
    })

    context('Quando ele preenche todos os campos com dados válidos', function () {

        it('Então o sistema deve cadastrar usuário com sucesso', function () {

            const user = {
                email: 'camposvalido-dario@gmail.com',
                password: 'Senh@teste',
                password2: 'Senh@teste'
            }

            SignupPage.go()
            SignupPage.fillForm(user)
            SignupPage.successfulMessageShould()
        })
    })

    context('Quando ele preenche o formulário de cadastro com dados já cadastrados', function () {

        it('Então o sistema deve exibir uma mensagem informando usuário já cadastrado', function () {

            const duplicatedUser = {
                email: 'camposvalidos-dario@gmail.com',
                password: 'Senh@teste',
                password2: 'Senh@teste'
            }

            SignupPage.go()
            SignupPage.fillForm(duplicatedUser)
            SignupPage.notSuccessfulMessageShould()
        })
    })

    context('Quando ele clica no botão para alterar o tema da página', function () {

        it('Então o sistema deve alterar com sucesso o tema da página de cadastro entre tema escuro e claroo', function () {

            SignupPage.go()
            SignupPage.changeTheme()
        })
    })

    context('Quando ele clica para mostrar a senha do campo senha preenchida', function () {

        it('Então o sistema deve exibir a senha do campo Senha digitada com sucesso', function () {

            const user = {
                email: 'mostrarsenha-dario@gmail.com',
                password: 'Senh@teste'
            }

            SignupPage.go()
            SignupPage.fillForm(user)
            SignupPage.viewPassword()
        })

        it('Então o sistema deve exibir a senha do campo Confirme a Senha digitada com sucesso', function () {

            const user = {
                email: 'mostrarconfirmacaosenha-dario@gmail.com',
                password: 'Senh@teste',
                password2: 'Senh@teste'
            }

            SignupPage.go()
            SignupPage.fillForm(user)
            SignupPage.viewConfirmPassword()

        })
    })

    context('Quando ele preenche o campo E-mail com um e-mail sem domínio', function () {

        it('Então o sistema deve exibir uma mensagem informando email inválido.', function () {

            const userBadEmail = {
                email: 'emailsemdominio-dario',
                password: 'Senh@teste',
                password2: 'Senh@teste'
            }

            SignupPage.go()
            SignupPage.fillForm(userBadEmail)
            SignupPage.invalidEmailMsgShould()
        })
    })

    context('Quando ele clica na “logo do site”', function () {

        it('Entáo o sistema deve redirecionar para o site da logo', function () {

            SignupPage.go()
            SignupPage.siteShouldBe()
        })
    })

    context('Ele clica no logotipo do Cypress', function () {

        it('Então o sistema deve redirecionar para o site do Cypress', function () {

            SignupPage.go()
            SignupPage.siteCypressShould()
        })
    })
})