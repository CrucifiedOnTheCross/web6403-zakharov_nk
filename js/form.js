class Submission {
  constructor({ username, password, email, agree }) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.agree = !!agree;
    this.timestamp = new Date().toISOString();
  }
  print() {
    console.group('Данные формы');
    console.log(`Пользователь: ${this.username}`);
    console.log(`Email: ${this.email || 'Не указан'}`);
    console.log(`Согласие: ${this.agree ? 'Да' : 'Нет'}`);
    console.log(`Время: ${this.timestamp}`);
    console.groupEnd();
  }
}

const form = document.getElementById('authForm');
const messageEl = document.getElementById('formMessage');

const validators = {
  username: (value) => value.length >= 3,
  password: (value) => value.length >= 8,
  email: (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
};

function setInputStatus(input, isValid, errorId) {
  const errorEl = document.getElementById(errorId);
  if (isValid) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    if (errorEl) errorEl.style.display = 'none';
  } else {
    input.classList.remove('valid');
    input.classList.add('invalid');
    if (errorEl) errorEl.style.display = 'block';
  }
  return isValid;
}

if (form) {
  form.username.addEventListener('input', (e) => {
    setInputStatus(e.target, validators.username(e.target.value.trim()), 'usernameError');
  });

  form.password.addEventListener('input', (e) => {
    setInputStatus(e.target, validators.password(e.target.value), 'passwordError');
  });

  form.email.addEventListener('input', (e) => {
    setInputStatus(e.target, validators.email(e.target.value.trim()), 'emailError');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      username: form.username.value.trim(),
      password: form.password.value,
      email: form.email.value.trim(),
      agree: form.agree.checked
    };

    const isUserValid = validators.username(data.username);
    const isPassValid = validators.password(data.password);
    const isEmailValid = validators.email(data.email);

    if (!isUserValid || !isPassValid || !isEmailValid) {
      messageEl.textContent = 'Пожалуйста, исправьте ошибки в форме.';
      messageEl.style.color = '#ff6b6b';
      return;
    }

    const submission = new Submission(data);
    submission.print();

    messageEl.textContent = 'Отправка данных...';
    messageEl.style.color = 'var(--accent-2)';

    try {
      const res = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Network Error');
      const json = await res.json();
      console.log('Ответ сервера:', json);
      messageEl.textContent = 'Успешно отправлено!';
      messageEl.style.color = '#5a96b8';
      form.reset();
      [form.username, form.password, form.email].forEach(input => {
        input.classList.remove('valid', 'invalid');
      });
    } catch (err) {
      console.error(err);
      messageEl.textContent = 'Ошибка отправки: ' + err.message;
      messageEl.style.color = '#ff6b6b';
    }
  });
}