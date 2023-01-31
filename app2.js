
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




async function openAIRun() {
    const inputs = 'write me a simple javascript code';
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: inputs,
            temperature: 0.8,
            max_tokens: 50,
        });
        const feedBack = response.data.choices[0].text;
        
        console.log(response.data.choices[0].text);
        return feedBack
    }
app.get('/',async (req,res)=>{
    text = await openAIRun();
    res.send('home2',{text:text})
})

app.listen(3000,()=>{
    console.log('listening at localhost:3000');
})