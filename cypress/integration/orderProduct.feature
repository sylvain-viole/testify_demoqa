Feature: from home page to product order

Scenario: [S001] Visitor makes a valid order
    Given A visitor on the homepage
    When He chooses a product
    And Sets product options
    And adds to cart
    And confirms order with valid info
    Then He should be able to order product
