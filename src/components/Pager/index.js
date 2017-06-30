import React from 'react';
import PropTypes from 'prop-types';
import './pager.css'

class Pager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: props.currentPage
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    pageChanged(page){
        this.props.onPageChange(page);
    }

    next() {
        const newPage = this.state.currentPage + 1;
        this.setState({ currentPage: newPage }, this.pageChanged(newPage));
    }

    previous() {
        const newPage = this.state.currentPage - 1;
        this.setState({ currentPage: newPage }, this.pageChanged(newPage));
    }

    render() {
        return (
            // render function has to have one parent element
            <div className="pager-container">
                <h2> Pager Control </h2>
                <h1>Current Page: {this.state.currentPage} of {this.props.totalPages}</h1>
                <button className="btn-previous" onClick={this.previous} disabled={this.state.currentPage <= 1}>Prev</button> 
                <button className="btn-next" onClick={this.next} disabled={this.state.currentPage >= this.props.totalPages}>Next</button>
            </div>
        );
    }
}

Pager.proptypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
}

Pager.defaultProps = {
    currentPage: 1
}

export default Pager;