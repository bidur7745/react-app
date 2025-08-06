import express from 'express';
import { ENV } from './config/env.js';
import { db } from './config/db.js';
import { favoritesTable } from './db/schema.js';
import { and, eq } from 'drizzle-orm';
import job from './config/cron.js';



const app = express();
const PORT = ENV.PORT;

app.use(express.json())

if(ENV.NODE_ENV === "production") job.start();


app.get("/", (req, res)=>{
  res.status(200).json({success:true});

});


app.post("/api/favorites", async(req, res) => {
try {
  const {userID,recipeID, title, image, cooketime, servings }=req.body;

  if (!userID || !recipeID || !title){
    res.status(400).json({error:"Missing required fields"})
  }
  const newFavorite= await db.insert(favoritesTable).values({
    userID,
    recipeID,
    title,
    image,
    cooketime,
    servings  

  }).returning();
  res.status(201).json(newFavorite[0])
} catch (error) {
  console.log("Error adding Favorites", error)
  res.status(500).json({error:"Somthing went wrong"})

}
})


app.get("/api/favorites/:userID", async (req, res) => {
  try {
    const { userID } = req.params;

    const favorites = await db
      .select()
      .from(favoritesTable)
      .where(eq(favoritesTable.userID, userID));

    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching the favorites", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});



app.delete("/api/favorites/:userID/:recipeID", async(req,res) =>{
  try {
    
    const {userID, recipeID} =req.params;
    if (!userID || !recipeID) {
      return res.status(400).json({error: "Missing userID or recipeID"});
    }

    await db
    .delete(favoritesTable)
    .where(
      and(eq(favoritesTable.userID, userID), (eq(favoritesTable.recipeID, parseInt(recipeID)))
      
    ) );
    res.status(201).json({success:"Favorities delete sucessfully"})
  } catch (error) {
    console.log("Error deleting favorite", error);
    res.status(500).json({error:"Something went wrong"});
    
  }

})




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});