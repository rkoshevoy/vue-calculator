var calculator = new Vue({
  el: '#calculator',
  data: {
    result: '0'
  },
  methods: {
    digit: function(buttonValue) {
      this.result = String(this.result);

      if (this.result == '0') {
        this.result = buttonValue;
      } else {
        this.result = this.result + buttonValue;
      }
    },

    clear: function() {
      this.result = '0';
    },

    deleteLast: function() {
      this.result = this.result.slice(0, -1);

      if (this.result == '')
        this.result = '0';
    },

    operation: function(operationSymbol) {
      this.result = String(this.result);

      if (this.result.slice(-1) == '*' || this.result.slice(-1) == '/' || this.result.slice(-1) == '-' || this.result.slice(-1) == '+') {
        this.result = this.result.slice(0, -1);
      }

      var digitsArray = this.result.split('');

      this.result = this.result + operationSymbol;

      if (operationSymbol == '=') {
        this.getResult();
      } else {
        for (var i = 1; i < digitsArray.length - 1; i++) {
          if (digitsArray[i] == '*' || digitsArray[i] == '/' || digitsArray[i] == '-' || digitsArray[i] == '+') {
            this.getResult();
          }
        }
      }
    },

    getResult: function() {
      var firstValue, secondValue;
      var digitsArray = this.result.split('');

      this.result = this.result.slice(0, -1);

      function valuesSplit(i) {
        firstValue = digitsArray.slice(0, i).join('');
        secondValue = digitsArray.slice(i + 1, digitsArray.length - 1).join('');
      }

      for (var i = 0; i < digitsArray.length - 1; i++) {

        switch (digitsArray[i]) {
          case '*':
            valuesSplit(i);
            this.result = parseFloat(firstValue) * parseFloat(secondValue);
            break;
          case '/':
            valuesSplit(i);
            this.result = parseFloat(firstValue) / parseFloat(secondValue);
            break;
          case '-':
            valuesSplit(i);
            this.result = parseFloat(firstValue) - parseFloat(secondValue);
            break;
          case '+':
            valuesSplit(i);
            this.result = parseFloat(firstValue) + parseFloat(secondValue);
            break;
          default:
            break;
        }
      }
    }
  }
});
