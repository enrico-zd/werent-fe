export const fetchLogin = async (email: string, password: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || "Login gagal");
  }

  const data = await response.json();

  return {
    user: {
        name: data.user.name
    },
    token: data.access_token,
  }
};
