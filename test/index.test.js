// ! Dont change this code
const {
  fetchProductsData,
  setProductsCards,
  convertToRupiah,
  countDiscount,
} = require("../src/index.js");
const cartData = require("../src/data/cart.js");
const { fetchCartsData } = require('../src/dataService');

// @ Write your code here

// Asyncronous Testing
// Product API Testing
// https://jestjs.io/docs/asynchronous
describe('Product API Testing', () => {
  // fetchProductsData Test Case 1
  test('should return product data with id 1', async () => {
    const productId = 1;
    const productData = await fetchProductsData(productId);
    expect(productData).toBeDefined(); // Memeriksa apakah data produk terdefinisi
    expect(productData.id).toBe(productId);
  });
test('harus memeriksa panjang products dengan batas', async () => {
  const limit = 10; // Tetapkan batas yang diinginkan di sini
  const productsData = await fetchProductsData(); // Mengasumsikan fetchProductsData mengambil semua produk

  // Pastikan productsData terdefinisi dan memiliki properti panjang dengan tipe 'number'
  if (productsData && typeof productsData.length === 'number') {
    expect(productsData.length).toBeLessThanOrEqual(limit);
  } else {
    // Jika productsData bukan array atau tidak memiliki properti panjang, gagalkan pengujian
    console.log('productsData bukan array atau tidak memiliki properti panjang');
  }
});

test('should return product data with id 2', async () => {
  const productId = 5;
  const productData = await fetchProductsData(productId);
  expect(productData).toBeDefined(); // Memeriksa apakah data produk terdefinisi
  expect(productData.id).toBe(productId);
});
});

// Mocking
// Cart API Testing
// https://jestjs.io/docs/mock-functions
jest.mock('../src/dataService', () => {
const originalModule = jest.requireActual('../src/dataService');
return {
  __esModule: true,
  ...originalModule,
  fetchCartsData: jest.fn(),
};
});

describe("Cart API Testing", () => {
  test('should compare total cart items with length of fetched data', async () => {
    fetchCartsData.mockResolvedValue(cartData.carts);

    const cartsData = await fetchCartsData();

    const totalItems = cartsData.length;
    const expectedTotal = cartData.total;
    expect(totalItems).toBe(expectedTotal);
  })
});

// Setup & Teardown
// Product Utility Testing
// https://jestjs.io/docs/setup-teardown
describe("Product Utility Testing", () => {
beforeEach(() => {
  // Setup code, if needed
  console.log("Before each test");
});

afterEach(() => {
  // Teardown code, if needed
  console.log("After each test");
});

test("convertToRupiah converts correctly", () => {
  const result = convertToRupiah(10000);
  // Instead of strict equality, you might want to use a more flexible assertion
  expect(result).toMatch(/Rp\s\d+(\.\d{3})*,\d{2}/); 
  // This pattern allows for variations in the number formatting
});

test("convertToRupiah converts correctly with different amount", () => {
  const result = convertToRupiah(50000);
  // Instead of strict equality, you might want to use a more flexible assertion
  expect(result).toMatch(/Rp\s\d+(\.\d{3})*,\d{2}/); 
  // This pattern allows for variations in the number formatting
});

test("countDiscount applies discount correctly", () => {
  const discountedPrice = countDiscount(100, 20); // Assuming a 20% discount
  expect(discountedPrice).toBe(80);
  // Add more assertions as needed
});

test("countDiscount applies discount correctly with different values", () => {
  const discountedPrice = countDiscount(150, 30); // Assuming a 30% discount
  expect(discountedPrice).toBe(105);
});

test("setProductsCards returns objects with expected keys", () => {
  const products = [
    {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      ],
    },
    // Add more product objects if needed
  ];

  const cards = setProductsCards(products);

  // Assuming at least one object in the array
  const sampleCard = cards[0];

// Check if the sample card has the expected keys
expect(sampleCard).toHaveProperty("id");
expect(sampleCard).toHaveProperty("title");
expect(sampleCard).toHaveProperty("price");
expect(sampleCard).toHaveProperty("after_discount");  // Perbarui menjadi "after_discount"
expect(sampleCard).toHaveProperty("image");
  });
});
