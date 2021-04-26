const faker = require('faker/locale/en_US')

export class User {
    constructor(countryCode) {
        this.fn = faker.name.firstName()
        this.ln = faker.name.lastName()
        this.company = faker.company.companyName();
        this.country = countryCode;
        this.address1 = faker.address.streetAddress()
        this.address2 = faker.address.secondaryAddress()
        this.city = faker.address.city()
        this.state = faker.address.stateAbbr()
        this.zip = faker.address.zipCode()
        this.phone = faker.phone.phoneNumber('##########')
        this.email = faker.internet.email()
    }
}