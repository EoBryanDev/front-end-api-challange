import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

import './style.css';

function Home() {
  const [error, setError] = useState('');
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });
  //const [token, setToken] = useState('');
  


  const navigate = useNavigate();
 
  const getToken = async (e) => {
    e.preventDefault()
    try {
      let response = await axios.get('http://168.138.231.9:10666/get-token', {
        auth: {
          username: login.username,
          password: login.password
        }
      });
      let data = response.data.token;
      console.log(data);
      navigate("/dash");
      localStorage.setItem("token", data);

      login.username = '';
      login.password = '';


    } catch (error) {
      login.username = '';
      login.password = '';
      if(error.response.status === 401) setError('Usuário/Senha Inválido');
      setTimeout(() => {setError('')}, 2000)

    }
  }
  return (
    <div className="App">
      <div className="LoginContainer">
        <div className="FormContainer">
          <form onSubmit={getToken}>
            <label>Username:</label>
            <input
              type="text"
              value={login.username}
              onChange={(e) => setLogin((prevState) => ({ ...prevState, username: e.target.value }))}
            />
            <label>Password: </label>
            <input
              type="password"
              value={login.password}
              onChange={(e) => setLogin((prevState) => ({ ...prevState, password: e.target.value }))}
            />
            <button type="submit"> Login</button>
            {error &&(<p className="error">{error}</p>)}
          </form>
        </div>
      </div>

      <div className="ImgContainer">
        <img src="https://images.pexels.com/photos/2603464/pexels-photo-2603464.jpeg?cs=srgb&dl=pexels-aleksandar-pasaric-2603464.jpg&fm=jpg" alt="tech" className="cover" />
      </div>

      {/* <p>{token}</p>
      <button onClick={() => getPessoas()}>buscar pessoas da api externa</button>
        {cadastro.nome}
        {cadastro.email}
      <form onSubmit={postPessoa}>
        <label>Nome</label>
        <input 
          type="text" 
          value={cadastro.nome}
          onChange={(e) => setCadastro((prevState) => ({...prevState, nome: e.target.value}))} 
         />
        <label>Email</label>
        <input  
          type="email" 
          value={cadastro.email}
          onChange={(e) => setCadastro((prevState) => ({...prevState, email: e.target.value}))} 
        />
      <button type="submit">cadastrar teste</button>
      </form>
      <form onSubmit={postPessoaDB}>
        <label>Codigo para cadastro</label>
        <input 
          type="text" 
          value={codigoDB}
          onChange={(e) => setCodigoDb(e.target.value)} 
         />
      <button type="submit">cadastrar teste db</button>
      </form>
      <table>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Data Nasc</th>
          <th>Registro</th>
        </tr>

        {pessoas !== false ?
          pessoas.map((pessoa) => (
          <tr key={pessoa.codigo}>
            <td>{pessoa.codigo}</td>
            <td>{pessoa.nome}</td>
            <td>{pessoa.email}</td>
            <td>{pessoa.data_nascimento}</td>
            <td>{pessoa.data_criacao}</td>
          </tr>
          ))
          : ''}

      </table>
      {resPost && (
        resPost
      )}
        {submit}*/}
    </div>
  );
}

export default Home;
