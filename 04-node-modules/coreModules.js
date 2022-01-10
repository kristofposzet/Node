const path = require('path');
const util = require('util');
const v8 = require('v8');
// join folders
util.log(path.join(__dirname, 'folderHierarchyTest', 'a', 'b', 'c'));
util.log(v8.getHeapStatistics());
