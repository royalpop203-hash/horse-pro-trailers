jQuery(document).on('ready', function () {
	if (window.matchMedia("(max-width: 768px)").matches) {
		jQuery('.fitow-finance-form').css({
			'position': 'relative',
			'height': '100vh'
		});

		jQuery('.fitow-finance-form').closest('.et_pb_section').css('z-index', '5');
	}
});

jQuery(document).on('click', '.fitow-finance-form', function () {
	if (window.matchMedia("(max-width: 768px)").matches) {
		jQuery('body').css('overflow', 'hidden');
		jQuery('.et_builder_inner_content').first().css('z-index', '1');
	}
});