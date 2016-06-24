
export default class SuiteContext {

    constructor(suiteName, testData) {
        this.suiteName = suiteName;
        this.dataSource = testData;
    }
    get DEBUG_MODE () { return __karma__.config.showDebugMessages; } //todo

    getSuiteName() {
        return this.suiteName;
    }

    getTestLabel(testId) {
        var skippedCount = this.getSkippedTestDataCount(testId);
        var skippedCountPart = skippedCount > 0 ? '[!!! SKIPPED '+ skippedCount+' ] ': '';
        var runsCount = this.getFilteredTestData(testId).length;

        return skippedCountPart+ testId + ' '+ '('+ runsCount+' runs); '
        + this.getTestDescriptor(testId).useCases.join(', ');
    }

    runTest(testId, executor) {
        function runInDebugMode(testData) {
            try {
                executor.apply(null, [testData.input, testData.expected, testData]);
            } catch (e) {
                console.error(JSON.stringify(testData));
                throw e;
            }
        }

        function runInNormalMode(testData) {
            executor.apply(null, [testData.input, testData.expected, testData]);
        }

        var runs = this.getFilteredTestData(testId);

        if (this.getSkippedTestDataCount(testId) > 0) {
            console.warn('SOME TESTS ARE SKIPPED. SEE *.testdata.json');
        }

        runs.forEach(this.DEBUG_MODE ? runInDebugMode : runInNormalMode);
    }

    /**
     *
     * @private
     */
    getFilteredTestData(testId) {
        var allTestData = this.getTestDescriptor(testId).testData;
        var filteredTestData = allTestData.filter((testDataItem) => testDataItem.only === true );

        return filteredTestData.length > 0
            ? filteredTestData
            : allTestData;
        }

    /**
     *
     * @private
     */
    getSkippedTestDataCount(testId) {
        return this.getTestDescriptor(testId).testData.length - this.getFilteredTestData(testId).length;
    }

    getTestSource(testId) {
        return this.getTestDescriptor(testId).testSource;
    }

    getTestDescriptor(testId) {
        var descriptor = this.dataSource[this.suiteName][testId];
        if (!descriptor) {
            console.log('Error can not find test case "' + testId + '". Check unit test and data');
        }
        return descriptor;
    }
};
