import { describe, it, expect } from 'vitest';
import { getProducts, getProductById } from './products.js';

describe('getProducts', () => {
  it('should return an array of products', () => {
    const products = getProducts();
    expect(Array.isArray(products)).toBe(true);
  });

  it('should return all 9 products', () => {
    const products = getProducts();
    expect(products).toHaveLength(9);
  });

  it('should return products with correct structure', () => {
    const products = getProducts();
    products.forEach((product) => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('image');
      expect(product).toHaveProperty('description');
    });
  });

  it('should return products with valid data types', () => {
    const products = getProducts();
    products.forEach((product) => {
      expect(typeof product.id).toBe('number');
      expect(typeof product.name).toBe('string');
      expect(typeof product.price).toBe('number');
      expect(typeof product.image).toBe('string');
      expect(typeof product.description).toBe('string');
    });
  });

  it('should have unique product IDs', () => {
    const products = getProducts();
    const ids = products.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(products.length);
  });

  it('should return products with positive prices', () => {
    const products = getProducts();
    products.forEach((product) => {
      expect(product.price).toBeGreaterThan(0);
    });
  });

  it('should return products with non-empty names', () => {
    const products = getProducts();
    products.forEach((product) => {
      expect(product.name.length).toBeGreaterThan(0);
    });
  });

  it('should return products with valid image URLs', () => {
    const products = getProducts();
    products.forEach((product) => {
      expect(product.image).toMatch(/^https?:\/\/.+/);
    });
  });

  it('should return same array reference on multiple calls', () => {
    const products1 = getProducts();
    const products2 = getProducts();
    expect(products1).toBe(products2);
  });
});

describe('getProductById', () => {
  it('should return the correct product for a valid numeric ID', () => {
    const product = getProductById(1);
    expect(product).toBeDefined();
    expect(product.id).toBe(1);
    expect(product.name).toBe('Wireless Headphones');
  });

  it('should return the correct product for a string ID', () => {
    const product = getProductById('2');
    expect(product).toBeDefined();
    expect(product.id).toBe(2);
    expect(product.name).toBe('Smart Watch');
  });

  it('should return undefined for non-existent ID', () => {
    const product = getProductById(999);
    expect(product).toBeUndefined();
  });

  it('should return undefined for ID 0', () => {
    const product = getProductById(0);
    expect(product).toBeUndefined();
  });

  it('should return undefined for negative ID', () => {
    const product = getProductById(-1);
    expect(product).toBeUndefined();
  });

  it('should return undefined for null ID', () => {
    const product = getProductById(null);
    expect(product).toBeUndefined();
  });

  it('should return undefined for undefined ID', () => {
    const product = getProductById(undefined);
    expect(product).toBeUndefined();
  });

  it('should handle string ID that converts to valid number', () => {
    const product = getProductById('3');
    expect(product).toBeDefined();
    expect(product.id).toBe(3);
    expect(product.name).toBe('Laptop Stand');
  });

  it('should return undefined for non-numeric string ID', () => {
    const product = getProductById('abc');
    expect(product).toBeUndefined();
  });

  it('should return undefined for empty string ID', () => {
    const product = getProductById('');
    expect(product).toBeUndefined();
  });

  it('should return correct product for the first ID in the list', () => {
    const product = getProductById(1);
    expect(product).toBeDefined();
    expect(product.id).toBe(1);
    expect(product.name).toBe('Wireless Headphones');
    expect(product.price).toBe(99.99);
  });

  it('should return correct product for the last ID in the list', () => {
    const product = getProductById(9);
    expect(product).toBeDefined();
    expect(product.id).toBe(9);
    expect(product.name).toBe('External Hard Drive');
    expect(product.price).toBe(119.99);
  });

  it('should return correct product for a middle ID in the list', () => {
    const product = getProductById(5);
    expect(product).toBeDefined();
    expect(product.id).toBe(5);
    expect(product.name).toBe('USB-C Hub');
    expect(product.price).toBe(39.99);
  });

  it('should return product with all required properties', () => {
    const product = getProductById(4);
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('image');
    expect(product).toHaveProperty('description');
  });

  it('should handle floating point string ID', () => {
    const product = getProductById('7.9');
    expect(product).toBeUndefined();
  });

  it('should handle whitespace in string ID', () => {
    const product = getProductById(' 6 ');
    expect(product).toBeDefined();
    expect(product.id).toBe(6);
  });
});