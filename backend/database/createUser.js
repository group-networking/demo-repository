const conectarBanco = require("./db"); // Importa a função que criamos para o SQLite
const bcrypt = require("bcryptjs");

async function findUserByEmail(email) {
  try {
    const db = await conectarBanco();
    // .get() retorna apenas o primeiro objeto ou undefined
    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    return user;
  } catch (err) {
    throw err;
  }
}

async function findUserByUsername(username) {
  try {
    const db = await conectarBanco();
    const user = await db.get("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    return user;
  } catch (err) {
    throw err;
  }
}

async function checkUserExists(username, email) {
  try {
    const [userByName, userByEmail] = await Promise.all([
      findUserByUsername(username),
      findUserByEmail(email),
    ]);
    if (userByName) return { exists: true, field: "username" };
    if (userByEmail) return { exists: true, field: "email" };
    return { exists: false };
  } catch (err) {
    throw err;
  }
}

async function registerUser(username, email, password) {
  try {
    const existsCheck = await checkUserExists(username, email);
    if (existsCheck.exists) {
      throw new Error(`DUPLICATE_${existsCheck.field.toUpperCase()}`);
    }
    const hash = await bcrypt.hash(password, 10);

    const db = await conectarBanco();
    // .run() executa comandos de escrita e retorna informações sobre as linhas afetadas
    const result = await db.run(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hash],
    );

    // Simula o 'RETURNING' buscando o usuário recém-criado usando o lastID
    return { id: result.lastID, username, email };
  } catch (err) {
    throw err;
  }
}

async function login(email, password) {
  try {
    const user = await findUserByEmail(email);
    if (!user) return { success: false, message: "Usuário não encontrado" };
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { password: _, ...userWithoutPassword } = user;
      return { success: true, user: userWithoutPassword };
    } else {
      return { success: false, message: "Senha incorreta" };
    }
  } catch (err) {
    throw err;
  }
}

async function searchUsers(query) {
  try {
    const db = await conectarBanco();
    // LIKE no SQLite já é case-insensitive por padrão para o alfabeto padrão
    const users = await db.all(
      `SELECT id, username, email FROM users 
             WHERE username LIKE ? OR email LIKE ?
             LIMIT 20`,
      [`%${query}%`, `%${query}%`],
    );
    return users;
  } catch (err) {
    throw err;
  }
}

async function deleteUser(id, password) {
  try {
    const db = await conectarBanco();
    const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);
    if (!user) throw new Error("Usuário não encontrado");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Senha incorreta");

    await db.run("DELETE FROM users WHERE id = ?", [id]);
    return { success: true };
  } catch (err) {
    throw err;
  }
}

async function changePassword(id, currentPassword, newPassword) {
  try {
    const db = await conectarBanco();
    const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);
    if (!user) throw new Error("Usuário não encontrado");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new Error("Senha atual incorreta");

    if (newPassword.length < 6)
      throw new Error("A nova senha precisa ter pelo menos 6 caracteres");

    const hash = await bcrypt.hash(newPassword, 10);
    await db.run("UPDATE users SET password = ? WHERE id = ?", [hash, id]);
    return { success: true };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  registerUser,
  findUserByEmail,
  findUserByUsername,
  checkUserExists,
  login,
  searchUsers,
  deleteUser,
  changePassword,
  getConversations,
};
