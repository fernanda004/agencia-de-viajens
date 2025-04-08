# TravelManager 🌍✈️

Bem-vindo ao repositório do **TravelManager**, um site desenvolvido para cadastrar e gerenciar viagens de forma simples e intuitiva!

## 👋 Sobre o Projeto
O **TravelManager** permite que os usuários cadastrem suas viagens informando o nome do local, a data, o valor e a quantidade de vagas disponíveis. Todos os dados são armazenados em um banco de dados **MySQL** e exibidos de forma organizada em uma lista abaixo do formulário de cadastro. O site combina design intuitivo e funcionalidades interativas para oferecer uma experiência fluida e acessível.

## 🎮 Estrutura do Site
1. **Cabeçalho**
   - Exibe o nome do site.
   - O fundo do site contém uma imagem representativa de um garoto indo atrás de um globo, simbolizando a jornada e o desejo de explorar novos destinos.

2. **Seção de Cadastro de Viagens**
   - Formulário com quatro campos: **Nome do Local**, **Data**, **Valor** e **Vagas**.
   - Botão de cadastro estilizado em **verde**.
   - Os dados cadastrados são enviados para um banco de dados **MySQL**.

3. **Lista de Viagens**
   - Exibe as viagens cadastradas.
   - Mostra o **ID**, **nome do local**, **data**, **valor** e **quantidade de vagas disponíveis**.
   - Seção estilizada em **verde** para manter a identidade visual do site.

## 🚀 Tecnologias Utilizadas
- **HTML**: Estruturação do conteúdo.
- **CSS**: Estilização e organização visual.
- **JavaScript**: Interatividade e manipulação dos dados do formulário.
- **MySQL**: Armazenamento das viagens cadastradas.
- **Imagens (URLs)**: Utilizadas no fundo do site para representar a temática de viagens.

## 📚 Como Utilizar
1. Clone este repositório ou faça o download do código:
   ```sh
   git clone https://github.com/seu-usuario/travelmanager.git
   ```
2. Configure o banco de dados **MySQL** e crie a tabela para armazenar as viagens:
   ```sql
   CREATE DATABASE agencia_viagens;
   USE agencia_viagens;

   CREATE TABLE viagens (
       id INT AUTO_INCREMENT PRIMARY KEY,
       destino VARCHAR(255) NOT NULL,
       data_viagem DATE NOT NULL,
       preco DECIMAL(10,2) NOT NULL,
       vagas INT NOT NULL
   );

   SELECT * FROM viagens;
   ```
3. Abra o arquivo **index.html** no navegador para visualizar o site.
4. Cadastre viagens e veja-as listadas abaixo do formulário.

## ✨ Funcionalidades
✅ Cadastro de viagens informando o nome do local, data, valor e quantidade de vagas disponíveis.  
✅ Armazenamento dos dados no banco de dados **MySQL**.  
✅ Listagem automática das viagens cadastradas, exibindo **ID**, **nome do local**, **data**, **valor** e **vagas**.  
✅ Interface intuitiva e estilizada com **CSS**.  
✅ Interatividade com **JavaScript**.  

## 📌 Futuras Melhorias
🔹 Adicionar categorias de destinos predefinidos para facilitar a escolha.  
🔹 Implementar um mapa interativo mostrando os locais cadastrados.  
🔹 Melhorar a interface gráfica com **animações CSS e transições dinâmicas**.  
🔹 Criar um sistema de exclusão/edição das viagens cadastradas.  

## 📝 Licença
Este projeto foi criado para fins educacionais e não possui vínculos comerciais.

---
🚀 Desenvolvido para facilitar o gerenciamento de viagens! Aproveite sua jornada! 🌎✨
