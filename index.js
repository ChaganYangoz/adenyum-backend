const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/list/:dbName", async (req, res) => {
  const { dbName } = req.params; // URL parametresinden dbName'i al
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://caganyangoz:159753@cluster0.4sczhfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db("adenyum");
    const sorumluCollection = db.collection(dbName);
    const sorumlular = await sorumluCollection.find({}).toArray();
    client.close();
    res.json(sorumlular); // Bu departmanları JSON olarak front-end'e gönderir
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/add/:dbName", async (req, res) => {
  const { dbName } = req.params; // URL parametresinden dbName'i al
  const { value } = req.body;
  const client = await MongoClient.connect(
    "mongodb+srv://caganyangoz:159753@cluster0.4sczhfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db("adenyum");
  const collection = db.collection(dbName);

  try {
    await collection.insertOne({ ad: value });
    res.status(201).send("Data saved successfully");
  } catch (error) {
    res.status(500).send("Failed to save data");
  }
});

app.post("/addSorumlu", async (req, res) => {
  const yeniKullanici = req.body;
  const client = await MongoClient.connect(
    "mongodb+srv://caganyangoz:159753@cluster0.4sczhfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db("adenyum");
  const collection = db.collection("sorumlu");
  try {
    const result = await collection.insertOne(yeniKullanici);
    res.status(201).send(result);
  } catch (error) {
    console.error("Veri ekleme hatası:", error);
    res.status(500).send("Veri ekleme sırasında bir hata oluştu.");
  }
});

app.post("/addstratejik", async (req, res) => {
  const strathedef = req.body;
  const client = await MongoClient.connect(
    "mongodb+srv://caganyangoz:159753@cluster0.4sczhfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db("adenyum");
  const collection = db.collection("stratejikhedef");

  try {
    await collection.insertOne(strathedef);
    res.status(201).send("Data saved successfully");
  } catch (error) {
    res.status(500).send("Failed to save data");
  }
});

app.post("/update/:dbName", async (req, res) => {
  const { dbName } = req.params; // URL parametresinden dbName'i al
  const { id, value } = req.body;

  const uri =
    "mongodb+srv://caganyangoz:159753@cluster0.4sczhfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const client = new MongoClient(uri);

  try {
    await client.connect(); // MongoDB'ye bağlan

    const db = client.db("adenyum");
    const collection = db.collection(dbName);

    const filter = { _id: new ObjectId(id) }; // Güncellenecek belirli veriye göre filtrele

    const updateDoc = {
      $set: {
        ad: value, // Yeni adı güncelle
      },
    };

    const result = await collection.updateOne(filter, updateDoc); // Veriyi güncelle

    console.log(`${result.matchedCount} belge güncellendi`);
    res
      .status(200)
      .json({ message: `${result.matchedCount} belge güncellendi` });
  } catch (error) {
    console.error("Veri güncelleme hatası:", error);
    res.status(500).json({ error: "Veri güncelleme hatası" });
  } finally {
    await client.close(); // Bağlantıyı kapat
  }
});

app.post("/updateSorumlu/:id", async (req, res) => {
  const { id } = req.params;
  const updateduser = req.body;

  const uri =
    "mongodb+srv://caganyangoz:159753@cluster0.4sczhfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const client = new MongoClient(uri);

  try {
    await client.connect(); // MongoDB'ye bağlan

    const db = client.db("adenyum");
    const collection = db.collection("sorumlu");

    const filter = { _id: new ObjectId(id) }; // Güncellenecek belirli veriye göre filtrele

    const updateDoc = {
      $set: {
        ad: updateduser.ad,
        rol: updateduser.rol,
        unvan: updateduser.unvan,
        departman: updateduser.departman,
        sifre: updateduser.sifre,
        status: updateduser.status,
      },
    };

    const result = await collection.updateOne(filter, updateDoc); // Veriyi güncelle

    console.log(`${result.matchedCount} belge güncellendi`);
    res
      .status(200)
      .json({ message: `${result.matchedCount} belge güncellendi` });
  } catch (error) {
    console.error("Veri güncelleme hatası:", error);
    res.status(500).json({ error: "Veri güncelleme hatası" });
  } finally {
    await client.close(); // Bağlantıyı kapat
  }
});

app.post("/updatestrat", async (req, res) => {
  const { id } = req.body;

  const uri =
    "mongodb+srv://caganyangoz:159753@cluster0.4sczhfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const client = new MongoClient(uri);

  try {
    await client.connect(); // MongoDB'ye bağlan

    const db = client.db("adenyum");
    const collection = db.collection("stratejikhedef");

    const filter = { _id: new ObjectId(id) }; // Güncellenecek belirli veriye göre filtrele

    const updateDoc = {
      $set: {
        status: "1", // Yeni adı güncelle
      },
    };

    const result = await collection.updateOne(filter, updateDoc); // Veriyi güncelle

    console.log(`${result.matchedCount} belge güncellendi`);
    res
      .status(200)
      .json({ message: `${result.matchedCount} belge güncellendi` });
  } catch (error) {
    console.error("Veri güncelleme hatası:", error);
    res.status(500).json({ error: "Veri güncelleme hatası" });
  } finally {
    await client.close(); // Bağlantıyı kapat
  }
});

app.post("/login", async (req, res) => {
  const { ad, sifre } = req.body;
  console.log(ad, sifre);

  const uri =
    "mongodb+srv://caganyangoz:159753@cluster0.4sczhfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const client = new MongoClient(uri);
  const db = client.db("adenyum");
  try {
    const user = await db.collection("sorumlu").findOne({ ad });

    if (!user || user.sifre !== sifre) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });

    res.json({ token, id: user._id, ad: user.ad });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
