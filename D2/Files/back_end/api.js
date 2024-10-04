//Pieter Venter u23896257
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

const connString = "mongodb+srv://u23896257:JIOu1lZ7BIOZSQgn@cluster0.x8akr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let isConnected = false;

require("regenerator-runtime/runtime");

const client = new MongoClient(connString);

async function connectToDb() {
    if (!isConnected) {
        await client.connect();
        isConnected = true;
    }
    return client.db('IMY-Project');
}

//                                     GET
app.get("/getUser/:username", async (req,res) => {
    try {
        
        const db = await connectToDb();
        const col = db.collection('users');

        const cursor = col.find({"username": req.params.username},{"_id":0});

        const results = await cursor.toArray();
        
        if (results.length === 0){
            res.status(404).json({error: "User not found"});
        } else {
            res.json(results);    
        }
    } catch (err){
        console.error(err);
        res.status(500).send("Error has occurred when connecting");    
    } 
    
});

app.get("/getPlaylists/latest", async(req,res) => {
    try {
        
        const db = await connectToDb();
        const col = db.collection('playlists');

        const cursor = col.find();

        const results = await cursor.sort({ "lastEdit": -1 }).limit(5).toArray();

        if (results.length === 0) {
            res.status(404).send("No playlists yet");
        } else {
            res.json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error has occurred when connecting");
    }
    
});

app.get("/getSongs/latest", async (req, res) => {
    try {
        
        const db = await connectToDb();
        const col = db.collection('songs');

        const cursor = col.find();

        const results = await cursor.sort({ "dateAdded": -1 }).limit(5).toArray();

        if (results.length === 0) {
            res.status(404).send("No Songs yet");
        } else {
            res.json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error has occurred when connecting");
    }
    
});

app.get("/getPlaylists", async(req,res)=>{
    try {
        
        const db = await connectToDb();
        const col = db.collection('playlists');

        const cursor = col.find();

        const results = await cursor.toArray();

        if (results.length === 0) {
            res.status(404).send("No Playlists yet");
        } else {
            res.json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error has occurred when connecting");
    }
    
});
app.get("/getSongs", async (req, res) => {
    try {
        
        const db = await connectToDb();
        const col = db.collection('songs');

        const cursor = col.find();

        const results = await cursor.toArray();

        if (results.length === 0) {
            res.status(404).send("No Songs yet");
        } else {
            res.json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error has occurred when connecting");
    }
    
});

app.get("/getPlaylists/:username", async (req, res) => {
    try {
        
        const db = await connectToDb();
        const col = db.collection('playlists');

        const cursor = col.find({ "owner": req.params.username });

        const results = await cursor.toArray();

        if (results.length === 0) {
            res.status(404).send("User has no playlists");
        } else {
            res.json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error has occurred when connecting");
    }
    
});

app.get("/getPlaylist/:name", async (req, res) => {
    try {
        
        const db = await connectToDb();
        const col = db.collection('playlists');

        const name = decodeURIComponent(req.params.name);

        const cursor = col.find({ "name": name });

        const results = await cursor.toArray();

        if (results.length === 0) {
            res.status(404).send("no playlists found");
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error has occurred when connecting");
    }
    
});

app.get("/getSongs/:playlistId", async (req, res) => {
    try {
        
        const db = await connectToDb();

        const playlistId = parseInt(req.params.playlistId, 10); // Convert to number

        const playlist =  await db.collection('playlists').find({ "id": playlistId }).toArray();

        let songsIds = [];

        (await playlist).forEach(play => {
            play.songs.forEach(song => {
                songsIds.push(song);
            });
        });

        const cursor = await db.collection('songs').find({ "id": { "$in": songsIds } });

        const results = await cursor.toArray();

        if (results.length === 0) {
            res.status(404).send("No Songs found");
        } else {
            res.send(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error has occurred when connecting");
    }
    
});

app.get("/getPlaylists/songs/:username", async (req, res) => {
    try {
        
        const db = await connectToDb();
        
        const playlists = db.collection('playlists').find({ "owner": req.params.username }).toArray();

        let songsIds = [];

        (await playlists).forEach(playlist=>{
            playlist.songs.forEach(song=>{
                songsIds.push(song);
            });
        });

        const cursor = await db.collection('songs').find({"id": {"$in": songsIds}});

        const results = await cursor.toArray();

        if (results.length === 0) {
            res.status(404).send("No Songs yet");
        } else {
            res.json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error has occurred when connecting");
    }
    
});

app.post('/getFollowing', async (req, res) => {
    try {
        
        const db = await connectToDb();
        const col = db.collection('users');

        const followingIds = req.body.followingIds;

        const cursor = col.find({ "id": {"$in" : followingIds} }, {"password":0});

        const results = await cursor.toArray();

        if (results.length === 0) {
            res.status(404).send("User is not following someone");
        } else {
            res.json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error has occurred when connecting");
    }
    
});

app.get('/getFollowers/:id', async (req, res) => {
    try {
        
        const db = await connectToDb();
        const col = db.collection('users');

        const id = parseInt(req.params.id, 10);

        const cursor = col.find({ "following": {"$all" : [id]}});

        const results = await cursor.toArray();

        if (results.length === 0) {
            res.status(404).send("User has no followers");
        } else {
            res.json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error has occurred when connecting");
    }
    
});

//                          POST
//bookmark
app.post("/editPlaylist/:id", async (req, res) => {
    try {
        
        const db = await connectToDb();
        const col = db.collection('playlists');

        const id = parseInt(req.params.id, 10);

        const today = new Date();
        const dateOnly = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();

        const result = await col.updateOne({"id" : id},{ "$set": {"name": req.body.name, "songs": req.body.songs, "lastEdit": dateOnly }  });

        if (result.modifiedCount === 0) {
            res.status(404).send("Playlist was not found");
        } else {
            res.send("Data was successfully updated");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error has occurred when connecting    Error:" + err);
    }
    
});

app.post("/addSong/:playlistId", async(req,res) => { // requires for song object sent in body to include a id variable, the value doesnt matter
    try {
        
        const db = await connectToDb();

        const id = parseInt(req.params.playlistId, 10);

        const today = new Date();
        const dateOnly = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();

        const song = {
            id: 0,
            name: req.body.name,
            artist: req.body.artist,
            dateAdded: "",
            link: req.body.link,
        };

        const cursor = await db.collection('songs').find().sort({ id: -1 }).limit(1).toArray();

        song.id = await cursor[0].id + 1;
        song.dateAdded = dateOnly;

        const pResult = await db.collection('playlists').updateOne(
            { "id": id },
            {
                "$addToSet": { "songs": song.id },
                "$set": { "lastEdit": dateOnly }
            }
        );
        const result = await db.collection('songs').insertOne(song);

        if (pResult.modifiedCount === 0 || !result.acknowledged) {
            res.status(404).json({msg:"Playlist was not found"});
        } else {
            res.status(200).json({ msg:"Song was successfully added",song: song});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({msg:`Error has occurred when connecting    Error: ${err}`});
    }
    
});
app.post("/addPlaylist/:username", async (req, res) => {
    try {
        
        const db = await connectToDb();

        const username = req.params.username;

        const today = new Date();
        const dateOnly = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();

        const lastId = await db.collection('playlists').find().sort({"id": -1}).limit(1).toArray();

        const newId = await lastId[0].id + 1;

        const uResult = await db.collection('users').updateOne({"username": username},{"$push": {"playlists": newId}});

        const newPlaylist = {
            "id": newId,
            "name": req.body.name,
            "owner": username,
            "songs": [],
            "lastEdit": dateOnly,
            "comments": []
        };

        const result = await db.collection('playlists').insertOne(newPlaylist);

        if (!result.acknowledged || uResult.modifiedCount === 0) {
            res.status(404).json({msg:"Playlist could not be added "});
        } else {
            res.status(200).json({msg:"Playlist was successfully created", playlist: newPlaylist});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({msg:`Error has occurred when connecting    Error: ${err}`});
    }
    
});

app.post("/addComment/:playlistId", async(req,res) => {
    try {
        
        const db = await connectToDb();

        const username = req.body.username;
        const id = parseInt(req.params.playlistId,10);

        const today = new Date();
        const dateOnly = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();

        const result = await db.collection('playlists').updateOne({"id": id},{
            "$push" : {"comments": {"username":username, "contents": req.body.contents}},
            "$set": {"lastEdit": dateOnly}
        });

        if (result.modifiedCount === 0) {
            res.status(404).json({msg:"Comment could not be added "});
        } else {
            res.status(200).json({msg:"Comment was successfully created"});
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error has occurred when connecting    Error:" + err);
    }
    
});

app.post('/registerUser', async (req, res) => {
    try {
        const db = await connectToDb();

        const existingUser = await db.collection('users').findOne({ username: req.body.username });

        if (existingUser) {
            return res.status(400).send("Username already exists"); 
        }

        const lastId = await db.collection('users').find().sort({ "id": -1 }).limit(1).toArray();
        const newId = lastId.length > 0 ? lastId[0].id + 1 : 1;

        const result = await db.collection('users').insertOne({
            "id": newId,
            "username": req.body.username,
            "password": req.body.password,
            "age": req.body.age,
            "biography": req.body.bio,
            "playlists": [],
            "following": [],
            "photo": ""
        });

        if (!result.acknowledged) {
            res.status(404).send("Account could not be created");
        } else {
            res.send("Account was successfully created");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error has occurred when connecting: " + err);
    }
});

app.post('/editUser/:userId', async (req, res) => {
    try {
        
        const db = await connectToDb();

        const id = parseInt(req.params.userId);

        const result = await db.collection('users').updateOne({"id": id},{"$set":{
            "username": req.body.username,
            "password": req.body.password,
            "age": req.body.age,
            "biography": req.body.biography,
            "playlists": req.body.playlists,
            "following": req.body.following,
            "photo": req.body.photo
        }});

        if (result.modifiedCount === 0) {
            res.status(404).json({status:"Account could not be updated "});
        } else {
            res.status(200).json({status: "Account was successfully updated"});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({status:`Error has occurred when connecting    Error: ${err}`});
    }
    
});

app.post('/addFollowing/:userId', async(req,res)=>{
    try {
        
        const db = await connectToDb();

        const userId = parseInt(req.params.userId);

        const result = await db.collection('users').updateOne({"id": userId}, {
            "$push": {
                "following": req.body.id
            }
        });

        if (result.modifiedCount === 0) {
            res.status(404).send("Follower could not be added");
        } else {
            res.send("Follower was successfully added");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error has occurred when connecting    Error:" + err);
    }
    
});

//                                      DELETE
app.post("/deleteSong/:id", async (req,res) =>{ 
    try {
        
        const db = await connectToDb();

        const id = parseInt(req.params.id);
        const songId = parseInt(req.body.songId);

        const result = await db.collection('playlists').updateOne({"id":id},{ "$pull" :{"songs": songId }});

        if (result.modifiedCount === 0) {
            res.status(404).send("Song could not be deleted");
        } else {
            res.send("Song deleted");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error has occurred when connecting    Error:" + err);
    }
    
});

app.delete("/deletePlaylist/:id", async(req,res) =>{
    try {
        
        const db = await connectToDb();

        const id = parseInt(req.params.id);

        const result = await db.collection('playlists').deleteOne({ "id": id });

        if (!result.acknowledged) {
            res.status(404).send("Playlist could not be deleted");
        } else {
            res.send("Playlist is deleted");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error has occurred when connecting    Error:" + err);
    }
    
});

app.delete("/deleteUser", async(req,res) => {
    try {
        
        const db = await connectToDb();

        const userId = req.body.id;

        const result = await db.collection('users').deleteOne({ "id": userId });

        if (!result.acknowledged) {
            res.status(404).json({msg:"User could not be deleted"});
        } else {
            res.status(200).json({msg:"User account was successfully deleted"});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({msg:`Error has occurred when connecting    Error: ${err}`});
    }
    
});
app.post('/deleteComment/:playlistId', async (req, res) => {
    try {
        
        const db = await connectToDb();

        const playId = parseInt(req.params.playlistId);
        const contents = req.body.contents;

        const result = await db.collection('playlists').updateOne({"id":playId},{ "$pull": {"comments":{ "contents": contents }}});

        if (result.modifiedCount === 0) {
            res.status(404).send("Comment could not be deleted");
        } else {
            res.send("Comment was successfully deleted");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error has occurred when connecting    Error:" + err);
    }
    
});

// Possible upload function
app.post('/upload/:userId', async (req, res) => {
    try {
        
        const db = await connectToDb();
        const userId = parseInt(req.params.userId, 10);

        const { base64Image } = req.body;

        if (!base64Image) {
            return res.status(400).send("Base64 image is required");
        }

        const result = await db.collection('users').updateOne(
            { "id": userId },
            { "$set": { "photo": base64Image } }
        );

        if (result.modifiedCount === 0) {
            res.status(404).send("User not found or image not updated");
        } else {
            res.send("Photo updated successfully");
        }

    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating photo");
    } 
});

// Possible get for images {working}
app.get('/image/:id', async (req, res) => {
    try {
        
        const db = await connectToDb();

        const id = parseInt(req.params.id);

        const image = await db.collection('users').find({ "id": id}).toArray();

        const base64Image = image[0].photo; // Adjust the field name as necessary

        const imgType = 'image/jpeg'; // Replace with the correct type if necessary
        res.set('Content-Type', imgType);
        res.send(Buffer.from(base64Image, 'base64'));
    } catch (err) {
        console.error('Error retrieving image:', err);
        res.status(500).send('Error retrieving image');
    } 
});


const PORT = 3005;
app.listen(PORT, () => {
    console.log("Api server up and running");
});

const shutdown = async () => {
    try {
        await client.close();
        console.log("MongoDB connection closed");
        process.exit(0);
    } catch (err) {
        console.error("Error closing MongoDB connection:", err);
        process.exit(1);
    }
};

// Handle SIGINT signal (e.g., Ctrl+C)
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);