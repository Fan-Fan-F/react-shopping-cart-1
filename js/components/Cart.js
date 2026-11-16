var React = require('React');

function formatPrice(price) {
    return "$ " + price.toFixed(2);
}

var CartItem = React.createClass({
    render: function() {
        var item = this.props.item;
        return <tr>
            <td>{item.title}</td>
            <td>{item.qty}</td>
            <td>{formatPrice(item.price)}</td>
        </tr>
    }
});

var Cart = React.createClass({
    propTypes: {
        handleAddToCart: React.PropTypes.func
    },
    getDefaultProps: function() {
        return {
            items: []
        }
    },

    showBlankMessage: function() {
        return <p>No items in cart</p>
    },
    getCartTotal: function() {
        var total = _.reduce(this.props.items, function(accum, item) {
            return accum + (item.qty * item.price);
        }, 0);

        return formatPrice(total);
    },
    renderItems: function() {
        // Read from props, not state: copying props into state in
        // getInitialState made the cart permanently stale (it never
        // re-rendered with new items).
        var items = this.props.items;
        return (
            <div>
                <h5>Total {this.getCartTotal()} </h5>
                <table className='u-full-width'>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {items.map(function(item) {
                        return <CartItem key={item.id} item={item} />
                    })}
                    </tbody>
                </table>
            </div>
        )
    },
    render: function() {
        var items = this.props.items,
            createItems = this.renderItems();
        return (
            <div>
                <h3>Cart</h3>
            { items.length > 0 ? createItems : this.showBlankMessage() }
            </div>
        )
    }
});

module.exports = Cart;
