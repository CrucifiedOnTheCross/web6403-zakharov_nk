class Submission {
  constructor({ username, password, email, agree }) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.agree = !!agree;
    this.timestamp = new Date().toISOString();
  }
  print() {
    const lines = [
      `Пользователь: ${this.username}`,
      `Email: ${this.email || '-'}`,
      `Согласие: ${this.agree ? 'да' : 'нет'}`,
      `Время: ${this.timestamp}`
    ];
    console.log(lines.join(' | '));
  }
}

const form = document.getElementById('authForm');
const messageEl = document.getElementById('formMessage');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      username: form.username.value.trim(),
      password: form.password.value,
      email: form.email.value.trim(),
      agree: form.agree.checked
    };
    const submission = new Submission(data);
    submission.print();
    messageEl.textContent = 'Отправка...';
    try {
      const res = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: data.username, email: data.email, agree: data.agree })
      });
      if (!res.ok) throw new Error('Network');
      const json = await res.json();
      messageEl.textContent = 'Успешно отправлено';
    } catch (err) {
      messageEl.textContent = 'Не удалось отправить данные';
    }
  });
}