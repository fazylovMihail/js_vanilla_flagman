import renderMessage from "./render/message.js";
import { formMessageValues } from "./contants.js";
import { sendForm } from "./components.js";

async function handleQuestionSubmit() {
  const formData = Object.fromEntries(new FormData(this.form));
  this.form.reset();

  try {
    await sendForm(formData);
    document.querySelector('body').append(renderMessage(formMessageValues.send));
  } catch (error) {
    console.error('Ошибка отправки', error);
    document.querySelector('body').append(renderMessage(formMessageValues.warning));
  }
}

function getQuestionValidator(questionsForm) {
  const validator = new JustValidate(questionsForm);

  validator.addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Поле обязательно для заполнения'
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Имя должно быть не короче 3 символов'
    },
    {
      rule: 'maxLength',
      value: 20,
      errorMessage: 'Имя должно быть не больше 20 символов'
    }
  ]);
  // Поле для почты
  validator.addField('#email', [
    {
      rule: 'required',
      errorMessage: 'Поле обязательно для заполнения'
    },
    {
      rule: 'email',
      errorMessage: 'Неправильный email'
    }
  ]);
  // Поле чекбокса конфидециальности
  validator.addField('#agree', [
    {
      rule: 'required',
      errorMessage: 'Пожалуйста, примите условия'
    }
  ]);

  return validator;
}

export { handleQuestionSubmit, getQuestionValidator }