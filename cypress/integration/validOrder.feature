Feature: As a visitor I want to add a product to cart in order to buy it

    - Visitor on home page
    - Picks product
    - Sets options
    - Adds to cart
    - Checks out
    - Fills checkout form
    - Places order

    Scenario: [001] Visitor picks a product
        Given A visitor on the home page
        When He picks a product
        Then He should be shown the product page

    Scenario: [002] Visitor sets product options
        Given A visitor on the product page
        And The cart is empty
        When He sets product options
        Then He should be able to add to cart

    Scenario: [003] Visitor adds to cart
        Given A visitor on the "product" page
        And product options are set
        When He adds to cart
        Then His cart should be incremented

    Scenario: [004] Visitor views cart
        Given A visitor on the "product" page
        And His cart is not empty
        When He views cart
        Then He should be shown his cart

    Scenario: [005] Visitor proceeds to checkout
        Given A visitor on the "cart" page
        And His cart is not empty
        When He checksout
        Then He should be shown the checkout page

    Scenario: [006] Visitor places order
        Given A visitor on the "checkout" page
        And His cart is not empty
        When He fills checkout form with valid inputs
        And Places order
        Then He should get a success message
        And He should be shown order details