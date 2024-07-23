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

app.post("/addkontrol", async (req, res) => {
  const kontrol = req.body;
  const client = await MongoClient.connect(
    "mongodb+srv://caganyangoz:159753@cluster0.4sczhfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db("adenyum");
  const collection = db.collection("kontrolnoktasi");

  try {
    await collection.insertOne(kontrol);
    res.status(201).send("Data saved successfully");
  } catch (error) {
    res.status(500).send("Failed to save data");
  }
});

app.post("/addrisk", async (req, res) => {
  const risk = req.body;
  const client = await MongoClient.connect(
    "mongodb+srv://caganyangoz:159753@cluster0.4sczhfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db("adenyum");
  const collection = db.collection("riskanaliz");

  try {
    await collection.insertOne(risk);
    res.status(201).send("Data saved successfully");
  } catch (error) {
    res.status(500).send("Failed to save data");
  }
});

app.post("/adducret", async (req, res) => {
  const ucret = req.body;
  const client = await MongoClient.connect(
    "mongodb+srv://caganyangoz:159753@cluster0.4sczhfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db("adenyum");
  const collection = db.collection("ucretyonetimi");

  try {
    await collection.insertOne(ucret);
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

app.post("/updatekontrol/:id", async (req, res) => {
  const { id } = req.params;
  const updated = req.body;

  const uri =
    "mongodb+srv://caganyangoz:159753@cluster0.4sczhfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const client = new MongoClient(uri);

  try {
    await client.connect(); // MongoDB'ye bağlan

    const db = client.db("adenyum");
    const collection = db.collection("kontrolnoktasi");

    const filter = { _id: new ObjectId(id) }; // Güncellenecek belirli veriye göre filtrele

    const updateDoc = {
      $set: {
        departman: updated.departman,
        kontrolnoktasi: updated.kontrolnoktasi,
        agirlik: updated.agirlik,
        durum: updated.durum,
        puan: updated.puan,
        aciklama: updated.aciklama,
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

app.post("/updateucret/:id", async (req, res) => {
  const { id } = req.params;
  const updated = req.body;

  const uri =
    "mongodb+srv://caganyangoz:159753@cluster0.4sczhfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const client = new MongoClient(uri);

  try {
    await client.connect(); // MongoDB'ye bağlan

    const db = client.db("adenyum");
    const collection = db.collection("ucretyonetimi");

    const filter = { _id: new ObjectId(id) }; // Güncellenecek belirli veriye göre filtrele

    const updateDoc = {
      $set: {
        derece: updated.derece,
        unvan: updated.unvan,
        agirlik: updated.agirlik,
        anamaas: updated.anamaas,
        performans: updated.performans,
        toplam_maas: updated.toplam_maas,
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

    res.json({ token, id: user._id, ad: user.ad, rol: user.rol });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/delete/:dbName", async (req, res) => {
  const { dbName } = req.params; // URL parametresinden dbName'i al
  const { id } = req.body;

  const uri =
    "mongodb+srv://caganyangoz:159753@cluster0.4sczhfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const client = new MongoClient(uri);

  try {
    await client.connect(); // MongoDB'ye bağlan

    const db = client.db("adenyum");

    const result = await db
      .collection(dbName)
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Item not found" });
    }

    res.status(200).send({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting item", error });
  } finally {
    await client.close(); // Bağlantıyı kapat
  }
});

app.post("/count/:variable", async (req, res) => {
  const { variable } = req.params;
  const uri =
    "mongodb+srv://caganyangoz:159753@cluster0.4sczhfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const client = new MongoClient(uri);
  const dbName = "adenyum"; // Veritabanı adı
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("stratejikhedef"); // Koleksiyon adı
    const results = await collection
      .aggregate([
        {
          $group: {
            _id: `$${variable}`, // KPI değerine göre gruplama
            count: { $sum: 1 }, // Her grup için sayımı hesaplama
          },
        },
      ])
      .toArray();

    res.json(results);
  } catch (err) {
    console.error("Hata:", err);
  } finally {
    await client.close();
  }
});

app.post("/countRisk", async (req, res) => {
  const uri =
    "mongodb+srv://caganyangoz:159753@cluster0.4sczhfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(uri);
  try {
    await client.connect();

    const database = client.db("adenyum");
    const collection = database.collection("riskanaliz");

    const riskSinifiValue = "3"; // Saymak istediğiniz risk_sinifi değeri
    const results = await collection
      .aggregate([
        { $match: { risk_sinifi: riskSinifiValue } }, // risk_sinifi ile filtreleme
        {
          $group: {
            _id: "$departman", // Departmana göre gruplama
            count: { $sum: 1 }, // Her grup için sayımı hesaplama
          },
        },
      ])
      .toArray();

    // Sonuçları JSON formatında döndür
    res.json(results);
  } catch (err) {
    console.error("Veri çekme hatası:", err);
  } finally {
    await client.close();
  }
});

const startChangeStream = async () => {
  const uri =
    "mongodb+srv://caganyangoz:159753@cluster0.4sczhfr.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("adenyum");
    const riskanalizCollection = database.collection("riskanaliz");
    const kontrolNoktalariCollection = database.collection("kontrolnoktasi");
    const ucretYonetimiCollection = database.collection("ucretyonetimi");

    const changeStream = riskanalizCollection.watch();

    changeStream.on("change", async (change) => {
      // Change türünü kontrol et
      if (change.operationType === "insert") {
        const newDocument = change.fullDocument;
        const newDocument2 = change.fullDocument;
        const currentDate = new Date();

        // risk_sinifi 3 olan dökümanları kontrol et
        if (newDocument.risk_sinifi === "3") {
          newDocument.agirlik = "1";
          newDocument.durum = "1";
          newDocument.puan = "1";
          newDocument.eklenme_tarihi = currentDate;

          newDocument2.derece = "1.Derece";
          newDocument2.agirlik = "1";
          newDocument2.anamaas = "1";
          newDocument2.performans = "1";
          newDocument2.toplam_maas = "1";

          // Veriyi kontrol_noktalari koleksiyonuna ekle
          await kontrolNoktalariCollection.insertOne(newDocument);
          await ucretYonetimiCollection.insertOne(newDocument2);

          console.log(
            "Yeni veri kontrol_noktalari koleksiyonuna eklendi:",
            newDocument
          );
        }
      }
    });

    console.log("Change Stream çalışıyor...");
  } catch (error) {
    console.error("Change Stream hata:", error);
  }
};

startChangeStream();

app.post("/departman-puan", async (req, res) => {
  const uri =
    "mongodb+srv://caganyangoz:159753@cluster0.4sczhfr.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("adenyum");
    const collection = database.collection("kontrolnoktasi");

    const aggregationPipeline = [
      {
        $addFields: {
          puan: { $toInt: "$puan" }, // Convert puan from string to integer
        },
      },
      {
        $group: {
          _id: "$departman", // Group by the 'departman' field
          totalPuan: { $sum: "$puan" }, // Sum the 'puan' field for each group
        },
      },
      {
        $project: {
          _id: 0,
          departman: "$_id",
          totalPuan: 1,
        },
      },
    ];

    const results = await collection.aggregate(aggregationPipeline).toArray();
    res.json(results); // Send the results back to the client
  } catch (error) {
    console.error("Error fetching department scores:", error);
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
