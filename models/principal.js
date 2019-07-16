"use strict";

class Principal {
    constructor (attributes) {
        this.authenticated = false;
        this.username = null;

        if (attributes) {
            this.authenticated = attributes.authenticated || false;
            this.username = attributes.username || null;
        }
    }

    isAuthenticated () {
        return this.authenticated;
    }

    toString () {
        return {
            authenticated: this.authenticated,
            username: this.username
        };
    }
}

module.exports = Principal;