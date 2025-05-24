const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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

        // all group details show to client
        app.get('/all-groups', async (req, res) => {
            // const cursor = allGroupsCollection.find();
            // const result = await cursor.toArray();
            const result = await allGroupsCollection.find().toArray();
            res.send(result);
        })

        // get to spacific group details show
        app.get('/all-groups/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await allGroupsCollection.findOne(query);
            res.send(result);
        })

        // user's created groups to get system 
        app.get('/my-groups/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await allGroupsCollection.find(query).toArray(); // একাধিক group পাওয়া যাবে
            res.send(result);
        });

        app.post('/all-groups', async (req, res) => {
            const newGroup = req.body;
            console.log(newGroup);
            const result = await allGroupsCollection.insertOne(newGroup);
            res.send(result);
        });

        // update group info. 
        app.put('/all-groups/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options ={ upsert: true};
            const updatedGr
            const result = await allGroupsCollection.deleteOne(query);
            res.send(result);
        })

        // user's created groups delete
        app.delete('/delete-group/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await allGroupsCollection.deleteOne(query);
            res.send(result);
        });
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