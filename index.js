 // Selecionando elementos
    let input = document.getElementById("taskInput");
    let addBtn = document.getElementById("addBtn");
    let taskList = document.getElementById("taskList");
    let taskCount = document.getElementById("taskCount");
    let darkModeBtn = document.getElementById("darkMode");
    let clearAllBtn = document.getElementById("clearAll");

    // Contador
    let count = 0;

    // Função atualizar contador
    function updateCount() {
      taskCount.innerText = count;
    }

    // Adicionar tarefa
    addBtn.addEventListener("click", function() {

      // Validando input
      if(input.value === "") {
        alert("Digite uma tarefa");
        return;
      }

      // Criando item
      let li = document.createElement("li");

      // Texto da tarefa
      let span = document.createElement("span");
      span.innerText = input.value;

      // Botão remover
      let removeBtn = document.createElement("button");
      removeBtn.innerText = "Remover";
      removeBtn.classList.add("remove-btn");

      // Removendo tarefa
      removeBtn.addEventListener("click", function() {
        li.remove();

        count--;

        updateCount();
      });

      // Adicionando elementos
      li.appendChild(span);
      li.appendChild(removeBtn);

      taskList.appendChild(li);

      // Atualizando contador
      count++;

      updateCount();

      // Limpando input
      input.value = "";

    });

    // Dark Mode
    darkModeBtn.addEventListener("click", function() {
      document.body.classList.toggle("dark");
    });

    // Limpar tudo
    clearAllBtn.addEventListener("click", function() {

      taskList.innerHTML = "";

      count = 0;

      updateCount();

    });