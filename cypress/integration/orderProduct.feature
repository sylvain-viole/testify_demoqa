Feature: [E2E_1] As a visitor I want to browse the website in order to buy a product

Scenario: [S001] Visitor makes a valid order
    Given A visitor on the homepage
    When He chooses a product
    And Sets product options
    And adds to cart
    And proceeds to checkout
    And confirms order with valid info
    Then He should be able to order product