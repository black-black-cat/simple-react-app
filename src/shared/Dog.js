class Dog {
    constructor(name) {
        this.name = name;
    }

    bark() {
        return `Wah wah, I am ${this.name}`;
    }

    barkInConsole() {
        console.log(this.bark());
    }
}

export default Dog;
