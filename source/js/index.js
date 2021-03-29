(function() {
  const form = document.querySelector('.form');
  const formSteps = form.querySelectorAll('.form__step-name');
  const formScreensMain = form.querySelector('.form__main');
  const submitDelivery = form.querySelector('button[data-form="next"]');
  const submitPayment = form.querySelector('button[data-form="pay"]');
  const fieldsDelivery = form.querySelector('.form__screen_delivery').querySelectorAll('input, select');
  const fieldsPayment = form.querySelector('.form__screen_payment').querySelectorAll('input, select');
  const formSuccess = document.querySelector('.order__screen_success');

  const index = document.getElementById('index');
  const cardnumber = document.getElementById('cardnumber');
  const cardexpires = document.getElementById('cardexpires');
  const cvv = document.getElementById('cvv');

  Inputmask({ "mask" : "999999"}).mask(index);
  Inputmask({ "mask" : "9999 9999 9999 9999"}).mask(cardnumber);
  Inputmask({ "mask": "99 / 99" }).mask(cardexpires);
  Inputmask({ "mask" : "999"}).mask(cvv);

  submitDelivery.addEventListener('click', function(evt) {
    evt.preventDefault();
    let error = 0;

    fieldsDelivery.forEach((field) => {
      if (field.value.length === 0) {
        field.classList.add('error');
        error++;
      } else {
        field.classList.remove('error');
        error !== 0 ? error-- : error;
      }
    });

    if (error === 0) {
      formScreensMain.classList.add('form__main_next');
      formSteps[0].classList.remove('form__step-name_current');
      formSteps[1].classList.add('form__step-name_current');
    }

  });

  submitPayment.addEventListener('click', function(evt) {
    evt.preventDefault();
    let error = 0;

    fieldsPayment.forEach((field) => {
      if (field.value.length === 0) {
        field.classList.add('error');
        error++;
      } else {
        field.classList.remove('error');
        error !== 0 ? error-- : error;
      }
    });

    if (error === 0) {
      formSuccess.classList.add('show');
    }

  });


})()