let data
let inboxId
let emailAddress
let emailBody
let otpCode

describe('MakeAnAppointment', () => {
  before(()=>{
    cy.fixture('selectors').then((sel)=>{
      data = sel;
    cy.clearLocalStorage(); 
    cy.clearCookies();
    })
  })
  it('onTheHomePage', () => {
    cy.visit('/');
    cy.get(data.cookiePpup).click();    
  })
  it('search for QA Assessment',()=>{
    cy.get(data.nameOrSpecialty).should('exist').type("QA Assessment");
    cy.get(data.selectFound).click();
   
  })
  it('Make an Appointment',()=>{
    cy.get(data.makeAnAppointment).should('exist').click();
  })
  it('Choose a location',()=>{
    cy.get(data.myOffice).click();
  })
  it('New Patient',()=>{
    cy.get(data.newPatient).click();
  })
  it('Consultation',()=>{
    cy.get(data.consultation).click();
  })
  it('Select First Date and Time',()=>{
    cy.get(data.firstPossibleHour).then(($links)=>{
      const randomIndex = Math.floor(Math.random() * $links.length);
      cy.wrap($links[randomIndex]).click();
    })
  })
  it('Review the Appointment Details',()=>{
    cy.get(data.continueBtn).click();
  })
  it('Fill in your email to continue',()=>{
    cy.get(data.emailBox).type(Cypress.env('emailAddress'));
    cy.get(data.emailContinueBtn).click();
    cy.get(data.verificationBox).should('be.visible');
    cy.wait(3000);
  })

  it('insert the OTP', () => {
    cy.waitForLatestEmail(Cypress.env('inboxID')).then((email) => {
    emailBody = email.body;
    const parser = new DOMParser();
    const doc = parser.parseFromString(emailBody, 'text/html');
    const otp = doc.querySelector(".body td:nth-of-type(1) td:nth-of-type(1) td .color--highlight-main").textContent;
    otpCode = otp.trim();
    cy.log(otpCode);   
    cy.get(data.verificationBox).type(otpCode);
    cy.get(data.verificationSubmitBtn).click();          
  });
})

  xit('Fill firstName',()=>{
    cy.get(data.firstName).should('exist').type("Emre");
  })
  xit('Fill lastName',()=>{
    cy.get(data.lastName).should('exist').type("Test")
  })
  xit('Fill dateOfBirth',()=>{
    cy.get(data.dateOfBirth).should('exist').type("02/11/1987")
  })
  xit('Fill phoneNumber',()=>{
    cy.get(data.phoneNumber).should('exist').type("55555555")
  })
  xit('Click Accept and Continue',()=>{
    cy.get(data.acceptAndContBtn).should('exist').click();
  })

  it('Confirm Appointment',()=>{
    cy.get(data.confirmAppointmentBtn).click();
})
  it('Your appointment is confirmed!',()=>{
  cy.get(data.confirmSuccessText).should('exist');
})
})