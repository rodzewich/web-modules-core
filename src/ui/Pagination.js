'use strict';

import {Icon} from "./Icon";
import {Select} from "./form/Select";
import {Button} from "./Button";
import React from "react";
import ButtonGroup from "react-bootstrap/lib/ButtonGroup";
import _ from "lodash";
import classnames from "classnames";
import {translate} from '../utils/functions';

const CLASS_NAME_PAGINATION = 'rc-pagination';
const CLASS_NAME_PAGINATION_NAVIGATION = 'rc-pagination-navigation';
const CLASS_NAME_PAGE = 'page-item';
const CLASS_NAME_PAGE_ACTIVE = 'page-item-active';

const CLASS_NAME_DOTS = 'page-item-dots';
const CLASS_NAME_DOTS_HEAD = 'page-item-dots-left';
const CLASS_NAME_DOTS_TAIL = 'page-item-dots-right';

const CLASS_NAME_PREV_NAV = 'page-prev';
const CLASS_NAME_NEXT_NAV = 'page-next';

const CLASS_NAME_DISABLED = 'disabled';

const MAX_AVAILABLE_PAGE_SIZE = 500;

export class Pagination extends React.Component {

    static defaultProps = {
        pageSizeSelectorText: 'TRANSLATE:PAGE_SIZE:',
        availablePageSizes: [10, 25, 50, 100, MAX_AVAILABLE_PAGE_SIZE],
        defaultPageSize: 25,
        showPageSizeSelector: true,
        beforeAfterAmount: 2,
        boundaryAmount: 1,
        allText: 'TRANSLATE:ALL'
    };

    constructor(props) {
        super(props);

        this.store = this.props.store;

        this.setInitialPagesize();

        this.onStoreChange = () => {
            this.setState({
                itemsCount: this.store.getFilteredCount(),
                activePage: this.store.getCurrentPage(),
                pageSize: this.store.getPageSize()
            });
        };
    }

    componentWillMount() {
        this.store.on('change', this.onStoreChange, this);
    }

    componentWillReceiveProps(nextProps) {
        this.store.off('change', this.onStoreChange);
        this.store = nextProps.store;
        this.setInitialPagesize();
        this.store.on('change', this.onStoreChange, this);
    }

    componentWillUnmount() {
        this.store.off('change', this.onStoreChange);
    }

    setInitialPagesize() {
        var isPageSizeCollision = !(_.includes(this.props.availablePageSizes, this.store.getPageSize()));

        var pageSize = isPageSizeCollision
            ? this.props.defaultPageSize
            : this.store.getPageSize();

        if (isPageSizeCollision) {
            this.store.setPageSize(this.props.defaultPageSize);
        }

        this.state = {
            itemsCount: this.store.getFilteredCount(),
            activePage: this.store.getCurrentPage(),
            pageSize: pageSize
        };
    }

    getPageCount() {
        return this.calculatePageCount(this.state.itemsCount, this.state.pageSize);
    }

    calculatePageCount(itemsCount, pageSize) {
        return Math.ceil(itemsCount / pageSize);
    }

    handlePrevClick() {
        this.navigate(this.state.activePage - 1);
    }

    handleNextClick() {
        this.navigate(this.state.activePage + 1);
    }

    navigate(page) {
        if ((page < 0) || (page >= this.getPageCount())) {
            return;
        }

        if (page === this.state.activePage) {
            return;
        }

        this.setState({
            activePage: page
        });

        this.handlePageChange(page);
    }

    handlePageChange(page) {
        this.store.setCurrentPage(page);

        if (_.isFunction(this.props.onPageChange)) {
            this.props.onPageChange(page);
        }
    }

    handlePageClick(page) {
        this.navigate(page);
    }

    /**
     * Calculates pagination ranges
     *
     * @param {Number} activePage Zero based value of active page
     * @param {Number} beforeAfterAmount A number of items wanted to show before and after active page
     * @param {Number} boundaryAmount A number of items wanted to show on head and on tail
     * @param {Number} pageCount Actual count of pages
     */
    getRanges(activePage, beforeAfterAmount, boundaryAmount, pageCount) {
        var headMiddleDistance = (activePage - beforeAfterAmount - boundaryAmount);
        var headSize = (headMiddleDistance < 0) ? 0 : boundaryAmount;
        headSize = Math.min(headSize, pageCount);

        var lastPage = pageCount - 1;
        var middleFrom = Math.max(0, activePage - beforeAfterAmount);
        var overlappedHead = boundaryAmount - headSize;

        var headFrom = 0;
        var headTo = headFrom + headSize - 1;

        var middleSize = 1 + 2 * beforeAfterAmount;
        middleSize = middleSize + overlappedHead;

        if (middleFrom - headSize <= 1) {
            middleSize = middleSize + 1;
            middleFrom = headSize;
        }

        var middleTo = middleFrom + middleSize - 1;
        var middleTailDistance = lastPage - boundaryAmount - middleTo;

        if (middleTailDistance === 1) {
            middleTo = middleTo + 1;
        } else if (middleTailDistance <= 0) {
            middleFrom = middleFrom - Math.abs(middleTailDistance);
            middleFrom = middleFrom - 1;
        }

        middleFrom = Math.max(middleFrom, headSize);
        middleTo = Math.min(lastPage, middleTo);

        var tailFrom = lastPage - boundaryAmount + 1;
        tailFrom = Math.max(middleTo + 1, tailFrom);
        var tailTo = lastPage;

        var result = {
            head: [headFrom, headTo],
            middle: [middleFrom, middleTo],
            tail: [tailFrom, tailTo]
        };

        result.head = this.isRangeEmpty(result.head) ? null : result.head;
        result.middle = this.isRangeEmpty(result.middle) ? [0, 0] : result.middle;
        result.tail = this.isRangeEmpty(result.tail) ? null : result.tail;

        return result;
    }

