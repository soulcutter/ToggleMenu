describe("ToggleMenu", function() {
  var $menuOne;
  var $menuTwo;

  beforeEach(function() {
    loadFixtures('test.html');
    $menuOne = $('#menu-one');
    $menuOne.toggleMenu({
      opener: $('#menu-one-opener')
    });
    $menuTwo = $('#menu-two');
    $menuTwo.toggleMenu({
      opener: $('#menu-two-opener'),
      transition: 'fold',
      duration: 'slow',
      onClick: function() { alert('menu two clicked'); },
      onClickFilter: '#menu-two li a'
    });
  });

  describe("when an opener is clicked", function() {
    beforeEach(function() {
      $('#menu-one-opener').trigger("click.toggleMenu");
    });
    
    it("should have a visible menu one", function() {
      expect($menuOne).toBeVisible();
    });
    it("should NOT have a visible menu two", function() {
      expect($menuTwo).toBeHidden();
    });

    describe("and then something outside the menu is clicked", function() {
      beforeEach(function() {
        var $h1 = $('h1');
        $h1.trigger("click.toggleMenu", [{target: $h1}]);
      });
      
      it("should close the menu", function() {
        expect($menuOne).toBeHidden();
      })
    });

    describe("and then the other menu opener is clicked", function() {
      beforeEach(function() {
        var $menuTwoOpener = $('#menu-two-opener');
        $menuTwoOpener.trigger("click.toggleMenu", [{target: $menuTwoOpener}]);
      });

      it("should close the first menu", function() {
        expect($menuOne).toBeHidden();
      });

      it("should open the other menu", function(){
        expect($menuTwo).toBeVisible();
      });
    });
  });
  // it("tells the current song if the user has made it a favorite", function() {
  //   spyOn(song, 'persistFavoriteStatus');
  // 
  //   player.play(song);
  //   player.makeFavorite();
  // 
  //   expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  // });
});