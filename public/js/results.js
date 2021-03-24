import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';
import { madlibs } from './resources/resources.js';
import ResultsComponent from './components/ResultsComponent.js';


console.log(`${madlibs.length} madlibs loaded`);
new Vue({
    el: '#app',
    data: {
        inputs: [],
        madlib: madlibs[0],
        index: 0,
        appClasses: ['p-4', 'd-flex', 'h-100', 'flex-column', 'align-items-center', 'justify-content-start'],
    },
    components: {
        'results-component': ResultsComponent,
    },
    created () {
        this.generateInputs();
    },
    methods: {
        backToGame() {
            window.location.href= '/madlibs';
        }, 
        logout() {
            window.location.href= '/login';
        },
        generateInputs() {
            fetch('/getCompletedMadlib', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',     // send cookies, even in CORS
            })
                .then((response) => response.json())
                .then((data) => {
                    this.inputs = data.input;
                    this.index = data.index;
                    this.madlib = madlibs[this.index]; 
                })
                .catch((err) => {
                    console.log(err);
                });
            return this.inputs;
        }
    },
});
