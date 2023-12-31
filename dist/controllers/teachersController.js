"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeacher = exports.updateTeacher = exports.addTeacher = exports.getSalaryAverage = exports.getTeacher = exports.getTeachersOrderedByBirthday = exports.getTeachers = exports.teachersRoot = void 0;
const dbConfig_1 = require("../db/dbConfig");
const teachersRoot = (req, res) => {
    res.send("teachers root");
};
exports.teachersRoot = teachersRoot;
const getTeachers = (req, res) => {
    const teachers = [];
    const sql = `SELECT * FROM teachers;`;
    dbConfig_1.db.each(sql, [], (error, row) => {
        if (error) {
            res.status(400);
            res.end(error);
        }
        teachers.push(row);
    }, () => {
        res.send(teachers);
    });
};
exports.getTeachers = getTeachers;
const getTeachersOrderedByBirthday = (req, res) => {
    const teachers = [];
    const sql = `SELECT * FROM teachers ORDER BY birthday;`;
    dbConfig_1.db.each(sql, [], (error, row) => {
        if (error) {
            res.status(400);
            res.end(error);
        }
        teachers.push(row);
    }, () => {
        res.send(teachers);
    });
};
exports.getTeachersOrderedByBirthday = getTeachersOrderedByBirthday;
const getTeacher = (req, res) => {
    const id = req.query.id;
    const sql = `
        SELECT * FROM teachers WHERE id=${id};
    `;
    dbConfig_1.db.get(sql, [], (error, row) => {
        if (error) {
            res.status(400);
            res.end(error);
        }
        res.status(200);
        if (row) {
            res.send(row);
        }
        else {
            res.send("Não existe professor para esse id");
        }
    });
};
exports.getTeacher = getTeacher;
const getSalaryAverage = (req, res) => {
    const sql = `
        SELECT salary FROM teachers ;
    `;
    dbConfig_1.db.all(sql, [], (error, rows) => {
        if (error) {
            res.status(400);
            res.end(error);
        }
        res.status(200);
        const avgSalary = rows.reduce((sum, row) => {
            return sum + row.salary;
        }, 0) / rows.length;
        if (avgSalary) {
            res.send(avgSalary.toString());
        }
        else {
            res.send("Sem professores cadastrados");
        }
    });
};
exports.getSalaryAverage = getSalaryAverage;
const addTeacher = (req, res) => {
    const teacher = req.body;
    const sql = `
        INSERT INTO teachers (name, cpf, birthday, salary)
        VALUES ("${teacher.name.toUpperCase()}", "${teacher.cpf}", 
        "${teacher.birthday}", "${teacher.salary}");
    `;
    dbConfig_1.db.run(sql, (error) => {
        if (error) {
            res.status(400);
            res.end(error);
        }
        res.status(201);
        res.send("teachers added");
    });
};
exports.addTeacher = addTeacher;
const updateTeacher = (req, res) => {
    const teacher = req.body;
    const sql = `
        UPDATE teachers
        SET name = "${teacher.name.toUpperCase()}",
        cpf = "${teacher.cpf}",
        birthday = "${teacher.birthday}",
        salary = "${teacher.salary}"
        WHERE id = ${teacher.id};
    `;
    dbConfig_1.db.run(sql, (error) => {
        if (error) {
            res.status(400);
            res.end(error);
        }
        res.status(200);
        res.send("teacher updated");
    });
};
exports.updateTeacher = updateTeacher;
const deleteTeacher = (req, res) => {
    const id = req.query.id;
    const sql = ` 
        DELETE FROM teachers
        WHERE id = ${id};
    `;
    dbConfig_1.db.run(sql, (error) => {
        if (error) {
            res.status(400);
            res.end(error);
        }
        res.status(200);
        res.send("teacher deleted");
    });
};
exports.deleteTeacher = deleteTeacher;
