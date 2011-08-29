describe("ToggleMenu", function() {
  var $menuOne;
  var $menuTwo;

  beforeEach(function() {
    loadFixtures('test.html');
    
    // Here are two examples of using toggleMenu
    ////
    
    // This menu does nothing but open and close
    $menuOne = $('#menu-one');
    $menuOne.toggleMenu({
      opener: $('#menu-one-opener')
    });
    
    // This shows the available options you can supply to toggleMenu
    $menuTwo = $('#menu-two');
    $menuTwo.toggleMenu({
      opener: $('#menu-two-opener'),
      transition: 'fold',
      duration: 'slow',
      onClick: function() { alert('menu two clicked'); },
      onClickFilter: '#menu-two li a'
    });
  });
  
  it("should have a version string", function() {
    expect($menuOne.data('toggleMenu').version).toBeDefined();
  });
  
  describe("in the initialization options", function() {
    it("should treat a string opener option as a jQuery selector", function() {
      $('#menu-three').toggleMenu({ opener: 'h1'});
      expect($('#menu-three').data('toggleMenu').settings.opener).toBe('h1');
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
    
    describe("and then a menu item is clicked", function() {
      beforeEach(function() {
        var $menuItem = $('li a:first', $menuOne);
        spyOn($menuOne.data('toggleMenu').settings, 'onClick');
        
        $menuItem.trigger('click.toggleMenu', [{target: $menuItem}]);
      });
      
      it("should call the configured onClick method", function() {
        expect($menuOne.data('toggleMenu').settings.onClick).wasCalled();
      });
    });
  });
});