Feature: from home page to product order

Scenario: Visitor requests a product from the home page
    Given A visitor on the homepage
    When He chooses a product
    Then He should get product details