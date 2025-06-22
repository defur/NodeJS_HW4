const {
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
  } = require('./hw4.js');
  
  // Task 1: person
  console.log("--- Task 1 ---");
  console.log("Person First Name:", person.firstName);
  person.updateInfo({ firstName: "Jane", age: 40 });
  console.log("Person after update attempt:", person);
  
  console.log("Address exists:", 'address' in person);
  console.log("Address enumerable:", person.propertyIsEnumerable('address'));
  
  
  // Task 2: product, getTotalPrice, deleteNonConfigurable
  console.log("\n--- Task 2 ---");
  console.log("Total Price:", getTotalPrice(product));
  
  try {
    deleteNonConfigurable(product, 'price');
    console.log("Deleted 'price' successfully.");
  } catch (e) {
    console.error(e.message);
  }
  
  
  // Task 3: bankAccount
  console.log("\n--- Task 3 ---");
  const acc1 = createBankAccount(1000);
  const acc2 = createBankAccount(500);
  console.log("Before Transfer:", acc1.formattedBalance, acc2.formattedBalance);
  acc1.transfer(acc2, 300);
  console.log("After Transfer:", acc1.formattedBalance, acc2.formattedBalance);
  
  
  // Task 4: Immutable Object
  console.log("\n--- Task 4 ---");
  console.log("Frozen person:", frozenPerson);
  try {
    frozenPerson.firstName = "NewName";
  } catch (e) {
    console.error("Cannot modify frozen person");
  }
  
  
  // Task 5: observeObject
  console.log("\n--- Task 5 ---");
  console.log(watchedPerson.firstName);
  watchedPerson.address = "New Address";
  
  
  // Task 6: deepCloneObject
  console.log("\n--- Task 6 ---");
  const clonedPerson = deepCloneObject(person);
  console.log("Cloned Person:", clonedPerson);
  
  
  // Task 7: validateObject
  console.log("\n--- Task 7 ---");
  const valid = validateObject({ firstName: "Alice", age: 25 }, personSchema);
  const invalid = validateObject({ firstName: "Bob" }, personSchema);
  console.log("Valid:", valid);
  console.log("Invalid:", invalid);
  