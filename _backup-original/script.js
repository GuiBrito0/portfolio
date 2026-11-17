document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. GERENCIAMENTO DE TEMA (CLARO / ESCURO)
    // ==========================================
    const btnTema = document.querySelector("#tema");
    if (btnTema) {
        btnTema.addEventListener("click", () => {
            const escuro = document.body.classList.toggle("escuro");
            btnTema.setAttribute("aria-pressed", String(escuro));
            btnTema.textContent = escuro ? "Modo Claro" : "Alternar tema";
        });
    }

    // ==========================================
    // 2. EXPANSÃO DE INFORMAÇÕES DA SEÇÃO SOBRE
    // ==========================================
    const btnToggleSobre = document.querySelector("#btn-toggle-sobre");
    const maisInfo = document.querySelector("#mais-info");
    if (btnToggleSobre && maisInfo) {
        btnToggleSobre.addEventListener("click", () => {
            const isHidden = maisInfo.hasAttribute("hidden");
            if (isHidden) {
                maisInfo.removeAttribute("hidden");
                btnToggleSobre.textContent = "Mostrar menos";
                btnToggleSobre.setAttribute("aria-expanded", "true");
            } else {
                maisInfo.setAttribute("hidden", "");
                btnToggleSobre.textContent = "Mostrar mais";
                btnToggleSobre.setAttribute("aria-expanded", "false");
            }
        });
    }

    // ==========================================
    // 3. CONTADOR DO FORMULÁRIO DE CADASTRO DE PROJETOS
    // ==========================================
    const inputNome = document.querySelector("#nome");
    const contadorChar = document.querySelector("#contador-caracteres");
    function atualizarContadorChar() {
        if (inputNome && contadorChar) {
            const len = inputNome.value.length;
            contadorChar.textContent = `${len} caractere${len === 1 ? '' : 's'}`;
        }
    }
    if (inputNome) {
        inputNome.addEventListener("input", atualizarContadorChar);
        inputNome.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                inputNome.value = "";
                atualizarContadorChar();
            }
        });
    }

    // ==========================================
    // 4. CADASTRO DE PROJETOS E FILTRAGEM (Etapa 3)
    // ==========================================
    const formCadastro = document.querySelector("#cadastro");
    const filtroSelect = document.querySelector("#filtro");
    const containerProjetos = document.querySelector("#lista-projetos");
    const statusDiv = document.querySelector("#status");
    const contadorVisiveis = document.querySelector("#contador-visiveis");
    const mensagemVazia = document.querySelector("#mensagem-vazia");

    // Função de filtragem de projetos
    function aplicarFiltro() {
        if (!filtroSelect || !containerProjetos) return;
        const cat = filtroSelect.value;
        const cards = containerProjetos.querySelectorAll(".projeto");
        let qtd = 0;
        
        cards.forEach(card => {
            if (cat === "todos" || card.dataset.categoria === cat) {
                card.classList.remove("oculto");
                qtd++;
            } else {
                card.classList.add("oculto");
            }
        });

        if (contadorVisiveis) contadorVisiveis.textContent = `Projetos visíveis: ${qtd}`;
        
        // Orientação para estado vazio (Etapa 3 - Critério de Aceite)
        if (mensagemVazia) {
            if (qtd === 0) {
                mensagemVazia.classList.remove("oculto");
            } else {
                mensagemVazia.classList.add("oculto");
            }
        }
    }

    // Evento de envio do formulário de cadastro de projeto
    if (formCadastro) {
        formCadastro.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!formCadastro.checkValidity()) {
                formCadastro.reportValidity();
                if (statusDiv) {
                    statusDiv.textContent = "Preencha todos os campos corretamente.";
                    statusDiv.className = "erro";
                }
                return;
            }

            const formData = new FormData(formCadastro);
            const nome = formData.get("nome").trim();
            const categoria = formData.get("categoria");

            if (nome.length < 3) {
                if (statusDiv) {
                    statusDiv.textContent = "O nome do projeto deve ter no mínimo 3 caracteres.";
                    statusDiv.className = "erro";
                }
                return;
            }

            const card = document.createElement("article");
            card.className = "projeto";
            card.dataset.categoria = categoria;

            const h3 = document.createElement("h3");
            h3.textContent = nome;

            const pTec = document.createElement("p");
            pTec.textContent = `Categoria: ${categoria.toUpperCase()}`;

            const btnRemover = document.createElement("button");
            btnRemover.className = "remover";
            btnRemover.type = "button";
            btnRemover.textContent = "Remover";

            card.appendChild(h3);
            card.appendChild(pTec);
            card.appendChild(btnRemover);

            containerProjetos.appendChild(card);

            if (statusDiv) {
                statusDiv.textContent = `Projeto "${nome}" cadastrado com sucesso!`;
                statusDiv.className = "sucesso";
            }

            formCadastro.reset();
            if (inputNome) inputNome.value = "";
            atualizarContadorChar();
            aplicarFiltro();
        });
    }

    if (filtroSelect) {
        filtroSelect.addEventListener("change", aplicarFiltro);
    }

    if (containerProjetos) {
        containerProjetos.addEventListener("click", (e) => {
            const btn = e.target.closest(".remover");
            if (!btn) return;
            const card = btn.closest(".projeto");
            if (card) {
                const titulo = card.querySelector("h3") ? card.querySelector("h3").textContent : "Projeto";
                card.remove();
                if (statusDiv) {
                    statusDiv.textContent = `Projeto "${titulo}" removido.`;
                    statusDiv.className = "sucesso";
                }
                aplicarFiltro();
            }
        });
    }

    // ==========================================
    // 5. FORMULÁRIO DE CONTATO (Etapa 6 - Regras de Validação & Acessibilidade)
    // ==========================================
    const formContato = document.querySelector("#form-contato");
    const inputNomeContato = document.querySelector("#nome-contato");
    const inputEmailContato = document.querySelector("#email-contato");
    const selectMotivoContato = document.querySelector("#motivo-contato");
    const grupoAssunto = document.querySelector("#grupo-assunto");
    const inputAssunto = document.querySelector("#assunto-adicional");
    const textareaMensagem = document.querySelector("#mensagem-contato");
    const contadorMensagem = document.querySelector("#contador-mensagem");
    const resumoErros = document.querySelector("#resumo-erros");
    const statusEnvio = document.querySelector("#status-envio");
    const btnEnviarContato = document.querySelector("#btn-enviar-contato");

    // Contador em tempo real da mensagem (Passo 2)
    function atualizarContadorMensagem() {
        if (!textareaMensagem || !contadorMensagem) return 0;
        const total = textareaMensagem.value.length;
        contadorMensagem.textContent = `${total} / 1000 caracteres (mínimo de 30 após trim)`;
        return textareaMensagem.value.trim().length;
    }

    if (textareaMensagem) {
        textareaMensagem.addEventListener("input", () => {
            atualizarContadorMensagem();
            limparErro(textareaMensagem, "erro-mensagem-contato");
        });
    }

    // Regra condicional: Exibir "Assunto Adicional" apenas para a opção "Outro" (Passo 3)
    function atualizarRegraCondicional() {
        if (!selectMotivoContato || !grupoAssunto || !inputAssunto) return;

        if (selectMotivoContato.value === "Outro") {
            grupoAssunto.classList.remove("oculto");
            inputAssunto.removeAttribute("disabled");
            inputAssunto.setAttribute("required", "true");
        } else {
            grupoAssunto.classList.add("oculto");
            inputAssunto.setAttribute("disabled", "true");
            inputAssunto.removeAttribute("required");
            inputAssunto.value = "";
            limparErro(inputAssunto, "erro-assunto-adicional");
        }
    }

    if (selectMotivoContato) {
        selectMotivoContato.addEventListener("change", () => {
            atualizarRegraCondicional();
            limparErro(selectMotivoContato, "erro-motivo-contato");
        });
    }

    // Funções de apoio para exibição de erros acessíveis (Passo 4)
    function exibirErro(campo, idSpan, mensagem) {
        campo.setAttribute("aria-invalid", "true");
        const span = document.getElementById(idSpan);
        if (span) {
            span.textContent = mensagem;
            span.classList.remove("oculto");
        }
    }

    function limparErro(campo, idSpan) {
        campo.removeAttribute("aria-invalid");
        const span = document.getElementById(idSpan);
        if (span) {
            span.textContent = "";
            span.classList.add("oculto");
        }
    }

    // Validação das regras de negócio do Contrato dos Campos (Etapa 6 - Tabela de Regras)
    function validarFormularioContato() {
        const erros = [];

        // Regra Nome: 3 a 80 caracteres após trim()
        const nomeTrim = inputNomeContato.value.trim();
        const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
        if (nomeTrim.length === 0) {
            erros.push({ campo: inputNomeContato, idSpan: "erro-nome-contato", msg: "O nome é obrigatório." });
        } else if (nomeTrim.length < 3 || nomeTrim.length > 80) {
            erros.push({ campo: inputNomeContato, idSpan: "erro-nome-contato", msg: "O nome deve ter entre 3 e 80 caracteres." });
        } else if (!regexNome.test(nomeTrim)) {
            erros.push({ campo: inputNomeContato, idSpan: "erro-nome-contato", msg: "O nome contém caracteres inválidos." });
        } else {
            limparErro(inputNomeContato, "erro-nome-contato");
        }

        // Regra E-mail: Obrigatório e formato válido
        const emailTrim = inputEmailContato.value.trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailTrim.length === 0) {
            erros.push({ campo: inputEmailContato, idSpan: "erro-email-contato", msg: "O e-mail é obrigatório." });
        } else if (!regexEmail.test(emailTrim)) {
            erros.push({ campo: inputEmailContato, idSpan: "erro-email-contato", msg: "Informe um e-mail válido (ex: usuario@dominio.com)." });
        } else {
            limparErro(inputEmailContato, "erro-email-contato");
        }

        // Regra Motivo do contato: Seleção obrigatória
        if (selectMotivoContato.value === "") {
            erros.push({ campo: selectMotivoContato, idSpan: "erro-motivo-contato", msg: "Selecione o motivo do contato." });
        } else {
            limparErro(selectMotivoContato, "erro-motivo-contato");
        }

        // Regra Assunto Adicional: Apenas se motivo == Outro (5 a 100 caracteres após trim)
        if (selectMotivoContato.value === "Outro") {
            const assuntoTrim = inputAssunto.value.trim();
            if (assuntoTrim.length < 5 || assuntoTrim.length > 100) {
                erros.push({ campo: inputAssunto, idSpan: "erro-assunto-adicional", msg: "O assunto deve ter entre 5 e 100 caracteres." });
            } else {
                limparErro(inputAssunto, "erro-assunto-adicional");
            }
        }

        // Regra Mensagem: 30 a 1000 caracteres após trim()
        const mensagemTrim = textareaMensagem.value.trim();
        if (mensagemTrim.length < 30 || mensagemTrim.length > 1000) {
            erros.push({ campo: textareaMensagem, idSpan: "erro-mensagem-contato", msg: "A mensagem deve ter entre 30 e 1000 caracteres." });
        } else {
            limparErro(textareaMensagem, "erro-mensagem-contato");
        }

        return erros;
    }

    // Remove erros dinamicamente durante a digitação
    [inputNomeContato, inputEmailContato, inputAssunto].forEach(campo => {
        if (campo) {
            campo.addEventListener("input", () => {
                const idSpan = campo.getAttribute("aria-describedby")?.split(" ").find(id => id.startsWith("erro-"));
                if (idSpan) limparErro(campo, idSpan);
            });
        }
    });

        // Altere para true (para testar sucesso) ou false (para testar falha/erro de rede)
    const SIMULAR_SUCESSO = true;

    function enviarFormularioSimulado(dados) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (SIMULAR_SUCESSO) {
                    resolve({ mensagem: "Sua mensagem foi enviada com sucesso! Obrigado pelo contato." });
                } else {
                    reject({ mensagem: "Falha na conexão com o servidor. Tente novamente mais tarde." });
                }
            }, 1200);
        });
    }

    // Processamento da tentativa de envio (Passo 5 e 6)
    if (formContato) {
        formContato.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Esconde alertas anteriores
            if (resumoErros) resumoErros.classList.add("oculto");
            if (statusEnvio) statusEnvio.classList.add("oculto");

            const erros = validarFormularioContato();

            if (erros.length > 0) {
                // Exibe os erros nos campos correspondentes
                erros.forEach(item => exibirErro(item.campo, item.idSpan, item.msg));

                // Exibe o resumo textual dos erros e foca o primeiro campo inválido
                if (resumoErros) {
                    resumoErros.textContent = `Preenchimento inválido: foram encontrados ${erros.length} erro(s). Por favor, corrija os campos indicados.`;
                    resumoErros.classList.remove("oculto");
                    resumoErros.focus();
                }
                
                // Leva o foco ao primeiro campo com erro (Exigência do Passo 4)
                erros[0].campo.focus();
                return;
            }

            // Estado de Processamento
            btnEnviarContato.disabled = true;
            btnEnviarContato.textContent = "Enviando mensagem...";
            
            if (statusEnvio) {
                statusEnvio.textContent = "Processando informações...";
                statusEnvio.className = "status-envio";
                statusEnvio.classList.remove("oculto");
            }

            const dadosFormulario = {
                nome: inputNomeContato.value.trim(),
                email: inputEmailContato.value.trim(),
                motivo: selectMotivoContato.value,
                assunto: selectMotivoContato.value === "Outro" ? inputAssunto.value.trim() : null,
                mensagem: textareaMensagem.value.trim()
            };

            try {
                const resposta = await enviarFormularioSimulado(dadosFormulario);
                if (statusEnvio) {
                    statusEnvio.textContent = resposta.mensagem;
                    statusEnvio.className = "status-envio sucesso";
                }
                // Sucesso: limpa os campos do formulário
                formContato.reset();
                atualizarRegraCondicional();
                atualizarContadorMensagem();
            } catch (erro) {
                // Falha: preserva os dados inseridos
                if (statusEnvio) {
                    statusEnvio.textContent = erro.mensagem;
                    statusEnvio.className = "status-envio erro";
                }
            } finally {
                btnEnviarContato.disabled = false;
                btnEnviarContato.textContent = "Enviar mensagem";
            }
        });
    }

    // Inicialização da filtragem e estado inicial
    aplicarFiltro();
});
