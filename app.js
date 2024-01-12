//Backend Project
//Done by Mridul Mahajan - 2241143
//Task - Create a link betweeen Frontend and Backend and handle the Database's  records
//Languages - Node.js
//Database Stored in - MongoDb

//Changes - Separate Collections for all the end users
const { MongoClient, ObjectId } = require('mongodb');
const faker = require('faker');

const uriConnection = 'mongodb://localhost:27017';
const client = new MongoClient(uriConnection);

async function insertStudents(collection) {
  const students = [];
  for (let i = 0; i < 1000; i++) {
    students.push({
      _id: new ObjectId(), // Using ObjectId as a unique identifier
      name: faker.name.findName(),
      age: faker.datatype.number({ min: 16, max: 25 }),
      gender: faker.random.arrayElement(['Male', 'Female']),
      field_of_study: faker.random.arrayElement([
        'Biochemistry',
        'Biophysics',
        'Paediatrics',
        'Forensic Medicine',
        'Immunohematology and Blood Transfusion',
        'Nuclear Medicine',
        'Microbiology',
        'Pathology',
        'Pharmacology',
        'Anatomy',
      ]),
      qualifications: faker.random.arrayElement([
        '10th Pass',
        '12th Pass',
        '1st Year',
        '2nd Year',
        '3rd Year',
        'Graduate',
        'Postgraduate',
      ]),
    });
  }
  await collection.insertMany(students);
}

async function insertDoctors(collection) {
  const doctors = [];
  for (let i = 0; i < 1000; i++) {
    doctors.push({
      _id: new ObjectId(),
      name: `Dr. ${faker.name.findName()}`,
      field_of_study: faker.random.arrayElement([
        'Neurosurgeon',
        'Heart Specialist',
        'Cardiology',
        'Psychiatry',
        'Physician',
        'Nephrology',
      ]),
      age: faker.datatype.number({ min: 28, max: 60 }),
      gender: faker.random.arrayElement(['Male', 'Female']),
    });
  }
  await collection.insertMany(doctors);
}

async function insertPatients(collection) {
  const patients = [];
  for (let i = 0; i < 1000; i++) {
    patients.push({
      _id: new ObjectId(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      age: faker.datatype.number({ min: 1, max: 100 }),
      gender: faker.random.arrayElement(['Male', 'Female']),
      case_description: faker.lorem.words(3),
    });
  }
  await collection.insertMany(patients);
}

async function insertRecords() {
  try {
    await client.connect();
    const database = client.db('HospitalManagementSystem');
    const studentsCollection = database.collection('Students');
    const doctorsCollection = database.collection('Doctors');
    const patientsCollection = database.collection('Patients');

    await Promise.all([
      insertStudents(studentsCollection),
      insertDoctors(doctorsCollection),
      insertPatients(patientsCollection),
    ]);

    console.log('Records inserted successfully.');
  } finally {
    await client.close();
  }
}

insertRecords().catch(console.error);
