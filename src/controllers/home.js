'use strict';

module.exports = function($scope) {

    class Person {
        constructor(firstname, lastname) {
            this.firstname = firstname;
            this.lastname = lastname;
        }
        fullname() {
            return `${this.firstname} ${this.lastname}`;
        }
    }

    let person = new Person('Avi', 'Haiat');
    $scope.message = `Hello World ${person.fullname()}`;
};
