// Design database for Zen class programme

// ----------- 1. users -----------

db.users.insertMany([
    {
        user_id: 1,
        name: "user1",
        email: "demouser1@gmail.com",
        mentor_id: 1,
    },
    {
        user_id: 2,
        name: "user2",
        email: "demouser2@gmail.com",
        mentor_id: 1,
    },
    {
        user_id: 3,
        name: "user3",
        email: "demouser3@gmail.com",
        mentor_id: 1,
    },
    {
        user_id: 4,
        name: "user4",
        email: "demouser4@gmail.com",
        mentor_id: 2,
    },
    {
        user_id: 5,
        name: "user5",
        email: "demouser5@gmail.com",
        mentor_id: 2,
    },
]);

// ----------- 2. codekata -----------

db.codekata.insertMany([
    {
        user_id: 1,
        no_of_problems_solved: 15,
    },
    {
        user_id: 2,
        no_of_problems_solved: 25,
    },
    {
        user_id: 3,
        no_of_problems_solved: 35,
    },
    {
        user_id: 4,
        no_of_problems_solved: 45,
    },
    {
        user_id: 5,
        no_of_problems_solved: 55,
    },
]);

// ----------- 3. attendance -----------

db.attendance.insertMany([
    {
        user_id: 1,
        topic_id: 1,
        present: true,
    },
    {
        user_id: 2,
        topic_id: 2,
        present: true,
    },
    {
        user_id: 3,
        topic_id: 3,
        present: false,
    },
    {
        user_id: 4,
        topic_id: 4,
        present: false,
    },
    {
        user_id: 5,
        topic_id: 5,
        present: false,
    },
]);

// ----------- 4. topics -----------

db.topics.insertMany([
    {
        topic_id: 1,
        topic: "HTML",
        topic_date: new Date("7-oct-2020"),
    },
    {
        topic_id: 2,
        topic: "CSS",
        topic_date: new Date("12-oct-2020"),
    },
    {
        topic_id: 3,
        topic: "Javascript",
        topic_date: new Date("15-oct-2020"),
    },
    {
        topic_id: 4,
        topic: "React",
        topic_date: new Date("22-oct-2020"),
    },
    {
        topic_id: 5,
        topic: "NodeJs",
        topic_date: new Date("28-oct-2020"),
    },
]);

// ----------- 5. tasks -----------

db.tasks.insertMany([
    {
        task_id: 1,
        topic_id: 1,
        user_id: 1,
        task: "HTML task",
        due_date: new Date("9-oct-2020"),
        submitted: true,
    },
    {
        task_id: 2,
        topic_id: 2,
        user_id: 2,
        task: "CSS task",
        due_date: new Date("14-oct-2020"),
        submitted: true,
    },
    {
        task_id: 3,
        topic_id: 3,
        user_id: 3,
        task: "Javascript task",
        due_date: new Date("18-oct-2020"),
        submitted: false,
    },
    {
        task_id: 4,
        topic_id: 4,
        user_id: 4,
        task: "React task",
        due_date: new Date("25-oct-2020"),
        submitted: false,
    },
    {
        task_id: 5,
        topic_id: 5,
        user_id: 5,
        task: "Node task",
        due_date: new Date("30-oct-2020"),
        submitted: false,
    },
]);

// ----------- 6. company_drives -----------

db.company_drives.insertMany([
    {
        user_id: 1,
        drive_date: new Date("2-oct-2020"),
        company_name: "Apple",
    },
    {
        user_id: 1,
        drive_date: new Date("8-oct-2020"),
        company_name: "Amazon",
    },
    {
        user_id: 2,
        drive_date: new Date("17-oct-2020"),
        company_name: "Google",
    },
    {
        user_id: 3,
        drive_date: new Date("23-oct-2020"),
        company_name: "Zoho",
    },
    {
        user_id: 4,
        drive_date: new Date("30-oct-2020"),
        company_name: "Flipkart",
    },
]);


