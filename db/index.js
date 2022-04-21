const { Client } = require("pg"); //Criando uma variavel para conectar com o pg
const client = new Client({        //Dando outro nome para a variavel 
 connectionString: "postgres://postgres:biscoito2012@localhost:5432/Abex"        //aqui conectaremos com o postgreSQL e com a database
});
client.connect(); //Usado para conectar o cliente
                
module.exports = client; //Usado para extrair a conexão para outros arquivos de codigos

