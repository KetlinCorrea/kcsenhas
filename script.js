// Função para gerar a senha
function generatePassword(length, includeUppercase, includeNumbers, includeSpecialChars) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_-+=';

    let characters = lowercase;

    if (includeUppercase) characters += uppercase;
    if (includeNumbers) characters += numbers;
    if (includeSpecialChars) characters += specialChars;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

// Referências aos elementos HTML
const generateButton = document.getElementById('generate-btn');
const passwordDisplay = document.getElementById('password-display');
const lengthInput = document.getElementById('password-length');
const includeUppercase = document.getElementById('include-uppercase');
const includeNumbers = document.getElementById('include-numbers');
const includeSpecialChars = document.getElementById('include-special');
const copyButton = document.getElementById('copy-btn');
const copyMessage = document.getElementById('copy-message');

// Evento para gerar a senha quando o botão for clicado
generateButton.addEventListener('click', () => {
    const length = parseInt(lengthInput.value);
    const uppercase = includeUppercase.checked;
    const numbers = includeNumbers.checked;
    const specialChars = includeSpecialChars.checked;

    if (length < 4 || length > 20) {
        alert("Por favor, escolha um comprimento entre 4 e 20.");
        return;
    }

    const password = generatePassword(length, uppercase, numbers, specialChars);
    passwordDisplay.textContent = password;
    copyMessage.textContent = ''; // Reseta a mensagem de cópia
});

// Função para copiar a senha para a área de transferência
copyButton.addEventListener('click', () => {
    const password = passwordDisplay.textContent;
    if (password) {
        navigator.clipboard.writeText(password)
            .then(() => {
                copyMessage.textContent = 'Senha copiada para a área de transferência!';
                copyMessage.style.color = '#0288d1';
            })
            .catch(() => {
                copyMessage.textContent = 'Falha ao copiar a senha.';
                copyMessage.style.color = 'red';
            });
    } else {
        copyMessage.textContent = 'Nenhuma senha gerada ainda.';
        copyMessage.style.color = 'red';
    }
});
