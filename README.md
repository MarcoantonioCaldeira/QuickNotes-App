# AnotationApp
> O AnotationApp é uma Aplicação para criar, atualizar e deletar anotações

## Visão Geral da aplicação
![Anotaçao](https://github.com/MarcoantonioCaldeira/Anotation-App/assets/88919003/7f007ccd-0c93-4223-b05f-59a92655f9ec)

## Tecnologias Usadas
  + FrontEnd
    + VueJS
    + Sass
    + Axios
    + Design Responsivo
    + Consumo de RestAPI
  + Backend
    + NestJS
    + Prisma
    + PostgreSQL
    + Docker
   
## Inicializando o BackEnd

+ Criação do container

      docker compose up

> Todas as configurações do Banco de Dados estarão no docker-compose

 
## Inicializando o FrontEnd

+ Criação do container

      docker compose up
   
  
> Com isso o Backend e FrontEnd já estaram funcionando

## Modelo de requisições e respostas da API

### Gerar Token de Autenticação
+ Para gerar o token de autenticação temos que passar os parametros no Header **secretKey** com o valor: **3G5T8W7Y1K**

  + Endpoint: localhost:3000/auth/token
  
  #### Modelo de Resposta
    
      {
      	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXRLZXkiOiIzRzVUOFc3WTFLIiwiaWF0IjoxNzA2MDM2MTgxLCJleHAiOjE3MDYwMzk3ODF9.dPSsgqAedJ3y-zDRsjgBFidXFlJoFWavFtndAV60S_8"
      }
  

  ### Criar anotação
  
  + Endpoint: localhost:3000/anotations/create
  
  #### Modelo de Requisição
  
      {
        "subject": "Anotação", 
        "potential": 4500,  
        "category": "2",
        "term": "02/02/2022"    
      }


  #### Modelo de Resposta
  
      {
      	"mensagem": "Anotação criada com sucesso",
      	"anotation": {
      		"id_anotation": 1,
      		"subject": "Anotação",
      		"potential": 4500,
      		"category": "2",
      		"term": "02/02/2022"
      	}
      }

  ### Deletar anotação
  
  + Endpoint: localhost:3000/anotations/delete/id_anotation
  
  #### Modelo de Resposta

      {
      	"message": "Anotação deletada com sucesso",
      	"anotation": {
      		"id_anotation": 1,
      		"subject": "Aqui esta a primeira anotação",
      		"potential": 2500,
      		"category": "1",
      		"term": "25/01/2024"
      	}
      }

  ### Listar anotações
  
  + Endpoint: localhost:3000/anotations/list
  
  #### Modelo de Resposta
  
      [
      	{
      		"id_anotation": 1,
      		"subject": "Anotação",
      		"potential": 1000,
      		"category": "Muito Importante",
      		"term": "02/02/2022"
      	},
      	{
      		"id_anotation": 2,
      		"subject": "Anotação",
      		"potential": 1000,
      		"category": "Muito Importante",
      		"term": "02/02/2022"
      	},
      	{
      		"id_anotation": 3,
      		"subject": "Anotação",
      		"potential": 1000,
      		"category": "0",
      		"term": "02/02/2022"
      	},
      	{
      		"id_anotation": 4,
      		"subject": "Anotação",
      		"potential": 1000,
      		"category": "1",
      		"term": "02/02/2022"
      	}
      ]


  ### Atualizar anotações
  
  + Endpoint: localhost:3000/anotations/update/id_anotation
  
  #### Modelo de Requisição
  
        {
          "subject": "Anotações", 
          "potential": 4500,  
          "category": "2",
          "term": "25/01/2024"    
        }

  #### Modelo de Resposta
  
      {
      	"message": "Anotação atualizada com sucesso",
      	"anotation": {
      		"id_anotation": 6,
      		"subject": "Neste dia vou estar ocupadoo",
      		"potential": 4500,
      		"category": "2",
      		"term": "25/01/2024"
      	}
      }

## Funcionalidades Adicionais

  + Edição dos dados da anotação
  + Atualização automatica de Token de autenticação no FrontEnd
  + Utilização do Docker para empacotar as duas aplicações
    

