const container = document.getElementById('data-container');

async function fetchUsers() {
  if (!container.querySelector('table')) {
    container.innerHTML = '<div class="loader">Загрузка данных...</div>';
  }

  try {
    // _t нужен для предотвращения кэширования запроса браузером
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=5&_t=${Date.now()}`);
    
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const users = await response.json();
    renderTable(users);

  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    container.innerHTML = `<div class="form__error" style="display:block">Не удалось загрузить данные: ${error.message}</div>`;
  }
}

function renderTable(users) {
  let tableHtml = `
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Email</th>
          <th>Город</th>
        </tr>
      </thead>
      <tbody>
  `;

  users.forEach(user => {
    tableHtml += `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.address.city}</td>
      </tr>
    `;
  });

  tableHtml += '</tbody></table>';
  
  const time = new Date().toLocaleTimeString();
  tableHtml += `<div class="loader" style="text-align: right; font-size: 0.8em">Обновлено: ${time}</div>`;

  container.innerHTML = tableHtml;
}

// Запуск
fetchUsers();

// Обновление каждые 30 секунд
setInterval(fetchUsers, 30000);