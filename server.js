import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(express.static("public"));

// vocab endpoint
app.get("/api/vocab", (req,res)=>{
  const data = fs.readFileSync("./public/vocab.json");
  res.json(JSON.parse(data));
});

// simple AI bot
app.post("/api/ask",(req,res)=>{
  const {message,vocab} = req.body;
  const msg = message.toLowerCase();

  if(msg.includes("quiz")){
    const rand = vocab[Math.floor(Math.random()*vocab.length)];
    return res.json({answer:`Try: ${rand.q}`});
  }

  const found = vocab.find(v=>msg.includes(v.q.toLowerCase()));
  if(found){
    return res.json({answer:`${found.q} → ${found.a}`});
  }

  res.json({answer:"Ask about a term or say 'quiz me'."});
});

app.listen(3000,()=>console.log("http://localhost:3000"));
