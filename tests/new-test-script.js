import { Selector } from 'testcafe';

fixture `New Fixture`
    .page `http://10.115.8.126:3002/en/`;
    
test(`New Test`, async t => {
    await t
        .typeText('header .ui-autocomplete-input', 'cana')    
        .pressKey('shift')
        .pressKey('enter')
        .click(Selector('main a').withText(' Quick view').nth(3))
        .click(Selector('#add-to-cart-or-refresh button').withText(' ADD TO CART'))
        .click(Selector('#blockcartqqqq-modal a').withText('PROCEED TO CHECKOUT'))
        .pressKey('shift')
        .click(Selector('main a').withText('PROCEED TO CHECKOUT'))
});
