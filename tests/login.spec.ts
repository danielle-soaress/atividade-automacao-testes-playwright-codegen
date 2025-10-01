import { test, expect } from '@playwright/test';

const URL_LOGIN = 'https://practicetestautomation.com/practice-test-login/';
const URL_DASHBOARD = 'https://practicetestautomation.com/logged-in-successfully/';
const USERNAME_SELECTOR = 'input[name="username"]';
const PASSWORD_SELECTOR = 'input[name="password"]';
const SUBMIT_BUTTON_SELECTOR = '#submit';
const ERROR_MESSAGE_SELECTOR = '#error';
const SUCCESS_MESSAGE_SELECTOR = '.post-title';

test.describe('Testes de Funcionalidade de Login', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL_LOGIN);
    });

    test.afterEach(async ({}, testInfo) => {
        const ctID = testInfo.title.split(':')[0]; 
        const status = testInfo.status === 'passed' ? 'PASSOU (SUCESSO)' : 'FALHOU (ERRO)';
        
        console.log(`\n--- RESULTADO FINAL ${ctID} ---`);
        console.log(`STATUS: ${status}`);
        console.log('-------------------------------\n');
    });

    // CT01: Sucesso - Classe Válida
    test('CT01: Deve permitir login com credenciais válidas e redirecionar para dashboard', async ({ page }) => {
        await page.locator(USERNAME_SELECTOR).fill('student');
        await page.locator(PASSWORD_SELECTOR).fill('Password123');
        await page.locator(SUBMIT_BUTTON_SELECTOR).click();

        // Resultado Esperado: Sucesso e redirecionamento para a dashboard
        await expect(page).toHaveURL(URL_DASHBOARD);
        await expect(page.locator(SUCCESS_MESSAGE_SELECTOR)).toHaveText('Logged In Successfully');
    });

    // CT02: Falha - Classe Inválida (Usuário Inexistente)
    test('CT02: Deve falhar com usuário inexistente', async ({ page }) => {
        await page.locator(USERNAME_SELECTOR).fill('usuario.inexistente');
        await page.locator(PASSWORD_SELECTOR).fill('Password123');
        await page.locator(SUBMIT_BUTTON_SELECTOR).click();

        // Resultado Esperado: Mensagem de erro "Your username is invalid!"
        await expect(page.locator(ERROR_MESSAGE_SELECTOR)).toBeVisible();
        await expect(page.locator(ERROR_MESSAGE_SELECTOR)).toHaveText('Your username is invalid!');
    });

    // CT03: Falha - Classe Inválida (Senha Incorreta)
    test('CT03: Deve falhar com senha incorreta', async ({ page }) => {
        await page.locator(USERNAME_SELECTOR).fill('student');
        await page.locator(PASSWORD_SELECTOR).fill('SenhaErrada123');
        await page.locator(SUBMIT_BUTTON_SELECTOR).click();

        // Resultado Esperado: Mensagem de erro "Your password is invalid!"
        await expect(page.locator(ERROR_MESSAGE_SELECTOR)).toBeVisible();
        await expect(page.locator(ERROR_MESSAGE_SELECTOR)).toContainText('Your password is invalid!');
    });

    // CT04: Falha - Valor Limite (Usuário com 1 caractere)
    test('CT04: Deve falhar com usuário de apenas 1 caractere', async ({ page }) => {
        await page.locator(USERNAME_SELECTOR).fill('a');
        await page.locator(PASSWORD_SELECTOR).fill('Password123');
        await page.locator(SUBMIT_BUTTON_SELECTOR).click();

        // Resultado Esperado: Mensagem de erro "Your username is invalid!"
        await expect(page.locator(ERROR_MESSAGE_SELECTOR)).toBeVisible();
        await expect(page.locator(ERROR_MESSAGE_SELECTOR)).toContainText('Your username is invalid!');
    });

    // CT05: Falha - Valor Limite (Senha Vazia)
    test('CT05: Deve falhar com senha vazia', async ({ page }) => {
        await page.locator(USERNAME_SELECTOR).fill('student');
        await page.locator(SUBMIT_BUTTON_SELECTOR).click();

        // Resultado Esperado: Mensagem de erro "Your password is invalid!"
        await expect(page.locator(ERROR_MESSAGE_SELECTOR)).toBeVisible();
        await expect(page.locator(ERROR_MESSAGE_SELECTOR)).toHaveText('Your password is invalid!');
    });

    // CT06: Falha - Valor Limite (Usuário Vazio)
    test('CT06: Deve falhar com usuário vazio', async ({ page }) => {
        await page.locator(PASSWORD_SELECTOR).fill('Password123'); 
        await page.locator(SUBMIT_BUTTON_SELECTOR).click();

        // Resultado Esperado: Mensagem de erro "Your username is invalid!"
        await expect(page.locator(ERROR_MESSAGE_SELECTOR)).toBeVisible();
        await expect(page.locator(ERROR_MESSAGE_SELECTOR)).toHaveText('Your username is invalid!');
    });
});