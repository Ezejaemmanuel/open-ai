const express = require('express');
const ejs = require('ejs');
const app = express();
app.set('view engine','ejs');
app.set('views', __dirname + '\\views');


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);



const generateImage = async () => {
  const imageParameters = {
    prompt: 'a young girl sitting in a garden sorrounded by roses and thinking about his boyfriend',
    n: 1,
    size: "256x256",
  }
  const response = await openai.createImage(imageParameters);
  const urlData = response.data.data[0].url;
  //console.log("urlData =", urlData);
  return urlData;
  

}
app.get('/',async (req,res)=>{
  const imagesUrlArray = [];
  for (let i = 0; i < 5; i++) {
    let image_url = await generateImage();
    imagesUrlArray.push(image_url);
  }
  

  console.log(imagesUrlArray);
    res.render('home',{imagesUrlArray:imagesUrlArray});
  });



app.listen(8080,()=>{
    console.log('listening to port 8080');
})