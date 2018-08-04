import React from 'react';
import ProductCard from '../product-card';
import windowSize from 'react-window-size';

class ProductsGridView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: this.props.products
    }
  }

  render() {
    const lgWidth = 1440;
    const msWidth = 1200;
    const width = this.props.windowWidth;
    var rest = 0, divide = 1, restMap = [];

    if (width > msWidth && width < lgWidth) {
      divide = 3;
    } else if (width >= lgWidth) {
      divide = 4;
    }
    
    rest = divide - this.props.products.length % divide;
    for (var i = 0; i < rest; i ++) {
        restMap.push(i);
    }

    return (
      <div className="container text-center">
        <div className="row">
          {this.props.products.map(product => {
            return (
              <div key={product.id} className="col">
                <ProductCard product={product} />
              </div>
            )
          })}
          {restMap.map((i) => (
            <div className="col" key={i}></div>
          ))}
        </div>
      </div>
    )
  }
}

export default windowSize(ProductsGridView);