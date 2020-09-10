const express = require('express');

const {Pool} = require('pg');
require("dotenv").config();

const devConfig = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
};

const prodConfig = {
    connectionString: process.env.DATABASE_URL //heroku addons
};
const pool = new Pool(
    process.env.NODE_ENV === "production" ? prodConfig : devConfig
);

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