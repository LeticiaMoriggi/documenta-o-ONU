
(function () {
    'use strict';

    let dadosFormatados = '';
    const url = window.location.href;

    const nameOnu = document.querySelector("#nameSpan").innerText;
    const nameOlt = document.querySelector("body > div.container-fluid > div.row > main > h2 > span:nth-child(2) > a").innerText;
    const slotOnu = document.querySelector("body > div.container-fluid > div.row > main > h2 > span:nth-child(3) > a").innerText;
    const idOnu = document.querySelector("body > div.container-fluid > div.row > main > h2 > span:nth-child(4)").innerText;
    const modeloONU = document.querySelector("#onu-detail > table:nth-child(1) > tbody > tr:nth-child(2) > th").innerText;
    const SA = document.querySelector("#onu-detail > table:nth-child(1) > tbody > tr:nth-child(6) > td > span:nth-child(2)").innerText;
    const firmware = document.querySelector("#onu-detail > table:nth-child(1) > tbody > tr:nth-child(7) > td").innerText;
    let negociacao;

    let SR;
    try {
        SR = document.querySelector("#onu-detail > table:nth-child(1) > tbody > tr:nth-child(6) > td > span:nth-child(5)").innerText;
    } catch {
        SR = "N/A"
    }

    try {
        negociacao = "" + document.querySelector("#onu-detail > table:nth-child(3) > tbody > tr > td:nth-child(2)").innerText;
    } catch {
        negociacao = "Status: Down"
    }


    dadosFormatados = `[LOCALIZAÇÃO]\n- Cliente está na ${nameOlt}\n- ONU está localizada em ${nameOnu} / slot: ${slotOnu} / onu id: ${idOnu}\n- Modelo da ONU: ${modeloONU}\n- SA: ${SA}\n- SR: ${SR}\n- Firmware: ${firmware}\n- ${negociacao}\n\n`;

    if (url.includes('show-logs-onu')) {
        // Extrair dados dos alarmes

        const alarmes = document.querySelectorAll("#show-logs tbody tr");

        if (alarmes.length > 0) {
            dadosFormatados += "[ALARMES]\n"
            alarmes.forEach(alarme => {
                const log = alarme.querySelector("td:nth-child(4)").innerText;
                if (log.includes("Alarm")) {
                    const dataHora = alarme.querySelector("td:nth-child(1)").innerText;
                    const alarmeFormatado = log.split(" : ")[3];
                    console.log(alarmeFormatado)
                    dadosFormatados += `${alarmeFormatado} em ${dataHora}\n`;
                }
            });
        }
    }
    GM_setClipboard(dadosFormatados);

    return dadosFormatados;
}
)();