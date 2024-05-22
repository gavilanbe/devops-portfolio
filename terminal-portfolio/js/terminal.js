document.addEventListener("DOMContentLoaded", function() {
  const terminal = document.querySelector(".terminal");
  const outputElement = document.getElementById('output');
  const promptElement = document.getElementById('prompt');

  const inputHandler = (event) => {
      if (event.key === "Enter") {
          const inputArea = event.target;
          const inputValue = inputArea.value.trim();
          const [command, arg] = inputValue.split(' ');
          let output = '';

          if (commands[command]) {
              if (arg !== undefined) {
                  output = commands[command](arg);
              } else {
                  output = commands[command]();
              }

              if (output === 'clear') {
                  outputElement.innerHTML = '';
                  output = '';
              }
          } else {
              output = `<span class="error">Comando no encontrado: ${command}</span>`;
          }

          const outputLine = document.createElement("div");
          outputLine.classList.add("output");
          outputLine.innerHTML = `<span class="command"> ${inputValue}</span>\n${output}`;
          outputElement.appendChild(outputLine);
          terminal.scrollTop = terminal.scrollHeight;

          inputArea.value = '';
          inputArea.focus();

          // Actualizar el prompt con el directorio actual
          promptElement.textContent = `~/${currentDir} $`;
      }
  };

  const initialInput = document.querySelector(".input-area");
  initialInput.addEventListener("keydown", inputHandler);

  // Focus initial input
  initialInput.focus();

  // Inicializar el prompt con el directorio actual
  promptElement.textContent = `~/${currentDir} $`;
});
