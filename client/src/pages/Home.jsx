import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchWithCSRF from '../csurf';

function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetchWithCSRF("http://localhost:3001/usuarios");
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Usuários</h1>
      
      <div className="w-full max-w-md flex justify-end mb-4">
        <button
          onClick={() => navigate("/cadastro")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Adicionar Usuário
        </button>
      </div>

      <ul className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {usuarios.map((usuario) => (
          <li
            key={usuario.id}
            onClick={() => navigate(`/usuarios/${usuario.id}`)}
            className="p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
          >
            {usuario.nome}
          </li>
        ))}
        {usuarios.length === 0 && (
          <li className="p-4 text-gray-500 text-center">Nenhum usuário cadastrado.</li>
        )}
      </ul>
    </div>
  );
}

export default Home;