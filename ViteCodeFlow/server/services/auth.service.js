export function loginService(email, password) {
    // 🔴 FUTURO: aqui vai o PostgreSQL
    // por enquanto é fake

    return {
        success: true,
        user: {
            email,
            name: "Usuário Teste",
        },
        token: "fake-jwt-token",
    };
}
