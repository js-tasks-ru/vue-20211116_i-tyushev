import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const Calculator = defineComponent({
  name: 'Calculator',

  data() {
    return {
      operator: 'sum',
      firstNumber: 0,
      secondNumber: 0,
      operations: [
        { name: 'sum', text: ' ➕' },
        { name: 'subtract', text: ' ➖' },
        { name: 'multiply', text: ' ✖' },
        { name: 'divide', text: ' ➗' },
      ],
    };
  },

  computed: {
    result: function () {
      switch (this.operator) {
        case 'sum':
          return this.firstNumber + this.secondNumber;
        case 'subtract':
          return this.firstNumber - this.secondNumber;
        case 'multiply':
          return this.firstNumber * this.secondNumber;
        case 'divide':
          if (this.secondNumber === 0) {
            return 'Division by zero';
          }
          return this.firstNumber / this.secondNumber;
        default:
          return 'Invalid operator';
      }
    },
  },

  methods: {},
});

const app = createApp(Calculator);

const vm = app.mount('#app');
