let id = "D:/Repos/vite-plugin-vue-scaffold-build/node_modules/.pnpm/.high.js@2.28.4_vue@3.2.33/node_modules/naive-ui/es";

if (id.includes("@")) {
  let split = id.split("@");
  id = id.split("@")[split.length - 1];
}
id = id.slice(id.lastIndexOf("/") + 1);
if (id.includes(".")) {
  id = id.slice(0, id.lastIndexOf("."));
}
console.log(id);