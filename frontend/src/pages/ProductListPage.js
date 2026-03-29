import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../utils/api';
import ProductCard from '../components/product/ProductCard';
import './ProductListPage.css';

const SORT_OPTIONS = [
  { label: 'Relevance', value: '' },
  { label: 'Price — Low to High', value: 'price_asc' },
  { label: 'Price — High to Low', value: 'price_desc' },
  { label: 'Rating', value: 'rating' },
  { label: 'Popularity', value: 'popularity' },
];

/** Sliding window of page numbers centered on `current` (fixes always showing 1–7). */
function buildPaginationItems(current, total, width = 5) {
  if (total <= 1) return [];
  let end = Math.min(total, Math.max(width, current + Math.floor(width / 2)));
  let start = Math.max(1, end - width + 1);
  end = Math.min(total, start + width - 1);
  start = Math.max(1, end - width + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => ({ type: 'page', value: start + i }));
}

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';
  const page = parseInt(searchParams.get('page') || '1', 10) || 1;
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  const [priceInput, setPriceInput] = useState({ min: minPrice, max: maxPrice });

  useEffect(() => {
    fetchCategories()
      .then(({ data }) => setCategories(data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setPriceInput({ min: minPrice, max: maxPrice });
  }, [minPrice, maxPrice]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 20, sort };
      if (category) params.category = category;
      if (search) params.search = search;
      if (minPrice !== '') params.minPrice = minPrice;
      if (maxPrice !== '') params.maxPrice = maxPrice;
      const { data } = await fetchProducts(params);
      setProducts(data.products || []);
      setTotal(data.total ?? 0);
      setPages(data.pages ?? 1);
    } catch {
      setProducts([]);
      setTotal(0);
      setPages(1);
    } finally {
      setLoading(false);
    }
  }, [category, search, sort, page, minPrice, maxPrice]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const commitSearchParams = (next) => {
    const cleaned = Object.fromEntries(
      Object.entries(next).filter(([, v]) => v !== '' && v !== null && v !== undefined)
    );
    setSearchParams(cleaned);
  };

  const updateParam = (key, value) => {
    const params = Object.fromEntries(searchParams.entries());
    if (value === '' || value === null || value === undefined) delete params[key];
    else params[key] = String(value);
    if (key !== 'page') params.page = '1';
    commitSearchParams(params);
  };

  const applyPrice = () => {
    const params = Object.fromEntries(searchParams.entries());
    if (priceInput.min !== '') params.minPrice = String(priceInput.min);
    else delete params.minPrice;
    if (priceInput.max !== '') params.maxPrice = String(priceInput.max);
    else delete params.maxPrice;
    params.page = '1';
    commitSearchParams(params);
  };

  const clearFilters = () => {
    setPriceInput({ min: '', max: '' });
    setSearchParams({});
  };

  const clearPriceFilters = () => {
    setPriceInput({ min: '', max: '' });
    const params = Object.fromEntries(searchParams.entries());
    delete params.minPrice;
    delete params.maxPrice;
    params.page = '1';
    commitSearchParams(params);
  };

  const selectedCategory = categories.find((c) => c.slug === category);
  const paginationItems = buildPaginationItems(page, pages);

  return (
    <div className="plp-container">
      <aside className="plp-sidebar card" aria-label="Product filters">
        <div className="sidebar-header">
          <h3>Filters</h3>
          {(category || search || minPrice || maxPrice) && (
            <button type="button" className="clear-all" onClick={clearFilters}>
              Clear All
            </button>
          )}
        </div>

        <div className="filter-section">
          <h4>Category</h4>
          <div className="filter-scroll">
            {categories.map((cat) => (
              <label key={cat.id} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={category === cat.slug}
                  onChange={() => updateParam('category', cat.slug === category ? '' : cat.slug)}
                />
                <span>
                  {cat.icon} {cat.name}
                </span>
                <span className="filter-count">{cat.product_count}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>Price Range</h4>
          <div className="price-inputs">
            <input
              type="number"
              min="0"
              placeholder="Min ₹"
              value={priceInput.min}
              onChange={(e) => setPriceInput((p) => ({ ...p, min: e.target.value }))}
            />
            <span>—</span>
            <input
              type="number"
              min="0"
              placeholder="Max ₹"
              value={priceInput.max}
              onChange={(e) => setPriceInput((p) => ({ ...p, max: e.target.value }))}
            />
          </div>
          <button type="button" className="apply-price-btn" onClick={applyPrice}>
            Apply
          </button>
        </div>
      </aside>

      <div className="plp-main">
        <div className="plp-header card">
          <div className="plp-title">
            {search && (
              <h2>
                Results for &quot;<em>{search}</em>&quot;
              </h2>
            )}
            {selectedCategory && !search && (
              <h2>
                {selectedCategory.icon} {selectedCategory.name}
              </h2>
            )}
            {!search && !selectedCategory && <h2>All Products</h2>}
            <span className="result-count">{total.toLocaleString('en-IN')} results</span>
          </div>
          <div className="sort-bar" role="toolbar" aria-label="Sort products">
            <span>Sort by:</span>
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value || 'relevance'}
                type="button"
                className={`sort-btn ${sort === opt.value ? 'active' : ''}`}
                onClick={() => updateParam('sort', opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {(category || minPrice || maxPrice) && (
          <div className="active-filters">
            {selectedCategory && (
              <span className="filter-tag">
                {selectedCategory.icon} {selectedCategory.name}
                <button type="button" onClick={() => updateParam('category', '')} aria-label="Remove category filter">
                  ×
                </button>
              </span>
            )}
            {(minPrice || maxPrice) && (
              <span className="filter-tag">
                ₹{minPrice || '0'} — ₹{maxPrice || '∞'}
                <button type="button" onClick={clearPriceFilters} aria-label="Remove price filter">
                  ×
                </button>
              </span>
            )}
          </div>
        )}

        {loading ? (
          <div className="spinner-wrap plp-loading">
            <div className="spinner" aria-label="Loading products" />
          </div>
        ) : products.length === 0 ? (
          <div className="no-results card">
            <span aria-hidden="true">🔍</span>
            <h3>No products found</h3>
            <p>Try adjusting your filters or search terms.</p>
            <button type="button" className="btn-primary" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="plp-grid">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            {pages > 1 && (
              <div className="pagination" role="navigation" aria-label="Pagination">
                <button type="button" disabled={page <= 1} onClick={() => updateParam('page', page - 1)}>
                  ‹ Prev
                </button>
                {paginationItems.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={page === item.value ? 'active' : ''}
                    onClick={() => updateParam('page', item.value)}
                  >
                    {item.value}
                  </button>
                ))}
                <button type="button" disabled={page >= pages} onClick={() => updateParam('page', page + 1)}>
                  Next ›
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