    isRangeEmpty(range) {
        if (!range) {
            return true;
        }
        return range[1] < range[0];
    }

    hasGap(rangeA, rangeB) {
        if (this.isRangeEmpty(rangeA) || this.isRangeEmpty(rangeB)) {
            return false;
        }
        return (rangeB[0] - rangeA[1]) > 1;
    }

    hasHeadDots(ranges) {
        return this.hasGap(ranges.head, ranges.middle);
    }

    hasTailDots(ranges) {
        return this.hasGap(ranges.middle, ranges.tail);
    }

    renderPages(range, activePage, handler) {
        if (this.isRangeEmpty(range)) {
            return [];
        }

        var list = _.times(range[1] - range[0] + 1, (n) => {
            var page = range[0] + n;
            var active = (activePage === page);
            return (
                <Button data-test-automation-id={"p" + (page + 1)}
                        bsStyle="link"
                        data-page={page}
                        onClick={handler.bind(this, page)}
                        key={page}
                        active={active}
                        disabled={active}>{page + 1}</Button>
            );
        });

        return list;
    }

    renderDot() {
        return <Button disabled bsStyle="link">...</Button>;
    }

    formatPageSize(digit) {
        // In case of store size less/equal/ to MAX_AVAILABLE_PAGE_SIZE, visually display
        // bigger page size option as 'all'
        if (digit === MAX_AVAILABLE_PAGE_SIZE && this.store.getTotalCount() <= MAX_AVAILABLE_PAGE_SIZE) {
            return translate(this.props.allText);
        } else {
            return digit;
        }
    }

    getPageSizeSelector() {
        var availableSizes = this.props.availablePageSizes;

        var dropdownItems = availableSizes.map((sizeValue, index) => {
            return (
                <option key={index} value={sizeValue} data-test-automation-id={'size'+index}>{this.formatPageSize(sizeValue)}</option>
            );
        });

        var pageSize = this.state.pageSize;

        return (
            <Select
                value={pageSize}
                onChange={this.handleDropdownChange.bind(this)}
                className='rc-items-per-page-selector'
                label={this.getPageSizeSelectorLabel()}
                testAutomationId='pageSizeSelector'>
                {dropdownItems}
            </Select>
        );
    }

    getPageSizeSelectorLabel() {
        return this.props.pageSizeSelectorText;
    }

    handleDropdownChange(event) {
        var actualValue = parseInt(event.target.value, 10);
        var actualIndex = event.target.selectedIndex;

        var prevActivePage = this.state.activePage;
        var newActivePage = 0;
        this.setState({
            activePage: newActivePage,
            pageSize: actualValue
        });

        this.store.setPageSize(actualValue);

        if (_.isFunction(this.props.onPageSizeChange)) {
            this.props.onPageSizeChange(actualValue, actualIndex);
        }

        if (prevActivePage !== newActivePage && _.isFunction(this.props.onPageChange)) {
            this.props.onPageChange(newActivePage);
        }
    }

    render() {
        var ranges = this.getRanges(
            this.state.activePage,
            this.props.beforeAfterAmount,
            this.props.boundaryAmount,
            this.getPageCount());

        var prevButtonClasses = classnames(CLASS_NAME_PREV_NAV, (this.state.activePage <= 0) && CLASS_NAME_DISABLED);
        var prevButton = <Button data-test-automation-id="prev"
                                 bsStyle="link"
                                 className={prevButtonClasses}
                                 onClick={this.handlePrevClick.bind(this)}><Icon name="chevron-left-small"/></Button>;

        var nextButtonClasses = classnames(
            CLASS_NAME_NEXT_NAV,
            (this.state.activePage >= (this.getPageCount() - 1)) && CLASS_NAME_DISABLED
        );
        var nextButton = <Button data-test-automation-id="next"
                                 bsStyle="link"
                                 className={nextButtonClasses}
                                 onClick={this.handleNextClick.bind(this)}><Icon name="chevron-right-small"/></Button>;

        var head = this.renderPages(ranges.head, this.state.activePage, this.handlePageClick);
        var middle = this.renderPages(ranges.middle, this.state.activePage, this.handlePageClick);
        var tail = this.renderPages(ranges.tail, this.state.activePage, this.handlePageClick);

        var pageSizeSelector;

        if (this.props.showPageSizeSelector) {
            pageSizeSelector = this.getPageSizeSelector();
        }

        var cn = classnames('rc-pagination', 'form-inline rc-form-inline', this.props.className);
        return (
            <div className={cn} data-test-automation-id="pages">
                {pageSizeSelector}
                <span className="form-group">
                <ButtonGroup bsSize="small">
                    {prevButton}
                    {head}
                    {this.hasHeadDots(ranges) ? this.renderDot(CLASS_NAME_DOTS_HEAD) : null}
                    {middle}
                    {this.hasTailDots(ranges) ? this.renderDot(CLASS_NAME_DOTS_TAIL) : null}
                    {tail}
                    {nextButton}
                </ButtonGroup>
                </span>
            </div>
        );
    }
}
