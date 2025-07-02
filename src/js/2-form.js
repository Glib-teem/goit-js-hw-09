const formData = {
  email: '',
  message: '',
};

// Ключ для локального сховища
const STORAGE_KEY = 'feedback-form-state';

// Посилання на форму
const form = document.querySelector('.feedback-form');

// 2. Відстежую зміну у формі через подію input та збереження у локальне сховище
form.addEventListener('input', event => {
  // Перевіряємо, яке поле змінилося і оновлюємо formData
  if (event.target.name === 'email') {
    formData.email = event.target.value.trim(); // .trim() для видалення пробілів по краях
  } else if (event.target.name === 'message') {
    formData.message = event.target.value.trim();
  }

  // Зберігаю оновлений об'єкт formData у локальне сховище
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// 3. При завантаженні сторінки перевірка та заповнення форми
window.addEventListener('load', () => {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);

      // Заповнюю formData та поля форми
      formData.email = parsedData.email || ''; // Забезпечуємо, що не буде undefined
      formData.message = parsedData.message || ''; // Забезпечуємо, що не буде undefined

      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    } catch (error) {
      console.error('Помилка при парсингу даних з локального сховища:', error);
      // Якщо дані пошкоджені, можна очистити сховище, щоб уникнути подальших помилок
      localStorage.removeItem(STORAGE_KEY);
    }
  }
});

// 4. Обробка відправлення форми
form.addEventListener('submit', event => {
  event.preventDefault(); // Запобігаємо стандартній поведінці відправлення форми (перезавантаження сторінки)

  // Оновлюю formData перед перевіркою на випадок, якщо користувач не відпустив клавішу після останнього вводу
  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();

  // Перевірка на заповненість полів
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields'); // Показуємо сповіщення
    return; // Перериваємо виконання функції, якщо поля не заповнені
  }

  // Якщо всі поля заповнені:
  console.log(formData); // Виводимо об'єкт formData у консоль

  // Очищаю локальне сховище
  localStorage.removeItem(STORAGE_KEY);

  // Очищаю об'єкт formData
  formData.email = '';
  formData.message = '';

  // Очищаю поля форми
  form.reset(); // Метод form.reset() очищає всі поля форми
});
