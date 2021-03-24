import ResultComponent from './ResultComponent.js';

export default {
    props: {
        'madlib': Object,
        'inputs': Array,
    },
    data() {
        return {
            classes: ['container', 'w-100', 'bg-light', 'd-flex', 'flex-row', 'py-2'],
            style: {
            },
        };
    },
    created() {
    },
    components: {
        'result-component': ResultComponent
    },
    methods: {
        onInput(sid, val) {
            this.$set(this.inputs, sid, val);
        }
    },
    computed: {
        madlibContent() {
            return this.madlib.content;
        },
        
        madlibSubstitutions() {
            return this.madlibContent.match(/\[([^\])]*)\]/g).map(substitution => substitution.slice(1, -1));
        },
    },
    template: `
        <div :class="classes" :style="style">
            <result-component :inputs="inputs" :substitutions="madlibSubstitutions" :madlib-content="madlibContent"></result-component>
        </div>
    `,
};
