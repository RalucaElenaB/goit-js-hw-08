import Throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('form.feedback-form');
//Cheia obiectului va fi "feedback-form-state"
const FEEDBACK_FORM_STATE_KEY = 'feedback-form-state';

//La încărcarea paginii, verificați starea storage-ului,
//iar dacă există date salvate,
//completați câmpurile formularului cu aceste date.
//În caz contrar, câmpurile vor fi goale
function loadDataFromStorage() {
  try {
    const loadedData = localStorage.getItem(FEEDBACK_FORM_STATE_KEY);
    //deserializare
    const inputData = loadedData === null ? undefined : JSON.parse(loadedData);

    document.querySelector('textarea').value = inputData.message;
    document.querySelector('input').value = inputData.email;
  } catch (error) {
    feedbackForm.reset();
  }
}

//salvare inpput in localStorage
const storeFormFieldsInLocalStorage = event => {
  const feedbackStorage = event.currentTarget.elements;
  const email = feedbackStorage.email.value;
  const message = feedbackStorage.message.value;

  const feedbackStorageData = {
    email,
    message,
  };

  if (email != '' || message != '') {
    //serializare
    const serializedFeedbackStorageData = JSON.stringify(feedbackStorageData);

    localStorage.setItem(
      FEEDBACK_FORM_STATE_KEY,
      serializedFeedbackStorageData
    );
  }
};

//Când se trimite formularul, la evenimentul submit,
//ștergeți câmpurile din local storage și
//afișați în consolă obiectul cu câmpurile email, message și valorile lor curente.
const submitfeedbackForm = event => {
  event.preventDefault();
  const feedbackElements = event.currentTarget.elements;
  const email = feedbackElements.email.value;
  const message = feedbackElements.message.value;

  if (email == '' || message == '') {
    alert('The fields must be filled.');
    feedbackForm.reset();
  }

  const feedbackFormData = {
    email,
    message,
  };

  console.log(feedbackFormData);
  feedbackForm.reset();
  localStorage.removeItem(FEEDBACK_FORM_STATE_KEY);
};

loadDataFromStorage();
Throttle(storeFormFieldsInLocalStorage, 500);

// event listeners and function calls
feedbackForm.addEventListener('input', storeFormFieldsInLocalStorage);
feedbackForm.addEventListener('submit', submitfeedbackForm);
