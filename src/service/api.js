const BASE_URL = "http://localhost/backend";

export async function pingBackend() {
    const res = await fetch(`${BASE_URL}/test/ping.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            msg: "oi backend 👋"
        })
    });

    return res.json();
}
