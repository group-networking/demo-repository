const conectarBanco = require("./db"); // Importa a função que criamos no passo anterior

async function migrate() {
  try {
    // 1. Abre a conexão com o arquivo SQLite
    const db = await conectarBanco();

    // 2. Ativa o suporte a chaves estrangeiras (obrigatório no SQLite)
    await db.exec("PRAGMA foreign_keys = ON;");

    // 3. Criação da tabela de usuários
    // Mudamos SERIAL para INTEGER PRIMARY KEY AUTOINCREMENT
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Tabela users OK");

    console.log("✅ Migration completa!");

    // 5. Fecha a conexão do banco antes de fechar o processo
    await db.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ Erro durante a migration:", err.message);
    process.exit(1);
  }
}

migrate();
