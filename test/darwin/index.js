var should = require('should'),
    Q = require('q'),
    fs = require('fs'),
    path = require('path'),
    tmp = require('tmp'),
    setupHelper = require('../helper/setup'),
    cleanHelper = require('../helper/clean'),
    prepareAction = require('../../actions/prepare'),
    buildAction = require('../../actions/build'),
    cleanAction = require('../../actions/clean'),
    pluginAction = require('../../actions/plugin');

describe('testing tarifa cli on darwin', function() {

    var projectDefer = Q.defer(),
        cwd = process.cwd();

    before('create a empty project', setupHelper(tmp, projectDefer, 'create_response_darwin.json'));

    it('create a project (android & ios)', function () {
        this.timeout(0);
        return projectDefer.promise;
    });

    describe('tarifa prepare', function() {
        it('tarifa prepare web', function () {
            this.timeout(0);
            return projectDefer.promise.then(function (rslt) {
                return prepareAction.prepare('web', 'default', false);
            });
        });

        it('tarifa prepare android stage', function () {
            this.timeout(0);
            return projectDefer.promise.then(function (rslt) {
                return prepareAction.prepare('android', 'stage', false);
            });
        });

        it('tarifa prepare ios prod', function () {
            this.timeout(0);
            return projectDefer.promise.then(function (rslt) {
                return prepareAction.prepare('ios', 'prod', false);
            });
        });
    });

    describe('tarifa build', function() {
        it('tarifa build web', function () {
            this.timeout(0);
            return projectDefer.promise.then(function (rslt) {
                return buildAction.build('web', 'default', false, false);
            });
        });

        it('tarifa build android', function () {
            this.timeout(0);
            return projectDefer.promise.then(function (rslt) {
                return buildAction.build('android', 'default', false, false);
            });
        });

        it('tarifa build ios', function () {
            this.timeout(0);
            return projectDefer.promise.then(function (rslt) {
                return buildAction.build('ios', 'default', false, false);
            });
        });
    });

    describe('tarifa clean', function() {
        it('clean android', function () {
            this.timeout(0);
            return projectDefer.promise.then(function (rslt) {
                return cleanAction.clean('android', false);
            });
        });
        it('clean ios', function () {
            this.timeout(0);
            return projectDefer.promise.then(function (rslt) {
                return cleanAction.clean('ios', false);
            });
        });
    });

    describe('tarifa plugin', function() {
        it('tarifa plugin add ../../fixtures/emptyplugin', function () {
            this.timeout(0);
            return projectDefer.promise.then(function (rslt) {
                return pluginAction.plugin('add', path.join(__dirname, '../fixtures/emptyplugin'), false);
            });
        });

        it('tarifa plugin list', function () {
            this.timeout(0);
            return projectDefer.promise.then(function (rslt) {
                return pluginAction.list(false).then(function (rslt) {
                    rslt.indexOf("test.test.test").should.equal(1);
                });
            });
        });

        it('re tarifa plugin add ../fixtures/emptyplugin', function () {
            this.timeout(0);
            return projectDefer.promise.then(function (rslt) {
                var p = path.join(__dirname, '../fixtures/emptyplugin');
                return pluginAction.plugin('add', p, false).should.be.rejected;
            });
        });

        it('tarifa plugin remove test.test.test', function () {
            this.timeout(0);
            return projectDefer.promise.then(function (rslt) {
                return pluginAction.plugin('remove', 'test.test.test');
            });
        });
    });

    after('clean temp folder', cleanHelper(projectDefer, tmp, cwd));
});
