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

        app.post('/seed-groups', async (req, res) => {
            const demoGroups = [
                {
                    groupName: "Color Masters",
                    hobbyCategory: "Drawing & Painting",
                    description: "A group of art lovers who meet every weekend to paint and share ideas.",
                    meetingLocation: "Art Cafe, Dhanmondi",
                    maxMembers: 20,
                    startDate: "2025-06-15",
                    imageUrl: "https://i.ibb.co/5vJZ5w7/painting.jpg",
                    creatorName: "Afsana Rahman",
                    creatorEmail: "afsana@example.com"
                },
                {
                    groupName: "Shutter Buddies",
                    hobbyCategory: "Photography",
                    description: "Capture the world through our lenses.",
                    meetingLocation: "National Museum, Shahbagh",
                    maxMembers: 15,
                    startDate: "2025-06-20",
                    imageUrl: "https://i.ibb.co/s1g7zjZ/photography.jpg",
                    creatorName: "Rafiul Islam",
                    creatorEmail: "rafiul@example.com"
                },
                {
                    groupName: "GameZone Legends",
                    hobbyCategory: "Video Gaming",
                    description: "Join us for epic multiplayer battles every Friday night!",
                    meetingLocation: "Tech Park, Banani",
                    maxMembers: 30,
                    startDate: "2025-06-10",
                    imageUrl: "https://i.ibb.co/VpbDCyB/gaming.jpg",
                    creatorName: "Samiul Haque",
                    creatorEmail: "samiul@example.com"
                },
                {
                    groupName: "Fishing Friends",
                    hobbyCategory: "Fishing",
                    description: "Peaceful Sundays by the lake with fishing rods and good company.",
                    meetingLocation: "Baliati Lake, Manikganj",
                    maxMembers: 10,
                    startDate: "2025-06-18",
                    imageUrl: "https://i.ibb.co/LJjjWyw/fishing.jpg",
                    creatorName: "Mizanur Rahman",
                    creatorEmail: "mizanur@example.com"
                },
                {
                    groupName: "Dhaka Runners Club",
                    hobbyCategory: "Running",
                    description: "Early morning running sessions across the city.",
                    meetingLocation: "Hatirjheel Track",
                    maxMembers: 25,
                    startDate: "2025-06-05",
                    imageUrl: "https://i.ibb.co/FHnZq7g/running.jpg",
                    creatorName: "Niloy Das",
                    creatorEmail: "niloy@example.com"
                },
                {
                    groupName: "Kitchen Wizards",
                    hobbyCategory: "Cooking",
                    description: "Try new recipes together and host mini cooking challenges.",
                    meetingLocation: "Taste Lab, Gulshan",
                    maxMembers: 12,
                    startDate: "2025-06-22",
                    imageUrl: "https://i.ibb.co/SKQkLHZ/cooking.jpg",
                    creatorName: "Tanisha Kabir",
                    creatorEmail: "tanisha@example.com"
                },
                {
                    groupName: "Book Nest",
                    hobbyCategory: "Reading",
                    description: "A warm space for bookworms to discuss favorite books weekly.",
                    meetingLocation: "Bengal Boi, Dhanmondi",
                    maxMembers: 18,
                    startDate: "2025-06-12",
                    imageUrl: "https://i.ibb.co/BnSzZ6W/reading.jpg",
                    creatorName: "Sohana Ahmed",
                    creatorEmail: "sohana@example.com"
                },
                {
                    groupName: "Writers’ Corner",
                    hobbyCategory: "Writing",
                    description: "For budding poets, authors, and storytellers to connect and grow.",
                    meetingLocation: "The Write Spot, Uttara",
                    maxMembers: 16,
                    startDate: "2025-06-09",
                    imageUrl: "https://i.ibb.co/wSC5LHQ/writing.jpg",
                    creatorName: "Rakib Mahmud",
                    creatorEmail: "rakib@example.com"
                },
                {
                    groupName: "Cycling Crew",
                    hobbyCategory: "Cycling",
                    description: "Weekend cycling tours and fitness rides around Dhaka.",
                    meetingLocation: "Hatirjheel Start Point",
                    maxMembers: 20,
                    startDate: "2025-06-11",
                    imageUrl: "https://i.ibb.co/yW5PzzG/cycling.jpg",
                    creatorName: "Asif Khan",
                    creatorEmail: "asif@example.com"
                },
                {
                    groupName: "Green Thumbs",
                    hobbyCategory: "Gardening",
                    description: "Urban gardeners sharing tips and growing together.",
                    meetingLocation: "Botanical Garden, Mirpur",
                    maxMembers: 10,
                    startDate: "2025-06-17",
                    imageUrl: "https://i.ibb.co/WcYmcDx/gardening.jpg",
                    creatorName: "Farzana Yasmin",
                    creatorEmail: "farzana@example.com"
                },
                {
                    groupName: "Anime World",
                    hobbyCategory: "Anime Watching",
                    description: "Explore the world of anime, one episode at a time.",
                    meetingLocation: "Cafe Tokyo, Mohammadpur",
                    maxMembers: 25,
                    startDate: "2025-06-13",
                    imageUrl: "https://i.ibb.co/YRj8GV8/anime.jpg",
                    creatorName: "Nafis Imtiaz",
                    creatorEmail: "nafis@example.com"
                },
                {
                    groupName: "Chess Masters",
                    hobbyCategory: "Board Games",
                    description: "Strategy, skills, and checkmates every Friday.",
                    meetingLocation: "Mind Games Lounge, Baily Road",
                    maxMembers: 12,
                    startDate: "2025-06-14",
                    imageUrl: "https://i.ibb.co/fpx1rc7/chess.jpg",
                    creatorName: "Hasib Hasan",
                    creatorEmail: "hasib@example.com"
                }
            ];

            const result = await allGroupsCollection.insertMany(demoGroups);
            res.send({ insertedCount: result.insertedCount });
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