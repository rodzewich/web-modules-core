'use strict';

import {React, ReactDOM, _, classnames, TinyEmitter, translate, EventBus} from '../../utils/index';
import {chai, expect, ReactTestUtils, getNodeClassNames, toArray} from '../../testUtils/index';
import {Pagination} from '../index';
import {stores} from '../../data/index';

var Store = stores.Store;

class MockStore extends Store {
    constructor(items) {
        super({fields: [{id: 'test', type: 'number'}]});
        this.setItems(items);
    }
}

var createFakeStore = (itemsCount) => {
    return new MockStore(_.range(itemsCount).map(v => {return {test: v};}));
};

describe('Pagination', () => {
    describe('calculations', () => {
        it('should calculate ranges of pages and dots between them', () => {
            var opts = {
                store: createFakeStore(0)
            };
            var runs = [
                {
                    // activePage, beforeAfterAmount, boundaryAmount, pagesCount
                    input: [0, 1, 1, 17],	// <1> 2 3 4 5 ... 17
                    expectation: {
                        ranges: {
                            head: null,
                            middle: [0, 4],
                            tail: [16, 16]
                        },
                        hasHeadDots: false,
                        hasTailDots: true
                    }
                },

                {
                    input: [1, 1, 1, 17], // 1 <2> 3 4 5 ... 17
                    expectation: {
                        ranges: {
                            head: null,
                            middle: [0, 4],
                            tail: [16, 16]
                        },
                        hasHeadDots: false,
                        hasTailDots: true
                    }
                },
                {
                    input: [2, 1, 1, 17], // 1 2 <3> 4 5 ... 17
                    expectation: {
                        ranges: {
                            head: [0, 0],
                            middle: [1, 4],
                            tail: [16, 16]
                        },
                        hasHeadDots: false,
                        hasTailDots: true
                    }
                },
                {
                    input: [3, 1, 1, 17], // 1 2 3 <4> 5 ... 17
                    expectation: {
                        ranges: {
                            head: [0, 0],
                            middle: [1, 4],
                            tail: [16, 16]
                        },
                        hasHeadDots: false,
                        hasTailDots: true
                    }
                },
                {
                    input: [4, 1, 1, 17], // 1 ... 4 <5> 6 ... 17
                    expectation: {
                        ranges: {
                            head: [0, 0],
                            middle: [3, 5],
                            tail: [16, 16]
                        },
                        hasHeadDots: true,
                        hasTailDots: true
                    }
                },
                {
                    input: [12, 1, 1, 17], // 1 ... 12 <13> 14 ... 17
                    expectation: {
                        ranges: {
                            head: [0, 0],
                            middle: [11, 13],
                            tail: [16, 16]
                        },
                        hasHeadDots: true,
                        hasTailDots: true
                    }
                },
                {
                    input: [13, 1, 1, 17], // 1 ... 13 <14> 15 16 17
                    expectation: {
                        ranges: {
                            head: [0, 0],
                            middle: [12, 15],
                            tail: [16, 16]
                        },
                        hasHeadDots: true,
                        hasTailDots: false
                    }
                },
                {
                    input: [14, 1, 1, 17],  // 1 ... 13 14 <15> 16 17
                    expectation: {
                        ranges: {
                            head: [0, 0],
                            middle: [12, 15],
                            tail: [16, 16]
                        },
                        hasHeadDots: true,
                        hasTailDots: false
                    }
                },
                {
                    input: [15, 1, 1, 17],	// 1 ... 13 14 15 <16> 17
                    expectation: {
                        ranges: {
                            head: [0, 0],
                            middle: [12, 16],
                            tail: null
                        },
                        hasHeadDots: true,
                        hasTailDots: false
                    }
                },
                {
                    input: [16, 1, 1, 17],	// 1 ... 13 14 15 16 <17>
                    expectation: {
                        ranges: {
                            head: [0, 0],
                            middle: [12, 16],
                            tail: null
                        },
                        hasHeadDots: true,
                        hasTailDots: false
                    }
                },

                {
                    input: [16, 1, 1, 0],	// <1>
                    expectation: {
                        ranges: {
                            head: null,
                            middle: [0, 0],
                            tail: null
                        },
                        hasHeadDots: false,
                        hasTailDots: false
                    }
                },

                {
                    input: [0, 1, 2, 1],	// <1>
                    expectation: {
                        ranges: {
                            head: null,
                            middle: [0, 0],
                            tail: null
                        },
                        hasHeadDots: false,
                        hasTailDots: false
                    }
                },

                {
                    input: [3, 4, 2, 17],	// 1 2 3 <4> 5 6 7 8 9 10 11 12 ... 16 17
                    expectation: {
                        ranges: {
                            head: null,
                            middle: [0, 11],
                            tail: [15, 16]
                        },
                        hasHeadDots: false,
                        hasTailDots: true
                    }
                },

                {
                    input: [3, 1, 1, 7],	//  1   2   3  <4>  5   6   7
                    expectation: {
                        ranges: {
                            head: [0, 0],
                            middle: [1, 5],
                            tail: [6, 6]
                        },
                        hasHeadDots: false,
                        hasTailDots: false
                    }
                }

            ];

            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));
            runs.forEach((testData) => {
                var actualRanges = paginationComponent.getRanges.apply(paginationComponent, testData.input);

                expect(actualRanges)
                    .to.be.deep.equal(testData.expectation.ranges);

                expect(paginationComponent.hasHeadDots(actualRanges))
                    .to.be.equal(testData.expectation.hasHeadDots);

                expect(paginationComponent.hasTailDots(actualRanges))
                    .to.be.equal(testData.expectation.hasTailDots);
            });
        });
    });

    describe('navigation', () => {
        it('prevNav button should be disabled if the first page is selected', () => {
            var spy = sinon.spy();
            var fakeStore = createFakeStore(100);
            fakeStore.setInitialPagination(0, 18);
            var opts = {
                activePage: 0,
                pageSize: 18,
                availablePageSizes: [18, 30],
                store: fakeStore,
                beforeAfterAmount: 1,
                boundaryAmount: 2,
                onPageChange: spy
            };

            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));
            var dom = ReactDOM.findDOMNode(paginationComponent);
            var prevNav = dom.querySelector('.page-prev');

            expect(getNodeClassNames(prevNav)).contains('disabled');
            expect(spy.called).to.be.false;
        });

        it('nextNav button should be disabled if the last page is selected', () => {
            var spy = sinon.spy();
            var fakeStore = createFakeStore(100);
            fakeStore.setInitialPagination(8, 12);

            var opts = {
                availablePageSizes: [12, 20],
                store: fakeStore,
                beforeAfterAmount: 2,
                boundaryAmount: 1,
                onPageChange: spy
            };

            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));
            var dom = ReactDOM.findDOMNode(paginationComponent);
            var nextNav = dom.querySelector('.page-next');

            expect(getNodeClassNames(nextNav)).contains('disabled');
            expect(spy.called).to.be.false;
        });

        it('clicking on prevNav button should shift active page by 1 to the left', () => {
            var spy = sinon.spy();
            var fakeStore = createFakeStore(100);
            fakeStore.setInitialPagination(2, 12);

            var opts = {
                availablePageSizes: [12, 30],
                store: fakeStore,
                beforeAfterAmount: 1,
                boundaryAmount: 1,
                onPageChange: spy
            };
            var expectedNavigation = [1];

            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));
            var dom = ReactDOM.findDOMNode(paginationComponent);
            var prevNav = dom.querySelector('.page-prev');
            ReactTestUtils.Simulate.click(prevNav);

            expect(spy.getCall(0).args).to.be.deep.equal(expectedNavigation);
        });

        it('clicking on nextNav button should shift active page by 1 to the right', () => {
            var spy = sinon.spy();
            var fakeStore = createFakeStore(100);
            fakeStore.setInitialPagination(1, 12);

            var opts = {
                availablePageSizes: [12, 30],
                store: fakeStore,
                beforeAfterAmount: 1,
                boundaryAmount: 1,
                onPageChange: spy
            };
            var expectedNavigation = [2];

            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));
            var dom = ReactDOM.findDOMNode(paginationComponent);
            var nextNav = dom.querySelector('.page-next');
            ReactTestUtils.Simulate.click(nextNav);

            expect(spy.getCall(0).args).to.be.deep.equal(expectedNavigation);
        });

        it('clicking on page should navigate to that page', () => {
            var spy = sinon.spy();
            var fakeStore = createFakeStore(100);
            fakeStore.setInitialPagination(2, 15);

            var opts = {
                availablePageSizes: [15, 30],
                store: fakeStore,
                beforeAfterAmount: 1,
                boundaryAmount: 2,
                onPageChange: spy
            };
            var pagesToClick = [3, 5];
            var expectedNavigation = [3, 5];

            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));
            var dom = ReactDOM.findDOMNode(paginationComponent);

            pagesToClick.forEach((pageToClick) => {
                ReactTestUtils.Simulate.click(dom.querySelector('[data-page="' + pageToClick + '"]'));
            });

            var actualNavigation = spy.args.map(spyCallArgs => spyCallArgs[0]);

            expect(actualNavigation).to.be.deep.equal(expectedNavigation);
        });
    });
    describe('Interaction with store', () => {
        it('should take itemsCount from the Store', () => {
            var expectedPageCount = 8;
            var fakeStore = createFakeStore(111);
            fakeStore.setInitialPagination(0, 15);
            var opts = {
                availablePageSizes: [15, 30],
                store: fakeStore
            };

            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));
            var dom = ReactDOM.findDOMNode(paginationComponent);

            var allUIPages = toArray(dom.querySelectorAll('[data-page]'));

            var actualPageCount = parseInt(allUIPages[allUIPages.length-1].dataset.page, 10) + 1; // zero-based

            expect(actualPageCount).to.be.equals(expectedPageCount);
        });

        it('should take pageSize from store when pagination created', () => {
            var expectedDropdownValue = 30;
            var expectedPagesCount = 37;
            var fakeStore = createFakeStore(1101);
            fakeStore.setInitialPagination(0, 30);
            var opts = {
                availablePageSizes: [15, 30, 60],
                store: fakeStore
            };

            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));
            var dom = ReactDOM.findDOMNode(paginationComponent);
            var actualDropdownValue = parseInt(dom.querySelector('select').value);
            var allUIPages = toArray(dom.querySelectorAll('[data-page]'));
            var actualPagesCount = parseInt(allUIPages[allUIPages.length-1].dataset.page, 10) + 1; // zero-based

            expect(actualDropdownValue).to.be.equal(expectedDropdownValue);
            expect(actualPagesCount).to.be.equal(expectedPagesCount);
        });

        it('should resolve collision of pageSize from store', () => {
            var expectedDropdownValue = 25;
            var expectedSpyArgs = [25];

            var fakeStore = createFakeStore(1101);
            fakeStore.setInitialPagination(0, 20);
            var opts = {
                availablePageSizes: [15, 25, 60],
                store: fakeStore
            };

            var spy = sinon.spy(fakeStore, 'setPageSize');
            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));
            var dom = ReactDOM.findDOMNode(paginationComponent);

            var actualDropdownValue = parseInt(dom.querySelector('select').value, 10);
            expect(actualDropdownValue).to.be.equal(expectedDropdownValue);
            expect(spy.called).to.be.equal(true);
            expect(spy.getCall(0).args).to.be.deep.equals(expectedSpyArgs);
        });

        it('should take activePage from store', () => {
            var expectedActivePage = 4;
            var fakeStore = createFakeStore(1101);
            fakeStore.setInitialPagination(4, 25);

            var opts = {
                availablePageSizes: [15, 25, 60],
                store: fakeStore
            };

            var spy = sinon.spy(fakeStore, 'getCurrentPage');
            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));

            var dom = ReactDOM.findDOMNode(paginationComponent);
            var activePageNode = dom.querySelector('.page-item-active');
            var actualActivePage = parseInt(activePageNode.dataset.page, 10);

            expect(spy.called).to.be.equal(true);
            expect(actualActivePage).to.be.equal(expectedActivePage);
        });

        it('should reflect changes when store changed items count', (done) => {
            var expectedPagesCount = 16;

            var fakeStore = createFakeStore(150);
            fakeStore.setInitialPagination(0, 12);
            var opts = {
                availablePageSizes: [12, 30],
                store: fakeStore
            };

            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));

            fakeStore.on('change', () => {
                var dom = ReactDOM.findDOMNode(paginationComponent);

                var allUIPages = toArray(dom.querySelectorAll('[data-page]'));
                var actualPagesCount = parseInt(allUIPages[allUIPages.length-1].dataset.page, 10) + 1;

                expect(actualPagesCount).to.be.equals(expectedPagesCount);
                done();
            });


            // append 40 items
            fakeStore.setItems(_.range(150 + 40).map(v => { return {test: v}; }));
        });

        it('should reflect changes when store change current page', (done) => {
            var expectedActivePage = 4; // zero-based

            var fakeStore = createFakeStore(150);
            fakeStore.setInitialPagination(0, 12);
            var opts = {
                availablePageSizes: [12, 30],
                store: fakeStore
            };

            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));

            fakeStore.on('change', () => {
                var dom = ReactDOM.findDOMNode(paginationComponent);
                var activePageNode = dom.querySelector('.page-item-active');

                var actualActivePage = parseInt(activePageNode.dataset.page, 10);
                expect(actualActivePage).to.be.equal(expectedActivePage);
                done();
            });

            fakeStore.setCurrentPage(4);
        });

        it('should reflect changes when store change page size', (done) => {
            var expectedPageSize = 12;

            var fakeStore = createFakeStore(150);
            fakeStore.setInitialPagination(0, 10);
            var opts = {
                availablePageSizes: [10, 12, 30],
                store: fakeStore
            };
            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));

            fakeStore.on('change', () => {
                setTimeout(() => {
                    var dom = ReactDOM.findDOMNode(paginationComponent);

                    var actualPageSize = parseInt(dom.querySelector('select').value, 10);
                    expect(actualPageSize).to.be.equal(expectedPageSize);
                    done();
                }, 100);
            });

            fakeStore.setPageSize(12);
        });

        it('should call #setCurrentPage() on store when page changed', () => {
            var expectedNextPage = 3;
            var fakeStore = createFakeStore(150);
            fakeStore.setInitialPagination(2, 15);

            var opts = {
                availablePageSizes: [15, 30],
                store: fakeStore
            };

            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));
            var spy = sinon.spy(fakeStore, 'setCurrentPage');
            var dom = ReactDOM.findDOMNode(paginationComponent);
            var nextNav = dom.querySelector('.page-next');
            ReactTestUtils.Simulate.click(nextNav);

            expect(spy.called).to.be.equals(true);
            expect(spy.getCall(0).args[0]).to.be.equals(expectedNextPage);
        });

        it('should call #setPageSize() on store when pageSize changed', () => {
            var newPageSize = 50;
            var fakeStore = createFakeStore(850);
            fakeStore.setInitialPagination(2, 10);

            var opts = {
                availablePageSizes: [10, 25, 50, 100],
                store: fakeStore
            };
            var itemPosition = _.indexOf(opts.availablePageSizes, newPageSize);

            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));
            var spy = sinon.spy(fakeStore, 'setPageSize');
            var dom = ReactDOM.findDOMNode(paginationComponent);
            var pageSizeSelectorNode = dom.querySelector('select');

            ReactTestUtils.Simulate.change(pageSizeSelectorNode, {
                    target: {
                        value: newPageSize,
                        selectedIndex: itemPosition
                    }
                });

            expect(spy.called).to.be.equals(true);
            expect(spy.getCall(0).args[0]).to.be.deep.equals(newPageSize);
        });
    });

    describe('page size selector element', () => {
        it('should be rendered when property showPageSizeSelector omitted', () => {
            var opts = {
                store: createFakeStore(1)
            };

            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));
            var dom = ReactDOM.findDOMNode(paginationComponent);

            var pageSizeSelectorNode = dom.querySelectorAll('select');

            expect(pageSizeSelectorNode.length).to.be.equals(1);
        });

        it('should not be rendered when property showPageSizeSelector=false', () => {
            var opts = {
                store: createFakeStore(1),
                showPageSizeSelector: false
            };

            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));
            var dom = ReactDOM.findDOMNode(paginationComponent);

            var pageSizeSelectorNode = dom.querySelectorAll('.rc-dropdown');

            expect(pageSizeSelectorNode.length).to.be.equals(0);
        });

        it('should contains predefined page sizes when parameter availablePageSizes omitted', () => {
            var opts = {
                store: createFakeStore(1)
            };
            var expectedAvailablePageSizes = [10, 25, 50, 100];

            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));
            var dom = ReactDOM.findDOMNode(paginationComponent);
            var pageSizeSelectorNode = dom.querySelector('select');

            var dropdownItems = toArray(pageSizeSelectorNode.querySelectorAll('option'));
            var actualSizes = dropdownItems.map((node) => {return parseInt(node.textContent, 10);});

            expect(expectedAvailablePageSizes).to.be.deep.equals(actualSizes);
        });

        it('should contains specified page sizes in dropdown when parameter availablePageSizes defined', () => {
            var opts = {
                store: createFakeStore(10),
                availablePageSizes: [66, 11, 99, 33]
            };
            var expectedAvailablePageSizes = [66, 11, 99, 33];

            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));
            var dom = ReactDOM.findDOMNode(paginationComponent);
            var pageSizeSelectorNode = dom.querySelector('select');

            var dropdownItems = toArray(pageSizeSelectorNode.querySelectorAll('option'));
            var actualSizes = dropdownItems.map((node) => {return parseInt(node.textContent, 10);});

            expect(expectedAvailablePageSizes).to.be.deep.equals(actualSizes);
        });

        it('should invoke onPageSizeChange when page size changed', () => {
            var spy = sinon.spy();
            var fakeStore = createFakeStore(10);
            fakeStore.setInitialPagination(0, 20);
            var opts = {
                store: fakeStore,
                onPageSizeChange: spy,
                availablePageSizes: [10, 20, 50, 100]
            };

            var newPageSize = 50;
            var expectedPageSize = 50;

            var pageSizeIndexToSelect = _.indexOf(opts.availablePageSizes, newPageSize);
            var expectedSelectedIndex = 2;


            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));
            var dom = ReactDOM.findDOMNode(paginationComponent);
            var pageSelectorNode = dom.querySelector('select');

            ReactTestUtils.Simulate.change(pageSelectorNode,
                {
                    target: {
                        value: opts.availablePageSizes[pageSizeIndexToSelect],
                        selectedIndex: pageSizeIndexToSelect
                    }
                });

            expect(spy.getCall(0).args).to.be.deep.equal([expectedPageSize, expectedSelectedIndex]);
        });

			// obsolete? seems it's a store responsibility
            it.skip('should navigate into first page when pageSize changed', () => {
            var expectedSliceArguments = [0, 100];
            var fakeStore = createFakeStore(850);
            var spy = sinon.spy();

            var opts = {
                activePage: 2,
                pageSize: 10,
                availablePageSizes: [10, 25, 50, 100],
                store: fakeStore,
                onPageChange: spy
            };

            var pageSizeToSelect = 100;
            var expectedNavigation = [0];

            var paginationComponent = ReactTestUtils.renderIntoDocument(React.createElement(Pagination, opts));
            var dom = ReactDOM.findDOMNode(paginationComponent);
            var pageSizeSelectorNode = dom.querySelector('.rc-items-per-page-selector');

				ReactTestUtils.Simulate.change(pageSizeSelectorNode, {target: {
					value: pageSizeToSelect,
					selectedIndex: _.indexOf(opts.availablePageSizes, pageSizeToSelect)
				}});

            expect(spy.called).to.be.equals(true);

            var actualNavigation = spy.getCall(0).args;
            expect(actualNavigation).to.be.deep.equals(expectedNavigation);
        });
    });
});
