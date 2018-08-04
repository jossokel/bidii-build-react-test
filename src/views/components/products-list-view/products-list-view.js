import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { productActions } from 'src/products'
import CheckBox from '../common/checkbox';

import './products-list-view.css';

class ProductsListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      sort: {
        orderBy: 'name',
        orderDir: 'desc'
      },
      checkedAll: false
    }

    this.sortProducts = this.sortProducts.bind(this);
    this.selectAllProducts = this.selectAllProducts.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
    this.updateCheckedProducts = this.updateCheckedProducts.bind(this);
  }

  updateCheckedProducts() {
    var products = [];

    this.props.products.map((product, index) => {
      var p = {
        id: product.id,
        checked: this.state.products.length ? this.state.products[index].checked : false
      }
      products.push(p);
    });

    this.setState({ products });
  }

  componentWillMount() {
    this.updateCheckedProducts();
  }

  sortProducts(orderBy) {
    var sort = Object.assign({}, this.state.sort);
    
    if (orderBy === this.state.sort.orderBy) {
      if (this.state.sort.orderDir === 'desc') {
        sort.orderDir = 'asc';
      } else {
        sort.orderDir = 'desc';
      }
    } else {
      sort.orderBy = orderBy;
    }

    this.setState({ sort });
    this.props.sortProducts(sort);
  }

  selectAllProducts(e) {
    // e.preventDefault();
    setTimeout(
      function() {
        this.setState({ checkedAll: !this.state.checkedAll });

        var products = [];
        this.state.products.map((product, index) => {
          product.checked = this.state.checkedAll;
          products.push(product);
        });

        this.setState({ products });
      }.bind(this),
      10
    );
  }

  selectProduct(e, index) {
    // e.preventDefault();
    var products = this.state.products;
    products[index].checked = !products[index].checked;

    this.setState({ products });
  }

  render() {
    return (
      <table className="table table-products">
        <thead>
          <tr>
            <th scope="col">
              <CheckBox
                onClick={this.selectAllProducts}
                checked={this.state.checkedAll}
              />
            </th>
            <th scope="col"
                onClick={() => this.sortProducts('name')}
            >
              NAME&nbsp;<i className="fas fa-sort"></i>
            </th>
            <th scope="col">CODE</th>
            <th scope="col">UNIT PRICE</th>
            <th scope="col">MANUFACTURER</th>
            <th scope="col">UOM</th>
            <th scope="col">CATEGORY</th>
            <th scope="col">REORDER LEVEL</th>
            <th scope="col">STATUS</th>
            <th scope="col" className="dropdown">
              <button className="btn btn-cog" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-cog"></i>
              </button>
              <div id="mark-as" className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a
                  className="dropdown-toggle"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  Mark as
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a className="dropdown-item" href="/">Active</a>
                  <a className="dropdown-item" href="/">Inactive</a>
                </div>
                <button
                  className="btn btn-primary dropdown-item"
                  style={{padding: '0', marginTop: '10px', color: '#828282'}}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.products.map((product, index) => {
            return (
            <tr key={product.id}>
              <th scope="row">
                <CheckBox
                  onClick={e => this.selectProduct(e, index)}
                  checked={this.state.products[index].checked}
                />
              </th>
              <td>
                <img 
                  src={product.attributes.image}
                  // alt="ProductImage"
                />
                {product.attributes.name}
              </td>
              <td>{product.attributes.code}</td>
              <td>{product.attributes.unit_price}</td>
              <td>{product.attributes.manufacturer}</td>
              <td>{product.attributes.uom}</td>
              <td>{product.attributes.category}</td>
              <td>{product.attributes.reorder_level}</td>
              <td>
                {product.attributes.is_active ? (
                  <button className="btn btn-primary btn-active">
                    Active
                  </button>
                ) : (
                  <button className="btn btn-secondary btn-active">
                    Inactive
                  </button>
                )}
              </td>
              <td></td>
            </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

ProductsListView.propTypes = {
  sortProducts: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sortProducts: (payload) => {
    dispatch(productActions.sortProducts(payload));
  }
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(ProductsListView)
);