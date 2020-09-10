const express = require('express');

const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'school',
    password: 'maria',
    port: 5433,
});


exports.getAllStudents = async function getAllStudents() {
    let client = await pool.connect();
    try {
        let dbRows = await client.query('SELECT * FROM student order by first_name || last_name');
        client.release();
        return dbRows.rows;
    } catch (e) {
        client.release();
        console.error('Error executing query: ' + e);
        return null;
    }
};

exports.getStudentById = async function getStudentById(studentId) {
    let client = await pool.connect();
    try {
        let dbRow = await client.query('SELECT * FROM student where id = $1 order by first_name || last_name', [studentId]);
        client.release();
        return dbRow.rows[0];
    } catch (e) {
        client.release();
        console.error('Error executing query: ' + e);
        return null;
    }
};

exports.deleteStudent = async function deleteStudent(studentId) {
    let client = await pool.connect();
    try {
        let dbRow = await client.query('delete FROM student where id = $1', [studentId]);
        client.release();
        return studentId;
    } catch (e) {
        client.release();
        console.error('Error executing query: ' + e);
        return null;
    }
};

exports.createStudent = async function insertStudent(request) {
    let client = await pool.connect();
    try {
        let dbRow = await client.query(`
            INSERT INTO student (id, first_name, last_name) VALUES (nextval('students_id_seq'), $1, $2) returning *
        `,[request.body.first_name,request.body.last_name]);
        client.release();
        return dbRow.rows[0];
    } catch (e) {
        client.release();
        console.error('Error executing query: ' + e);
        return null;
    }
};

exports.updateStudent = async function updateStudent(request) {
    let client = await pool.connect();
    try {
        let dbRow = await client.query(`
            UPDATE student SET first_name = $1, last_name = $2 WHERE id = $3 returning *
        `,[request.body.first_name,request.body.last_name, request.params.id]);
        client.release();
        return dbRow.rows[0];
    } catch (e) {
        client.release();
        console.error('Error executing query: ' + e);
        return null;
    }
};