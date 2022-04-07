import { Selector } from 'testcafe';

fixture `smokeTests`
    .page `http://10.115.8.126:3002/en/`;

test('loginSuccessfulTest', async t => {
    await t
        .click(Selector('header span').withText('Sign in'))
        .typeText('main .form-control', 'rares@yahoo.com')
        .typeText('main .form-control.js-child-focus.js-visible-password', '123456')
        .click(Selector('footer button').withText('SIGN IN'))
        .expect(Selector('header span').withText('Rares Silaghi').textContent).contains("Rares Silaghi");
});

test('tryRegisterNewUserWithUsedEmailTest', async t => {
    await t
        .click(Selector('header span').withText('Sign in'))
        .click(Selector('main a').withText('No account? Create one here'))
        .click('main [name="id_gender"]')
        .typeText('main .form-control', 'Test')
        .typeText(Selector('main .form-control').nth(1), 'Cafe')
        .typeText(Selector('main .form-control').nth(2), 'testcafe@yahoo.cp')
        .typeText('main .form-control.js-child-focus.js-visible-password', '123456')
        .click('main [name="optin"]')
        .click(Selector('footer button').withText('SAVE'))
        .expect(Selector('main li').withText('The email is already used, please choose another o').textContent).contains("The email is already used, please choose another one or sign in");
});

test('successfulCheckoutTest', async t => {
    await t
        .click(Selector('header span').withText('Sign in'))
        .typeText('main .form-control', 'rares@yahoo.com')
        .typeText('main .form-control.js-child-focus.js-visible-password', '123456')
        .click(Selector('footer button').withText('SIGN IN'))
        .click('header .logo.img-responsive')
        .click('main [alt="Hummingbird printed t-shirt"][data-full-size-image-url^="http://10.115.8.126:3002/1-large_default/hummingbi"]')
        .click(Selector('main button').withText(' ADD TO CART'))
        .click(Selector('#blockcart-modal a').withText('PROCEED TO CHECKOUT'))
        .click(Selector('main a').withText('PROCEED TO CHECKOUT'))
        .click(Selector('#checkout-addresses-step button').withText('CONTINUE'))
        .click('#delivery_option_2')
        .click(Selector('#js-delivery button').withText('CONTINUE'))
        .click('#payment-option-1')
        .click('#conditions_to_approve\[terms-and-conditions\]')
        .click(Selector('#payment-confirmation button').withText('PLACE ORDER'))
        .expect(Selector('main h3').withText('YOUR ORDER IS CONFIRMED').textContent).contains("\n                Your order is confirmed\n              ");
});

test('loginInvalidCredentials', async t => {
    await t
        .click(Selector('header span').withText('Sign in'))
        .typeText('main .form-control', 'rares@yahoo.com')
        .typeText('main .form-control.js-child-focus.js-visible-password', 'qwertyui')
        .click(Selector('footer button').withText('SIGN IN'))
        .expect(Selector('main li').withText('Authentication failed.').textContent).eql("Authentication failed.");
});

test('registerLeaveEmptyMandatoryFields', async t => {
    await t
        .click(Selector('header i').withText(''))
        .click(Selector('main a').withText('No account? Create one here'))
        .click(Selector('main [name="id_gender"]').nth(1))
        .click(Selector('footer button').withText('SAVE'))
        .expect(Selector('main .form-control').textContent).eql("");
});

test('contactUsValidEmailTest', async t => {
    await t
        .click(Selector('header a').withText('Contact us'))
        .click('main .form-control.form-control-select')
        .click(Selector('main option').withText('Webmaster'))
        .typeText(Selector('main .form-control').nth(1), 'rares@yahoo.com')
        .typeText(Selector('main .form-control').nth(3), 'Mesaj')
        .click('footer .btn.btn-primary')
        .expect(Selector('main li').withText('Your message has been successfully sent to our tea').textContent).eql("Your message has been successfully sent to our team.");
});

test('contactUsEmptyMessageTest', async t => {
    await t
        .click(Selector('header a').withText('Contact us'))
        .typeText(Selector('main .form-control').nth(1), 'rares@yahoo.com')
        .click('main .form-control.form-control-select')
        .click('footer .btn.btn-primary')
        .expect(Selector('main li').withText('The message cannot be blank.').textContent).eql("The message cannot be blank.");
});

test('searchItemsTest', async t => {
    await t
        .typeText('header .ui-autocomplete-input', 'mug')
        .pressKey('enter')
        .expect(Selector('header .ui-autocomplete-input').value).eql("mug")
        .expect(Selector('main a').withText('Customizable Mug').innerText).contains("Customizable Mug");
});

test('filterClothesByManCategory', async t => {
    await t
        .click(Selector('header a').withText('CLOTHES'))
        .click('main .ps-shown-by-js')
        .expect('').eql("\n            Categories:\n            Men\n            \n          ")
        .expect(Selector('main [alt="Hummingbird printed t-shirt"][data-full-size-image-url^="http://10.115.8.126:3002/1-large_default/hummingbi"]').getAttribute('src')).eql("http://10.115.8.126:3002/1-home_default/hummingbird-printed-t-shirt.jpg");
});