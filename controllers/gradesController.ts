import { Response, Request } from "express";
import Grade from "../models/Grade";
import { db } from "../db/dbConfig";

const gradesRoot = (req: Request, res: Response) => {
    res.send("grades root");
};

const getGrades = (req: Request, res: Response) => {
    const grades: Grade[] = [];
    const sql = `SELECT * FROM grades;`;

    db.each(
        sql,
        [],
        (error: Error, row: Grade) => {
            if (error) {
                res.status(400);
                res.end(error);
            }
            grades.push(row);
        },
        () => {
            res.send(grades);
        }
    );
};

const getGradesBySubject = (req: Request, res: Response) => {
    const grades: Grade[] = [];
    const idSubject = req.query.id;
    const sql = `SELECT * FROM grades WHERE idSubject = ${idSubject};`;

    db.each(
        sql,
        [],
        (error: Error, row: Grade) => {
            if (error) {
                res.status(400);
                res.end(error);
            }
            grades.push(row);
        },
        () => {
            res.send(grades);
        }
    );
};

const getGradesByStudent = (req: Request, res: Response) => {
    const grades: Grade[] = [];
    const idStudent = req.query.id;
    const sql = `SELECT * FROM grades WHERE idStudent = ${idStudent};`;

    db.each(
        sql,
        [],
        (error: Error, row: Grade) => {
            if (error) {
                res.status(400);
                res.end(error);
            }
            grades.push(row);
        },
        () => {
            res.send(grades);
        }
    );
};

const getGrade = (req: Request, res: Response) => {
    const id = req.query.id;
    const sql = `
        SELECT * FROM grades WHERE id=${id};
    `;

    db.get(sql, [], (error: Error, row: Grade) => {
        if (error) {
            res.status(400);
            res.end(error);
        }
        res.status(200);
        if (row) {
            res.send(row);
        } else {
            res.send("Não existe nota com esse id");
        }
    });
};

const addGrade = (req: Request, res: Response) => {
    const grade: Grade = req.body;
    const sql = `
        INSERT INTO grades (idStudent, idSubject, grade)
        VALUES ("${grade.idStudent}", "${grade.idSubject}", "${grade.grade}");
    `;

    db.run(sql, (error: Error) => {
        if (error) {
            res.status(400);
            res.end(error);
        }
        res.status(201);
        res.send("grade added");
    });
};

const updateGrade = (req: Request, res: Response) => {
    const grade: Grade = req.body;
    const sql = `
        UPDATE grades
        SET idStudent = "${grade.idStudent}",
        idSubject = "${grade.idSubject}",
        grade = "${grade.grade}"
        WHERE id = "${grade.id}";
    `;

    db.run(sql, (error: Error) => {
        if (error) {
            res.status(400);
            res.end(error);
        }
        res.status(200);
        res.send("grade updated");
    });
};

const deleteGrade = (req: Request, res: Response) => {
    const id = req.query.id;
    const sql = ` 
        DELETE FROM grades
        WHERE id = ${id};
    `;

    db.run(sql, (error: Error) => {
        if (error) {
            res.status(400);
            res.end(error);
        }
        res.status(200);

        res.send("grade deleted");
    });
};

export {
    gradesRoot,
    getGrades,
    getGradesBySubject,
    getGradesByStudent,
    getGrade,
    addGrade,
    updateGrade,
    deleteGrade,
};
