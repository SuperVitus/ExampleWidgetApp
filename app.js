(function(){

  // We check for features which are not universally supported, and don't try to
  // show the app if it would error.
  if (!window.addEventListener || !window.localStorage)
    return;

  // The INSTALL_OPTIONS constant is inserted by the Eager bundler.  It's value is the
  // value of the options defined in the install.json file.
  var options = INSTALL_OPTIONS;

  // We fake a view count by storing it locally.  It only updates for the currently
  // viewing visitor, making it pretty much useless.
  var viewCount = localStorage.fakeViewCount;
  if (viewCount){
    viewCount = parseInt(viewCount, 10);
  } else {
    viewCount = Math.floor(Math.random() * 10000);
  }

  viewCount++;
  localStorage.fakeViewCount = viewCount;

  var el = null;
  var updateElement = function(){
    // We pass in the last element to allow us to restore the removed element
    // when we do live updating of the preview.  Details:
    // https://eager.io/developer/docs/install-json/preview#dealing-with-element-fields
    el = Eager.createElement(options.element, el);
    el.className = 'example-widget-view-count';
  };

  var update = function(){
    updateElement();

    el.innerHTML = '<div>' + viewCount + '</div>';
  }

  var setOptions = function(opts){
    options = opts;

    update();
  }

  // Since we're adding an element to the body, we need to wait until the DOM is
  // ready before inserting our widget.
  if (document.readyState == 'loading')
    document.addEventListener('DOMContentLoaded', update);
  else
    update();

  // This is used by the preview to enable live updating of the app while previewing.
  // See the preview.handlers section of the install.json file to see where it's used.
  INSTALL_SCOPE = {
    setOptions: setOptions
  };

})()
