const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ev6secp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const allGroupsCollection = client.db('allGroupsDB').collection('allGroups');

        app.get('/all-groups', async (req, res) => {
            // const cursor = allGroupsCollection.find();
            // const result = await cursor.toArray();
            const result = await allGroupsCollection.find().toArray();
            res.send(result);
        })

        app.post('/all-groups', async (req, res) => {
            const newGroup = req.body;
            console.log(newGroup);
            const result = await allGroupsCollection.insertOne(newGroup);
            res.send(result);
        })

        // insert many 
        app.post('/all-groups', async (req, res) => {
            const result = await allGroupsCollection.insertMany([
                {
                    "groupName": "Writers’ Corner",
                    "hobbyCategory": "Writing",
                    "description": "For budding poets, authors, and storytellers to connect and grow.",
                    "meetingLocation": "The Write Spot, Uttara",
                    "maxMembers": 16,
                    "startDate": "2025-06-09",
                    "imageUrl": "https://i.ibb.co/wSC5LHQ/writing.jpg",
                    "creatorName": "Rakib Mahmud",
                    "creatorEmail": "rakib@example.com"
                },
                {
                    "groupName": "Cycling Crew",
                    "hobbyCategory": "Cycling",
                    "description": "Weekend cycling tours and fitness rides around Dhaka.",
                    "meetingLocation": "Hatirjheel Start Point",
                    "maxMembers": 20,
                    "startDate": "2025-06-11",
                    "imageUrl": "https://i.ibb.co/yW5PzzG/cycling.jpg",
                    "creatorName": "Asif Khan",
                    "creatorEmail": "asif@example.com"
                }
            ]);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send(
        'Hello Worldxdfkjasjfdh!'
    )
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})