// /// <reference types="Cypress" />
//
// describe('My First Test', () => {
//     it('Visits the app root url', () => {
//         cy.visit('https://guild-service-fe.herokuapp.com/?#/guilds/EU/the%20maelstrom/divided')
//         let names = [];
//         cy.xpath('//*[@id="content"]/div/div/div/div/div[2]/a').each((el, index) => {
//             if(index == 500) return false;
//             // names.push(el.text().split(' ')[0].replace(',', ''));
//             names.push(el.text());
//         }).then(() => {
//             names.forEach(name => {
//                 name = name.split(' ')[0].replace(',', '');
//                 // cy.xpath(`//*[@id="content"]/div/div/div/div/div[2]/a [text() = '${name}']`).click();
//                 cy.xpath(`//*[text()[contains(.,'${name}')]]`).first().click();
//                 // cy.wait(3000);
//                 cy.go('back');
//             })
//         })
//
//
//     })
// })
