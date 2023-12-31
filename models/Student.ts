import Person from "./Person";

class Student extends Person {
    year: number;
    shift: string;
    room: string;

    constructor(
        id: number,
        name: string,
        cpf: string,
        birthday: string,
        year: number,
        shift: string,
        room: string
    ) {
        super(id, name, cpf, birthday);
        this.year = year;
        this.shift = shift;
        this.room = room;
    }
}

export default Student;
