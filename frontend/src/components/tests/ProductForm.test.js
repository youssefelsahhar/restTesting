import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AdminDashboard from '../Products/ProductForm';

// Mock axios to avoid making actual API calls
jest.mock('axios');

describe('AdminDashboard (ProductForm)', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  test('renders the form and product list', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<AdminDashboard />);

    expect(screen.getByText(/Create New Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
  });

  test('fetches and displays products', async () => {
    const mockProducts = [
      { _id: '1', name: 'Product A', price: 100, description: 'Description A' },
      { _id: '2', name: 'Product B', price: 200, description: 'Description B' },
    ];
    axios.get.mockResolvedValueOnce({ data: mockProducts });

    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Product A/i)).toBeInTheDocument();
      expect(screen.getByText(/Description A/i)).toBeInTheDocument();
      expect(screen.getByText(/\$100/i)).toBeInTheDocument();
      expect(screen.getByText(/Product B/i)).toBeInTheDocument();
    });
  });

  test('creates a new product', async () => {
    axios.get.mockResolvedValueOnce({ data: [] }); // Initial fetch
    axios.post.mockResolvedValueOnce({}); // Create product
    axios.get.mockResolvedValueOnce({ data: [{ _id: '3', name: 'New Product', price: 300, description: 'New Description' }] });

    render(<AdminDashboard />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Product' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '300' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'New Description' } });

    fireEvent.click(screen.getByText(/Create Product/i));

    await waitFor(() => {
      expect(screen.getByText(/New Product/i)).toBeInTheDocument();
      expect(screen.getByText(/\$300/i)).toBeInTheDocument();
    });
  });

  test('edits an existing product', async () => {
    const mockProduct = { _id: '1', name: 'Product A', price: 100, description: 'Description A' };
    axios.get.mockResolvedValueOnce({ data: [mockProduct] }); // Initial fetch
    axios.put.mockResolvedValueOnce({}); // Update product
    axios.get.mockResolvedValueOnce({ data: [{ ...mockProduct, name: 'Updated Product' }] });

    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Product A/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Edit/i));

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Updated Product' } });
    fireEvent.click(screen.getByText(/Update Product/i));

    await waitFor(() => {
      expect(screen.getByText(/Updated Product/i)).toBeInTheDocument();
    });
  });

  test('deletes a product', async () => {
    const mockProduct = { _id: '1', name: 'Product A', price: 100, description: 'Description A' };
    axios.get.mockResolvedValueOnce({ data: [mockProduct] }); // Initial fetch
    axios.delete.mockResolvedValueOnce({}); // Delete product
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Product A/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Delete/i));

    await waitFor(() => {
      expect(screen.queryByText(/Product A/i)).not.toBeInTheDocument();
    });
  });
});
