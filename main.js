import './style.css';

const form = document.getElementById('promptForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showSpinner();
    const formData = new FormData(form);
    const prompt = formData.get('prompt');

    try {
        const response = await fetch('http://localhost:5172/fireshipProject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });
        if (response.ok) {
            const { image } = await response.json();

            const result = document.getElementById('result');
            result.innerHTML = `<img src="${image}" width="512" />`;
        } else {
            const err = await response.text();
            alert(err);
            console.error(err);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
    hideSpinner();
});

function showSpinner() {
    const button = document.querySelector('button');
    button.disabled = true;
    button.innerHTML = 'Dreaming... <span class="spinner">🧠</span>';
  }
  
  function hideSpinner() {
    const button = document.querySelector('button');
    button.disabled = false;
    button.innerHTML = 'Dream';
  }