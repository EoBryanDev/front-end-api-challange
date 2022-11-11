import axios from "axios";
import { useEffect, useState } from "react";

import './styles.css';

function Dash() {
  const [pessoas, setPessoas] = useState([]);
  const [cadastro, setCadastro] = useState({
    nome: '',
    email: '',
    data_nascimento: '1958-09-04',
    data_criacao: '2021-12-01 08:54:21',
  })
  const [resPost, setResPost] = useState();
  const [codigoDB, setCodigoDb] = useState();

  const getPessoas = async () => {
    try {
      let response = await axios.get('http://168.138.231.9:10666/cadastro', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
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
      data_criacao: cadastro.data_criacao,
      data_nascimento: cadastro.data_nascimento
    }

    try {
      let response = await axios.post('http://168.138.231.9:10666/cadastro', pessoa, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response);
      let data = response.data.mensagem;
      console.log(data);
      setResPost(data);
      setCadastro((prev) => ({ ...prev, nome: '', email: '' }))
      setTimeout(() => {
        setResPost('');
      }, 2000);
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
      setTimeout(() => {
        setResPost('');
      }, 2000);
    } catch (error) {
      console.log(error)
    }
  }
  async function postPessoaMongoDB(e) {
    e.preventDefault()

    try {
      let response = await axios.post(`http://localhost:3001/db/cadastro/${codigoDB}`)
      console.log(response);
      let data = response.data.mensagem;
      console.log(data);
      setResPost(data);
      setCodigoDb('');
      setTimeout(() => {
        setResPost('');
      }, 2000);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPessoas()
  }, [resPost])

  return (
      <div className="container">
        <div className="tableContainer">
          <div class="outer-wrapper">
            <div class="table-wrapper">
              <div>
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
              </div>
            </div>
          </div>
        </div>
        <div className="operacoesContainer">
          <div className="cadastro">
            
            
            <form onSubmit={postPessoa}>
              <h2>Cadastro Senior</h2>
              <label>Nome</label>
              <input
                type="text"
                value={cadastro.nome}
                onChange={(e) => setCadastro((prevState) => ({ ...prevState, nome: e.target.value }))}
              />
              <label>Email</label>
              <input
                type="email"
                value={cadastro.email}
                onChange={(e) => setCadastro((prevState) => ({ ...prevState, email: e.target.value }))}
              />
              <button type="submit">Cadastrar</button>
              {resPost && (
              resPost
            )}
            </form>
          </div>
          <div className="cadastroBanco">
            <form onSubmit={postPessoaDB}>
              <label>Cadastro Db</label>
              <input
                type="text"
                value={codigoDB}
                onChange={(e) => setCodigoDb(e.target.value)}
              />
              <button type="submit">cadastrar teste db</button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Dash;