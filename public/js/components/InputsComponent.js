import InputComponent from './InputComponent.js';

export default {
    props: {
        'substitutions': Array,
        'index': Number,
    },
    components: {
        'input-component': InputComponent,
    },
    methods: {
        onInput(sid, val) {
            this.$emit('on-input', sid, val);
        }
    },
    data() {
        return {
            classes: ['d-flex', 'flex-column', 'justify-content-around', 'bg-secondary', 'col', 'p-4'],
            inputs: [],
            buttonStyle: {
                'border': '2px solid black',
            },
        };
    },
    template: `
        <div :class="classes">
        <form action="/results" method="post" autocomplete="off">
            <input name="index" :value="index" type="hidden">
            <input-component
                v-for="(substitution, index) of substitutions"
                @on-input="onInput"
                :key="index"
                :sid="index"
                :substitution-label-name="substitution"
            ></input-component>
            <button class="btn btn-secondary btn-lg btn-block" :style="buttonStyle" type="submit">Submit</button>
        </form>
        </div>
    `,
};
