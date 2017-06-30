import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Pager from './';

it('displays the correct values based on props', () => {

    const pager = TestUtils.renderIntoDocument(
        <Pager currentPage={5} totalPages={10} onPageChange={() => { }} />
    );

    const pagerNode = ReactDOM.findDOMNode(pager);

    expect(pagerNode.textContent).toContain('Current Page: 5 of 10');
});

it('displays the correct current page with no currentPage prop', () => {

    const pager = TestUtils.renderIntoDocument(
        <Pager totalPages={10} onPageChange={() => { }} />
    );

    const pagerNode = ReactDOM.findDOMNode(pager);

    expect(pagerNode.textContent).toContain('Current Page: 1 of 10');
});

// Parameterized test to test the diabled state on the next/previous buttons in various states
[
    // [current, total, button-class, expected]
    [1, 5, 'btn-previous', true],
    [2, 5, 'btn-previous', false],
    [5, 5, 'btn-previous', false],
    [1, 5, 'btn-next', false],
    [2, 5, 'btn-next', false],
    [5, 5, 'btn-next', true],
].forEach(([current, total, buttonClass, expected]) => {
    it(`correctly shows button ${buttonClass} disabled=${expected} when current page is ${current} with ${total} pages`, () => {

        const pager = TestUtils.renderIntoDocument(
            <Pager currentPage={current} totalPages={total} onPageChange={() => { }} />
        );

        const button = TestUtils.findRenderedDOMComponentWithClass(pager, buttonClass);

        expect(button.disabled).toEqual(expected);
    });
});

// test the button clicks
it('displays the correct page value after a next button click', () => {
    const mockChange = jest.fn();

    const pager = TestUtils.renderIntoDocument(
        <Pager currentPage={5} totalPages={10} onPageChange={mockChange} />
    );

    const pagerNode = ReactDOM.findDOMNode(pager);

    const nextButton = TestUtils.findRenderedDOMComponentWithClass(pager, 'btn-next');

    TestUtils.Simulate.click(nextButton);
    
    expect(pagerNode.textContent).toContain('Current Page: 6 of 10');

});

it('displays the correct page value after a previous button click', () => {
    const mockChange = jest.fn();

    const pager = TestUtils.renderIntoDocument(
        <Pager currentPage={5} totalPages={10} onPageChange={mockChange} />
    );

    const pagerNode = ReactDOM.findDOMNode(pager);

    const previousButton = TestUtils.findRenderedDOMComponentWithClass(pager, 'btn-previous');

    TestUtils.Simulate.click(previousButton);
    
    expect(pagerNode.textContent).toContain('Current Page: 4 of 10');

});

// test the function prop is called on page change
it('fires the onPageChange event when changing the current page', () => {
    const mockChange = jest.fn();

    const pager = TestUtils.renderIntoDocument(
        <Pager currentPage={5} totalPages={10} onPageChange={mockChange} />
    );

    const nextButton = TestUtils.findRenderedDOMComponentWithClass(pager, 'btn-next');
    const previousButton = TestUtils.findRenderedDOMComponentWithClass(pager, 'btn-previous');

    TestUtils.Simulate.click(nextButton);
    expect(mockChange).toHaveBeenCalledWith(6);

    TestUtils.Simulate.click(previousButton);
    expect(mockChange).toHaveBeenCalledWith(5);
});