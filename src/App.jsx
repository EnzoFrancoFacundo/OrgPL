import React, { useState } from 'react';

export default function App() {
  // -------------------------------------------------------------
  // 1. ESTADOS (State) DA APLICAÇÃO
  // -------------------------------------------------------------

  // Estado inicial com algumas músicas de exemplo
  const [musicas, setMusicas] = useState([
    { id: 1, nome: "Bohemian Rhapsody", artista: "Queen", genero: "Rock", ouvida: true },
    { id: 2, nome: "As It Was", artista: "Harry Styles", genero: "Pop", ouvida: false },
    { id: 3, nome: "Chega de Saudade", artista: "Tom Jobim", genero: "Bossa Nova", ouvida: false }
  ]);

  // Estados para controlar o formulário de cadastro (Formulário Controlado)
  const [nome, setNome] = useState("");
  const [artista, setArtista] = useState("");
  const [genero, setGenero] = useState("Pop"); // Valor padrão inicial

  // -------------------------------------------------------------
  // 2. FUNÇÕES DE MANIPULAÇÃO (Handled Events)
  // -------------------------------------------------------------

  // Função para cadastrar uma nova música
  const adicionarMusica = (event) => {
    // Impede o recarregamento padrão da página ao enviar o formulário
    event.preventDefault();

    // Validação simples: não permite cadastrar com campos vazios
    if (!nome.trim() || !artista.trim()) {
      alert("Por favor, preencha o nome da faixa e o artista!");
      return;
    }

    // Cria um novo objeto para a música
    const novaMusica = {
      id: Date.now(), // Gera um ID único baseado no timestamp atual
      nome: nome,
      artista: artista,
      genero: genero,
      ouvida: false // Toda música nova começa como "não ouvida" (A Ouvir)
    };

    // Atualiza a lista de músicas mantendo a imutabilidade (usando o spread operator ...)
    setMusicas([...musicas, novaMusica]);

    // Limpa os campos do formulário após cadastrar
    setNome("");
    setArtista("");
    setGenero("Pop");
  };

  // Função para alternar o status da música (Ouvida / A Ouvir)
  const alternarStatus = (id) => {
    // Usamos .map() para criar um novo array atualizado (Imutabilidade)
    const listaAtualizada = musicas.map((musica) => {
      if (musica.id === id) {
        // Inverte o valor booleano da propriedade 'ouvida'
        return { ...musica, ouvida: !musica.ouvida };
      }
      return musica;
    });

    setMusicas(listaAtualizada);
  };

  // Função para excluir uma música da lista
  const excluirMusica = (id) => {
    // Usamos .filter() para criar uma nova lista sem a música do ID selecionado
    const listaFiltrada = musicas.filter((musica) => musica.id !== id);
    setMusicas(listaFiltrada);
  };

  // -------------------------------------------------------------
  // 3. INTERFACE VISUAL (JSX)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-2xl mx-auto">

        {/* Cabeçalho */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">
            🎵 Minha Playlist
          </h1>
          <p className="text-slate-400">Organize suas músicas favoritas de forma simples!</p>
        </header>

        {/* REQUISITO 1: Formulário Controlado */}
        <section className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-purple-300">Cadastrar Nova Música</h2>

          <form onSubmit={adicionarMusica} className="flex flex-col gap-4">
            {/* Campo 1: Nome da Faixa */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">
                Nome da Faixa:
              </label>
              <input
                type="text"
                placeholder="Ex: Hotel California"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Campo 2: Artista */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">
                Artista / Banda:
              </label>
              <input
                type="text"
                placeholder="Ex: Eagles"
                value={artista}
                onChange={(e) => setArtista(e.target.value)}
                className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Campo 3: Gênero Musical */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">
                Gênero Musical:
              </label>
              <select
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:outline-none focus:border-purple-500"
              >
                <option value="Pop">Pop</option>
                <option value="Rock">Rock</option>
                <option value="Sertanejo">Sertanejo</option>
                <option value="MPB / Bossa Nova">MPB / Bossa Nova</option>
                <option value="Hip-Hop / Rap">Hip-Hop / Rap</option>
                <option value="Eletrônica">Eletrônica</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            {/* Botão de Envio */}
            <button
              type="submit"
              className="mt-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 cursor-pointer shadow-md"
            >
              + Adicionar à Playlist
            </button>
          </form>
        </section>

        {/* Lista de Músicas */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-purple-300">Sua Lista ({musicas.length})</h2>
          </div>

          {/* Se a lista estiver vazia, exibe uma mensagem */}
          {musicas.length === 0 ? (
            <div className="text-center p-8 bg-slate-800/50 rounded-xl border border-dashed border-slate-700 text-slate-400">
              Sua playlist está vazia. Adicione novas músicas acima! 🎧
            </div>
          ) : (
            /* REQUISITO 2: Renderização Dinâmica com .map() e propriedade key */
            <div className="flex flex-col gap-3">
              {musicas.map((musica) => (
                <div
                  key={musica.id}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition duration-200 ${
                    musica.ouvida
                      ? "bg-slate-800/60 border-slate-700/60 opacity-75"
                      : "bg-slate-800 border-slate-700 hover:border-purple-500/50"
                  }`}
                >
                  {/* Informações da Música */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-lg font-bold ${
                          musica.ouvida ? "line-through text-slate-400" : "text-white"
                        }`}
                      >
                        {musica.nome}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-700/50">
                        {musica.genero}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm">{musica.artista}</p>
                  </div>

                  {/* Ações (Alternar Status e Excluir) */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    
                    {/* REQUISITO 3: Botão para Alternar Status */}
                    <button
                      onClick={() => alternarStatus(musica.id)}
                      className={`text-xs px-3 py-2 rounded-lg font-medium transition cursor-pointer ${
                        musica.ouvida
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-900"
                          : "bg-amber-950 text-amber-300 border border-amber-800 hover:bg-amber-900"
                      }`}
                      title="Clique para mudar o status"
                    >
                      {musica.ouvida ? "✓ Ouvida" : "⏳ A Ouvir"}
                    </button>

                    {/* REQUISITO 4: Botão para Excluir com .filter() */}
                    <button
                      onClick={() => excluirMusica(musica.id)}
                      className="text-xs bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 px-3 py-2 rounded-lg transition cursor-pointer"
                      title="Excluir música"
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}