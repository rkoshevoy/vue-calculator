var calculator = new Vue({
  el: '#calculator',
  methods: {
    digit: function(buttonValue) {
      var screen = document.getElementById('calculator-screen');

      if (screen.value == '0') {
        screen.value = buttonValue;
      } else {
        screen.value = screen.value + buttonValue;
      }
    },

    clear: function() {
      document.getElementById('calculator-screen').value = 0;
    },

    deleteLast: function() {
      var screen = document.getElementById('calculator-screen');

      screen.value = screen.value.slice(0, -1);

      if (screen.value == '')
        screen.value = '0';
    },

    operation: function(operationSymbol) {
      var screen = document.getElementById('calculator-screen');

      if (screen.value.slice(-1) == '*' || screen.value.slice(-1) == '/' || screen.value.slice(-1) == '-' || screen.value.slice(-1) == '+') {
        screen.value = screen.value.slice(0, -1);
      }

      screen.value = screen.value + operationSymbol;

      var digitsArray = screen.value.split('');

      if (operationSymbol == '=') {
        result();
      } else {
        for (var i = 1; i < digitsArray.length - 1; i++) {
          if (digitsArray[i] == '*' || digitsArray[i] == '/' || digitsArray[i] == '-' || digitsArray[i] == '+') {
            result();
            screen.value = screen.value + operationSymbol;
          }
        }
      }

      function result() {
        var firstValue, secondValue;

        function valuesSplit(i) {
          firstValue = digitsArray.slice(0, i).join('');
          secondValue = digitsArray.slice(i + 1, digitsArray.length - 1).join('');
        }

        for (var i = 0; i < digitsArray.length - 1; i++) {

          switch (digitsArray[i]) {
            case '*':
              valuesSplit(i);
              screen.value = parseFloat(firstValue) * parseFloat(secondValue);
              break;
            case '/':
              valuesSplit(i);
              screen.value = parseFloat(firstValue) / parseFloat(secondValue);
              break;
            case '-':
              valuesSplit(i);
              screen.value = parseFloat(firstValue) - parseFloat(secondValue);
              break;
            case '+':
              valuesSplit(i);
              screen.value = parseFloat(firstValue) + parseFloat(secondValue);
              break;
            default:
              break;
          }
        }
      }
    }
  }
});
