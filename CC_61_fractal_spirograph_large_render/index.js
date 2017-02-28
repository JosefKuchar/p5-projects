var $grid = $('.grid').isotope({
  itemSelector: '.grid-item',
  layoutMode: 'fitRows',
  sortBy: 'random'
});

$grid.imagesLoaded().progress(function() {
    $grid.isotope('layout');
});