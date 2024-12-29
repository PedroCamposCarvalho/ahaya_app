describe('Buru Luke', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

   it('should be able to create an account and delete it', async() => {
     await expect(element(by.id('MainPage'))).toBeVisible();
     await element(by.id('signUpButton')).tap();
     await element(by.id('name')).typeText('Mario Buru');
     await element(by.id('ssn')).typeText('231.657.170-01');
     await element(by.id('email')).typeText('bot_teste@teste.com');
     await element(by.id('cellphone')).typeText('(11)99615-4995');
     await element(by.id('zipCode')).typeText('13214-523');
     await element(by.id('searchZipCode')).tap();
     await new Promise((r) => setTimeout(r, 2000));
     await element(by.id('number')).typeText('1431');
     await element(by.id('container')).scrollTo('bottom')
     await element(by.id('complement')).typeText('Apartamento 13');
     await element(by.id('birthDate')).typeText('30/01/1997');
     await element(by.id('sexDropdown')).tap();
     await element(by.id('dropdownItem')).tap();
     await element(by.id('password')).typeText('Pluma@2022');
     await element(by.id('confirmPassword')).typeText('Pluma@2022');
     await element(by.id('readTerms')).tap();
     await element(by.id('submitButton')).tap();
     await expect(element(by.id('SelectSport'))).toBeVisible();
    //  await element(by.id('optionRoute')).tap();
    //  await element(by.id('profileButton')).tap();
    //  await element(by.id('container')).scrollTo('bottom')
    //  await element(by.id('deleteAccountButton')).tap();
    //  await element(by.label('Sim').and(by.type('_UIAlertControllerActionView'))).tap();
   })
});
