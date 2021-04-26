Feature: [E2E_1] As a visitor I want to browse the website in order to buy a product

    - Visitor on home page
    - Picks product
    - Sets options
    - Adds to cart
    - Checks out
    - Fills checkout form
    - Places order

Scenario: [S001] Visitor makes a valid order
    Given A visitor on the homepage
    When He chooses a product
    And Sets product options
    And Adds to cart
    And Proceeds to checkout
    And Confirms order with valid info
    Then He should be able to order product
    And Receives a confirmation email
