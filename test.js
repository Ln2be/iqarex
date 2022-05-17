setInterval(() => {
  const date = Date.now();
  const hour = new Date(date).getHours();
  console.log(hour);
}, 1000);
