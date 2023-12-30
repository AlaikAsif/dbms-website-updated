//Backend Project
//Done by Mridul Mahajan - 2241143
//Task - Create a link betweeen Frontend and Backend and handle the Database's  records
//Languages - Node.js
//Database Stored in - MongoDb

const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const faker = require('faker');

const uriConnection = 'mongodb://localhost:27017';
const client = new MongoClient(uriConnection);

const studentFieldOfStudy = [
  'Biochemistry',
  'Biophysics',
  'Paediatrics',
  'Forensic Medicine',
  'Immunohematology and Blood Transfusion',
  'Nuclear Medicine',
  'Microbiology',
  'Pathology',
  'Pharmacology',
  'Anatomy'
];

const studentQualifications = [
  '10th Pass',
  '12th Pass',
  '1st Year',
  '2nd Year',
  '3rd Year',
  'Graduate',
  'Postgraduate'
];

const doctorFieldOfStudy = [
  'Neuro surgeon',
  'Heart Specialist',
  'Cardiology',
  'Psychiatrics',
  'Physician',
  'Nephrology'
];

async function insertRecords() {
  try {
    await client.connect();
    const database = client.db('DBMS');
    const collection = database.collection('DBMS Project');

    const records = [];
    for (let i = 0; i < 1000; i++) {
      const student = {
        Student_Name: faker.name.findName(),
        Student_Age: faker.datatype.number({ min: 16, max: 25 }),
        Student_Gender: faker.random.arrayElement(['Male', 'Female']),
        Student_Field_of_Study: faker.random.arrayElement(studentFieldOfStudy),
        Student_Email: faker.internet.email(),
        Student_Password: uuidv4(),
        Student_Qualifications: faker.random.arrayElement(studentQualifications),
        Student_Phone_Number: faker.phone.phoneNumber()
      };

      const doctor = {
        Doctor_Name: `Dr. ${faker.name.findName()}`,
        Doctor_FieldOfStudy: faker.random.arrayElement(doctorFieldOfStudy),
        Doctor_Age: faker.datatype.number({ min: 28, max: 60 }),
        Doctor_Gender: faker.random.arrayElement(['Male', 'Female']),
        Doctor_Email: faker.internet.email(),
        Doctor_Password: uuidv4(),
        Doctor_Phone_Number: faker.phone.phoneNumber()
      };

      const patient = {
        Patient_Name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        Patient_Age: faker.datatype.number({ min: 1, max: 100 }),
        Patient_Gender: faker.random.arrayElement(['Male', 'Female']),
        Patient_Case: faker.lorem.words(3),
        Patient_Email: faker.internet.email(),
        Patient_PhoneNumber: faker.phone.phoneNumber()
      };

      records.push({ Student: student, Doctor: doctor, Patient: patient });
    }

    await collection.insertMany(records);
    console.log('Sample records inserted successfully.');
  } finally {
    await client.close();
  }
}

insertRecords().catch(console.error);