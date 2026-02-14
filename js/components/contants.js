const pageSize = 6; // Кол-во карточек на одной странице
const formMessageValues = {
  send: {
    title: 'Благодарим за обращение!',
    desc: 'Мы получили вашу заявку и свяжемся с вами в ближайшее время',
    url: 'images/sprite/icon-check-circle.svg'
  },
  warning: {
    title: 'Не удалось отправить обращение',
    desc: 'Что-то пошло не так, попробуйте отправить форму еще раз. Если ошибка повторится — свяжитесь со службой поддержки.',
    url: 'images/sprite/icon-warning.svg'
  }
}

export { pageSize, formMessageValues }