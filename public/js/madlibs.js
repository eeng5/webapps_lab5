import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';
import { madlibs } from './resources/resources.js';
import GameComponent from './components/GameComponent.js';
import ResultsComponent from './components/ResultsComponent.js';


console.log(`${madlibs.length} madlibs loaded`);
new Vue({
    el: '#app',
    data: {
        madlib: null,
        index: 0,
        appClasses: ['p-4', 'd-flex', 'h-100', 'flex-column', 'align-items-center', 'justify-content-start'],
    },
    components: {
        'game-component': GameComponent,
        'results-component': ResultsComponent,
    },
    created () {
        this.useRandomMadlib();
    },
    methods: {
        getRandomMadlibIndex() {
            this.index = Math.floor(Math.random() * madlibs.length);
            return this.index;
        },
        getRandomMadlib() {
            return madlibs[this.getRandomMadlibIndex()];
        },
        useRandomMadlib() {
            this.madlib = this.getRandomMadlib();            
        },
        backToGame() {
            window.location.href= '/madlibs';
        }, 
        logout() {
            window.location.href= '/login';
        },
    },
});
