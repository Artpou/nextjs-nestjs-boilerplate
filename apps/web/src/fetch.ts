import { cookies } from "next/headers";

export const get = async (route: string) => {
  try {
    const res = await fetch(`http://localhost:5002/${route}`, {
      credentials: "include",
      headers: {
        Cookie: (await cookies()).toString(),
      },
    });
    return res.json();
  } catch (_err) {
    console.log(`fetch error for /${route}`);
  }
};
