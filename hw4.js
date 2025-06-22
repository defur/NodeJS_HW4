// ===================
// Task 1: Person Object
// ===================

const person = {};

Object.defineProperty(person, 'firstName', {
  value: "John",
  writable: false
});
Object.defineProperty(person, 'lastName', {
  value: "Doe",
  writable: false
});
Object.defineProperty(person, 'age', {
  value: 30,
  writable: false
});
Object.defineProperty(person, 'email', {
  value: "john.doe@example.com",
  writable: false
});

person.updateInfo = function (newInfo) {
  for (let key in newInfo) {
    if (this.hasOwnProperty(key)) {
      console.log(`Cannot update '${key}', it is read-only.`);
    }
  }
};

Object.defineProperty(person, 'address', {
  value: {},
  enumerable: false,
  configurable: false,
  writable: true
});


// ===================
// Task 2: Product Object
// ===================

const product = {
  name: "Laptop"
};

Object.defineProperty(product, 'price', {
  value: 1000,
  enumerable: false,
  writable: false
});
Object.defineProperty(product, 'quantity', {
  value: 5,
  enumerable: false,
  writable: false
});

function getTotalPrice(product) {
  const price = Object.getOwnPropertyDescriptor(product, 'price').value;
  const quantity = Object.getOwnPropertyDescriptor(product, 'quantity').value;
  return price * quantity;
}

function deleteNonConfigurable(obj, prop) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
  if (descriptor && !descriptor.configurable) {
    throw new Error(`Cannot delete ${prop}, it is non-configurable.`);
  } else {
    delete obj[prop];
  }
}


// ===================
// Task 3: Bank Account
// ===================

function createBankAccount(startBalance = 1000) {
  let _balance = startBalance;

  return {
    get balance() {
      return _balance;
    },
    set balance(value) {
      if (typeof value === 'number' && value >= 0) {
        _balance = value;
      }
    },
    get formattedBalance() {
      return "$" + _balance;
    },
    transfer(target, amount) {
      if (amount > 0 && this.balance >= amount) {
        this.balance -= amount;
        target.balance += amount;
      }
    }
  };
}


// ===================
// Task 4: Immutable Object
// ===================

function createImmutableObject(obj) {
  const clone = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      clone[key] = createImmutableObject(obj[key]);
    } else {
      clone[key] = obj[key];
    }
    Object.defineProperty(clone, key, {
      value: clone[key],
      writable: false,
      configurable: false,
      enumerable: true
    });
  }

  return clone;
}

const frozenPerson = createImmutableObject(person);


// ===================
// Task 5: Observe Object
// ===================

function observeObject(obj, callback) {
  return new Proxy(obj, {
    get(target, prop) {
      callback(prop, 'get');
      return target[prop];
    },
    set(target, prop, value) {
      callback(prop, 'set');
      target[prop] = value;
      return true;
    }
  });
}

const watchedPerson = observeObject(person, (prop, action) => {
  console.log(`Property '${prop}' was ${action}`);
});


// ===================
// Task 6: Deep Clone
// ===================

function deepCloneObject(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (seen.has(obj)) return seen.get(obj);

  const clone = Array.isArray(obj) ? [] : {};
  seen.set(obj, clone);

  for (let key in obj) {
    clone[key] = deepCloneObject(obj[key], seen);
  }

  return clone;
}


// ===================
// Task 7: Validation
// ===================

function validateObject(obj, schema) {
  for (let key in schema) {
    const rules = schema[key];
    const value = obj[key];

    if (rules.required && value === undefined) return false;
    if (rules.type && typeof value !== rules.type) return false;
    if (rules.min && value < rules.min) return false;
    if (rules.max && value > rules.max) return false;
  }
  return true;
}

const personSchema = {
  firstName: { required: true, type: 'string' },
  age: { required: true, type: 'number', min: 18 }
};

module.exports = {
    person,
    product,
    getTotalPrice,
    deleteNonConfigurable,
    createBankAccount,
    frozenPerson,
    watchedPerson,
    deepCloneObject,
    validateObject,
    personSchema
  };
  