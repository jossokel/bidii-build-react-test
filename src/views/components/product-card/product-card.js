import React from 'react';
import CheckBox from '../common/checkbox';

import './product-card.css';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    this.onSelectProduct = this.onSelectProduct.bind(this);
  }

  onSelectProduct(e) {
  }

  render() {
    return (
      <div className="product-card">
        <div className="header">
          <div className="product-select">
            <CheckBox
              type="checkbox"
              onClick={this.onSelectProduct}
            />
          </div>
          <div>
            <img 
              className="product-image"
              // alt="ProductImage"
              src={this.props.product.attributes.image}
            />
          </div>
          <p className="unit-feets">Unit:&nbsp;feets</p>
        </div>
        <div className="footer">
          <div className="row">
            <div className="col product-name">
              {this.props.product.attributes.name}
            </div>
            <div className="col product-code">
              {this.props.product.attributes.code}
            </div>
          </div>
          <div className="row">
            <div className="col product-manufacturer">
              {this.props.product.attributes.manufacturer}
            </div>
            <div className="col product-price">
              GHC{this.props.product.attributes.unit_price}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductCard;