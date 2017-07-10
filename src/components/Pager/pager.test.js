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

it('displays the correct values based on props via enzyme', () => {

    const currentValue = 5;
    const totalValue = 10;

    const pager = mount(
        <Pager currentPage={currentValue} totalPages={totalValue} onPageChange={() => { }} />
    );

    // verify the props are set correctly
    expect(pager.prop('currentPage')).toEqual(currentValue);
    expect(pager.prop('totalPages')).toEqual(totalValue);

    // verify state is set correctly
    expect(pager.state('currentPage')).toEqual(currentValue);

    // verify the rendered output is correct
    expect(pager.text()).toContain('Current Page: 5 of 10');
});

it('displays the correct current page with no currentPage prop', () => {

    const pager = TestUtils.renderIntoDocument(
        <Pager totalPages={10} onPageChange={() => { }} />
    );

    const pagerNode = ReactDOM.findDOMNode(pager);

    expect(pagerNode.textContent).toContain('Current Page: 1 of 10');
});

it('displays the correct current page with no currentPage prop via enzyme', () => {

    const totalValue = 10;
    const currentValue = 1;

    const pager = mount(
        <Pager currentPage={currentValue} totalPages={totalValue} onPageChange={() => { }} />
    );

    // verify the props are set correctly
    expect(pager.prop('totalPages')).toEqual(totalValue);

    // verify state is set correctly
    expect(pager.state('currentPage')).toEqual(currentValue);

    // verify the rendered output is correct
    expect(pager.text()).toContain('Current Page: 1 of 10');
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

// Parameterized test to test the diabled state on the next/previous buttons in various states
[
    // [current, total, button-class, expected]
    [1, 5, '.btn-previous', true],
    [2, 5, '.btn-previous', false],
    [5, 5, '.btn-previous', false],
    [1, 5, '.btn-next', false],
    [2, 5, '.btn-next', false],
    [5, 5, '.btn-next', true],
].forEach(([current, total, buttonClass, expected]) => {
    it(`correctly shows button ${buttonClass} disabled=${expected} when current page is ${current} with ${total} pages via enzyme`, () => {

        const pager = mount(
            <Pager currentPage={current} totalPages={total} onPageChange={() => { }} />
        );

        // get a reference to the button
        const button = pager.find(buttonClass);

        // verify the button was found
        expect(pager.find(buttonClass).length).toEqual(1);

        // verify the buttons disabled state is set correctly
        expect(button.prop('disabled')).toEqual(expected);
    });
});

// test the button clicks
it('displays the correct page value after a next button click', () => {

    const pager = TestUtils.renderIntoDocument(
        <Pager currentPage={5} totalPages={10} onPageChange={() => { }} />
    );

    const pagerNode = ReactDOM.findDOMNode(pager);

    const nextButton = TestUtils.findRenderedDOMComponentWithClass(pager, 'btn-next');

    TestUtils.Simulate.click(nextButton);

    expect(pagerNode.textContent).toContain('Current Page: 6 of 10');

});

// test the button clicks
it('displays the correct page value after a next button click via enzyme', () => {

    const pager = mount(
        <Pager currentPage={5} totalPages={10} onPageChange={() => { }} />
    );

    // get a reference to the Next button
    const nextButton = pager.find('.btn-next');

    // click that button
    nextButton.simulate('click');

    // verify the state object was changed correctly
    expect(pager.state('currentPage')).toEqual(6);

    // verify the rendered output was changed correctly
    expect(pager.text()).toContain('Current Page: 6 of 10');
});

it('displays the correct page value after a previous button click', () => {

    const pager = TestUtils.renderIntoDocument(
        <Pager currentPage={5} totalPages={10} onPageChange={() => { }} />
    );

    const pagerNode = ReactDOM.findDOMNode(pager);

    const previousButton = TestUtils.findRenderedDOMComponentWithClass(pager, 'btn-previous');

    TestUtils.Simulate.click(previousButton);

    expect(pagerNode.textContent).toContain('Current Page: 4 of 10');

});

it('displays the correct page value after a previous button click via enzyme', () => {

    const pager = mount(
        <Pager currentPage={5} totalPages={10} onPageChange={() => { }} />
    );

    // get a reference to the Previous buttom
    const previousButton = pager.find('.btn-previous');

    // click that button
    previousButton.simulate('click');

    // verify the state object was changed correctly
    expect(pager.state('currentPage')).toEqual(4);

    // verify the rendered output was changed correctly
    expect(pager.text()).toContain('Current Page: 4 of 10');
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

// test the function prop is called on page change
it('fires the onPageChange event when changing the current page via enzyme', () => {

    // create a mock function to pass into our component that will be called
    const mockChange = jest.fn();

    const pager = mount(
        <Pager currentPage={5} totalPages={10} onPageChange={mockChange} />
    );

    // get references to the next and previous buttons
    const nextButton = pager.find('.btn-next');
    const previousButton = pager.find('.btn-previous');

    // click the next button
    nextButton.simulate('click');

    // verify the state was updated correctly
    expect(pager.state('currentPage')).toEqual(6);

    // verify the callback function was called with the correct value
    expect(mockChange).toHaveBeenCalledWith(6);

    // click the previous button
    previousButton.simulate('click');

    // verify the state was updated correctly
    expect(pager.state('currentPage')).toEqual(5);

    // verify the callback function was called with the correct value
    expect(mockChange).toHaveBeenCalledWith(5);
});
