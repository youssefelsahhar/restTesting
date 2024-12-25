import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AdminDashboard from '../Products/ProductForm'; // Ensure the path is correct

// Mock axios to avoid making actual API calls
jest.mock('axios');

describe('AdminDashboard (ProductForm)', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  test('renders the form and product list', async () => {
    // Mock an empty product list
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<AdminDashboard />);

    // Verify form fields and headings are rendered
    expect(screen.getByText(/Create New Product/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  });

  test('fetches and displays products', async () => {
    // Mock product data
    const mockProducts = [
      { _id: '1', name: 'Product A', price: 100, description: 'Description A' },
      { _id: '2', name: 'Product B', price: 200, description: 'Description B' },
    ];
    axios.get.mockResolvedValueOnce({ data: mockProducts });

    render(<AdminDashboard />);

    // Wait for products to load and verify
    await waitFor(() => {
      expect(screen.getByText(/Product A/i)).toBeInTheDocument();
      expect(screen.getByText(/Description A/i)).toBeInTheDocument();
      expect(screen.getByText(/\$100/i)).toBeInTheDocument();
      expect(screen.getByText(/Product B/i)).toBeInTheDocument();
    });
  });

  test('creates a new product', async () => {
    // Mock initial fetch and post
    axios.get.mockResolvedValueOnce({ data: [] }); // Initial fetch
    axios.post.mockResolvedValueOnce({}); // Create product
    axios.get.mockResolvedValueOnce({
      data: [{ _id: '3', name: 'New Product', price: 300, description: 'New Description' }],
    }); // Fetch updated list

    render(<AdminDashboard />);

    // Fill in the form and submit
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Product' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '300' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'New Description' } });

    fireEvent.click(screen.getByText(/Create Product/i));

    // Wait for the new product to appear
    await waitFor(() => {
      expect(screen.getByText(/New Product/i)).toBeInTheDocument();
      expect(screen.getByText(/\$300/i)).toBeInTheDocument();
    });
  });

  test('edits an existing product', async () => {
    // Mock product data
    const mockProduct = { _id: '1', name: 'Product A', price: 100, description: 'Description A' };
    axios.get.mockResolvedValueOnce({ data: [mockProduct] }); // Initial fetch
    axios.put.mockResolvedValueOnce({}); // Update product
    axios.get.mockResolvedValueOnce({ data: [{ ...mockProduct, name: 'Updated Product' }] }); // Fetch updated list

    render(<AdminDashboard />);

    // Wait for the product to load
    await waitFor(() => {
      expect(screen.getByText(/Product A/i)).toBeInTheDocument();
    });

    // Simulate editing the product
    fireEvent.click(screen.getByText(/Edit/i));
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Updated Product' } });
    fireEvent.click(screen.getByText(/Update Product/i));

    // Wait for the updated product to appear
    await waitFor(() => {
      expect(screen.getByText(/Updated Product/i)).toBeInTheDocument();
    });
  });

  test('deletes a product', async () => {
    // Mock product data
    const mockProduct = { _id: '1', name: 'Product A', price: 100, description: 'Description A' };
    axios.get.mockResolvedValueOnce({ data: [mockProduct] }); // Initial fetch
    axios.delete.mockResolvedValueOnce({}); // Delete product
    axios.get.mockResolvedValueOnce({ data: [] }); // Fetch updated list

    render(<AdminDashboard />);

    // Wait for the product to load
    await waitFor(() => {
      expect(screen.getByText(/Product A/i)).toBeInTheDocument();
    });

    // Simulate deleting the product
    fireEvent.click(screen.getByText(/Delete/i));

    // Wait for the product to be removed
    await waitFor(() => {
      expect(screen.queryByText(/Product A/i)).not.toBeInTheDocument();
    });
  });
});
