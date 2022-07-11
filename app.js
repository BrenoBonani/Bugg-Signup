//npm install @mailchimp/mailchimp_marketing
const mailchimp = require("@mailchimp/mailchimp_marketing");
//Requiring express and body parser and initializing the constant "app"
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//Using bod-parser
app.use(bodyParser.urlencoded({extended:true}));
//The public folder which holds the CSS
app.use(express.static("public"));
//Listening on port 3000 and if it goes well then logging a message saying that the server is running
app.listen(process.env.PORT || 3000,function () {
 console.log("Server is running at port 3000");
});
//Sending the index.html file to the browser as soon as a request is made on localhost:3000
app.get("/", function (req, res) {
 res.sendFile(__dirname + "/index.html");
});
//Setting up MailChimp
mailchimp.setConfig({
//*****************************ENTER MY API KEY HERE******************************
accessToken: "7a085026b4bac7bc1e398ce10ee1f738-us13",
//*****************************ENTER MY API KEY SERVER******************************
server: "us13"
});
//As soon as the sign in button is pressed execute this
app.post("/", function (req, res) {

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.emailName;

/* MY LIST ID */
const listId = "ce4b0865ee";
//Creating an object with the users data
const subscribingUser = {
 firstName: firstName,
 lastName: lastName,
 email: email
};
//Uploading the data to the server
async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});
//If all goes well logging the contact's id
 res.sendFile(__dirname + "/success.html")
 console.log(
`Successfully added contact as an audience member. The contact's id is ${
 response.id
 }.`
);
}
//Running the function and catching the errors (if any)

// So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

// 483cdc2a230c024829e9cc8c575a42be-us13 key mailchimp

// ce4b0865ee mailchimp ID for lists


/* 
=======================
Usando CSS com Node.js
=======================

Para que o servidor possa acessar as minhas imagens que estão em um arquivo separado de css, eu preciso criar um função especial com express:

app.use(express.static(__dirname + "public"));

A função static precisa ser usada com express e dentro dela, preciso especificar qual a pasta vão ficar o css e as imagens. No caso, vai se
chamar ("public"). Criada a pasta, eu preciso adicionar o css e as imagens lá dentro, com uma pasta para cada.

Logo depois disso, olhar no html se tudo está em ordem, o css deve continuar chamando da pasta e as imagens também. Além disso, background img
vão precisar usar ../ para achar o path certo de novo, pq agora estão dentro de uma outra pasta.

Feito isso, preciso fazer com que os dados sejam reconhecido. Logo, uso o:

app.use(bodyParser.urlencoded({extended: true}));

Para usar o bodyParser e crio um app.post para postar os dados:

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const Email = req.body.emailName;

    console.log(firstName, lastName, Email);
    

});


Dessa forma, usando req.body + "name" de cada elemento, eu consigo puxar os dados que foram imputados pelo usuário e consigo ver no console ao citar
as const.

Funcionando, dou continuidade. Agora eu crio outra var, com nome de data e vou dentro do site do mailchimps no docs e procuro pela seção code exemples.
Dessa forma, eu acho no site e coloco aqui.
*/


/* 
heroku PORT

Estou setando para dar deploy na landing page do bugg no heroku, um servidor de terceiro. Para isso, eu preciso mudar a porta 3000 para:

process.env.PORT,

Isso basicamente é uma porta dinamica que o Heroku definirá na hora. É possível colocar um "ou", com ||. Assim, posso colocar para que app.listen também
funcione na porta 3000 local: process.env.PORT || 3000,.

Em seguida, eu preciso criar um Procfile, pois é assim que o heroku vai conseguir acessar para dar display no site com o node. Feito isso, preciso salvar
no git e para fazer isso, eu preciso estar dentro do terminal na pasta do meu projeto.

Para isso, eu começo com "git init", que me permite criar um novo repositório git. Git me permite salvar versões diferentes do meu código ou app. Ele con
trola as versões do seu codigo ou app. Para adicionar o meu folder do projeto no git, basta usar "git add .".

Agora, vou dar um "git commit -m "First Commit"", que significa que agora estou iniciando uma nova versão do meu projeto. O -m "First Commit", me permite 
mandar uma mensagem.

Após isso, eu vou usar o comando heroku login e logar com as minhas credenciais. Depois, eu crio um novo app, com "heroku create". Se tudo estiver de acordo, 
ele vai criar o meu link https e depois eu preciso inserir os arquivos do projeto, usando "git push heroku master".

Caso eu queria atualizar alguma coisa no projeto, basta eu atualizar, depois ir no terminal com path no folder do projeto e digitar "git add .", depois
"git commit -m "Second Commit"" e "git push heroku master"

ps: se eu estiver dando deploy com database, lembrar de colocar no package.json, embaixo de "license", o seguinte código:

"engines": {
    "node": "16.15.1"
  },

  O "node:" precisa estar na versão mais recente. Para isso, basta ir no console e digitar node --version e colocar a versão que eu estiver usando. Além disso,
  preciso criar um arquivo .gitignore para ignorar arquivos como node_modules e .DS_Store.

*/