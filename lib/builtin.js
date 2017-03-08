(function() {
  var _, validator;

  _ = require('lodash');

  validator = require('validator');

  module.exports = function($filter) {
    $filter.register(['string', String], new $filter.InputFilter({
      validate: function(input, opts) {
        return _.isString(input);
      }
    }));
    $filter.register(['int', 'integer'], new $filter.InputFilter({
      validate: function(input, opts) {
        return validator.isInt(input);
      },
      transform: function(input, opts) {
        return validator.toInt(input);
      }
    }));
    $filter.register('email', new $filter.InputFilter({
      validate: function(input, opts) {
        if (!_.isString(input)) {
          return false;
        }
        return validator.isEmail(input);
      },
      transform: function(input, opts) {
        return input.toLowerCase();
      }
    }));
    $filter.register(['bool', 'boolean', Boolean], new $filter.InputFilter({
      validate: function(input, opts) {
        return validator.isBoolean(input);
      },
      transform: function(input, opts) {
        return validator.toBoolean(input, true);
      }
    }));
    $filter.register('uuid', new $filter.InputFilter({
      validate: function(input, opts) {
        if (!_.isString(input)) {
          return false;
        }
        return validator.isUUID(input);
      }
    }));
    return $filter.register(['mongo', 'mongoId'], new $filter.InputFilter({
      validate: function(input, opts) {
        if (!_.isString(input)) {
          return false;
        }
        return validator.isMongoId(input);
      }
    }));
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbHRpbi5qcyIsInNvdXJjZXMiOlsiYnVpbHRpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7QUFBQSxNQUFBOztFQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7RUFDSixTQUFBLEdBQVksT0FBQSxDQUFRLFdBQVI7O0VBRVosTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxPQUFEO0lBQ2IsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsQ0FBQyxRQUFELEVBQVcsTUFBWCxDQUFqQixFQUF5QyxJQUFBLE9BQU8sQ0FBQyxXQUFSLENBQ3JDO01BQUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxFQUFRLElBQVI7QUFDTixlQUFPLENBQUMsQ0FBQyxRQUFGLENBQVcsS0FBWDtNQURELENBQVY7S0FEcUMsQ0FBekM7SUFJQSxPQUFPLENBQUMsUUFBUixDQUFpQixDQUFDLEtBQUQsRUFBUSxTQUFSLENBQWpCLEVBQXlDLElBQUEsT0FBTyxDQUFDLFdBQVIsQ0FDckM7TUFBQSxRQUFBLEVBQVUsU0FBQyxLQUFELEVBQVEsSUFBUjtBQUNOLGVBQU8sU0FBUyxDQUFDLEtBQVYsQ0FBZ0IsS0FBaEI7TUFERCxDQUFWO01BRUEsU0FBQSxFQUFXLFNBQUMsS0FBRCxFQUFRLElBQVI7QUFDUCxlQUFPLFNBQVMsQ0FBQyxLQUFWLENBQWdCLEtBQWhCO01BREEsQ0FGWDtLQURxQyxDQUF6QztJQU1BLE9BQU8sQ0FBQyxRQUFSLENBQWlCLE9BQWpCLEVBQThCLElBQUEsT0FBTyxDQUFDLFdBQVIsQ0FDMUI7TUFBQSxRQUFBLEVBQVUsU0FBQyxLQUFELEVBQVEsSUFBUjtRQUNOLElBQUEsQ0FBb0IsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxLQUFYLENBQXBCO0FBQUEsaUJBQU8sTUFBUDs7QUFDQSxlQUFPLFNBQVMsQ0FBQyxPQUFWLENBQWtCLEtBQWxCO01BRkQsQ0FBVjtNQUdBLFNBQUEsRUFBVyxTQUFDLEtBQUQsRUFBUSxJQUFSO0FBQ1AsZUFBTyxLQUFLLENBQUMsV0FBTixDQUFBO01BREEsQ0FIWDtLQUQwQixDQUE5QjtJQU9BLE9BQU8sQ0FBQyxRQUFSLENBQWlCLENBQUMsTUFBRCxFQUFTLFNBQVQsRUFBb0IsT0FBcEIsQ0FBakIsRUFBbUQsSUFBQSxPQUFPLENBQUMsV0FBUixDQUMvQztNQUFBLFFBQUEsRUFBVSxTQUFDLEtBQUQsRUFBUSxJQUFSO0FBQ04sZUFBTyxTQUFTLENBQUMsU0FBVixDQUFvQixLQUFwQjtNQURELENBQVY7TUFFQSxTQUFBLEVBQVcsU0FBQyxLQUFELEVBQVEsSUFBUjtBQUNQLGVBQU8sU0FBUyxDQUFDLFNBQVYsQ0FBb0IsS0FBcEIsRUFBMkIsSUFBM0I7TUFEQSxDQUZYO0tBRCtDLENBQW5EO0lBTUEsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsTUFBakIsRUFBNkIsSUFBQSxPQUFPLENBQUMsV0FBUixDQUN6QjtNQUFBLFFBQUEsRUFBVSxTQUFDLEtBQUQsRUFBUSxJQUFSO1FBQ04sSUFBQSxDQUFvQixDQUFDLENBQUMsUUFBRixDQUFXLEtBQVgsQ0FBcEI7QUFBQSxpQkFBTyxNQUFQOztBQUNBLGVBQU8sU0FBUyxDQUFDLE1BQVYsQ0FBaUIsS0FBakI7TUFGRCxDQUFWO0tBRHlCLENBQTdCO1dBS0EsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsQ0FBQyxPQUFELEVBQVUsU0FBVixDQUFqQixFQUEyQyxJQUFBLE9BQU8sQ0FBQyxXQUFSLENBQ3ZDO01BQUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxFQUFRLElBQVI7UUFDTixJQUFBLENBQW9CLENBQUMsQ0FBQyxRQUFGLENBQVcsS0FBWCxDQUFwQjtBQUFBLGlCQUFPLE1BQVA7O0FBQ0EsZUFBTyxTQUFTLENBQUMsU0FBVixDQUFvQixLQUFwQjtNQUZELENBQVY7S0FEdUMsQ0FBM0M7RUE3QmE7QUFIakIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXyA9IHJlcXVpcmUgJ2xvZGFzaCdcclxudmFsaWRhdG9yID0gcmVxdWlyZSAndmFsaWRhdG9yJ1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoJGZpbHRlcikgLT5cclxuICAgICRmaWx0ZXIucmVnaXN0ZXIgWydzdHJpbmcnLCBTdHJpbmddLCBuZXcgJGZpbHRlci5JbnB1dEZpbHRlclxyXG4gICAgICAgIHZhbGlkYXRlOiAoaW5wdXQsIG9wdHMpIC0+XHJcbiAgICAgICAgICAgIHJldHVybiBfLmlzU3RyaW5nIGlucHV0XHJcbiAgICBcclxuICAgICRmaWx0ZXIucmVnaXN0ZXIgWydpbnQnLCAnaW50ZWdlciddLCBuZXcgJGZpbHRlci5JbnB1dEZpbHRlclxyXG4gICAgICAgIHZhbGlkYXRlOiAoaW5wdXQsIG9wdHMpIC0+XHJcbiAgICAgICAgICAgIHJldHVybiB2YWxpZGF0b3IuaXNJbnQgaW5wdXRcclxuICAgICAgICB0cmFuc2Zvcm06IChpbnB1dCwgb3B0cykgLT5cclxuICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRvci50b0ludCBpbnB1dFxyXG5cclxuICAgICRmaWx0ZXIucmVnaXN0ZXIgJ2VtYWlsJywgbmV3ICRmaWx0ZXIuSW5wdXRGaWx0ZXJcclxuICAgICAgICB2YWxpZGF0ZTogKGlucHV0LCBvcHRzKSAtPlxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2UgdW5sZXNzIF8uaXNTdHJpbmcgaW5wdXRcclxuICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRvci5pc0VtYWlsIGlucHV0XHJcbiAgICAgICAgdHJhbnNmb3JtOiAoaW5wdXQsIG9wdHMpIC0+XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dC50b0xvd2VyQ2FzZSgpXHJcbiAgICBcclxuICAgICRmaWx0ZXIucmVnaXN0ZXIgWydib29sJywgJ2Jvb2xlYW4nLCBCb29sZWFuXSwgbmV3ICRmaWx0ZXIuSW5wdXRGaWx0ZXJcclxuICAgICAgICB2YWxpZGF0ZTogKGlucHV0LCBvcHRzKSAtPlxyXG4gICAgICAgICAgICByZXR1cm4gdmFsaWRhdG9yLmlzQm9vbGVhbiBpbnB1dFxyXG4gICAgICAgIHRyYW5zZm9ybTogKGlucHV0LCBvcHRzKSAtPlxyXG4gICAgICAgICAgICByZXR1cm4gdmFsaWRhdG9yLnRvQm9vbGVhbiBpbnB1dCwgdHJ1ZVxyXG4gICAgXHJcbiAgICAkZmlsdGVyLnJlZ2lzdGVyICd1dWlkJywgbmV3ICRmaWx0ZXIuSW5wdXRGaWx0ZXJcclxuICAgICAgICB2YWxpZGF0ZTogKGlucHV0LCBvcHRzKSAtPlxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2UgdW5sZXNzIF8uaXNTdHJpbmcgaW5wdXRcclxuICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRvci5pc1VVSUQgaW5wdXRcclxuICAgICAgICAgICAgXHJcbiAgICAkZmlsdGVyLnJlZ2lzdGVyIFsnbW9uZ28nLCAnbW9uZ29JZCddLCBuZXcgJGZpbHRlci5JbnB1dEZpbHRlclxyXG4gICAgICAgIHZhbGlkYXRlOiAoaW5wdXQsIG9wdHMpIC0+XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZSB1bmxlc3MgXy5pc1N0cmluZyBpbnB1dFxyXG4gICAgICAgICAgICByZXR1cm4gdmFsaWRhdG9yLmlzTW9uZ29JZCBpbnB1dFxyXG4iXX0=