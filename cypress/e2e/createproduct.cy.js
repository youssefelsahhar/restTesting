describe('Create Product Test', () => {
  beforeEach(() => {
    // Reset the database or any required state before each test
    cy.visit('http://localhost:4000/create-product'); // Replace with your actual path to the products page
  });

  it('should create a product successfully', () => {
    // Interacting with the form fields
    const productName = 'New Product';
    const productDescription = 'This is a description of the new product';
    const productPrice = '99.99';

    // Fill out the form
    cy.get('input[name="name"]').type(productName);
    cy.get('textarea[name="description"]').type(productDescription);
    cy.get('input[name="price"]').type(productPrice);

    // Submit the form (you can adjust the selector based on your form's submit button)
    cy.get('button[type="submit"]').click();

    // Verify the success message or the fact that the product was added
    // If the page redirects after submitting, check the URL or product list
    cy.url().should('include', '/admin/products'); // Check the URL or any other success indication
    cy.contains('Product created successfully').should('be.visible'); // Adjust with your success message

    // Alternatively, if the products are displayed in a list, you can check that the new product is present
    cy.get('table tbody').should('contain', productName); // Ensure that the table lists the new product
    cy.get('table tbody').should('contain', productDescription); // Verify description
    cy.get('table tbody').should('contain', productPrice); // Verify price
  });

  it('should show an error if the product name is empty', () => {
    // Try to submit the form without a name
    cy.get('input[name="name"]').clear(); // Clear the name field
    cy.get('input[name="price"]').type('99.99');
    cy.get('button[type="submit"]').click();

    // Check for validation error message
    cy.contains('Product name is required').should('be.visible'); // Adjust with your actual error message
  });

  it('should handle API errors gracefully', () => {
    // Mock API failure (optional, useful for simulating backend errors)
    cy.intercept('POST', '/api/products', {
      statusCode: 500,
      body: { message: 'Error creating product' },
    }).as('createProductError');

    // Fill out form and submit
    cy.get('input[name="name"]').type('Test Product');
    cy.get('input[name="price"]').type('199.99');
    cy.get('button[type="submit"]').click();

    // Verify that an error message is shown
    cy.wait('@createProductError');
    cy.contains('Error creating product').should('be.visible');
  });
});
