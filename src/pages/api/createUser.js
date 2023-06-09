import clientPromise from '@/lib/mongodb';
import generateCode from '@/lib/generate_code';

export default async function createUser(req, res) {
  const { username, password, firstName, middleName, lastName, birthDate, weight, height, sex, coach } = req.body;

  const client = await clientPromise;
  // Validate the form data
  // ...


  try {
    await client.connect();
    const database = client.db(process.env.DB);
    const usersCollection = database.collection(process.env.COLLECTION);
    
    // Create a new user object
    const invcode = generateCode(username);
    //console.log(coach);
    const newUser = { username, password, firstName, middleName, lastName, birthDate, weight, height, sex, invcode, coach };

    // Save the user to the database
    const result = await usersCollection.insertOne(newUser);
    if (result.acknowledged == true) {
      res.status(200).json({ message: 'Registration successful!' });
    } else {
      res.status(500).json({ message: 'User creation failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}