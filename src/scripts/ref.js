var TypeOtter = (function(obj, $) {

    /**
     * Find reference links and their closest reference option.
     */
    obj.makeRef = function(dom) {
        dom.find('a[ref=""]').each(function (){
            var elem = $(this),
                href = elem.attr('href');
            if (href === undefined) {
                console.error('Reference needs "href" attribute: %s', elem.clone().wrap('<span>').parent().html());
                return true;
            }
            // Find the referenced element.
            var ref = dom.find('a[name="' + href.substr(1) + '"]').first();

            // Find closest association.
            if (ref.closest('e').length !== 0) { // Equations
                elem.html(ref.closest('e').attr('data-math'));
            } else if (ref.closest('figure').length !== 0) { // Images
                elem.html(ref.closest('figure').attr('data-fig'));
            } else if (ref.closest('section').length !== 0) { // Sections
                elem.html(ref.closest('section').attr('data-ref'));
            } else {
                console.error('Unknown reference: %s', elem.attr('href'));
            }
        });
    };

    return obj;
}(TypeOtter || {}, jQuery));
