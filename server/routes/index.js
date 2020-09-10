const express = require('express');
const router = express.Router();

const db = require('../lib/queries');

/* GET home page. */
router.get('/', async function (request, response) {
    await response.json({msg: 'School project'});
});

router.get('/students', async (request, response) => {
   try {
       let dbRows = await db.getAllStudents();
       await response.json(dbRows);
   } catch (e) {
       console.error(e);
       await response.status(500).json({
           error: e
       });
   }
});

router.get('/students/:studentId', async function (request, response) {
    try {
        let dbRow = await db.getStudentById(request.params.studentId);
        if(!dbRow) {
            await response.json({msg:'Δεν υπάρχει μαθητής με κωδικό ' + request.params.studentId});
        }
        await response.json(dbRow);
    } catch (e) {
        console.error(e);
        await response.status(500).json({
            error: e
        });
    }
});

router.delete('/students/:studentId', async function (request, response) {
    try {
        let dbRowId = await db.deleteStudent(request.params.studentId);
        console.log('id ' + dbRowId);
        await response.json(dbRowId);
    } catch (e) {
        console.error(e);
        await response.status(500).json({
            error: e
        });
    }
});

router.put('/students', async function (request, response) {
    try {
        let dbRow = await db.createStudent(request);
        await response.json({
            rows: dbRow
        });
    } catch (e) {
        console.error(e);
        await response.status(500).json({
            error: e
        });
    }
});

router.post('/students/:id', async function (request, response) {
    try {
        let dbRow = await db.updateStudent(request);
        await response.json({
            rows: dbRow
        });
    } catch (e) {
        console.error(e);
        await response.status(500).json({
            error: e
        });
    }
});


module.exports = router;
