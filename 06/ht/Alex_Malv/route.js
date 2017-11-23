let Router = function(options) {
    this.routes = options.routes || [];
    this.eventbus = options.eventbus;
    this.init();
}


Router.prototype = {
    init: function() {
        console.log("router init")
        window.addEventListener("hashchange", () => this.handlerURL(window.location.hash))
        this.handlerURL(window.location.hash);
    },

    findPreviousActiveRoute: function() {

    }
}