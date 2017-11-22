# Front-End [TestIt](http://testitapp.herokuapp.com/#/)

Esse projeto contém o Front-End do WebApp TestIt, a aplicação foi feita por estudantes da FATEC Sorocaba, e tem como propósito de ser uma plataforma onde professores podem criar provas em geral e os alunos podem realizar em um ambiente fácil de usar. Um dos diferenciais do TestIt é auxiliar o professor com uma pré-correção de questões dissertativas.

## Pré-Requisitos

* Node (versão >= 6.0)
* [Yarn](https://yarnpkg.com/lang/en/docs/install/)

## Downloads

* Linux
```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
$ nvm install stable
$ nvm use stable
```
* [Windows](https://github.com/coreybutler/nvm-windows/releases)


## Como Começar

```
git clone git@github.com:IC-TestIt/Front-End.git
cd Front-End
yarn install
yarn run dev
````

**Gerando uma build:**
`$ yarn run build`

**Servindo uma build local:**
`$ yarn start`
Por padrão, o servidor iniciará na porta 3000. Caso prefica uma porta diferente, utilize o comando abaixo:
`$ PORT=9000 yarn start`

## Contribuição

* Deve-se criar uma branch no seguinte padrão
    * `bug/bug-que-sera-corrigido`
    * `feat/nova-funcionalidade`
    * `impv/funcionalidade-a-ser-melhorada`
* Depois é só abrir um PR para a master e solicitar o Review do Time de Front-End

## Referencias

* [Vue.js](https://vuejs.org/)
* [Vuetify](https://vuetifyjs.com/vuetify/quick-start)
* [Webpack](https://webpack.js.org/)

## Dúvidas

* [Slack](https://join.slack.com/t/ic-testit/shared_invite/enQtMjUzMDU3MzgwMDIwLTI0NGNiYzgxMDEwYzQ5MjBkODcxZDg0MTcyZGFlMWQzYTUyMWJmNmJlZWU2OTFkYjBjNGU2MTIwMDJmOTI0ZDQ)

## Colaboradores

* [Medson Oliveira](http://github.com/medson10)
* [Vitor Manfré](http://github.com/vitormdias)
* [Matheus Novais](https://github.com/matheusnovais95)
* [Gabriel Teles](https://github.com/gabteles)
