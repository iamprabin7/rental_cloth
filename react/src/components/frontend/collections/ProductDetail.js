import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useHistory } from 'react-router-dom';

function ProductDetail(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchProductDetail = async () => {
      try {
        const category_slug = props.match.params.category;
        const product_slug = props.match.params.product;

        const productResponse = await axios.get(`/api/viewproductdetail/${category_slug}/${product_slug}`);
        if (isMounted) {
          if (productResponse.data.status === 200) {
            setProduct(productResponse.data.product);
            fetchRelatedProducts(productResponse.data.product.category_id);
            setLoading(false);
          } else if (productResponse.data.status === 404) {
            history.push('/collections');
            swal("Warning", productResponse.data.message, "error");
          }
        }
      } catch (error) {
        console.error("Error fetching product detail:", error);
        setLoading(false);
      }
    };

    fetchProductDetail();

    return () => {
      isMounted = false;
    };
  }, [props.match.params.category, props.match.params.product, history]);

  const fetchRelatedProducts = async (categoryId) => {
    try {
      const relatedProductsResponse = await axios.get(`/api/relatedproducts/${categoryId}`);
      if (relatedProductsResponse.data.status === 200) {
        setRelatedProducts(relatedProductsResponse.data.products);
      } else {
        console.error("Error fetching related products:", relatedProductsResponse.data.message);
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevCount => prevCount - 1);
    }
  };

  const handleIncrement = () => {
    if (product.qty > quantity) {
      setQuantity(prevCount => prevCount + 1);
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const submitAddToCart = async (e) => {
    e.preventDefault();

    try {
      const data = {
        product_id: product.id,
        product_qty: quantity,
        product_size: selectedSize,
      };

      const response = await axios.post(`/api/add-to-cart`, data);

      if (response.data.status === 201 || response.data.status === 409) {
        swal("Success", response.data.message, "success");
      } else if (response.data.status === 401 || response.data.status === 404) {
        swal("Error", response.data.message, "error");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      swal("Error", "Failed to add to cart", "error");
    }
  };

  if (loading) {
    return <h4>Loading Product Detail...</h4>;
  } else {
    const availStock = product.qty > 0 ? (
      <div>
        <label className="btn-sm btn-success px-4 mt-2">In stock - <span className='font-semibold text-lg '>{product.qty}</span></label>
        <div className="row">
          <div className="col-md-3 mt-3">
            <div className="input-group">
              <button type="button" onClick={handleDecrement} className="input-group-text">-</button>
              <div className="form-control text-center">{quantity}</div>
              <button type="button" onClick={handleIncrement} className="input-group-text">+</button>
            </div>
          </div>
          <div className="col-md-3 mt-3">
            <button type="button" className="btn btn-primary w-100" onClick={submitAddToCart}>Add for Rent</button>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <label className="btn-sm btn-danger px-4 mt-2">Out of stock</label>
      </div>
    );

    return (
      <div>
        <div className="py-3 bg-warning">
          <div className="container">
            <h6>Collections / {product.category?.name} / {product.name}</h6>
          </div>
        </div>
        <div className="py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-4 border-end">
                <div className="card" style={{ height: '300px' }}>
                  <img
                    src={`http://localhost:8000/${product.image}`}
                    alt={product.name}
                    className="card-img-top img-fluid rounded product-image"
                    style={{ height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
              <div className="col-md-8">
                <h4>
                  {product.name}
                  <span className="float-end badge btn-sm btn-danger badge-pill"> {product.brand} </span>
                </h4>
                <p> {product.description} </p>
                <h4 className="mb-1">
                  Rs: {product.selling_price}
                  <s className="ms-2"> Rs: {product.original_price} </s>
                </h4>
                <div>
                  {availStock}
                </div>
                <div className="mt-3">
                  <h5>Available Sizes:</h5>
                  <div className=''>
                    <ul className='flex  gap-3'>
                      <li className='border rounded p-2 bg-slate-200 w-16 text-center '>M</li>
                      <li className='border rounded p-2 bg-slate-200 w-16 text-center'>L</li>
                      <li className='border rounded p-2 bg-slate-200 w-16 text-center'>XL</li>
                      <li className='border rounded p-2 bg-slate-200 w-16 text-center'>XXL</li>
                      <li className='border rounded p-2 bg-slate-200 w-16 text-center'>XXXL</li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Related Products Section */}
        <div className="container mt-5">
          <h3>Related Products</h3>
          <div className="row">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="col-md-2 mb-2">
                <div className="card h-100">
                  <img
                    src={`http://localhost:8000/${relatedProduct.image}`}
                    className="card-img-top img-fluid"
                    alt={relatedProduct.name}
                    style={{ maxWidth: 'auto', height: '110px' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{relatedProduct.name}</h5>
                    <p className="card-text">Price: 600</p>
                    <button className="btn btn-primary" onClick={() => history.push(`/product/${relatedProduct.category.slug}/${relatedProduct.slug}`)}>View Product</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
