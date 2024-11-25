import React from "react";
import { useNavigate } from "react-router-dom";
import fetchWithCSRF from '../csurf';

function Cadastro() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      nome: formData.get("nome"),
      telefone: formData.get("telefone") || null,
      email: formData.get("email"),
      website: formData.get("website") || null,
      experiencia: formData.get("experiencia"),
    };

    try {
      const response = await fetchWithCSRF("http://localhost:3001/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate("/");
      } else {
        alert("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro no servidor.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Cadastro</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div>
          <label className="block text-lg font-medium mb-2">Nome da pessoa (Obrigatório):</label>
          <input
            type="text"
            name="nome"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Telefone (Opcional):</label>
          <input
            type="text"
            name="telefone"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Endereço de e-mail (Obrigatório):</label>
          <input
            type="email"
            name="email"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Endereço WEB (Opcional):</label>
          <input
            type="url"
            name="website"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Experiência profissional (Obrigatório):</label>
          <textarea
            name="experiencia"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-24"
          ></textarea>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Enviar
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;