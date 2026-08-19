import { prisma } from "./index.js";

async function main() {
  const users = await prisma.user.findMany();
  console.log("Connected. Users:", users);
}

main()
  .catch((e) => console.error("FAILED:", e))
  .finally(() => prisma.$disconnect());
