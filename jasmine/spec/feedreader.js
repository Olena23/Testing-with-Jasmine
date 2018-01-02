/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have a defined not empty URL', function () {
          for (let i = 0, len = allFeeds.length; i < len; i++){
            expect(allFeeds[i].url).toBeDefined();
            expect(allFeeds[i].url.length).not.toBe(0);
          }
        });

        it('have a defined not empty name',function () {
          for (let i = 0; i < allFeeds.length; i++){
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name.length).not.toBe(0);
          }
        });
    });

    describe('The menu', function () {
      var bodyClass =$('body').hasClass('menu-hidden');
      var menuIcon = $('.menu-icon-link');

      it('is hidden by default', function () {
        expect(bodyClass).toBe(true);
      });
      
      it('changes visibility when clicked', function () {
        menuIcon.trigger('click');
        bodyClass =$('body').hasClass('menu-hidden');
        expect(bodyClass).not.toBe(true);
        menuIcon.trigger('click');
        bodyClass =$('body').hasClass('menu-hidden');
        expect(bodyClass).toBe(true);
      });
    });

    describe('Initial Entries', function () {
      beforeEach(function (done) {
        loadFeed(0,done);
      });

      it('have at least one entry within the .feed container', function () {
        expect($('.feed .entry-link ').length).toBeGreaterThan(0);
      });
    });

    describe('New Feed Selection', function () {
      var $feedBefore;
      var $feedAfter;
      beforeEach(function (done) {
        loadFeed(2,function () {
          $feedBefore = $('.feed').html();
          done();
        });
      });

      it('the content actually changes when a new feed is loaded', function (done) {
          loadFeed(3, function () {
            $feedAfter = $('.feed').html();
            expect($feedBefore).not.toEqual($feedAfter);
            done();
          });
      });
    });

}());
