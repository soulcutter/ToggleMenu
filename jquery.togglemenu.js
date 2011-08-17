(function($){
    $.toggleMenu = function(element, options) {
        var defaults = {
            duration: 'fast',
            transition: null, // if 'transition' is specified, it will try to use that in the toggle

            opener: null,

            onClick: function(e) { },
            onClickFilter: ' ' // determines whether or not to trigger the onClick event within the menu
        }

        var plugin = this;
        plugin.settings = {}

        var $element = $(element);

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);

            $(window).bind("openMenu.toggleMenu", function(e, $openMenu) {
                if($openMenu != $element) {
                    plugin.closeMenu();
                }
            });
            $(window).bind("click.toggleMenu", function() {
                plugin.closeMenu();
            });
            $element.bind("click.toggleMenu", function(e) {
                var $clickSource = $(e.target);
                if($clickSource.is(plugin.settings.onClickFilter)) {
                    return plugin.settings.onClick(e, $clickSource);
                }
            });
            if(plugin.settings.opener != null) {
                plugin.settings.opener.bind("click.toggleMenu", function() {
                    return plugin.openMenu();
                });
            }
        }

        plugin.openMenu = function() {
            $(window).trigger("openMenu.toggleMenu", [$element]);
            if(!$element.is(":visible")) {
                performToggle();
            }
            // returns false for convenience so that a click event can "return $element.data('toggleMenu').openMenu();"
            // in 1 line to prevent event propagation & default behavior rather using 2 lines (openMenu / return false)
            return false;
        }

        plugin.closeMenu = function() {
            if($element.is(":visible")) {
                performToggle();
            }
        }

        var performToggle = function() {
            $element.toggle(plugin.settings.duration, plugin.settings.transition);
        }

        plugin.init();
    }

    $.fn.toggleMenu = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('toggleMenu')) {
                var plugin = new $.toggleMenu(this, options);
                $(this).data('toggleMenu', plugin);
            }
        });
    }

})(jQuery);
