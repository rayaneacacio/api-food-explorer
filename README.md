# api-food-explorer

API Node.js que fornece um cardápio para um restaurante fictício. A API oferece recursos de autenticação de usuários utilizando o JWT (JSON Web Tokens) e verifica se o usuário é um administrador ou um usuário comum. Caso o usuário seja um administrador, ele tem permissão para realizar alterações no cardápio.

## Deploy

https://api-food-explorer-xy7h.onrender.com/
<p>
  email de administrador: loki@gmail.com
  <br>
  senha: 1234
</p>

## Documentação da API

#### Cria um novo usuário

```http
  POST /api/users/
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. nome de usuário |
| `email` | `string` | **Obrigatório**. email de usuário |
| `password` | `string` | **Obrigatório**. senha de usuário |

exemplo:
```http
  request: {
	"name": "ray",
	"email": "ray@gmail.com",
	"password": "1234"
   }

   response: status 200;
```

#### Deleta um usuário

```http
  POST /api/users/delete
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. Email do usuário |
| `password`      | `string` | **Obrigatório**. Senha do usuário |

exemplo:
```http
  request: {
	"email": "ray@gmail.com",
	"password": "1234"
  }

  response: status 200;
```

#### Faz o login

```http
  POST /api/sessions/
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. Email do usuário |
| `password`      | `string` | **Obrigatório**. Senha do usuário |

exemplo:
```http
  request: {
	"email": "niara@gmail.com",
	"password": "1234"
  }

  response: {
	"user": {
		"id": 10,
		"name": "niara",
		"email": "niara@gmail.com",
		"password": "$2a$08$J.HzTV0FHpLQoOP1/yz3V.amftmtB2uWM0rliCQtoSXUlniEpYuNO",
		"created_at": "2023-08-21 14:12:22",
		"updated_at": "2023-08-21 14:12:22",
		"isAdmin": 0
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTI5OTA5MTAsImV4cCI6MTY5MzA3NzMxMCwic3ViIjoiMTAifQ.WIEgardjeXxl8D_rAqcm0GtEP5TAqlzYJgxP4TaxSxs"
  }
  status 200;
```

#### Cria uma nota

```http
  POST /api/notes/
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title`      | `string` | **Obrigatório**. Nome do prato |
| `category`      | `string` | **Obrigatório**. Categoria do prato (refeição, sobrema ou bebida) |
| `price`      | `string` | **Obrigatório**. Preço do prato |
| `description`      | `string` | **Obrigatório**. Descrição do prato |

exemplo:
```http
  request: {
	"title": "Expresso",
	"category": "bebida",
	"price": "15,97",
	"description": "Café cremoso feito na temperatura e pressões perfeitas."
   }

  response: [
	{
		"id": 72,
		"user_id": 8,
		"title": "Expresso",
		"image": null,
		"category": "bebida",
		"price": "15,97",
		"description": "Café cremoso feito na temperatura e pressões perfeitas.",
		"created_at": "2023-08-25 14:02:12",
		"updated_at": "2023-08-25 14:02:12"
	}
   ] 
   status 200;
```

#### Lista todas as notas

```http
  GET /api/notes/
```

exemplo:
```http
  response: [
	{
		"id": 64,
		"user_id": 8,
		"title": "Macarons",
		"image": "26b3f2be1df6594afa46-macarons.png",
		"category": "sobremesa",
		"price": "79.97",
		"description": "Farinha de amêndoas, manteiga, claras e açúcar.",
		"created_at": "2023-08-24 15:53:29",
		"updated_at": "2023-08-24 15:53:29"
	},
	{
		"id": 65,
		"user_id": 8,
		"title": "Salada Ravanello",
		"image": "4f9912da378e75952379-Salada Ravanello.png",
		"category": "refeiçao",
		"price": "49.97",
		"description": "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan dá um toque especial.",
		"created_at": "2023-08-24 21:09:19",
		"updated_at": "2023-08-24 21:09:19"
	},
	{
		"id": 66,
		"user_id": 8,
		"title": "Spaguetti Gambe ",
		"image": "80b12076c444292f1298-Spaguetti Gambe.png",
		"category": "refeiçao",
		"price": "79.97",
		"description": "Massa fresca com camarões e pesto. ",
		"created_at": "2023-08-24 21:14:03",
		"updated_at": "2023-08-24 21:14:03"
	},
	{
		"id": 67,
		"user_id": 8,
		"title": "Torradas de Parma",
		"image": "2ddf3cd733d9034730e3-Torradas de Parma.png",
		"category": "refeiçao",
		"price": "25.97",
		"description": "Presunto de parma e rúcula em um pão com fermentação natural.",
		"created_at": "2023-08-24 21:21:22",
		"updated_at": "2023-08-24 21:21:22"
	},
	{
		"id": 68,
		"user_id": 8,
		"title": "Peachy pastrie",
		"image": "2cd7f32b41838715d84d-Peachy pastrie.png",
		"category": "sobremesa",
		"price": "32.97",
		"description": "Delicioso folheado de pêssego com folhas de hortelã.",
		"created_at": "2023-08-24 21:24:11",
		"updated_at": "2023-08-24 21:24:11"
	},
	{
		"id": 69,
		"user_id": 8,
		"title": "Prugna Pie",
		"image": "1a710c27e1ee291bdd8d-Prugna Pie.png",
		"category": "sobremesa",
		"price": "79.97",
		"description": "Torta de ameixa com massa amanteigada, polvilho e açúcar.",
		"created_at": "2023-08-24 21:43:56",
		"updated_at": "2023-08-24 21:43:56"
	},
	{
		"id": 70,
		"user_id": 8,
		"title": "Suco de maracujá",
		"image": "3ad90b4c4a812e84b5ec-suco de maracuja.png",
		"category": "bebida",
		"price": "13.97",
		"description": "Suco de maracujá gelado, cremoso, docinho.",
		"created_at": "2023-08-24 22:11:32",
		"updated_at": "2023-08-24 22:11:32"
	},
	{
		"id": 71,
		"user_id": 8,
		"title": "Tè d'autunno",
		"image": "38a4ba78e42c873ca787-TÃ¨ d'autunno.png",
		"category": "bebida",
		"price": "19.97",
		"description": "Chá de anis, canela e limão. Sinta o outono italiano.",
		"created_at": "2023-08-24 22:12:59",
		"updated_at": "2023-08-24 22:12:59"
	},
	{
		"id": 72,
		"user_id": 8,
		"title": "Expresso",
		"image": "c12cd6fa5a11e0badf6d-Expresso.png",
		"category": "bebida",
		"price": "15,97",
		"description": "Café cremoso feito na temperatura e pressões perfeitas.",
		"created_at": "2023-08-25 14:02:12",
		"updated_at": "2023-08-25 14:02:12"
	}
  ]
  
  status 200;
```

#### Pesquisa notas pelo título

```http
  POST /api/notes/show
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title`      | `string` | **Obrigatório**. Nome do prato |

exemplo:
```http
  request: {
	"title": "expre"
  }

  response: [
	{
		"id": 72,
		"user_id": 8,
		"title": "Expresso",
		"image": "c12cd6fa5a11e0badf6d-Expresso.png",
		"category": "bebida",
		"price": "15,97",
		"description": "Café cremoso feito na temperatura e pressões perfeitas.",
		"created_at": "2023-08-25 14:02:12",
		"updated_at": "2023-08-25 14:02:12"
	}
 ];
 status 200;
```

#### Atualiza uma nota

```http
  PUT /api/notes/
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. Id da nota |
| `title`      | `string` | **Opcional**. Título do prato |
| `category`      | `string` | **Opcional**. Categoria do prato (refeição, sobremesa ou bebida) |
| `price`      | `string` | **Opcional**. Preço do prato |
| `description`      | `string` | **Opcional**. Descrição do prato |

exemplo:
```http
  request: {
	"id": "64",
	"price": "79,97"
  }

  response: status 200;
```

#### Atualiza a imagem de uma nota

```http
  PATCH /api/notes/patch_image?note_id=${ note_id }
```

#### Deleta uma nota

```http
  POST /api/notes/delete
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. Id da nota |

exemplo:
```http
  request: {
	"id": "5"
  }

  response: status 200;
```

#### Cria as tags da nota

```http
  POST /api/tags/
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `note_id`      | `number` | **Obrigatório**. Id da nota |
| `tags`      | `string` | **Obrigatório**. Ingredientes da receita |

exemplo:
```http
  request: {
	"note_id": "68",
	"tags": ["pessegos, laranja, ovo"]
   }

  response: status 200;
```

#### Lista todas as tags de uma nota

```http
  POST /api/tags/index
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `note_id`      | `number` | **Obrigatório**. Id da nota |

exemplo:
```http
  request: {
	"note_id": "69"
  }

  response: [
	{
		"id": 80,
		"user_id": 8,
		"note_id": 69,
		"title": "ameixa"
	},
	{
		"id": 81,
		"user_id": 8,
		"note_id": 69,
		"title": "polvilho"
	},
	{
		"id": 82,
		"user_id": 8,
		"note_id": 69,
		"title": "açúcar"
	}
  ] 
  status 200;
```

#### Pesquisa tags pelo título

```http
  POST /api/tags/show
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title`      | `string` | **Obrigatório**. Nome do ingrediente |

exemplo:
```http
  request: {
	"title": "açúcar"
  }

  response: [
	{
		"id": 64,
		"user_id": 8,
		"title": "Macarons",
		"image": "26b3f2be1df6594afa46-macarons.png",
		"category": "sobremesa",
		"price": "79,97",
		"description": "Farinha de amêndoas, manteiga, claras e açúcar.",
		"created_at": "2023-08-24 15:53:29",
		"updated_at": "2023-08-24 15:53:29"
	},
	{
		"id": 69,
		"user_id": 8,
		"title": "Prugna Pie",
		"image": "1a710c27e1ee291bdd8d-Prugna Pie.png",
		"category": "sobremesa",
		"price": "79.97",
		"description": "Torta de ameixa com massa amanteigada, polvilho e açúcar.",
		"created_at": "2023-08-24 21:43:56",
		"updated_at": "2023-08-24 21:43:56"
	}
  ]  
  status 200;
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`SECRET_KEY`
