import bcrypt from "bcrypt";

async function generateHash() {
  const plainTextPassword = "123456";
  const hash = await bcrypt.hash(plainTextPassword, 10);
  console.log("Nuevo hash:", hash);
}

generateHash();