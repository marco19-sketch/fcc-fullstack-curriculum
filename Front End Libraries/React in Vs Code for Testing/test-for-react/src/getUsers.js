export async function getUsers() {
  // Fake delay to simulate a real API
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mocked user data
  return [
    { id: 1, name: "Lionel Messi", email: "messi@football.com" },
    { id: 2, name: "Cristiano Ronaldo", email: "ronaldo@football.com" },
    { id: 3, name: "Kylian Mbappe", email: "mbappe@football.com" },
  ];
}
