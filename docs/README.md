
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
![VTEXIO](https://img.shields.io/badge/-Vtex IO-ff69b4?style=flat-square&logo=vtex)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![ReactJs](https://img.shields.io/badge/-ReactJs-20232A?style=flat-square&logo=react)
![Storybook](https://img.shields.io/badge/-Storybook-20232A?style=flat-square&logo=Storybook)
![Yarn](https://img.shields.io/badge/-Yarn-2C8EBB?style=flat-square&logo=yarn&logoColor=white)
![NPM](https://img.shields.io/badge/-npm-CB3837?style=flat-square&logo=npm&logoColor=white)
# Component [Schema] 🎨

Schema UI é um projeto que fornece um esquema de configuração flexível e altamente personalizável para componentes customizados no VTEX IO. Utilizando React JSON Schema Form, este repositório facilita a criação de interfaces dinâmicas e adaptáveis dentro do ecossistema VTEX.

### 📌 Recursos
✅ Definição clara de types para cada propriedade <br/>
✅ Uso de widgets personalizados para melhorar a experiência de edição<br/>
✅ Implementação de dependencies e oneOf para configurações condicionais<br/>
✅ Suporte a uploads, seleções, datas, arrays e muito mais<br/>


### 🔧 Como Usar
1. Clone o repositório:
```sh
git clone https://github.com/gblcintra/schema-ui.git
cd schema-ui
```

2. Instale as dependências:

```sh
yarn install
```

3. Execute o Storybook para visualizar os componentes:
```sh
yarn storybook
```

### Schema
nomeação de componentes na interface (store\interfaces.json)

```jsx
  "schema-ui": {
    "component": "SchemaUi"
  }
```
## 🚀 Como usar no store theme

```jsx
...
{
  "store.home": {
    "title": "Home",
    "blocks": [
      "account.schema-ui:schema-ui",
      ...
    ]
  },
...
}
```

## Configuralçao

1. Adicione o aplicativo Login às dependências do seu tema no arquivo `manifest.json`:

```diff
  "dependencies": {
+   "account.schema-ui": "0.x"
  }
```

## 🛠️ Widgets Disponíveis

O `SchemaUi` suporta diferentes widgets para renderização dinâmica de campos. Alguns dos principais incluem:

| Widget                      | Tipo                      | Descrição                                                                                             |
| --------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------- |
| `ui:widget: textarea`       | `string`                  | Caixa de texto multilinhas.                                                                           |
| `ui:widget: color`          | `string`                  | Campo para seleção de cores.                                                                          |
| `ui:widget: password`       | `string`                  | Input de senha com máscara.                                                                           |
| `ui:widget: date`           | `string`                  | Campo de seleção de data.                                                                             |
| `ui:widget: datetime`       | `string`                  | Campo de seleção de data e hora.                                                                      |
| `ui:widget: range`          | `number`                  | Slider de seleção de números.                                                                         |
| `ui:widget: image-uploader` | `string`                  | Upload de imagens.                                                                                    |
| `ui:widget: select`         | `string`                  | Caixa de seleção suspensa.                                                                            |
| `ui:widget: radio`          | `string`                  | Botões de opção (radio buttons).                                                                      |
| `ui:field`                  | `({ schema }: any) => {}` | Permite a criação de componentes personalizados para exibir um campo específico.                      |
| `ui:placeholder`            | `string`                  | Define um texto de exemplo dentro do campo de entrada para orientar o usuário.                        |
| `ui:inputType`              | `string`                  | Define o tipo de entrada de um campo de texto, como password, email, tel, etc.                        |
| `ui:help`                   | `string`                  | Adiciona uma dica abaixo do campo para fornecer mais contexto ao usuário.                             |
| `ui:options`                | `object`                  | Permite configurações adicionais para widgets específicos.                                            |
| `ui:disabled`               | `boolean`                 | Desabilita um campo para impedir que ele seja editado pelo usuário.                                   |
| `ui:readonly`               | `boolean`                 | Deixa o campo somente leitura, permitindo que os usuários vejam o conteúdo, mas não façam alterações. |
| `classNames`                | `boolean`                 | Permite adicionar classes CSS personalizadas aos campos para melhor estilização.                      |

## 🛠️ Tipos Disponíveis
A configuração do schema proporciona flexibilidade através da utilização de vários tipos de dados para configurar elementos da IU. Estes tipos de dados podem ser utilizados para estilizar e definir o comportamento de diferentes componentes, quer se trate de introdução de texto, imagens, datas, cores ou menus pendentes de seleção.

| Type      | Descrição                                                                       |
| --------- | ------------------------------------------------------------------------------- |
| `String`  | Usado para campos de texto, URL, imagem ou data.                                |
| `Boolean` | Uma opção de alternância simples para ativar/desativar recursos.                |
| `Object`  | Define objetos aninhados e suas propriedades.                                   |
| `Array`   | Usado para repetir grupos de itens, como imagens, formulários ou vários campos. |


## 🎛️ Props Disponíveis

| Propriedade   | Tipo      | Descrição                                                |
| ------------- | --------- | -------------------------------------------------------- |
| `titleItem`   | `string`  | Define o título do bloco exibido.                        |
| `activeItem`  | `boolean` | Determina se o componente deve ser exibido.              |
| `textProps`   | `object`  | Propriedades relacionadas a campos de texto.             |
| `dataProps`   | `object`  | Propriedades relacionadas a seleção de datas.            |
| `selectProps` | `object`  | Propriedades relacionadas a seleções e listas suspensas. |
| `colorProps`  | `object`  | Configuração de cores para o componente.                 |
| `arrayItem`   | `array`   | Lista de itens dentro de um array.                       |

### 📌 Detalhes das Props

#### `fieldNull`
Campo Null

| Propriedade | Tipo   | Descrição                                               |
| ----------- | ------ | ------------------------------------------------------- |
| `fieldNull` | `null` | Texto de exibição, pode ser utilizado para explicações. |

```jsx
SchemaUi.schema = {
  title: 'Configuração do schema',
  type: 'object',
  properties: {
    fieldNull: {
      title: "Texto com type Null",
      type: "null",
      description: "Campos nulos como este são ótimos para adicionar informações extras",
      widget: {
        'ui:field': ({ schema }: any) => {
          return <h4 className="ma0 f5 near-black">{schema?.description}</h4>;
        },
      },
    },
  }
}
 ```
 ![Campo NULL](https://img001.prntscr.com/file/img001/YN66XbXlSq2_usT6dnaqgw.png)

#### `textProps`
Campos de texto

| Propriedade       | Tipo     | Descrição                         |
| ----------------- | -------- | --------------------------------- |
| `titleItem`       | `string` | Texto de exibição.                |
| `passwordItem`    | `string` | Campo de senha.                   |
| `descriptionItem` | `string` | Campo de textarea para descrição. |

```jsx
SchemaUi.schema = {
  title: 'Configuração do schema',
  type: 'object',
  properties: {
    titleItem: {
      type: 'string',
      title: 'Título PlaceHolder',
      description: 'Insira o texto que será exibido no botão.',
      minLength: 10,
      widget: {
        'ui:widget': 'text',
        'ui:placeholder': 'Ex.: Teste',
      },
    },
    passwordItem: {
      type: 'string',
      title: 'Senha',
      widget: {
        'ui:inputType': 'password',
        "ui:help": "Dica: Faça com que seja forte!"
      },
    },
    descriptionItem: {
      type: "string",
      title: "Bio",
      widget: {
        "ui:widget": "textarea",
        "ui:options": {
          "rows": 5
        }
      }
    },
  }
}
 ```
![Campos String](https://img001.prntscr.com/file/img001/g2Sy3q86S0-Z8y-E4UZ_UA.png)

#### `dataProps`
Campos de data

| Propriedade    | Tipo     | Descrição                                  |
| -------------- | -------- | ------------------------------------------ |
| `dataItem`     | `string` | Data no formato `YYYY-MM-DD`.              |
| `dataTimeItem` | `string` | Data e hora no formato ISO 8601.           |
| `altDatetime`  | `string` | Data e hora com opções alternativas.       |
| `altDate`      | `string` | Data alternativa com formato configurável. |

```jsx
SchemaUi.schema = {
  title: 'Configuração do schema',
  type: 'object',
  properties: {
    dataItem: {
      type: 'string',
      title: 'Data',
      format: 'date',
      widget: {
        'ui:widget': 'date',
      },
    },
    dataTimeItem: {
      type: 'string',
      title: 'Data Time',
      format: 'date-time',
      widget: {
        'ui:widget': 'datetime',
      },
    },
    altDatetime: {
      type: "string",
      format: "date-time",
      widget: {
        "ui:widget": "alt-datetime",
        "ui:options": {
          "yearsRange": [
            2023,
            2030
          ],
          "format": "MDY"
        },
      },
    },
    altDate: {
      type: "string",
      format: "date",
      widget: {
        "ui:widget": "alt-date",
        "ui:options": {
          "yearsRange": [
            2023,
            2030
          ],
          "format": "MDY"
        },
      },
    },
  }
}
 ```
![Campos de Data](https://img001.prntscr.com/file/img001/7AMNAOTdR92Qota1jA0eFA.png)

#### `selectProps`
##### Configuração dinâmica com dependências
O esquema também suporta a divisão de propriedades em grupos específicos utilizando categorias como textProps, dataProps, selectProps, colorProps e restrictProps para organizar e melhorar a interface do utilizador.

| Propriedade  | Tipo      | Descrição                                                  |
| ------------ | --------- | ---------------------------------------------------------- |
| `selectItem` | `string`  | Seleção de cor com valores predefinidos.                   |
| `colorItem`  | `string`  | Cor do título (exemplo: `#ff0000`).                        |
| `toogleItem` | `boolean` | Ativador.                                                  |
| `radioItem`  | `string`  | Seleção de opção com valores predefinidos com opção radio. |
| `reference`  | `string`  | Referência a uma definição global (`enum`).                |

```jsx
SchemaUi.schema = {
  title: 'Configuração do schema',
  type: 'object',
  definitions: {
    largeEnum: {
      enum: [
        "option #0",
        "option #1",
        "option #2",
        "option #3",
        "option #4",
        "option #5",
      ]
    },
  },
  properties: {
    selectItem: {
      title: 'Seleção de Cor',
      type: 'string',
      default: '#000',
      enumNames: ['Preto', 'Branco'],
      enum: ['#000', '#fff'],
      description: 'Por default a cor vem "Preto"',
      widget: {
        'ui:widget': 'select'
      }
    },
    colorItem: {
      title: 'Cor do titulo',
      type: 'string',
      widget: {
        'ui:widget': 'color',
      },
      default: '#666',
      description: 'Selecione a cor do texto principal do bloco',
    },
    toggleItem: {
      title: 'Ativar Item',
      type: 'boolean',
      default: true,
    },
    radioItem: {
      title: 'Escolha uma opção radio',
      type: 'string',
      enum: ['Opção 1', 'Opção 2', 'Opção 3'],
      widget: {
        'ui:widget': 'radio'
      }
    },
    reference: {
      type: 'string',
      title: 'Seleção usando definitions como referencia',
      $ref: "#/definitions/largeEnum"
    },
  }
}
 ```
![Campos de Seleções](https://img001.prntscr.com/file/img001/gnNxvgcuQ0WAFl5aEc0nxQ.png)

#### `restrictProps`
Restringir campos (ocultos, desativados ou só de leitura)

| Propriedade     | Tipo     | Descrição                                         |
| --------------- | -------- | ------------------------------------------------- |
| `secret`        | `string` | Texto de exibição invisível no site editor.       |
| `disabledItem`  | `string` | Texto de não editável no site editor.             |
| `readonlyItem`  | `string` | Texto de exibição somente leitura no site editor. |
| `readonlyItem2` | `string` | Texto de exibição somente leitura no site editor. |

```jsx
SchemaUi.schema = {
  title: 'Configuração do schema',
  type: 'object',
  properties: {
    secret: {
      type: "string",
      default: "Invisivel string.",
      widget: {
        "ui:widget": "hidden"
      },
    },
    disabledItem: {
      type: 'string',
      title: 'Campo Desabilitado',
      widget: {
        'ui:disabled': true,
      },
      default: 'desabilitado',
    },
    readonlyItem: {
      type: 'string',
      title: 'Campo somente Leitura',
      widget: {
        'ui:readonly': true,
      },
      default: 'somenteLeitura',
    },
    readonlyItem2: {
      type: 'string',
      title: 'Campo somente Leitura 2',
      readOnly: true,
      default: 'somenteLeitura2',
    },
  }
}
 ```
 ![Campos de Restritos](https://img001.prntscr.com/file/img001/MBk9z-3ZTn6qfXDRAogQag.png)


#### `arrayItem`
Campo de cadastro de itens utilizando array

| Propriedade | Tipo     | Descrição                         |
| ----------- | -------- | --------------------------------- |
| `title`     | `string` | Texto de exibição com placeholder |

```jsx
SchemaUi.schema = {
  title: 'Configuração do schema',
  type: 'object',
  properties: {
    arrayItem: {
      type: 'array',
      title: "Array de Itens",
      maxItems: 5, // máximo de itens que podem ser cadastrado em um array
      widget: {
        classNames: 'bg-washed-yellow ba b--light-gray ph3 mb3',
        'ui:options': {
          addable: true, // False ele Impede de adicionar Itens
          removable: false, // false ele Impede de apagar o item
        }
      },
      items: {
        type: 'object',
        title: "Item Array",
        widget: {
          classNames: 'bg-washed-yellow ba b--light-gray ph3 mb3'
        },
        properties: {
          __editorItemTitle: {
            title: 'Identificação do Item',
            default: 'Item',
            description: 'Max 15 caracteres',
            type: 'string',
          },
          title: {
            type: 'string',
            title: 'Titulo Teste',
            widget: {
              'ui:placeholder': 'Ex.: Teste',
            },
            description: '**Preenchimento Obrigatório**',
          },
        },
      },
    },
  }
}
 ```
![Campos de Array](https://img001.prntscr.com/file/img001/YSykZ0_ASrKieCMyl12fxg.png)
![Campos de Item do Array](https://img001.prntscr.com/file/img001/IhTJYcKEQbqtQztjBcitKg.png)

#### `uploadItem`
Campo de upload de Imagens

| Propriedade  | Tipo     | Descrição              |
| ------------ | -------- | ---------------------- |
| `uploadItem` | `string` | Carregamento de imagem |

```jsx
SchemaUi.schema = {
  title: 'Configuração do schema',
  type: 'object',
  properties: {
   uploadItem: {
      type: 'string',
      title: 'Upload de Imagem',
      widget: {
        'ui:widget': 'image-uploader',
        classNames: 'bg-white-30 ba b--light-gray ph3 mb3',
      },
    },
  }
}
 ```
![Campos de Upload de imagem](https://img001.prntscr.com/file/img001/deFS9JA3SDSDdNsqMHDUww.png)

#### `uploadFile`
Campo de upload de arquivos

| Propriedade  | Tipo     | Descrição                |
| ------------ | -------- | ------------------------ |
| `uploadFile` | `string` | Carregamento de arquivos |

```jsx
SchemaUi.schema = {
  title: 'Configuração do schema',
  type: 'object',
  properties: {
    uploadFile: {
      type: 'string',
      title: 'Envie um arquivo',
      widget: {
        'ui:widget': 'file'
      }
    },
  }
}
 ```
![Campos de Upload de Arquivos](https://img001.prntscr.com/file/img001/cNSyNzdqQ72_zBZ9MA7PcQ.png)

#### `showMoreConfig`
Certas configurações podem ser mostradas condicionalmente com base no estado de outros campos. Por exemplo, um campo showMoreConfig revelará campos adicionais como numberItem quando ativado.

| Propriedade         | Tipo      | Descrição                                       |
| ------------------- | --------- | ----------------------------------------------- |
| `numberItem`        | `number`  | Numero de exibição                              |
| `numberIntegerItem` | `integer` | Numero de exibição com seletor tipo barra range |

```jsx
SchemaUi.schema = {
  title: 'Configuração do schema',
  type: 'object',
  properties: {
    showMoreConfig: {
      title: 'Mostrar mais Configurações com dependencies',
      type: 'boolean',
      enum: [true, false],
      widget: {
        classNames: 'bg-black-30 ba b--light-gray ph3 mb3',
      },
    },
  },
  dependencies: {
    showMoreConfig: {
      oneOf: [
        {
          properties: {
            showMoreConfig: {
              enum: [true],
              title: 'Mostrar mais Configurações',
              type: 'boolean',
              widget: {
                classNames: 'bg-danger--faded ba b--light-gray ph3 mb3',
              }
            },
            numberItem: {
              title: 'Campo de Numero',
              type: 'number',
              default: 8,
              description: 'Esse campo é apenas para números'
            },
            numberIntegerItem: {
              title: 'Campo de Numero Inteiro Com Range',
              type: 'integer',
              default: 10,
              minimum: 10,
              maximum: 100,
              multipleOf: 10,
              widget: {
                "ui:widget": "range",
              }
            },
          },
        },
      ],
    },
  },
}
 ```
 ![Campos de numeros](https://img001.prntscr.com/file/img001/VOpZGSx2Q0KZcyujGXt2jg.png)

### Estilização campos do Site Edito usando Tachyons
#### `widget classNames `
##### Dynamic Configuration with Dependencies
Utiliza as classes do Tachyons para estilizar o bloco do site editor e deixa com a aparência mais agradável.
| Propriedade  | Tipo     | Descrição       |
| ------------ | -------- | --------------- |
| `classNames` | `string` | Classe Tachyons |

```diff
SchemaUi.schema = {
  title: 'Configuração do schema',
  type: 'object',
  properties: {
   classeItem: {
      type: 'string',
      title: 'Teste de Classe',
      widget: {
+        classNames: 'bg-white-30 ba b--light-gray ph3 mb3',
      },
    },
  }
}
 ```

 ![Campos de Class Style](https://img001.prntscr.com/file/img001/4sHRL5dgT6-nqiQ7bzScmQ.png)

## 📌 Exemplo Completo de implementação em componentes

```tsx
<SchemaUi
  titleItem="Configuração Avançada"
  activeItem={true}
  textProps={{
    titleItem: "Texto de Exemplo",
    passwordItem: "segredo123",
    descriptionItem: "Este é um campo de textarea."
  }}
  selectProps={{
    selectItem: "#000",
    reference: "option #2"
  }}
  colorProps={{
    colorItem: "#ff0000"
  }}
  dataProps={{
    dataItem: "2025-02-21",
    dataTimeItem: "2025-02-21T15:00:00"
  }}
/>
```

📖 Documentação
Para mais detalhes sobre a estrutura do schema, consulte a [documentação oficial do rjsf](https://github.com/rjsf-team/react-jsonschema-form).

## 🤝 Contribuição
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://br.linkedin.com/in/gblcintra"><img src="https://avatars.githubusercontent.com/u/15270961?v=4?s=100" width="100px;" alt="Gabriel Cintra"/><br /><sub><b>Gabriel Cintra</b></sub></a><br /><a href="https://github.com/gblcintra/schema-ui/commits?author=gblcintra" title="Code">💻</a> <a href="https://github.com/gblcintra/schema-ui/commits?author=gblcintra" title="Documentation">📖</a> <a href="#maintenance-gblcintra" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

Sinta-se à vontade para contribuir com melhorias! Basta abrir uma issue ou pull request no repositório.

## Como Contribuir
1. Faça um fork do repositório.
2. Crie uma branch para a sua feature (`git checkout -b feature/MinhaFeature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`).
4. Envie a branch para o repositório remoto (`git push origin feature/MinhaFeature`).
5. Abra um Pull Request no GitHub.

Se você encontrou algum bug ou tem uma sugestão, abra uma issue ou um pull request!
