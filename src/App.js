import axios from "axios";
import React, { useEffect, useState } from "react";


function App() {

  const [token, setToken] = useState('');
  const [pessoas, setPessoas] = useState([]);
  const [resPost, setResPost] = useState();
  const [codigoDB, setCodigoDb] = useState();
  const [cadastro, setCadastro] = useState({
    nome: '',
    email: '',
    data_nascimento: '1958-09-04',
    data_criacao: '2021-12-01 08:54:21',
  })

  useEffect(() => {
    getToken()
  }, [token])

  let submit;

  const getToken = async () => {
    try {
      let response = await axios.get('http://168.138.231.9:10666/get-token', {
        auth: {
          username: 'Bryan',
          password: '46259249870'
        }
      });
      let data = response.data.token;
      console.log(data)
      setToken(data);
      localStorage.setItem("token", data)

    } catch (error) {
      console.log(error)
    }
  }

  const getPessoas = async () => {
    try {
      let response = await axios.get('http://168.138.231.9:10666/cadastro', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(response);
      let data = response.data;
      console.log(data);
      setPessoas(data);
    } catch (error) {
      console.log(error)
    }
  }

  async function postPessoa(e) {
    e.preventDefault()
    const pessoa = {
      nome: cadastro.nome,
      email: cadastro.email,
      data_criacao : cadastro.data_criacao,
      data_nascimento : cadastro.data_nascimento
    }

    try {
      let response = await axios.post('http://168.138.231.9:10666/cadastro', pessoa, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(response);
      let data = response.data.mensagem;
      console.log(data);
      setResPost(data);
      setCadastro((prev) => ({...prev, nome: '', email: ''}))
    } catch (error) {
      console.log(error)
    }
  }
  async function postPessoaDB(e) {
    e.preventDefault()

    try {
      let response = await axios.get(`http://localhost:3001/pessoa/cadastroDBteste/${codigoDB}`)
      console.log(response);
      let data = response.data.mensagem;
      console.log(data);
      setResPost(data);
      setCodigoDb('');
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="App">
      <p>{token}</p>
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
        {submit}
    </div>
  );
}

export default App;
