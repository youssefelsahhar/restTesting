import { render, screen, act } from '@testing-library/react'; // Import act
import { BrowserRouter } from 'react-router-dom';
import AdminDashboard from './components/Products/ProductForm'; // Adjusted import path

test('renders create new product form and product list', async () => {
  // Wrapping the async operations inside act() to ensure all updates are completed
  await act(async () => {
    render(
      <BrowserRouter> {/* Wrap AdminDashboard with BrowserRouter */}
        <AdminDashboard />
      </BrowserRouter>
    );
  });
  
  // Check if the form title "Create New Product" is rendered
  const formTitle = screen.getByText(/create new product/i);
  expect(formTitle).toBeInTheDocument();
  
  // Check if the product list title is rendered
  const productListTitle = screen.getByText(/product list/i);
  expect(productListTitle).toBeInTheDocument();
});