// ----------- 7. mentors -----------

db.mentors.insertMany([
    {
        mentor_id: 1,
        mentor_name: "mentor1",
        mentor_email: "mentor1@gmail.com",
    },
    {
        mentor_id: 2,
        mentor_name: "mentor2",
        mentor_email: "mentor2@gmail.com",
    },
    {
        mentor_id: 3,
        mentor_name: "mentor3",
        mentor_email: "mentor3@gmail.com",
    },
    {
        mentor_id: 4,
        mentor_name: "mentor4",
        mentor_email: "mentor4@gmail.com",
    },
    {
        mentor_id: 5,
        mentor_name: "mentor5",
        mentor_email: "mentor5@gmail.com",
    },
]);

// ----------------------------------------------- Query Statements -----------------------------------------------

// Q.1 -- Find all the topics and tasks which are thought in the month of October
db.topics.aggregate([
    {
        $lookup: {
            from: "tasks",
            localField: "topic_id",
            foreignField: "topic_id",
            as: "task_info",
        },
    },
    {
        $match: {
            $and: [
                {
                    $and: [
                        { topic_date: { $gte: new Date("1-oct-2020") } },
                        { topic_date: { $lt: new Date("1-nov-2020") } },
                    ],
                },

                {
                    $and: [
                        { "task_info.due_date": { $gte: new Date("1-oct-2020") } },
                        { "task_info.due_date": { $lt: new Date("1-nov-2020") } },
                    ],
                },
            ],
        },
    },
]);

// Q.2 -- Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.comapny_drives.find({
    $and: [
        { drive_date: { $gte: new Date("15-oct-2020") } },
        { drive_date: { $lte: new Date("31-oct-2020") } },
    ],
});

// Q.3 -- Find all the company drives and students who are appeared for the placement.
db.company_drives.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "user_id",
            as: "user_info",
        },
    },
    {
        $project: {
            _id: 0,
            "user_info.userid": 1,
            "user_info.name": 1,
            "user_info.email": 1,
            company: 1,
            drive_date: 1,
        },
    },
]);

// Q.4 -- Find the number of problems solved by the user in codekata
db.codekata.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "user_id",
            as: "user_info",
        },
    },
    {
        $project: {
            _id: 0,
            user_id: 1,
            "user_info.name": 1,
            no_of_problems_solved: 1,
        },
    },
]);

// Q.5 -- Find all the mentors with who has the mentee's count more than 15
db.users.aggregate([
    {
        $lookup: {
            from: "mentors",
            localField: "mentor_id",
            foreignField: "mentor_id",
            as: "mentor_info",
        },
    },
    {
        $group: {
            _id: {
                mentorid: "$mentor_info.mentor_id",
                mentorname: "$mentor_info.mentor_name",
            },
            mentee_count: { $sum: 1 },
        },
    },
    { $match: { mentee_count: { $gt: 15 } } },
]);
// Q.6 -- Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020
db.attendance.aggregate([
    {
        $lookup: {
            from: "topics",
            localField: "topic_id",
            foreignField: "topic_id",
            as: "topics",
        },
    },
    {
        $lookup: {
            from: "tasks",
            localField: "topic_id",
            foreignField: "topic_id",
            as: "tasks",
        },
    },
    { $match: { $and: [{ present: false }, { "tasks.submitted": false }] } },
    {
        $match: {
            $and: [
                {
                    $and: [
                        { "topics.topic_date": { $gte: new Date("15-oct-2020") } },
                        { "topics.topic_date": { $lte: new Date("31-oct-2020") } },
                    ],
                },
                {
                    $and: [
                        { "tasks.due_date": { $gte: new Date("15-oct-2020") } },
                        { "tasks.due_date": { $lte: new Date("31-oct-2020") } },
                    ],
                },
            ],
        },
    },
    {
        $count: "no_of_students_absent_and_task_not_submitted",
    },
]);