import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetchWithCSRF from "../csurf";

function UsuarioDetalhes() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetchWithCSRF(`http://localhost:3001/usuarios/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUsuario(data);
        } else {
          console.error("Erro ao buscar os detalhes do usuário.");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <p className="text-gray-600">Carregando...</p>
      ) : !usuario ? (
        <p className="text-gray-600">Usuário não encontrado.</p>
      ) : (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">{usuario.nome}</h1>
          <p>
            <strong>Email:</strong> {usuario.email}
          </p>
          {usuario.telefone && <p><strong>Telefone:</strong> {usuario.telefone}</p>}
          {usuario.website && <p><strong>Website:</strong> {usuario.website}</p>}
          <p>
            <strong>Experiência:</strong> {usuario.experiencia}
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Voltar para a Home
          </button>
        </div>
      )}
    </div>
  );
}

export default UsuarioDetalhes;