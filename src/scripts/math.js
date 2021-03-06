var TypeOtter = (function(obj, $) {
    // Global MathJax variables
    obj.inlineMath = 'a579438542e77567a744e7abaeaac7ae'; // MD5 of '$$ inline'
    obj.blockMath  = '1a73f16f7ac6dc3674c729ed2524bcc6'; // MD5 of '$$ block'

    /**
     * Preprocess 'e' tags so mathjax registers them.
     * Note: MathJax doesn't allow tags to be used for finding equations.
     */
    obj.handleMath = function(dom) {
        var counter = 1;
        dom.find('e').each(function () {
            var elem = $(this);
            if (elem.closest('p, li, th, td, figcaption').length === 0) { // Check if equation is inside inline element
                elem.html(obj.blockMath + elem.html() + obj.blockMath);
                elem.attr('data-math', counter++).attr('tex-math-style', 'block');
            } else {
                elem.html(obj.inlineMath + elem.html() + obj.inlineMath);
                elem.attr('tex-math-style', 'inline');
            }
        });
    };

    /**
     * Add numbering to block-level equations.
     */
    obj.fillMath = function(dom) {
        dom.find('e[tex-math-style="block"]').each(function () {
            var elem = $(this);
            var mathjax = elem.find('.MathJax_Display');
            mathjax.append(
                '<span class="tex-math-count" style="line-height: ' + mathjax.height() + 'px">' +
                    elem.attr('data-math') +
                '</span>'
            );
        });
    };

    return obj;
}(TypeOtter || {}, jQuery));

// MathJax properties.
window.MathJax = {
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
        inlineMath: [[TypeOtter.inlineMath, TypeOtter.inlineMath]],
        displayMath: [[TypeOtter.blockMath, TypeOtter.blockMath]],
        processEscapes: true,
        processRefs: false,
        processEnvironments: false
    },
    skipStartupTypeset: true,
    showProcessingMessages: false,
    messageStyle: "none",
    "HTML-CSS": {availableFonts: ["TeX"]}
};
