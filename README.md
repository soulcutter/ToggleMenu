toggleMenu plugin for jQuery
============================

toggleMenu is a simple menu system which uses [jQuery][0]'s
[toggle()](http://api.jquery.com/toggle/) or [jQuery UI][1]'s
[toggle()](http://jqueryui.com/demos/toggle/) methods to open and close the
menu. Default behavior is that clicking outside of the menu results in the menu
closing, and only one menu can be open at a time.

Installation
------------

Simply download jquery.togglemenu.js and add it to your javascript includes
after [jQuery][0] and, if applicable, after [jQuery UI][1].

Available Options
-----------------

toggleMenu may take a hash argument to supply the following options:

  * `opener` (***recommended***): A jQuery element intended to be clicked on
    in order to display the menu.
  * `transition` (*default:* `'linear'`): A string,
    [the name of an easing method](http://jqueryui.com/demos/effect/easing.html).
  * `duration` (*default:* `'fast'`): A string `'fast'` or `'slow'`, or a number
    of milliseconds. This defines how long the transition will take.
  * `onClick` (*default:* no-op function): A function to define the behavior of
    clicking on an element within the menu.
  * `onClickFilter` (*default:* none): A jQuery selector string to use so that
    only matching elements trigger an onClick event.

[0]: http://jquery.com/
[1]: http://jqueryui.com/