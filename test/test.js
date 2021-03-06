'use strict';
var chai = require('chai');
chai.Assertion.includeStack = true;
require('chai').should();
var expect = require('chai').expect;
var nodePath = require('path');
var fs = require('fs');

var jadePlugin = require('../'); // Load this module just to make sure it works
var lasso = require('lasso');

describe('lasso-jade' , function() {

    beforeEach(function(done) {
        for (var k in require.cache) {
            if (require.cache[k]) {
                delete require.cache[k];
            }
        }
        done();
    });

    it('should render a simple jade dependency', function() {

        var myLasso = lasso.create({
                fileWriter: {
                    fingerprintsEnabled: false,
                    outputDir: nodePath.join(__dirname, 'static')
                },
                bundlingEnabled: true,
                plugins: [
                    {
                        plugin: jadePlugin,
                        config: {

                        }
                    }
                ]
            });

        return myLasso.lassoPage({
                name: 'testPage',
                dependencies: [
                    nodePath.join(__dirname, 'fixtures/project1/simple.browser.json')
                ]
            }).then((lassoPageResult) => {
                var output = fs.readFileSync(nodePath.join(__dirname, 'static/testPage.js'), {encoding: 'utf8'});
                expect(output).to.contain('"/test/fixtures/project1/simple.jade"');
            });
    });


});
