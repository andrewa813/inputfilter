// Generated by CoffeeScript 1.10.0
(function() {
  var ObjectFilter, _, runImpl, validator;

  _ = require('lodash');

  validator = require('validator');

  ObjectFilter = (function() {
    function ObjectFilter(opts) {
      _.assignInWith(this, opts);
    }

    ObjectFilter.prototype.array = function() {
      this.is_array = true;
      this.is_array_bound = false;
      switch (arguments.length) {
        case 1:
          this.is_array_bound = true;
          this.get_array_max = arguments[0];
          this.get_array_min = this.get_array_max;
          break;
        case 2:
          this.is_array_bound = true;
          this.get_array_min = arguments[0], this.get_array_max = arguments[1];
      }
      return this;
    };

    ObjectFilter.prototype.optional = function() {
      this.is_optional = true;
      return this;
    };

    ObjectFilter.prototype.validate = function(input) {
      return true;
    };

    ObjectFilter.prototype.transform = function(input) {
      return input;
    };

    ObjectFilter.prototype["default"] = function() {
      return void 0;
    };

    ObjectFilter.prototype.set = function(option, value) {
      return this[option] = value;
    };

    return ObjectFilter;

  })();

  ObjectFilter.mongoId = function() {
    return new ObjectFilter({
      name: 'mongoId',
      validate: function(input) {
        if (!_.isString(input)) {
          return false;
        }
        return validator.isMongoId(input);
      }
    });
  };

  ObjectFilter.number = function() {
    return new ObjectFilter({
      name: 'number',
      validate: function(input) {
        return validator.isInt(input);
      },
      transform: function(input) {
        return validator.toInt(input);
      }
    });
  };

  ObjectFilter.email = function() {
    return new ObjectFilter({
      name: 'email',
      validate: function(input) {
        if (!_.isString(input)) {
          return false;
        }
        return validator.isEmail(input);
      }
    });
  };

  ObjectFilter["enum"] = function(list) {
    return new ObjectFilter({
      name: 'enum',
      validate: function(input) {
        return list.indexOf(input) >= 0;
      }
    });
  };

  ObjectFilter.string = function() {
    return new ObjectFilter({
      name: 'string',
      validate: function(input) {
        return _.isString(input);
      }
    });
  };

  ObjectFilter.boolean = function() {
    return new ObjectFilter({
      name: 'boolean',
      validate: function(input) {
        return validator.isBoolean(input);
      },
      transform: function(input) {
        return validator.toBoolean(input, true);
      }
    });
  };

  ObjectFilter.uuid = function() {
    return new ObjectFilter({
      name: 'uuid',
      validate: function(input) {
        if (!_.isString(input)) {
          return false;
        }
        return validator.isUUID(input);
      }
    });
  };

  runImpl = function(filter, input, data, keyPath, opts) {
    var defaultValue, filterValue, i, index, inputValue, inputValueElement, key, len, newKeyPath, newValue, ref, valid;
    for (key in filter) {
      filterValue = filter[key];
      inputValue = input[key];
      newKeyPath = keyPath ? keyPath + "." : '';
      newKeyPath = "" + newKeyPath + key;
      if (_.isPlainObject(filterValue)) {
        if (_.isPlainObject(inputValue)) {
          data[key] = {};
          runImpl(filterValue, inputValue, data[key], newKeyPath, opts);
        } else {
          return {
            success: false,
            path: newKeyPath,
            reason: 'object'
          };
        }
      } else if (filterValue instanceof ObjectFilter) {
        if (!inputValue) {
          if (filterValue.optional) {
            defaultValue = filterValue["default"]();
            if (defaultValue) {
              data[key] = defaultValue;
            }
          } else {
            return {
              success: false,
              path: newKeyPath,
              reason: 'required'
            };
          }
        }
        if (filterValue.is_array) {
          if (!_.isArray(inputValue)) {
            return {
              success: false,
              path: newKeyPath,
              reason: 'array'
            };
          }
          if (filterValue.is_array_bound) {
            if (!((filterValue.get_array_min <= (ref = inputValue.length) && ref <= filterValue.get_array_max))) {
              return {
                success: false,
                path: newKeyPath,
                reason: 'array-length'
              };
            }
          }
          data[key] = [];
          for (index = i = 0, len = inputValue.length; i < len; index = ++i) {
            inputValueElement = inputValue[index];
            valid = filterValue.validate(inputValueElement);
            if (!valid) {
              return {
                success: false,
                path: newKeyPath,
                reason: 'invalid',
                index: index
              };
            }
            newValue = filterValue.transform(inputValueElement);
            data[key][index] = newValue;
          }
        } else {
          valid = filterValue.validate(inputValue);
          if (!valid) {
            return {
              success: false,
              path: newKeyPath,
              reason: 'invalid'
            };
          }
          newValue = filterValue.transform(inputValue);
          data[key] = newValue;
        }
      }
    }
    return {
      success: true,
      data: data
    };
  };

  ObjectFilter.run = function(filter, input, opts) {
    if (!_.isPlainObject(filter)) {
      return {
        success: false
      };
    }
    if (!_.isPlainObject(input)) {
      return {
        success: false
      };
    }
    return runImpl(filter, input, {}, '', opts);
  };

  module.exports = ObjectFilter;

}).call(this);

//# sourceMappingURL=index.js.map