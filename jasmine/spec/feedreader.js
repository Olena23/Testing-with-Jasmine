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
    var bodyClass =$('body').attr('class');
    var menuIcon = $('.menu-icon-link');
    var container = $('.feed');

    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have a defined not empty URL', function () {
          for (let i = 0; i < allFeeds.length; i++){
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
      it('is hidden by default', function () {
        expect(bodyClass).toBe('menu-hidden')
      });
      
      it('changes visibility when clicked', function () {
        menuIcon.trigger('click');
        bodyClass =$('body').attr('class');
        expect(bodyClass).not.toBe('menu-hidden');
        menuIcon.trigger('click');
        bodyClass =$('body').attr('class');
        expect(bodyClass).toBe('menu-hidden');
      });
    });

    describe('Initian Entries', function () {
      beforeEach(function (done) {
        loadFeed(0,done);
        });

      it('have at least one entry within the .feed container', function () {
        expect(container.length).toBeGreaterThan(0);
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

      it('he content actually changes when a new feed is loaded', function (done) {
          loadFeed(3, function () {
            $feedAfter = $('.feed').html();
            expect($feedBefore).not.toEqual($feedAfter);
            done();
          });
      });
    })

}());
