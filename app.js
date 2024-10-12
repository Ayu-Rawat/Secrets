import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "procastinationcoder";
const yourPassword = "123";
const yourAPIKey = "cad88276-e865-4c58-a1fb-18ab02cd841e";
const yourBearerToken = "b490f85b-d539-451b-8a8c-b66768c3f6fa";

app.get("/", (req, res) => {
  res.render("app.ejs", { content: "API Response" });
});

app.get("/noAuth", async(req, res) => {
  try{
    const response = await axios.get(API_URL + "random")
    const result = JSON.stringify(response.data);
    res.render("app.ejs",{content : result});
  }catch(err){
    console.log("error")
  }
});

app.get("/basicAuth", async (req, res) => {
  try{
    const response = await axios.get(API_URL + "all?page=2", {
      auth : {
        username : yourUsername,
        password : yourPassword
      },
    });
    const result = JSON.stringify(response.data)
    res.render("app.ejs",{content : result})
  }catch(err){
    console.log("error")
  }
});

app.get("/apiKey", async (req, res) => {
  try{
    const response = await axios.get(API_URL + "filter?score=6&apiKey=" + yourAPIKey)
    const result = JSON.stringify(response.data)
    res.render("app.ejs",{content : result })
  }catch(err){
    console.log("error")
  }
});

app.get("/bearerToken", async(req, res) => {
  try{
    const response = await axios.get(API_URL + "secrets/42", {
      headers: {Authorization: `Bearer ${yourBearerToken}` },
    });
    const result = JSON.stringify(response.data)
    res.render("app.ejs",{ content : result })
  }catch(err){
    res.status(404).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
